import { Controller, Post, Body } from "@nestjs/common";
import { IsEmail, IsNotEmpty } from "class-validator";

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
  @Post()
  create(@Body() dto: ContatoDto) {
    // TODO: salvar no banco / enviar email
    console.log("Nova mensagem de contato:", dto);
    return { message: "Mensagem recebida com sucesso" };
  }
}
