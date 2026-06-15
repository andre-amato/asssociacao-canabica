import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL direto
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });
  }

  async enviarDocumentosAssinados(params: {
    emailAssociado: string;
    nomeAssociado: string;
    autorizacaoPdf: Buffer;
    fichaPdf: Buffer;
  }) {
    const emailAssociacao = process.env.EMAIL_ASSOCIACAO;
    const remetente = process.env.SMTP_FROM || process.env.SMTP_USER;

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"CANABICA - Associação de Pacientes" <${remetente}>`,
      subject: `Documentos de Inscrição - ${params.nomeAssociado}`,
      html: `
        <h2>Documentos de Inscrição - CANABICA</h2>
        <p>Olá ${params.nomeAssociado},</p>
        <p>Seguem em anexo os documentos assinados da sua inscrição na CANABICA - Associação de Pacientes:</p>
        <ul>
          <li>Autorização para Ajuizamento de Ação Judicial</li>
          <li>Ficha de Inscrição</li>
        </ul>
        <p>Guarde estes documentos para seus registros.</p>
        <br>
        <p>Atenciosamente,<br>CANABICA - Associação de Pacientes</p>
      `,
      attachments: [
        {
          filename: `Autorizacao_Ajuizamento_${params.nomeAssociado.replace(/\s+/g, "_")}.pdf`,
          content: params.autorizacaoPdf,
          contentType: "application/pdf",
        },
        {
          filename: `Ficha_Inscricao_${params.nomeAssociado.replace(/\s+/g, "_")}.pdf`,
          content: params.fichaPdf,
          contentType: "application/pdf",
        },
      ],
    };

    // Enviar para o associado
    await this.transporter.sendMail({
      ...mailOptions,
      to: params.emailAssociado,
    });

    // Enviar cópia para a associação
    if (emailAssociacao) {
      await this.transporter.sendMail({
        ...mailOptions,
        to: emailAssociacao,
        subject: `[CÓPIA] Documentos de Inscrição - ${params.nomeAssociado}`,
      });
    }
  }
}
