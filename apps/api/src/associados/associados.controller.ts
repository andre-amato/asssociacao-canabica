import { Controller, Post, Body } from "@nestjs/common";
import { IsEmail, IsNotEmpty } from "class-validator";
import { PrismaService } from "../prisma.service";
import * as bcrypt from "bcryptjs";

class PreCadastroDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  telefone: string;

  @IsNotEmpty()
  endereco: string;
}

@Controller("associados")
export class AssociadosController {
  constructor(private prisma: PrismaService) {}

  @Post("pre-cadastro")
  async preCadastro(@Body() dto: PreCadastroDto) {
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
