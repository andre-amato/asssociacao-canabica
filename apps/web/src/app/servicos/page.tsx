import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Scale, BookOpen, Sprout, Stethoscope, MessageCircle } from "lucide-react";

const servicos = [
  {
    icon: Stethoscope,
    title: "Acompanhamento Médico",
    desc: "Orientação e acompanhamento com profissionais especializados em cannabis medicinal.",
  },
  {
    icon: Heart,
    title: "Atendimento Humanizado",
    desc: "Acolhimento e suporte emocional durante todo o processo de tratamento.",
  },
  {
    icon: Scale,
    title: "Suporte Jurídico",
    desc: "Assistência legal para garantir seus direitos como paciente de cannabis medicinal.",
  },
  {
    icon: BookOpen,
    title: "Educação e Workshops",
    desc: "Eventos educativos, palestras e workshops sobre cannabis medicinal e saúde.",
  },
  {
    icon: Sprout,
    title: "Cultivo Coletivo",
    desc: "Programa de cultivo associativo com acompanhamento técnico especializado.",
  },
  {
    icon: MessageCircle,
    title: "Comunidade de Apoio",
    desc: "Rede de apoio entre pacientes para troca de experiências e suporte mútuo.",
  },
];

export default function Servicos() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 bg-gradient-to-br from-verde-escuro to-teal text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Serviços</h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Conheça tudo que oferecemos aos nossos associados.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {servicos.map((s) => (
                <div
                  key={s.title}
                  className="p-6 rounded-2xl border border-verde/10 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-verde/10 rounded-xl flex items-center justify-center mb-4">
                    <s.icon className="text-verde-escuro" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-teal">{s.title}</h3>
                  <p className="text-teal/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
