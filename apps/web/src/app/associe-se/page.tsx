"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function AssocieSe() {
  const traduzirErro = (msg: string) => {
    const traducoes: Record<string, string> = {
      "email must be an email": "Por favor, informe um e-mail válido (ex: seu@email.com).",
      "nome should not be empty": "O campo nome é obrigatório.",
      "email should not be empty": "O campo e-mail é obrigatório.",
      "telefone should not be empty": "O campo telefone é obrigatório.",
      "endereco should not be empty": "O campo endereço é obrigatório.",
    };
    for (const [en, pt] of Object.entries(traducoes)) {
      msg = msg.replace(en, pt);
    }
    if (msg.includes("Unique constraint") || msg.includes("already exists")) {
      return "Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.";
    }
    return msg;
  };

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
  });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.nome.trim().length < 3) {
      alert("Por favor, informe seu nome completo (mínimo 3 caracteres).");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Por favor, informe um e-mail válido (ex: seu@email.com).");
      return;
    }
    const telLimpo = form.telefone.replace(/\D/g, "");
    if (telLimpo.length < 10 || telLimpo.length > 11) {
      alert("Por favor, informe um telefone válido com DDD (ex: 11999999999).");
      return;
    }
    if (form.endereco.trim().length < 10) {
      alert("Por favor, informe seu endereço completo (rua, número, bairro, cidade e estado).");
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/associados/pre-cadastro`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        setEnviado(true);
      } else {
        const data = await res.json().catch(() => null);
        const msgs = Array.isArray(data?.message) ? data.message.join("\n") : data?.message;
        alert(traduzirErro(msgs || "Erro ao enviar. Tente novamente."));
      }
    } catch {
      alert("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <>
        <Header />
        <main>
          <section className="py-20 bg-gradient-to-br from-verde-escuro to-teal text-white">
            <div className="max-w-7xl mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Associe-se</h1>
            </div>
          </section>
          <section className="py-20 bg-white">
            <div className="max-w-md mx-auto px-4 text-center">
              <div className="w-16 h-16 bg-verde/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-verde" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-teal mb-3">
                Pré-cadastro realizado!
              </h2>
              <p className="text-teal/60 mb-6">
                Recebemos seus dados. Em breve você receberá um e-mail com as
                instruções para completar sua associação, enviar documentos e
                assinar digitalmente o termo de adesão.
              </p>
              <p className="text-sm text-teal/40">
                Verifique também sua caixa de spam.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <section className="py-20 bg-gradient-to-br from-verde-escuro to-teal text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Associe-se</h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Faça seu pré-cadastro com dados básicos. Após análise, você
              receberá acesso à área exclusiva para enviar documentos e assinar
              o termo de adesão.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-xl mx-auto px-4">
            <div className="mb-8 p-4 bg-creme rounded-xl text-sm text-teal/70">
              <p className="font-medium text-teal mb-2">Como funciona:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Preencha o pré-cadastro abaixo</li>
                <li>Receba acesso à área exclusiva por e-mail</li>
                <li>Envie seus documentos (laudo médico, RG, CPF)</li>
                <li>Assine digitalmente o termo de adesão</li>
                <li>Pronto! Você é um associado</li>
              </ol>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-teal mb-1">
                  Nome completo
                </label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-teal mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-teal mb-1">
                  Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  required
                  value={form.telefone}
                  onChange={(e) =>
                    setForm({ ...form, telefone: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-teal mb-1">
                  Endereço completo
                </label>
                <input
                  type="text"
                  placeholder="Rua, número, bairro, cidade - UF"
                  required
                  value={form.endereco}
                  onChange={(e) =>
                    setForm({ ...form, endereco: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                />
              </div>
              <button
                type="submit"
                disabled={enviando}
                className="w-full py-3 bg-verde text-white rounded-xl font-medium hover:bg-verde-escuro transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {enviando ? "Enviando..." : "Enviar pré-cadastro"}
              </button>
            </form>
            <p className="text-xs text-teal/40 mt-4 text-center">
              Seus dados são protegidos conforme a LGPD e utilizados apenas para
              fins de associação.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
