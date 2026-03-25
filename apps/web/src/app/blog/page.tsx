import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const posts = [
  {
    slug: "beneficios-cbd",
    title: "Os benefícios do CBD para a saúde",
    excerpt: "Descubra como o canabidiol pode ajudar no tratamento de diversas condições de saúde.",
    date: "2026-03-20",
    tag: "Educação",
  },
  {
    slug: "regulamentacao-brasil",
    title: "Regulamentação da cannabis medicinal no Brasil",
    excerpt: "Entenda o cenário atual da legislação brasileira sobre cannabis medicinal.",
    date: "2026-03-15",
    tag: "Legislação",
  },
  {
    slug: "cannabis-ansiedade",
    title: "Cannabis medicinal no tratamento da ansiedade",
    excerpt: "Estudos mostram resultados promissores no uso de canabinoides para transtornos de ansiedade.",
    date: "2026-03-10",
    tag: "Pesquisa",
  },
];

export default function Blog() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 bg-gradient-to-br from-verde-escuro to-teal text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Artigos, notícias e atualizações sobre cannabis medicinal.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="p-6 rounded-2xl border border-verde/10 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs px-2 py-1 bg-verde/10 text-verde-escuro rounded-full">
                      {post.tag}
                    </span>
                    <span className="text-xs text-teal/40">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-teal mb-2">
                    {post.title}
                  </h2>
                  <p className="text-teal/60 text-sm mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-verde-escuro text-sm font-medium hover:underline"
                  >
                    Ler mais →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
