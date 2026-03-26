"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { LogIn } from "lucide-react";

export default function AreaDoAssociado() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.access_token);
        window.location.href = "/area-do-associado/dashboard";
      } else {
        const data = await res.json().catch(() => null);
        alert(data?.message || "Credenciais inválidas.");
      }
    } catch {
      alert("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Área do Associado
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Acesse sua conta para enviar documentos, acompanhar sua associação
              e assinar termos digitalmente.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-md mx-auto px-4">
            <div className="p-8 rounded-2xl border border-verde/10">
              <div className="w-14 h-14 bg-verde/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <LogIn className="text-verde-escuro" size={28} />
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="E-mail"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                />
                <input
                  type="password"
                  placeholder="Senha"
                  required
                  value={form.senha}
                  onChange={(e) => setForm({ ...form, senha: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                />
                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full py-3 bg-verde text-white rounded-xl font-medium hover:bg-verde-escuro transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {enviando ? "Entrando..." : "Entrar"}
                </button>
              </form>
              <p className="text-xs text-teal/40 mt-4 text-center">
                Ainda não tem conta?{" "}
                <a href="/associe-se" className="text-verde-escuro underline">
                  Faça seu pré-cadastro
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
