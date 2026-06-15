import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  Get,
  Param,
  Res,
  NotFoundException,
} from "@nestjs/common";
import { IsNotEmpty, IsEmail, IsOptional } from "class-validator";
import { Response } from "express";
import * as fs from "fs";
import * as path from "path";
import { PdfService, DadosInscricao } from "./pdf.service";
import { EmailService } from "./email.service";

class InscricaoDto {
  @IsNotEmpty({ message: "Nome completo é obrigatório" })
  nomeCompleto: string;

  @IsNotEmpty({ message: "Estado civil é obrigatório" })
  estadoCivil: string;

  @IsNotEmpty({ message: "Nacionalidade é obrigatória" })
  nacionalidade: string;

  @IsNotEmpty({ message: "Data de nascimento é obrigatória" })
  dataNascimento: string;

  @IsNotEmpty({ message: "Profissão é obrigatória" })
  profissao: string;

  @IsNotEmpty({ message: "RG é obrigatório" })
  rg: string;

  @IsNotEmpty({ message: "CPF é obrigatório" })
  cpf: string;

  @IsNotEmpty({ message: "Endereço é obrigatório" })
  endereco: string;

  @IsOptional()
  complemento: string;

  @IsNotEmpty({ message: "Bairro é obrigatório" })
  bairro: string;

  @IsNotEmpty({ message: "Cidade é obrigatória" })
  cidade: string;

  @IsNotEmpty({ message: "CEP é obrigatório" })
  cep: string;

  @IsNotEmpty({ message: "Estado é obrigatório" })
  estado: string;

  @IsOptional()
  telefoneResidencial: string;

  @IsNotEmpty({ message: "Celular é obrigatório" })
  celular: string;

  @IsNotEmpty({ message: "E-mail é obrigatório" })
  @IsEmail({}, { message: "E-mail inválido" })
  email: string;

  @IsNotEmpty({ message: "Patologia é obrigatória" })
  patologia: string;

  @IsOptional()
  cid: string;

  // Responsável legal (opcional)
  @IsOptional()
  responsavelNome?: string;
  @IsOptional()
  responsavelEstadoCivil?: string;
  @IsOptional()
  responsavelNacionalidade?: string;
  @IsOptional()
  responsavelProfissao?: string;
  @IsOptional()
  responsavelRg?: string;
  @IsOptional()
  responsavelCpf?: string;
  @IsOptional()
  responsavelDataNascimento?: string;
  @IsOptional()
  responsavelEndereco?: string;
  @IsOptional()
  responsavelComplemento?: string;
  @IsOptional()
  responsavelBairro?: string;
  @IsOptional()
  responsavelCidade?: string;
  @IsOptional()
  responsavelCep?: string;
  @IsOptional()
  responsavelEstado?: string;
  @IsOptional()
  responsavelTelefoneResidencial?: string;
  @IsOptional()
  responsavelCelular?: string;
  @IsOptional()
  responsavelEmail?: string;

  // Assinatura
  @IsNotEmpty({ message: "Assinatura é obrigatória" })
  assinaturaBase64: string;
}

@Controller("inscricao")
export class InscricaoController {
  private readonly uploadsDir: string;

  constructor(
    private readonly pdfService: PdfService,
    private readonly emailService: EmailService,
  ) {
    this.uploadsDir = path.resolve(process.cwd(), "uploads", "documentos");
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  @Post()
  async criarInscricao(@Body() dto: InscricaoDto) {
    try {
      const dados: DadosInscricao = { ...dto };

      // Gerar PDFs
      const autorizacaoPdf = await this.pdfService.gerarAutorizacaoAjuizamento(dados);
      const fichaPdf = await this.pdfService.gerarFichaInscricao(dados);

      // Salvar no servidor
      const timestamp = Date.now();
      const nomeBase = dto.nomeCompleto.replace(/\s+/g, "_").toLowerCase();

      const autorizacaoPath = path.join(
        this.uploadsDir,
        `autorizacao_${nomeBase}_${timestamp}.pdf`,
      );
      const fichaPath = path.join(
        this.uploadsDir,
        `ficha_inscricao_${nomeBase}_${timestamp}.pdf`,
      );

      fs.writeFileSync(autorizacaoPath, autorizacaoPdf);
      fs.writeFileSync(fichaPath, fichaPdf);

      // Enviar e-mails
      try {
        await this.emailService.enviarDocumentosAssinados({
          emailAssociado: dto.email,
          nomeAssociado: dto.nomeCompleto,
          autorizacaoPdf,
          fichaPdf,
        });
      } catch (emailError) {
        console.error("Erro ao enviar e-mail:", emailError);
        // Não falhar a requisição se o e-mail falhar — os PDFs já foram salvos
      }

      return {
        message: "Inscrição realizada com sucesso! Os documentos foram gerados e enviados por e-mail.",
        arquivos: {
          autorizacao: `autorizacao_${nomeBase}_${timestamp}.pdf`,
          fichaInscricao: `ficha_inscricao_${nomeBase}_${timestamp}.pdf`,
        },
      };
    } catch (error) {
      console.error("Erro ao processar inscrição:", error);
      throw new InternalServerErrorException(
        "Erro ao processar a inscrição. Tente novamente.",
      );
    }
  }

  @Get("documento/:filename")
  async baixarDocumento(@Param("filename") filename: string, @Res() res: Response) {
    const filePath = path.join(this.uploadsDir, filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException("Documento não encontrado");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  }
}
