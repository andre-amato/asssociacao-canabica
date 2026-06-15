import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Heart,
  Shield,
  Users,
  BookOpen,
  Scale,
  Sprout,
  ArrowRight,
  CheckCircle,
  Leaf,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-verde-escuro via-teal to-verde-escuro text-white">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-96 h-96 bg-verde rounded-full blur-[120px]" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-dourado rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 py-28 md:py-40">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm text-white/80 mb-8">
                <Leaf size={16} className="text-verde" />
                Associação de Pacientes
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6">
                Acesso seguro e humanizado à{" "}
                <span className="text-dourado">cannabis medicinal</span>
              </h1>
              <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-xl">
                Apoiamos pacientes, promovemos informação qualificada
                e garantimos seus direitos ao tratamento com cannabis medicinal.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/inscricao"
                  className="px-7 py-3.5 bg-verde text-white font-semibold rounded-full hover:bg-verde/90 transition-all inline-flex items-center gap-2 shadow-lg shadow-verde/30"
                >
                  Associe-se agora <ArrowRight size={18} />
                </Link>
                <Link
                  href="/como-funciona"
                  className="px-7 py-3.5 border border-white/20 rounded-full hover:bg-white/10 transition-all backdrop-blur"
                >
                  Como funciona
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-verde font-medium text-sm uppercase tracking-wider mb-2">Benefícios</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Por que se associar?
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Benefícios exclusivos para quem faz parte da nossa comunidade de pacientes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Heart,
                  title: "Acompanhamento",
                  desc: "Suporte contínuo durante todo o tratamento com profissionais qualificados.",
                },
                {
                  icon: Shield,
                  title: "Segurança Jurídica",
                  desc: "Orientação legal completa para garantir seus direitos como paciente.",
                },
                {
                  icon: Users,
                  title: "Comunidade",
                  desc: "Rede de apoio com outros pacientes e especialistas da área.",
                },
                {
                  icon: BookOpen,
                  title: "Educação",
                  desc: "Workshops, palestras e conteúdo educativo sobre cannabis medicinal.",
                },
                {
                  icon: Scale,
                  title: "Suporte Jurídico",
                  desc: "Assistência jurídica especializada para questões do tratamento.",
                },
                {
                  icon: Sprout,
                  title: "Cultivo Associativo",
                  desc: "Acesso ao programa de cultivo coletivo com acompanhamento técnico.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl border border-gray-100 hover:border-verde/20 hover:shadow-lg hover:shadow-verde/5 transition-all group"
                >
                  <div className="w-12 h-12 bg-verde/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-verde/15 transition-colors">
                    <item.icon className="text-verde-escuro" size={22} />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-verde font-medium text-sm uppercase tracking-wider mb-2">Processo</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Como funciona
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Um processo simples e transparente para você começar seu tratamento.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Inscrição",
                  desc: "Preencha o formulário online e assine eletronicamente.",
                },
                {
                  step: "02",
                  title: "Documentação",
                  desc: "Envie seu laudo médico e documentos pessoais.",
                },
                {
                  step: "03",
                  title: "Avaliação",
                  desc: "Nossa equipe analisa e orienta sobre o melhor caminho.",
                },
                {
                  step: "04",
                  title: "Bem-vindo!",
                  desc: "Comece seu acompanhamento com nossa equipe.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 bg-verde text-white rounded-2xl flex items-center justify-center text-lg font-bold mx-auto mb-4 shadow-md shadow-verde/20">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cannabis Medicinal */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-verde font-medium text-sm uppercase tracking-wider mb-2">Tratamento</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Cannabis Medicinal
                </h2>
                <p className="text-gray-500 leading-relaxed mb-8">
                  A cannabis medicinal é uma ferramenta terapêutica reconhecida
                  mundialmente. Trabalhamos para orientar pacientes sobre usos,
                  evidências científicas e segurança do tratamento.
                </p>
                <ul className="space-y-3">
                  {[
                    "Dor crônica e fibromialgia",
                    "Epilepsia e convulsões",
                    "Ansiedade e depressão",
                    "Esclerose múltipla",
                    "Insônia e distúrbios do sono",
                    "Autismo (TEA)",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle size={18} className="text-verde shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-verde/5 to-verde-escuro/5 rounded-3xl p-14 flex items-center justify-center border border-verde/10">
                <div className="text-center">
                  <Leaf size={80} className="text-verde/40 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">
                    Tratamento natural e baseado em evidências científicas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-verde-escuro to-teal text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              Pronto para começar seu tratamento?
            </h2>
            <p className="text-white/60 mb-10 text-lg max-w-xl mx-auto">
              Junte-se a centenas de pacientes que já encontraram qualidade de
              vida através da cannabis medicinal.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/inscricao"
                className="px-8 py-3.5 bg-verde text-white font-semibold rounded-full hover:bg-verde/90 transition-all inline-flex items-center gap-2 shadow-lg shadow-verde/30"
              >
                Quero me associar <ArrowRight size={18} />
              </Link>
              <Link
                href="/contato"
                className="px-8 py-3.5 border border-white/20 rounded-full hover:bg-white/10 transition-all"
              >
                Fale conosco
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
