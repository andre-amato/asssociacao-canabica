import { Controller, Post, Body } from "@nestjs/common";
import { IsEmail, IsNotEmpty } from "class-validator";

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
  @Post("pre-cadastro")
  preCadastro(@Body() dto: PreCadastroDto) {
    // TODO: salvar no banco e enviar e-mail com credenciais
    console.log("Novo pré-cadastro:", dto);
    return {
      message: "Pré-cadastro realizado com sucesso",
      id: Date.now().toString(),
    };
  }
}
