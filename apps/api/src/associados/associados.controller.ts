import { Controller, Post, Body, ConflictException } from "@nestjs/common";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { PrismaService } from "../prisma.service";
import * as bcrypt from "bcryptjs";

class PreCadastroDto {
  @IsNotEmpty({ message: "Nome é obrigatório" })
  @MinLength(3, { message: "Nome deve ter pelo menos 3 caracteres" })
  nome: string;

  @IsNotEmpty({ message: "E-mail é obrigatório" })
  @IsEmail({}, { message: "Por favor, informe um e-mail válido (ex: seu@email.com)" })
  email: string;

  @IsNotEmpty({ message: "Telefone é obrigatório" })
  telefone: string;

  @IsNotEmpty({ message: "Endereço é obrigatório" })
  @MinLength(10, { message: "Informe o endereço completo (rua, número, bairro, cidade e estado)" })
  endereco: string;
}

@Controller("associados")
export class AssociadosController {
  constructor(private prisma: PrismaService) {}

  @Post("pre-cadastro")
  async preCadastro(@Body() dto: PreCadastroDto) {
    const existente = await this.prisma.associado.findUnique({
      where: { email: dto.email },
    });
    if (existente) {
      throw new ConflictException("Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.");
    }

    const senhaTemporaria = Math.random().toString(36).slice(-8);
    const associado = await this.prisma.associado.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        telefone: dto.telefone,
        endereco: dto.endereco,
        senha: await bcrypt.hash(senhaTemporaria, 10),
      },
    });

    // TODO: enviar e-mail com credenciais
    return {
      message: "Pré-cadastro realizado com sucesso",
      id: associado.id,
    };
  }
}
