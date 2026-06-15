import { Injectable } from "@nestjs/common";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export interface DadosInscricao {
  // Dados do paciente/associado
  nomeCompleto: string;
  estadoCivil: string;
  nacionalidade: string;
  dataNascimento: string;
  profissao: string;
  rg: string;
  cpf: string;
  endereco: string;
  complemento: string;
  bairro: string;
  cidade: string;
  cep: string;
  estado: string;
  telefoneResidencial: string;
  celular: string;
  email: string;
  patologia: string;
  cid: string;

  // Dados do responsável legal (opcional)
  responsavelNome?: string;
  responsavelEstadoCivil?: string;
  responsavelNacionalidade?: string;
  responsavelProfissao?: string;
  responsavelRg?: string;
  responsavelCpf?: string;
  responsavelDataNascimento?: string;
  responsavelEndereco?: string;
  responsavelComplemento?: string;
  responsavelBairro?: string;
  responsavelCidade?: string;
  responsavelCep?: string;
  responsavelEstado?: string;
  responsavelTelefoneResidencial?: string;
  responsavelCelular?: string;
  responsavelEmail?: string;

  // Assinatura (base64 PNG)
  assinaturaBase64: string;
}

@Injectable()
export class PdfService {
  async gerarAutorizacaoAjuizamento(dados: DadosInscricao): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const { height } = page.getSize();

    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    const marginLeft = 60;
    const lineHeight = 16;
    let y = height - 60;

    // Título
    page.drawText("CANABICA - ASSOCIAÇÃO DE PACIENTES", {
      x: 140,
      y,
      size: 13,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    y -= 30;

    page.drawText("AUTORIZAÇÃO PARA AJUIZAMENTO DE AÇÃO JUDICIAL", {
      x: 115,
      y,
      size: 11,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    y -= 50;

    // Corpo do documento
    const nomeCompleto = dados.nomeCompleto.toUpperCase();
    const representanteLegal = dados.responsavelNome
      ? dados.responsavelNome.toUpperCase()
      : "";

    // Linha: Eu, NOME
    page.drawText(`Eu, ${nomeCompleto},`, {
      x: marginLeft,
      y,
      size: 10,
      font: fontRegular,
    });
    y -= lineHeight * 1.2;

    // Sublinhas com dados
    page.drawText("NOME", {
      x: 350,
      y: y + lineHeight * 0.2,
      size: 7,
      font: fontItalic,
      color: rgb(0.4, 0.4, 0.4),
    });
    y -= lineHeight;

    page.drawText(
      `${dados.nacionalidade}, ${dados.estadoCivil},`,
      {
        x: marginLeft,
        y,
        size: 10,
        font: fontRegular,
      },
    );
    y -= lineHeight * 0.8;

    page.drawText("NACIONALIDADE", {
      x: 120,
      y: y + lineHeight * 0.2,
      size: 7,
      font: fontItalic,
      color: rgb(0.4, 0.4, 0.4),
    });
    page.drawText("ESTADO CIVIL", {
      x: 320,
      y: y + lineHeight * 0.2,
      size: 7,
      font: fontItalic,
      color: rgb(0.4, 0.4, 0.4),
    });
    y -= lineHeight;

    page.drawText(`CPF nº ${dados.cpf}, RG nº ${dados.rg},`, {
      x: marginLeft,
      y,
      size: 10,
      font: fontRegular,
    });
    y -= lineHeight;

    page.drawText(`Endereço: ${dados.endereco}, ${dados.bairro}, ${dados.cidade} - ${dados.estado}, CEP ${dados.cep}`, {
      x: marginLeft,
      y,
      size: 10,
      font: fontRegular,
    });
    y -= lineHeight;

    page.drawText(`e telefone nº ${dados.celular || dados.telefoneResidencial},`, {
      x: marginLeft,
      y,
      size: 10,
      font: fontRegular,
    });
    y -= lineHeight * 1.5;

    if (representanteLegal) {
      page.drawText(`Representante Legal de ${representanteLegal},`, {
        x: marginLeft,
        y,
        size: 10,
        font: fontRegular,
      });
      y -= lineHeight * 1.5;
    }

    // Texto principal
    const textoPrincipal = [
      "na qualidade de associado da CANABICA - ASSOCIAÇÃO DE PACIENTES, inscrita no CNPJ/MF",
      "sob o nº 54.463.713/0001-10, DECLARO QUE AUTORIZO E CONCORDO com o ajuizamento de",
      "toda e qualquer medida judicial ou administrativa perante a União Federal, a Anvisa e/ou qualquer",
      "outra pessoa jurídica de direito público para reconhecimento do direito ao cultivo de Cannabis sp.",
      "para finalidade medicinal, com sua consequente autorização, nos termos do art. 2º, caput e",
      "parágrafo único, da Lei nº. 11.343/200, declarando, ainda, que sou portador de doença em",
      "tratamento com Cannabis, ou responsável legal por portador de doença em tratamento com",
      "Cannabis, conforme documentos anexos e que sou beneficiado ou responsável legal por paciente",
      "beneficiado pelo preparo de Cannabis sp. produzido pela CANABICA - ASSOCIAÇÃO DE",
      "PACIENTES e disponibilizado exclusivamente para consumo individual e intransferível em prol da",
      "minha saúde ou de quem sou responsável legal.",
    ];

    for (const linha of textoPrincipal) {
      page.drawText(linha, {
        x: marginLeft,
        y,
        size: 10,
        font: fontRegular,
      });
      y -= lineHeight;
    }

    y -= lineHeight * 2;

    page.drawText("Por ser a expressão da verdade, subscrevemos sob as penas da Lei.", {
      x: marginLeft,
      y,
      size: 10,
      font: fontRegular,
    });
    y -= lineHeight * 3;

    // Data
    const agora = new Date();
    const meses = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
    ];
    const dataFormatada = `${dados.cidade}, ${agora.getDate()} de ${meses[agora.getMonth()]} de ${agora.getFullYear()}.`;
    page.drawText(dataFormatada, {
      x: 200,
      y,
      size: 10,
      font: fontRegular,
    });
    y -= lineHeight * 4;

    // Assinatura
    if (dados.assinaturaBase64) {
      const sigData = dados.assinaturaBase64.replace(/^data:image\/png;base64,/, "");
      const sigImage = await pdfDoc.embedPng(Buffer.from(sigData, "base64"));
      const sigDims = sigImage.scale(0.4);
      page.drawImage(sigImage, {
        x: 200,
        y: y - sigDims.height,
        width: sigDims.width,
        height: sigDims.height,
      });
      y -= sigDims.height + 10;
    }

    // Linha da assinatura
    page.drawText("_____________________________________________", {
      x: 170,
      y,
      size: 10,
      font: fontRegular,
    });
    y -= lineHeight;

    page.drawText("Paciente ou Representante legal", {
      x: 220,
      y,
      size: 10,
      font: fontBold,
    });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }

  async gerarFichaInscricao(dados: DadosInscricao): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595.28, 841.89]); // A4
    const { height } = page.getSize();

    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const marginLeft = 50;
    const marginBottom = 60;
    const lineHeight = 16;
    let y = height - 50;

    // Função auxiliar para criar nova página se necessário
    const checkNewPage = () => {
      if (y < marginBottom) {
        page = pdfDoc.addPage([595.28, 841.89]);
        y = height - 50;
      }
    };

    // Título
    page.drawText("CANABICA - ASSOCIAÇÃO DE PACIENTES", {
      x: 150,
      y,
      size: 13,
      font: fontBold,
    });
    y -= 28;

    page.drawText("FICHA DE INSCRIÇÃO", {
      x: 220,
      y,
      size: 12,
      font: fontBold,
    });
    y -= 35;

    // Seção: Dados pessoais
    page.drawText("Dados pessoais do(a) paciente / associado(a):", {
      x: marginLeft,
      y,
      size: 10,
      font: fontBold,
    });
    y -= lineHeight * 1.3;

    const campos = [
      { label: "Nome completo", valor: dados.nomeCompleto },
      { label: "Estado civil", valor: dados.estadoCivil },
      { label: "Nacionalidade", valor: dados.nacionalidade },
      { label: "Data de nascimento", valor: dados.dataNascimento },
      { label: "Profissão", valor: dados.profissao },
      { label: "RG", valor: dados.rg },
      { label: "CPF", valor: dados.cpf },
      { label: "Endereço", valor: dados.endereco },
      { label: "Complemento", valor: dados.complemento },
      { label: "Bairro", valor: dados.bairro },
      { label: "Cidade", valor: dados.cidade },
      { label: "CEP", valor: dados.cep },
      { label: "Estado", valor: dados.estado },
      { label: "Telefone Residencial", valor: dados.telefoneResidencial },
      { label: "Celular", valor: dados.celular },
      { label: "E-mail", valor: dados.email },
      { label: "Patologia", valor: dados.patologia },
      { label: "CID", valor: dados.cid },
    ];

    for (const campo of campos) {
      checkNewPage();
      page.drawText(`${campo.label}: ${campo.valor || ""}`, {
        x: marginLeft,
        y,
        size: 9,
        font: fontRegular,
      });
      y -= lineHeight;
    }

    y -= lineHeight * 0.5;
    checkNewPage();

    // Seção: Responsável Legal
    page.drawText("Dados do Responsável Legal (Preencher somente caso o paciente seja menor de idade ou incapaz)", {
      x: marginLeft,
      y,
      size: 9,
      font: fontBold,
    });
    y -= lineHeight * 1.3;

    const camposResponsavel = [
      { label: "Nome completo", valor: dados.responsavelNome },
      { label: "Estado civil", valor: dados.responsavelEstadoCivil },
      { label: "Nacionalidade", valor: dados.responsavelNacionalidade },
      { label: "Profissão", valor: dados.responsavelProfissao },
      { label: "RG", valor: dados.responsavelRg },
      { label: "CPF", valor: dados.responsavelCpf },
      { label: "Data de nascimento", valor: dados.responsavelDataNascimento },
      { label: "Endereço", valor: dados.responsavelEndereco },
      { label: "Complemento", valor: dados.responsavelComplemento },
      { label: "Bairro", valor: dados.responsavelBairro },
      { label: "Cidade", valor: dados.responsavelCidade },
      { label: "CEP", valor: dados.responsavelCep },
      { label: "Estado", valor: dados.responsavelEstado },
      { label: "Telefone Residencial", valor: dados.responsavelTelefoneResidencial },
      { label: "Celular", valor: dados.responsavelCelular },
      { label: "E-mail", valor: dados.responsavelEmail },
    ];

    for (const campo of camposResponsavel) {
      checkNewPage();
      page.drawText(`${campo.label}: ${campo.valor || ""}`, {
        x: marginLeft,
        y,
        size: 9,
        font: fontRegular,
      });
      y -= lineHeight;
    }

    y -= lineHeight;
    checkNewPage();

    // Texto de declaração
    const textoDeclaracao = [
      "Por meio da presente, venho requerer a minha inscrição como associado(a) da CANABICA - ASSOCIAÇÃO DE PACIENTES, CNPJ",
      "nº 54.463.713/0001-10. Ao assinar este instrumento me torno associado da CANABICA - ASSOCIAÇÃO DE PACIENTES,",
      "adquirindo todos os direitos conquistados pela entidade para seus associados.",
    ];

    for (const linha of textoDeclaracao) {
      checkNewPage();
      page.drawText(linha, {
        x: marginLeft,
        y,
        size: 8,
        font: fontRegular,
      });
      y -= lineHeight * 0.9;
    }

    y -= lineHeight * 0.5;
    checkNewPage();

    page.drawText(
      "Documentos necessários: 1) Identidade, CPF e comprovante de residência do paciente ou responsável legal; 2) Laudo e prescrição",
      {
        x: marginLeft,
        y,
        size: 8,
        font: fontRegular,
      },
    );
    y -= lineHeight * 0.9;
    page.drawText("médica ou odontológica; 3) Ficha de Inscrição.", {
      x: marginLeft,
      y,
      size: 8,
      font: fontRegular,
    });
    y -= lineHeight * 2.5;

    // Garantir espaço para data + assinatura (precisa ~100px)
    if (y < marginBottom + 100) {
      page = pdfDoc.addPage([595.28, 841.89]);
      y = height - 50;
    }

    // Data
    const agora = new Date();
    const meses = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
    ];
    page.drawText(
      `${dados.cidade}, ${agora.getDate()} de ${meses[agora.getMonth()]} de ${agora.getFullYear()}.`,
      {
        x: 180,
        y,
        size: 10,
        font: fontRegular,
      },
    );
    y -= lineHeight * 3;

    // Assinatura
    if (dados.assinaturaBase64) {
      const sigData = dados.assinaturaBase64.replace(/^data:image\/png;base64,/, "");
      const sigImage = await pdfDoc.embedPng(Buffer.from(sigData, "base64"));
      const sigDims = sigImage.scale(0.4);
      page.drawImage(sigImage, {
        x: 200,
        y: y - sigDims.height,
        width: sigDims.width,
        height: sigDims.height,
      });
      y -= sigDims.height + 10;
    }

    page.drawText("_____________________________________________", {
      x: 170,
      y,
      size: 10,
      font: fontRegular,
    });
    y -= lineHeight;

    page.drawText("Associado ou Representante legal", {
      x: 215,
      y,
      size: 10,
      font: fontBold,
    });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }
}
