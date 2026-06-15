import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="text-verde" size={22} />
            <span className="font-bold text-white text-lg tracking-tight">CANABICA</span>
          </div>
          <p className="text-sm leading-relaxed">
            Associação de Pacientes. Acesso seguro, responsável e humanizado à cannabis medicinal.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Navegação</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/sobre" className="hover:text-verde transition-colors">Sobre Nós</Link></li>
            <li><Link href="/como-funciona" className="hover:text-verde transition-colors">Como Funciona</Link></li>
            <li><Link href="/cannabis-medicinal" className="hover:text-verde transition-colors">Cannabis Medicinal</Link></li>
            <li><Link href="/servicos" className="hover:text-verde transition-colors">Serviços</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Associado</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/inscricao" className="hover:text-verde transition-colors">Inscrição</Link></li>
            <li><Link href="/area-do-associado" className="hover:text-verde transition-colors">Área do Associado</Link></li>
            <li><Link href="/contato" className="hover:text-verde transition-colors">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Contato</h4>
          <ul className="space-y-2 text-sm">
            <li>contato@canabica.org.br</li>
            <li>São Paulo, SP</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-5 text-xs text-gray-500">
        © {new Date().getFullYear()} CANABICA - Associação de Pacientes. CNPJ 54.463.713/0001-10. Todos os direitos reservados.
      </div>
    </footer>
  );
}
