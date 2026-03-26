import { Controller, Post, Body } from "@nestjs/common";
import { IsEmail, IsNotEmpty } from "class-validator";
import { PrismaService } from "../prisma.service";

class ContatoDto {
  @IsNotEmpty({ message: "Nome é obrigatório" })
  nome: string;

  @IsNotEmpty({ message: "E-mail é obrigatório" })
  @IsEmail({}, { message: "Por favor, informe um e-mail válido (ex: seu@email.com)" })
  email: string;

  @IsNotEmpty({ message: "Mensagem é obrigatória" })
  mensagem: string;
}

@Controller("contato")
export class ContatoController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async create(@Body() dto: ContatoDto) {
    await this.prisma.contato.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        mensagem: dto.mensagem,
      },
    });
    return { message: "Mensagem recebida com sucesso" };
  }
}
