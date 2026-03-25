import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Headers,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("documentos")
export class DocumentosController {
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  upload(
    @UploadedFile() file: any,
    @Body("tipo") tipo: string,
    @Headers("authorization") auth: string,
  ) {
    // TODO: validar JWT, salvar arquivo no S3/storage, atualizar status no banco
    console.log("Upload de documento:", {
      tipo,
      filename: file?.originalname,
      size: file?.size,
    });
    return {
      message: "Documento enviado com sucesso",
      tipo,
      filename: file?.originalname,
    };
  }
}
