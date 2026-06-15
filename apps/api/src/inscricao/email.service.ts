import { Injectable } from "@nestjs/common";
import { Resend } from "resend";

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async enviarDocumentosAssinados(params: {
    emailAssociado: string;
    nomeAssociado: string;
    autorizacaoPdf: Buffer;
    fichaPdf: Buffer;
  }) {
    const emailAssociacao = process.env.EMAIL_ASSOCIACAO;
    const remetente = process.env.EMAIL_FROM || "CANABICA <onboarding@resend.dev>";

    const attachments = [
      {
        filename: `Autorizacao_Ajuizamento_${params.nomeAssociado.replace(/\s+/g, "_")}.pdf`,
        content: params.autorizacaoPdf,
      },
      {
        filename: `Ficha_Inscricao_${params.nomeAssociado.replace(/\s+/g, "_")}.pdf`,
        content: params.fichaPdf,
      },
    ];

    const html = `
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
    `;

    // Enviar para o associado
    await this.resend.emails.send({
      from: remetente,
      to: params.emailAssociado,
      subject: `Documentos de Inscrição - ${params.nomeAssociado}`,
      html,
      attachments,
    });

    // Enviar cópia para a associação
    if (emailAssociacao) {
      await this.resend.emails.send({
        from: remetente,
        to: emailAssociacao,
        subject: `[CÓPIA] Documentos de Inscrição - ${params.nomeAssociado}`,
        html,
        attachments,
      });
    }
  }
}
