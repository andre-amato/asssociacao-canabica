import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ContatoController } from "./contato/contato.controller";
import { AssociadosController } from "./associados/associados.controller";
import { DocumentosController } from "./documentos/documentos.controller";
import { AssinaturaController } from "./assinatura/assinatura.controller";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || "fazenda-canabica-secret",
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [
    ContatoController,
    AssociadosController,
    DocumentosController,
    AssinaturaController,
    AuthController,
  ],
  providers: [AuthService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
