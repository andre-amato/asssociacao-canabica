"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState, useRef } from "react";
import {
  Upload,
  FileText,
  PenTool,
  CheckCircle,
  Clock,
  AlertCircle,
  LogOut,
  User,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type DocStatus = "pendente" | "enviado" | "aprovado" | "rejeitado";

interface Documento {
  tipo: string;
  label: string;
  status: DocStatus;
  arquivo?: string;
}

const statusConfig: Record<DocStatus, { icon: typeof Clock; color: string; label: string }> = {
  pendente: { icon: Clock, color: "text-dourado", label: "Pendente" },
  enviado: { icon: Clock, color: "text-blue-500", label: "Em análise" },
  aprovado: { icon: CheckCircle, color: "text-verde", label: "Aprovado" },
  rejeitado: { icon: AlertCircle, color: "text-red-500", label: "Rejeitado" },
};

export default function Dashboard() {
  const [autenticado, setAutenticado] = useState(false);
  const [documentos, setDocumentos] = useState<Documento[]>([
    { tipo: "rg", label: "RG ou CNH", status: "pendente" },
    { tipo: "cpf", label: "CPF", status: "pendente" },
    { tipo: "comprovante_residencia", label: "Comprovante de Residência", status: "pendente" },
    { tipo: "laudo_medico", label: "Laudo Médico", status: "pendente" },
    { tipo: "receita", label: "Receita / Prescrição Médica", status: "pendente" },
  ]);
  const [assinaturaStatus, setAssinaturaStatus] = useState<"pendente" | "enviada" | "assinado">("pendente");
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/area-do-associado";
      return;
    }
    setAutenticado(true);
    // TODO: fetch documentos e status do backend
  }, []);

  const handleUpload = async (tipo: string, file: File) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tipo", tipo);

    try {
      const res = await fetch(`${API}/api/documentos/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        setDocumentos((prev) =>
          prev.map((d) =>
            d.tipo === tipo ? { ...d, status: "enviado" as DocStatus, arquivo: file.name } : d
          )
        );
      } else {
        alert("Erro ao enviar documento.");
      }
    } catch {
      alert("Erro ao enviar documento.");
    }
  };

  const handleAssinarDigitalmente = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/assinatura/iniciar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.open(data.url, "_blank");
        }
        setAssinaturaStatus("enviada");
      } else {
        alert("Erro ao iniciar assinatura digital.");
      }
    } catch {
      alert("Erro ao iniciar assinatura digital.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/area-do-associado";
  };

  const todosDocumentosEnviados = documentos.every(
    (d) => d.status === "enviado" || d.status === "aprovado"
  );

  if (!autenticado) return null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-creme">
        <section className="py-12 bg-gradient-to-br from-verde-escuro to-teal text-white">
          <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">Minha Área</h1>
              <p className="text-white/60 text-sm">
                Gerencie seus documentos e acompanhe sua associação
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
            >
              <LogOut size={16} /> Sair
            </button>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
          {/* Status geral */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-verde/10">
              <div className="flex items-center gap-3 mb-2">
                <User className="text-verde-escuro" size={20} />
                <span className="text-sm font-medium text-teal">Perfil</span>
              </div>
              <p className="text-xs text-teal/50">Dados do pré-cadastro recebidos</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-verde/10">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="text-verde-escuro" size={20} />
                <span className="text-sm font-medium text-teal">Documentos</span>
              </div>
              <p className="text-xs text-teal/50">
                {documentos.filter((d) => d.status !== "pendente").length} de{" "}
                {documentos.length} enviados
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-verde/10">
              <div className="flex items-center gap-3 mb-2">
                <PenTool className="text-verde-escuro" size={20} />
                <span className="text-sm font-medium text-teal">Assinatura</span>
              </div>
              <p className="text-xs text-teal/50">
                {assinaturaStatus === "assinado"
                  ? "Termo assinado"
                  : assinaturaStatus === "enviada"
                    ? "Aguardando assinatura"
                    : "Pendente"}
              </p>
            </div>
          </div>

          {/* Documentos */}
          <div className="bg-white rounded-2xl border border-verde/10 p-6">
            <h2 className="text-lg font-semibold text-teal mb-1">
              Documentos para Associação
            </h2>
            <p className="text-sm text-teal/50 mb-6">
              Envie os documentos abaixo para completar seu processo de
              associação. Formatos aceitos: PDF, JPG, PNG (máx. 5MB).
            </p>
            <div className="space-y-4">
              {documentos.map((doc) => {
                const StatusIcon = statusConfig[doc.status].icon;
                return (
                  <div
                    key={doc.tipo}
                    className="flex items-center justify-between p-4 rounded-xl bg-creme/50 border border-verde/5"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="text-teal/40" size={20} />
                      <div>
                        <p className="text-sm font-medium text-teal">
                          {doc.label}
                        </p>
                        {doc.arquivo && (
                          <p className="text-xs text-teal/40">{doc.arquivo}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex items-center gap-1 text-xs ${statusConfig[doc.status].color}`}
                      >
                        <StatusIcon size={14} />
                        {statusConfig[doc.status].label}
                      </span>
                      {(doc.status === "pendente" || doc.status === "rejeitado") && (
                        <>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            ref={(el) => { fileInputRefs.current[doc.tipo] = el; }}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleUpload(doc.tipo, file);
                            }}
                          />
                          <button
                            onClick={() =>
                              fileInputRefs.current[doc.tipo]?.click()
                            }
                            className="flex items-center gap-1 px-3 py-1.5 bg-verde text-white text-xs rounded-lg hover:bg-verde-escuro transition-colors"
                          >
                            <Upload size={14} /> Enviar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assinatura Digital */}
          <div className="bg-white rounded-2xl border border-verde/10 p-6">
            <h2 className="text-lg font-semibold text-teal mb-1">
              Assinatura Digital do Termo de Adesão
            </h2>
            <p className="text-sm text-teal/50 mb-6">
              Após enviar todos os documentos, assine digitalmente o termo de
              adesão à associação. Utilizamos integração com plataformas de
              assinatura digital (DocuSign, Clicksign, Gov.br) para garantir
              validade jurídica.
            </p>

            {assinaturaStatus === "assinado" ? (
              <div className="flex items-center gap-3 p-4 bg-verde/5 rounded-xl">
                <CheckCircle className="text-verde" size={24} />
                <div>
                  <p className="text-sm font-medium text-teal">
                    Termo assinado com sucesso
                  </p>
                  <p className="text-xs text-teal/50">
                    Sua associação está ativa. Bem-vindo!
                  </p>
                </div>
              </div>
            ) : assinaturaStatus === "enviada" ? (
              <div className="flex items-center gap-3 p-4 bg-dourado/10 rounded-xl">
                <Clock className="text-dourado" size={24} />
                <div>
                  <p className="text-sm font-medium text-teal">
                    Assinatura em andamento
                  </p>
                  <p className="text-xs text-teal/50">
                    Verifique seu e-mail para completar a assinatura na
                    plataforma.
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={handleAssinarDigitalmente}
                disabled={!todosDocumentosEnviados}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                  todosDocumentosEnviados
                    ? "bg-verde text-white hover:bg-verde-escuro"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <PenTool size={18} />
                {todosDocumentosEnviados
                  ? "Assinar Termo Digitalmente"
                  : "Envie todos os documentos primeiro"}
              </button>
            )}

            <div className="mt-4 p-3 bg-creme/50 rounded-lg">
              <p className="text-xs text-teal/40">
                🔒 A assinatura digital tem validade jurídica conforme a MP
                2.200-2/2001 e Lei 14.063/2020. Integrações disponíveis:
                DocuSign, Clicksign, D4Sign, Gov.br (assinatura avançada).
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
