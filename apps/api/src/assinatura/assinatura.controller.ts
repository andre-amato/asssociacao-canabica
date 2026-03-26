import {
  Controller,
  Post,
  Headers,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma.service";

@Controller("assinatura")
export class AssinaturaController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post("iniciar")
  async iniciar(@Headers("authorization") auth: string) {
    const token = auth?.replace("Bearer ", "");
    if (!token) throw new UnauthorizedException();

    const payload = await this.jwt.verifyAsync(token);

    const assinatura = await this.prisma.assinatura.create({
      data: {
        associadoId: payload.sub,
        provider: "placeholder",
        status: "ENVIADA",
      },
    });

    // TODO: integrar com provedor de assinatura digital
    return {
      message: "Processo de assinatura iniciado",
      id: assinatura.id,
      provider: assinatura.provider,
      url: null,
      status: assinatura.status,
    };
  }

  @Post("webhook")
  async webhook() {
    // TODO: receber callback do provedor de assinatura
    return { received: true };
  }
}
