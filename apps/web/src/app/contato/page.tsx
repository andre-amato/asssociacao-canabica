"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Contato() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso(false);
    setEnviando(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/contato`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSucesso(true);
        setForm({ nome: "", email: "", mensagem: "" });
      } else {
        const data = await res.json().catch(() => null);
        const msgs = Array.isArray(data?.message) ? data.message.join(", ") : data?.message;
        setErro(msgs || "Erro ao enviar mensagem. Tente novamente.");
      }
    } catch {
      setErro("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="py-20 bg-gradient-to-br from-verde-escuro to-teal text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Fale Conosco</h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Estamos aqui para ajudar. Entre em contato.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-teal mb-6">
                Envie sua mensagem
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Seu nome"
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                />
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                />
                <textarea
                  placeholder="Sua mensagem"
                  required
                  rows={5}
                  value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50 resize-none"
                />
                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full py-3 bg-verde text-white rounded-xl font-medium hover:bg-verde-escuro transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {enviando ? "Enviando..." : "Enviar mensagem"}
                </button>
                {erro && (
                  <p className="text-sm text-red-500 text-center bg-red-50 p-3 rounded-xl">{erro}</p>
                )}
                {sucesso && (
                  <p className="text-sm text-verde text-center bg-verde/5 p-3 rounded-xl">Mensagem enviada com sucesso!</p>
                )}
              </form>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-teal mb-6">Informações</h2>
              {[
                { icon: MapPin, label: "Endereço", value: "São Paulo, SP" },
                { icon: Phone, label: "Telefone", value: "(00) 00000-0000" },
                { icon: Mail, label: "E-mail", value: "contato@fazendacanabica.org.br" },
                { icon: MessageCircle, label: "WhatsApp", value: "(00) 00000-0000" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-verde/10 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="text-verde-escuro" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-teal">{item.label}</p>
                    <p className="text-sm text-teal/60">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="mt-8 p-6 bg-creme rounded-2xl">
                <h3 className="font-semibold text-teal mb-3">FAQ</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-teal">Preciso de receita médica?</p>
                    <p className="text-teal/60">Sim, é necessário laudo médico com indicação de cannabis medicinal.</p>
                  </div>
                  <div>
                    <p className="font-medium text-teal">Quanto custa a associação?</p>
                    <p className="text-teal/60">Entre em contato para conhecer nossos planos e valores.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
