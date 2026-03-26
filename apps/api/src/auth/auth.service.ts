import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(email: string, senha: string) {
    const associado = await this.prisma.associado.findUnique({
      where: { email },
    });

    if (!associado || !(await bcrypt.compare(senha, associado.senha))) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    return {
      access_token: await this.jwt.signAsync({
        sub: associado.id,
        email: associado.email,
      }),
    };
  }
}
