import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-teal text-white/80">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Logo size={56} className="mb-3" />
          <p className="text-sm leading-relaxed">
            Acesso seguro, responsável e humanizado à cannabis medicinal.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/sobre" className="hover:text-verde transition-colors">Sobre Nós</Link></li>
            <li><Link href="/como-funciona" className="hover:text-verde transition-colors">Como Funciona</Link></li>
            <li><Link href="/cannabis-medicinal" className="hover:text-verde transition-colors">Cannabis Medicinal</Link></li>
            <li><Link href="/servicos" className="hover:text-verde transition-colors">Serviços</Link></li>
            <li><Link href="/blog" className="hover:text-verde transition-colors">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Contato</h4>
          <ul className="space-y-1 text-sm">
            <li>contato@fazendacanabica.org.br</li>
            <li>(00) 00000-0000</li>
            <li>São Paulo, SP</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-xs text-white/50">
        © {new Date().getFullYear()} Associação Fazenda Canábica. Todos os direitos reservados.
      </div>
    </footer>
  );
}
