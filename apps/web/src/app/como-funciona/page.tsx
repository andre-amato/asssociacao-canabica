import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, UserCheck, Stethoscope, HandHeart } from "lucide-react";

export default function ComoFunciona() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 bg-gradient-to-br from-verde-escuro to-teal text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Como Funciona</h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Entenda o passo a passo para se tornar um associado.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="space-y-12">
              {[
                {
                  icon: FileText,
                  step: "1",
                  title: "Entre em contato",
                  desc: "Preencha o formulário de interesse ou entre em contato pelo WhatsApp. Nossa equipe irá orientá-lo sobre os próximos passos.",
                },
                {
                  icon: UserCheck,
                  step: "2",
                  title: "Envie sua documentação",
                  desc: "Apresente laudo médico com indicação de cannabis medicinal, documento de identidade e comprovante de residência.",
                },
                {
                  icon: Stethoscope,
                  step: "3",
                  title: "Avaliação e orientação",
                  desc: "Nossa equipe multidisciplinar avalia a documentação e orienta sobre o tratamento mais adequado para seu caso.",
                },
                {
                  icon: HandHeart,
                  step: "4",
                  title: "Bem-vindo à associação",
                  desc: "Após aprovação, você se torna associado com acesso a todos os serviços, acompanhamento e suporte contínuo.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-verde text-white rounded-full flex items-center justify-center text-xl font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2 text-teal">{item.title}</h3>
                    <p className="text-teal/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-creme rounded-2xl">
              <h3 className="font-semibold text-lg text-teal mb-3">Quem pode participar?</h3>
              <p className="text-teal/70 text-sm leading-relaxed">
                Qualquer paciente com indicação médica para uso de cannabis
                medicinal pode solicitar associação. Aceitamos laudos de
                médicos de qualquer especialidade, desde que contenham a
                indicação terapêutica.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
