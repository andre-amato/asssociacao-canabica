import { Controller, Post, Body } from "@nestjs/common";
import { IsEmail, IsNotEmpty } from "class-validator";
import { PrismaService } from "../prisma.service";

class ContatoDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
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
