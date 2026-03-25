import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, Eye, Heart } from "lucide-react";

export default function Sobre() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 bg-gradient-to-br from-verde-escuro to-teal text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Nós</h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Conheça a história, missão e valores da Associação Fazenda
              Canábica.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-teal mb-4">Nossa História</h2>
            <p className="text-teal/70 leading-relaxed mb-8">
              A Associação Fazenda Canábica nasceu da necessidade de oferecer
              acesso seguro e humanizado à cannabis medicinal. Fundada por
              pacientes e profissionais de saúde, nossa associação atua com
              transparência e compromisso ético, sempre priorizando o bem-estar
              dos nossos associados.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: Target,
                  title: "Missão",
                  desc: "Democratizar o acesso à cannabis medicinal com segurança, transparência e respeito.",
                },
                {
                  icon: Eye,
                  title: "Visão",
                  desc: "Ser referência nacional em associativismo canábico, promovendo saúde e qualidade de vida.",
                },
                {
                  icon: Heart,
                  title: "Valores",
                  desc: "Ética, responsabilidade social, acolhimento, transparência e compromisso com a saúde.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl border border-verde/10 text-center"
                >
                  <div className="w-12 h-12 bg-verde/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="text-verde-escuro" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-teal/60 text-sm">{item.desc}</p>
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
