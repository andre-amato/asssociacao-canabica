import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Headers,
  UnauthorizedException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma.service";
import { TipoDocumento } from "../generated/prisma/client";

@Controller("documentos")
export class DocumentosController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async upload(
    @UploadedFile() file: any,
    @Body("tipo") tipo: TipoDocumento,
    @Headers("authorization") auth: string,
  ) {
    const token = auth?.replace("Bearer ", "");
    if (!token) throw new UnauthorizedException();

    const payload = await this.jwt.verifyAsync(token);

    const documento = await this.prisma.documento.create({
      data: {
        tipo,
        filename: file?.originalname ?? "unknown",
        associadoId: payload.sub,
        // TODO: upload para S3 e salvar URL
      },
    });

    return {
      message: "Documento enviado com sucesso",
      id: documento.id,
      tipo,
      filename: documento.filename,
    };
  }
}
