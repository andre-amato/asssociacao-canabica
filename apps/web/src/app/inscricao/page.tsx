"use client";

import { useState, useRef } from "react";
import { CheckCircle, Eraser, ArrowLeft, Leaf } from "lucide-react";
import Link from "next/link";
import SignatureCanvas from "react-signature-canvas";

interface FormData {
  nomeCompleto: string;
  estadoCivil: string;
  nacionalidade: string;
  dataNascimento: string;
  profissao: string;
  rg: string;
  cpf: string;
  endereco: string;
  complemento: string;
  bairro: string;
  cidade: string;
  cep: string;
  estado: string;
  telefoneResidencial: string;
  celular: string;
  email: string;
  patologia: string;
  cid: string;
  responsavelNome: string;
  responsavelEstadoCivil: string;
  responsavelNacionalidade: string;
  responsavelProfissao: string;
  responsavelRg: string;
  responsavelCpf: string;
  responsavelDataNascimento: string;
  responsavelEndereco: string;
  responsavelComplemento: string;
  responsavelBairro: string;
  responsavelCidade: string;
  responsavelCep: string;
  responsavelEstado: string;
  responsavelTelefoneResidencial: string;
  responsavelCelular: string;
  responsavelEmail: string;
}

const estadosBrasileiros = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

export default function Inscricao() {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [mostrarResponsavel, setMostrarResponsavel] = useState(false);
  const [emailConfirmacao, setEmailConfirmacao] = useState("");

  const [form, setForm] = useState<FormData>({
    nomeCompleto: "",
    estadoCivil: "",
    nacionalidade: "Brasileira",
    dataNascimento: "",
    profissao: "",
    rg: "",
    cpf: "",
    endereco: "",
    complemento: "",
    bairro: "",
    cidade: "",
    cep: "",
    estado: "",
    telefoneResidencial: "",
    celular: "",
    email: "",
    patologia: "",
    cid: "",
    responsavelNome: "",
    responsavelEstadoCivil: "",
    responsavelNacionalidade: "",
    responsavelProfissao: "",
    responsavelRg: "",
    responsavelCpf: "",
    responsavelDataNascimento: "",
    responsavelEndereco: "",
    responsavelComplemento: "",
    responsavelBairro: "",
    responsavelCidade: "",
    responsavelCep: "",
    responsavelEstado: "",
    responsavelTelefoneResidencial: "",
    responsavelCelular: "",
    responsavelEmail: "",
  });

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const limparAssinatura = () => {
    sigCanvas.current?.clear();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (form.email !== emailConfirmacao) {
      setErro("Os e-mails não coincidem. Por favor, verifique.");
      return;
    }

    if (sigCanvas.current?.isEmpty()) {
      setErro("Por favor, assine no campo de assinatura antes de enviar.");
      return;
    }

    const assinaturaBase64 = sigCanvas.current?.toDataURL("image/png") || "";

    setEnviando(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/inscricao`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, assinaturaBase64 }),
        },
      );

      if (res.ok) {
        setEnviado(true);
      } else {
        const data = await res.json().catch(() => null);
        const msgs = Array.isArray(data?.message)
          ? data.message.join(". ")
          : data?.message;
        setErro(msgs || "Erro ao enviar. Tente novamente.");
      }
    } catch {
      setErro("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-verde-escuro via-teal to-verde-escuro flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 text-center">
          <div className="w-20 h-20 bg-verde/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-verde" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-teal mb-3">
            Inscrição realizada!
          </h2>
          <p className="text-teal/60 mb-6 leading-relaxed">
            Seus documentos foram gerados e assinados. Você receberá uma cópia
            por e-mail com a Autorização de Ajuizamento e a Ficha de Inscrição.
          </p>
          <p className="text-sm text-teal/40 mb-8">
            Verifique também sua caixa de spam.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-verde font-medium hover:text-verde-escuro transition-colors"
          >
            <ArrowLeft size={16} /> Voltar ao site
          </Link>
        </div>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-verde/30 focus:border-verde bg-gray-50/50 transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header minimalista */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-teal hover:text-verde-escuro transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Voltar</span>
          </Link>
          <div className="flex items-center gap-2">
            <Leaf className="text-verde" size={20} />
            <span className="font-semibold text-teal text-sm">CANABICA</span>
          </div>
        </div>
      </header>

      {/* Hero compacto */}
      <section className="bg-gradient-to-r from-verde-escuro to-teal py-10 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Ficha de Inscrição</h1>
          <p className="text-white/70 max-w-lg mx-auto">
            Preencha seus dados, assine eletronicamente e torne-se associado(a) da CANABICA.
          </p>
        </div>
      </section>

      {/* Formulário */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        {erro && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3">
            <span className="text-red-400 mt-0.5">⚠️</span>
            <span>{erro}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Dados pessoais */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-lg font-bold text-teal mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-verde/10 rounded-lg flex items-center justify-center text-verde text-sm font-bold">1</span>
              Dados pessoais do(a) paciente
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={labelClass}>Nome completo *</label>
                <input type="text" required value={form.nomeCompleto} onChange={(e) => updateField("nomeCompleto", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Estado civil *</label>
                <select required value={form.estadoCivil} onChange={(e) => updateField("estadoCivil", e.target.value)} className={inputClass}>
                  <option value="">Selecione</option>
                  <option value="Solteiro(a)">Solteiro(a)</option>
                  <option value="Casado(a)">Casado(a)</option>
                  <option value="Divorciado(a)">Divorciado(a)</option>
                  <option value="Viúvo(a)">Viúvo(a)</option>
                  <option value="União Estável">União Estável</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Nacionalidade *</label>
                <input type="text" required value={form.nacionalidade} onChange={(e) => updateField("nacionalidade", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Data de nascimento *</label>
                <input type="date" required value={form.dataNascimento} onChange={(e) => updateField("dataNascimento", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Profissão *</label>
                <input type="text" required value={form.profissao} onChange={(e) => updateField("profissao", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>RG *</label>
                <input type="text" required value={form.rg} onChange={(e) => updateField("rg", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>CPF *</label>
                <input type="text" required placeholder="000.000.000-00" value={form.cpf} onChange={(e) => updateField("cpf", e.target.value)} className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Endereço *</label>
                <input type="text" required placeholder="Rua, número" value={form.endereco} onChange={(e) => updateField("endereco", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Complemento</label>
                <input type="text" value={form.complemento} onChange={(e) => updateField("complemento", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Bairro *</label>
                <input type="text" required value={form.bairro} onChange={(e) => updateField("bairro", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Cidade *</label>
                <input type="text" required value={form.cidade} onChange={(e) => updateField("cidade", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>CEP *</label>
                <input type="text" required placeholder="00000-000" value={form.cep} onChange={(e) => updateField("cep", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Estado *</label>
                <select required value={form.estado} onChange={(e) => updateField("estado", e.target.value)} className={inputClass}>
                  <option value="">Selecione</option>
                  {estadosBrasileiros.map((uf) => (<option key={uf} value={uf}>{uf}</option>))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Telefone Residencial</label>
                <input type="tel" placeholder="(00) 0000-0000" value={form.telefoneResidencial} onChange={(e) => updateField("telefoneResidencial", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Celular *</label>
                <input type="tel" required placeholder="(00) 00000-0000" value={form.celular} onChange={(e) => updateField("celular", e.target.value)} className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>E-mail *</label>
                <input type="email" required placeholder="seu@email.com" value={form.email} onChange={(e) => updateField("email", e.target.value)} className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Confirme seu e-mail *</label>
                <input
                  type="email"
                  required
                  placeholder="digite o e-mail novamente"
                  value={emailConfirmacao}
                  onChange={(e) => setEmailConfirmacao(e.target.value)}
                  className={`${inputClass} ${emailConfirmacao && emailConfirmacao !== form.email ? "ring-2 ring-red-300 border-red-300" : ""}`}
                />
                {emailConfirmacao && emailConfirmacao !== form.email && (
                  <p className="text-red-500 text-xs mt-1.5">Os e-mails não coincidem.</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Patologia *</label>
                <input type="text" required value={form.patologia} onChange={(e) => updateField("patologia", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>CID</label>
                <input type="text" value={form.cid} onChange={(e) => updateField("cid", e.target.value)} className={inputClass} />
              </div>
            </div>
          </section>

          {/* Responsável Legal */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="temResponsavel"
                checked={mostrarResponsavel}
                onChange={(e) => setMostrarResponsavel(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-verde focus:ring-verde"
              />
              <label htmlFor="temResponsavel" className="text-sm text-gray-700">
                <span className="font-medium">Paciente é menor de idade ou incapaz</span>
                <br />
                <span className="text-gray-500">Marque para preencher os dados do Responsável Legal</span>
              </label>
            </div>

            {mostrarResponsavel && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-base font-bold text-teal mb-4">Dados do Responsável Legal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className={labelClass}>Nome completo</label>
                    <input type="text" value={form.responsavelNome} onChange={(e) => updateField("responsavelNome", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Estado civil</label>
                    <select value={form.responsavelEstadoCivil} onChange={(e) => updateField("responsavelEstadoCivil", e.target.value)} className={inputClass}>
                      <option value="">Selecione</option>
                      <option value="Solteiro(a)">Solteiro(a)</option>
                      <option value="Casado(a)">Casado(a)</option>
                      <option value="Divorciado(a)">Divorciado(a)</option>
                      <option value="Viúvo(a)">Viúvo(a)</option>
                      <option value="União Estável">União Estável</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Nacionalidade</label>
                    <input type="text" value={form.responsavelNacionalidade} onChange={(e) => updateField("responsavelNacionalidade", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Profissão</label>
                    <input type="text" value={form.responsavelProfissao} onChange={(e) => updateField("responsavelProfissao", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>RG</label>
                    <input type="text" value={form.responsavelRg} onChange={(e) => updateField("responsavelRg", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>CPF</label>
                    <input type="text" value={form.responsavelCpf} onChange={(e) => updateField("responsavelCpf", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Data de nascimento</label>
                    <input type="date" value={form.responsavelDataNascimento} onChange={(e) => updateField("responsavelDataNascimento", e.target.value)} className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Endereço</label>
                    <input type="text" value={form.responsavelEndereco} onChange={(e) => updateField("responsavelEndereco", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Complemento</label>
                    <input type="text" value={form.responsavelComplemento} onChange={(e) => updateField("responsavelComplemento", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Bairro</label>
                    <input type="text" value={form.responsavelBairro} onChange={(e) => updateField("responsavelBairro", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Cidade</label>
                    <input type="text" value={form.responsavelCidade} onChange={(e) => updateField("responsavelCidade", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>CEP</label>
                    <input type="text" value={form.responsavelCep} onChange={(e) => updateField("responsavelCep", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Estado</label>
                    <select value={form.responsavelEstado} onChange={(e) => updateField("responsavelEstado", e.target.value)} className={inputClass}>
                      <option value="">Selecione</option>
                      {estadosBrasileiros.map((uf) => (<option key={uf} value={uf}>{uf}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Telefone Residencial</label>
                    <input type="tel" value={form.responsavelTelefoneResidencial} onChange={(e) => updateField("responsavelTelefoneResidencial", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Celular</label>
                    <input type="tel" value={form.responsavelCelular} onChange={(e) => updateField("responsavelCelular", e.target.value)} className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>E-mail</label>
                    <input type="email" value={form.responsavelEmail} onChange={(e) => updateField("responsavelEmail", e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Assinatura */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-lg font-bold text-teal mb-2 flex items-center gap-2">
              <span className="w-8 h-8 bg-verde/10 rounded-lg flex items-center justify-center text-verde text-sm font-bold">2</span>
              Assinatura Eletrônica
            </h2>
            <p className="text-sm text-gray-500 mb-4 ml-10">
              Assine com o dedo (celular) ou mouse (computador) no campo abaixo.
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-white hover:border-verde/50 transition-colors">
              <SignatureCanvas
                ref={sigCanvas}
                canvasProps={{
                  className: "w-full h-48",
                  style: { width: "100%", height: "192px" },
                }}
                penColor="black"
                backgroundColor="white"
              />
            </div>

            <button
              type="button"
              onClick={limparAssinatura}
              className="mt-3 flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              <Eraser size={14} />
              Limpar assinatura
            </button>
          </section>

          {/* Declaração legal */}
          <section className="bg-verde-escuro/5 rounded-2xl p-6 border border-verde/10">
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong>Ao enviar, declaro que:</strong> Autorizo e concordo com o ajuizamento de medidas judiciais/administrativas perante a União Federal, Anvisa e/ou qualquer pessoa jurídica de direito público para reconhecimento do direito ao cultivo de Cannabis sp. para finalidade medicinal. Venho requerer minha inscrição como associado(a) da CANABICA - ASSOCIAÇÃO DE PACIENTES, CNPJ nº 54.463.713/0001-10. Minha assinatura eletrônica tem validade jurídica nos termos da Lei 14.063/2020.
            </p>
          </section>

          {/* Submit */}
          <button
            type="submit"
            disabled={enviando}
            className="w-full py-4 bg-verde text-white rounded-xl font-semibold text-lg hover:bg-verde-escuro transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-verde/20 hover:shadow-verde/30"
          >
            {enviando ? "Processando inscrição..." : "✍️ Assinar e enviar inscrição"}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Seus dados são protegidos conforme a LGPD e utilizados apenas para fins de associação.
          </p>
        </form>
      </main>
    </div>
  );
}
