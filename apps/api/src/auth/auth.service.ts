import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async login(email: string, senha: string) {
    // TODO: validar contra banco de dados
    if (email === "admin@fazendacanabica.org.br" && senha === "123456") {
      return {
        access_token: await this.jwt.signAsync({ sub: 1, email }),
      };
    }
    throw new UnauthorizedException("Credenciais inválidas");
  }
}
