"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";
import { CheckCircle, Eraser } from "lucide-react";
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
  // Responsável legal
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
          body: JSON.stringify({
            ...form,
            assinaturaBase64,
          }),
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
      <>
        <Header />
        <main>
          <section className="py-20 bg-gradient-to-br from-verde-escuro to-teal text-white">
            <div className="max-w-7xl mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Inscrição</h1>
            </div>
          </section>
          <section className="py-20 bg-white">
            <div className="max-w-md mx-auto px-4 text-center">
              <div className="w-16 h-16 bg-verde/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-verde" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-teal mb-3">
                Inscrição realizada com sucesso!
              </h2>
              <p className="text-teal/60 mb-6">
                Seus documentos foram gerados e assinados. Você receberá uma
                cópia por e-mail com a Autorização de Ajuizamento e a Ficha de
                Inscrição.
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
        <section className="py-16 bg-gradient-to-br from-verde-escuro to-teal text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Ficha de Inscrição</h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Preencha todos os campos abaixo e assine eletronicamente para
              formalizar sua inscrição na CANABICA - Associação de Pacientes.
            </p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-2xl mx-auto px-4">
            {erro && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {erro}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Dados pessoais do paciente/associado */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-teal mb-2">
                  Dados pessoais do(a) paciente / associado(a)
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-teal mb-1">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nomeCompleto}
                      onChange={(e) => updateField("nomeCompleto", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal mb-1">
                      Estado civil *
                    </label>
                    <select
                      required
                      value={form.estadoCivil}
                      onChange={(e) => updateField("estadoCivil", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    >
                      <option value="">Selecione</option>
                      <option value="Solteiro(a)">Solteiro(a)</option>
                      <option value="Casado(a)">Casado(a)</option>
                      <option value="Divorciado(a)">Divorciado(a)</option>
                      <option value="Viúvo(a)">Viúvo(a)</option>
                      <option value="União Estável">União Estável</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal mb-1">
                      Nacionalidade *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nacionalidade}
                      onChange={(e) => updateField("nacionalidade", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal mb-1">
                      Data de nascimento *
                    </label>
                    <input
                      type="date"
                      required
                      value={form.dataNascimento}
                      onChange={(e) => updateField("dataNascimento", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal mb-1">
                      Profissão *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.profissao}
                      onChange={(e) => updateField("profissao", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal mb-1">
                      RG *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.rg}
                      onChange={(e) => updateField("rg", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal mb-1">
                      CPF *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="000.000.000-00"
                      value={form.cpf}
                      onChange={(e) => updateField("cpf", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-teal mb-1">
                      Endereço *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Rua, número"
                      value={form.endereco}
                      onChange={(e) => updateField("endereco", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal mb-1">
                      Complemento
                    </label>
                    <input
                      type="text"
                      value={form.complemento}
                      onChange={(e) => updateField("complemento", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal mb-1">
                      Bairro *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.bairro}
                      onChange={(e) => updateField("bairro", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal mb-1">
                      Cidade *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.cidade}
                      onChange={(e) => updateField("cidade", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal mb-1">
                      CEP *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="00000-000"
                      value={form.cep}
                      onChange={(e) => updateField("cep", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal mb-1">
                      Estado *
                    </label>
                    <select
                      required
                      value={form.estado}
                      onChange={(e) => updateField("estado", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    >
                      <option value="">Selecione</option>
                      {estadosBrasileiros.map((uf) => (
                        <option key={uf} value={uf}>
                          {uf}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal mb-1">
                      Telefone Residencial
                    </label>
                    <input
                      type="tel"
                      placeholder="(00) 0000-0000"
                      value={form.telefoneResidencial}
                      onChange={(e) => updateField("telefoneResidencial", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal mb-1">
                      Celular *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(00) 00000-0000"
                      value={form.celular}
                      onChange={(e) => updateField("celular", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-teal mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seu@email.com"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-teal mb-1">
                      Confirme seu e-mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="digite o e-mail novamente"
                      value={emailConfirmacao}
                      onChange={(e) => setEmailConfirmacao(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none bg-creme/50 ${
                        emailConfirmacao && emailConfirmacao !== form.email
                          ? "border-red-400 focus:border-red-500"
                          : "border-verde/20 focus:border-verde"
                      }`}
                    />
                    {emailConfirmacao && emailConfirmacao !== form.email && (
                      <p className="text-red-500 text-xs mt-1">Os e-mails não coincidem.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal mb-1">
                      Patologia *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.patologia}
                      onChange={(e) => updateField("patologia", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal mb-1">
                      CID
                    </label>
                    <input
                      type="text"
                      value={form.cid}
                      onChange={(e) => updateField("cid", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Responsável Legal */}
              <fieldset className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="temResponsavel"
                    checked={mostrarResponsavel}
                    onChange={(e) => setMostrarResponsavel(e.target.checked)}
                    className="w-4 h-4 rounded border-verde/20 text-verde focus:ring-verde"
                  />
                  <label
                    htmlFor="temResponsavel"
                    className="text-sm font-medium text-teal"
                  >
                    Paciente é menor de idade ou incapaz (preencher dados do
                    Responsável Legal)
                  </label>
                </div>

                {mostrarResponsavel && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-verde/10">
                    <legend className="md:col-span-2 text-base font-bold text-teal">
                      Dados do Responsável Legal
                    </legend>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-teal mb-1">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        value={form.responsavelNome}
                        onChange={(e) => updateField("responsavelNome", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal mb-1">
                        Estado civil
                      </label>
                      <select
                        value={form.responsavelEstadoCivil}
                        onChange={(e) => updateField("responsavelEstadoCivil", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                      >
                        <option value="">Selecione</option>
                        <option value="Solteiro(a)">Solteiro(a)</option>
                        <option value="Casado(a)">Casado(a)</option>
                        <option value="Divorciado(a)">Divorciado(a)</option>
                        <option value="Viúvo(a)">Viúvo(a)</option>
                        <option value="União Estável">União Estável</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal mb-1">
                        Nacionalidade
                      </label>
                      <input
                        type="text"
                        value={form.responsavelNacionalidade}
                        onChange={(e) => updateField("responsavelNacionalidade", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal mb-1">
                        Profissão
                      </label>
                      <input
                        type="text"
                        value={form.responsavelProfissao}
                        onChange={(e) => updateField("responsavelProfissao", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal mb-1">
                        RG
                      </label>
                      <input
                        type="text"
                        value={form.responsavelRg}
                        onChange={(e) => updateField("responsavelRg", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal mb-1">
                        CPF
                      </label>
                      <input
                        type="text"
                        value={form.responsavelCpf}
                        onChange={(e) => updateField("responsavelCpf", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal mb-1">
                        Data de nascimento
                      </label>
                      <input
                        type="date"
                        value={form.responsavelDataNascimento}
                        onChange={(e) => updateField("responsavelDataNascimento", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-teal mb-1">
                        Endereço
                      </label>
                      <input
                        type="text"
                        value={form.responsavelEndereco}
                        onChange={(e) => updateField("responsavelEndereco", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal mb-1">
                        Complemento
                      </label>
                      <input
                        type="text"
                        value={form.responsavelComplemento}
                        onChange={(e) => updateField("responsavelComplemento", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal mb-1">
                        Bairro
                      </label>
                      <input
                        type="text"
                        value={form.responsavelBairro}
                        onChange={(e) => updateField("responsavelBairro", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal mb-1">
                        Cidade
                      </label>
                      <input
                        type="text"
                        value={form.responsavelCidade}
                        onChange={(e) => updateField("responsavelCidade", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal mb-1">
                        CEP
                      </label>
                      <input
                        type="text"
                        value={form.responsavelCep}
                        onChange={(e) => updateField("responsavelCep", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal mb-1">
                        Estado
                      </label>
                      <select
                        value={form.responsavelEstado}
                        onChange={(e) => updateField("responsavelEstado", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                      >
                        <option value="">Selecione</option>
                        {estadosBrasileiros.map((uf) => (
                          <option key={uf} value={uf}>
                            {uf}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal mb-1">
                        Telefone Residencial
                      </label>
                      <input
                        type="tel"
                        value={form.responsavelTelefoneResidencial}
                        onChange={(e) => updateField("responsavelTelefoneResidencial", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal mb-1">
                        Celular
                      </label>
                      <input
                        type="tel"
                        value={form.responsavelCelular}
                        onChange={(e) => updateField("responsavelCelular", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-teal mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={form.responsavelEmail}
                        onChange={(e) => updateField("responsavelEmail", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-verde/20 focus:outline-none focus:border-verde bg-creme/50"
                      />
                    </div>
                  </div>
                )}
              </fieldset>

              {/* Assinatura */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-teal mb-2">
                  Assinatura Eletrônica
                </legend>
                <p className="text-sm text-teal/60 mb-2">
                  Assine com o dedo (celular) ou mouse (computador) no campo
                  abaixo. Esta assinatura será incluída nos documentos gerados.
                </p>

                <div className="border-2 border-verde/30 rounded-xl overflow-hidden bg-white">
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
                  className="flex items-center gap-2 text-sm text-teal/60 hover:text-teal transition-colors"
                >
                  <Eraser size={16} />
                  Limpar assinatura
                </button>
              </fieldset>

              {/* Info legal */}
              <div className="p-4 bg-creme rounded-xl text-xs text-teal/60 space-y-2">
                <p>
                  <strong>Ao enviar este formulário, declaro que:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Autorizo e concordo com o ajuizamento de toda e qualquer
                    medida judicial ou administrativa perante a União Federal, a
                    Anvisa e/ou qualquer outra pessoa jurídica de direito público
                    para reconhecimento do direito ao cultivo de Cannabis sp. para
                    finalidade medicinal.
                  </li>
                  <li>
                    Venho requerer minha inscrição como associado(a) da CANABICA -
                    ASSOCIAÇÃO DE PACIENTES, CNPJ nº 54.463.713/0001-10.
                  </li>
                  <li>
                    Minha assinatura eletrônica tem validade jurídica nos termos da
                    Lei 14.063/2020 (assinatura eletrônica simples).
                  </li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={enviando}
                className="w-full py-4 bg-verde text-white rounded-xl font-medium text-lg hover:bg-verde-escuro transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {enviando
                  ? "Processando inscrição..."
                  : "Assinar e enviar inscrição"}
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
