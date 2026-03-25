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
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-verde-escuro to-teal text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-verde rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-dourado rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm mb-6">
                🌿 Associação Fazenda Canábica
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Acesso seguro e humanizado à{" "}
                <span className="text-dourado">cannabis medicinal</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Somos uma entidade dedicada ao acesso responsável à cannabis
                medicinal. Apoiamos pacientes, promovemos informação qualificada
                e fortalecemos a comunidade.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/associe-se"
                  className="px-6 py-3 bg-dourado text-teal font-semibold rounded-full hover:bg-dourado/90 transition-colors inline-flex items-center gap-2"
                >
                  Associe-se agora <ArrowRight size={18} />
                </Link>
                <Link
                  href="/como-funciona"
                  className="px-6 py-3 border border-white/30 rounded-full hover:bg-white/10 transition-colors"
                >
                  Como funciona
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-teal mb-3">
                Por que se associar?
              </h2>
              <p className="text-teal/60 max-w-xl mx-auto">
                Benefícios exclusivos para quem faz parte da nossa comunidade.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  desc: "Faça parte de uma rede de apoio com outros pacientes e especialistas.",
                },
                {
                  icon: BookOpen,
                  title: "Educação",
                  desc: "Workshops, palestras e conteúdo educativo sobre cannabis medicinal.",
                },
                {
                  icon: Scale,
                  title: "Suporte Jurídico",
                  desc: "Assistência jurídica especializada para questões relacionadas ao tratamento.",
                },
                {
                  icon: Sprout,
                  title: "Cultivo Coletivo",
                  desc: "Acesso ao programa de cultivo associativo com acompanhamento técnico.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl border border-verde/10 hover:shadow-lg hover:border-verde/30 transition-all group"
                >
                  <div className="w-12 h-12 bg-verde/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-verde/20 transition-colors">
                    <item.icon className="text-verde-escuro" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-teal/60 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section className="py-20 bg-creme">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-teal mb-3">
                Como funciona
              </h2>
              <p className="text-teal/60 max-w-xl mx-auto">
                Um processo simples e transparente para você começar seu
                tratamento.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Contato",
                  desc: "Entre em contato conosco pelo formulário ou WhatsApp.",
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
                  title: "Associação",
                  desc: "Bem-vindo! Comece seu acompanhamento com nossa equipe.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 bg-verde text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-teal/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cannabis Medicinal */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-teal mb-4">
                  Cannabis Medicinal
                </h2>
                <p className="text-teal/70 leading-relaxed mb-6">
                  A cannabis medicinal é uma ferramenta terapêutica reconhecida
                  mundialmente. Trabalhamos para orientar pacientes sobre usos,
                  evidências e segurança do tratamento.
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
                    <li key={item} className="flex items-center gap-2 text-sm text-teal/80">
                      <CheckCircle size={18} className="text-verde shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-verde/10 to-dourado/10 rounded-3xl p-12 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl">🌱</span>
                  <p className="mt-4 text-teal/60 text-sm">
                    Tratamento natural e baseado em evidências
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-verde-escuro to-teal text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar seu tratamento?
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Junte-se a centenas de pacientes que já encontraram qualidade de
              vida através da cannabis medicinal.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/associe-se"
                className="px-8 py-3 bg-dourado text-teal font-semibold rounded-full hover:bg-dourado/90 transition-colors inline-flex items-center gap-2"
              >
                Quero me associar <ArrowRight size={18} />
              </Link>
              <Link
                href="/contato"
                className="px-8 py-3 border border-white/30 rounded-full hover:bg-white/10 transition-colors"
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
