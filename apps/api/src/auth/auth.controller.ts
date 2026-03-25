import { Controller, Post, Body } from "@nestjs/common";
import { IsEmail, IsNotEmpty } from "class-validator";
import { AuthService } from "./auth.service";

class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
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
