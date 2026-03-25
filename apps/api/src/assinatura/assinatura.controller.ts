import { Controller, Post, Headers } from "@nestjs/common";

@Controller("assinatura")
export class AssinaturaController {
  @Post("iniciar")
  iniciar(@Headers("authorization") auth: string) {
    // TODO: integrar com DocuSign / Clicksign / D4Sign / Gov.br
    // 1. Gerar documento PDF do termo de adesão
    // 2. Enviar para API de assinatura digital
    // 3. Retornar URL de assinatura para o usuário
    console.log("Iniciando processo de assinatura digital");

    // Placeholder - em produção retornaria a URL real do provedor
    return {
      message: "Processo de assinatura iniciado",
      provider: "placeholder",
      url: null, // Ex: "https://app.clicksign.com/sign/xxx"
      status: "enviada",
    };
  }

  @Post("webhook")
  webhook() {
    // TODO: receber callback do provedor de assinatura
    // Atualizar status do associado no banco
    console.log("Webhook de assinatura recebido");
    return { received: true };
  }
}
