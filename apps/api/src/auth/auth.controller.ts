import { Controller, Post, Body } from "@nestjs/common";
import { IsEmail, IsNotEmpty } from "class-validator";
import { AuthService } from "./auth.service";

class LoginDto {
  @IsNotEmpty({ message: "E-mail é obrigatório" })
  @IsEmail({}, { message: "Por favor, informe um e-mail válido (ex: seu@email.com)" })
  email: string;

  @IsNotEmpty({ message: "Senha é obrigatória" })
  senha: string;
}

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.senha);
  }
}
