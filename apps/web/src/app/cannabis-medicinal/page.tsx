import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

const condicoes = [
  "Dor crônica",
  "Fibromialgia",
  "Epilepsia",
  "Ansiedade",
  "Depressão",
  "Esclerose múltipla",
  "Parkinson",
  "Alzheimer",
  "Insônia",
  "Autismo (TEA)",
  "TDAH",
  "Artrite reumatoide",
];

export default function CannabisMedicinal() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 bg-gradient-to-br from-verde-escuro to-teal text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cannabis Medicinal</h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Informação qualificada sobre o uso terapêutico da cannabis.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-teal mb-4">O que é?</h2>
            <p className="text-teal/70 leading-relaxed mb-8">
              A cannabis medicinal utiliza compostos da planta Cannabis sativa,
              como o CBD (canabidiol) e o THC (tetrahidrocanabinol), para fins
              terapêuticos. Esses compostos interagem com o sistema
              endocanabinoide do corpo humano, regulando funções como dor,
              humor, sono e apetite.
            </p>

            <h2 className="text-2xl font-bold text-teal mb-4">Condições tratáveis</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
              {condicoes.map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm text-teal/80">
                  <CheckCircle size={16} className="text-verde shrink-0" />
                  {c}
                </div>
              ))}
            </div>

            <div className="p-8 bg-creme rounded-2xl">
              <h3 className="font-semibold text-lg text-teal mb-3">
                Base científica
              </h3>
              <p className="text-teal/70 text-sm leading-relaxed">
                Diversos estudos científicos publicados em revistas
                internacionais comprovam a eficácia da cannabis medicinal para
                diversas condições. A OMS reconhece o potencial terapêutico dos
                canabinoides, e a ANVISA regulamenta seu uso no Brasil.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
