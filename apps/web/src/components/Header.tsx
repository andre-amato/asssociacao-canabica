"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Leaf } from "lucide-react";

const links = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/como-funciona", label: "Como Funciona" },
  { href: "/cannabis-medicinal", label: "Cannabis Medicinal" },
  { href: "/servicos", label: "Serviços" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Leaf className="text-verde group-hover:rotate-12 transition-transform" size={26} />
          <span className="font-bold text-teal text-lg tracking-tight">CANABICA</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm text-gray-600 hover:text-verde-escuro hover:bg-verde/5 rounded-lg transition-all"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/inscricao"
            className="ml-3 px-5 py-2 bg-verde text-white rounded-full text-sm font-medium hover:bg-verde-escuro transition-colors shadow-sm shadow-verde/20"
          >
            Associe-se
          </Link>
        </nav>

        <button
          className="md:hidden text-teal p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 shadow-lg">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 text-sm text-gray-600 hover:text-verde-escuro border-b border-gray-50"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/inscricao"
            className="mt-3 block text-center px-4 py-3 bg-verde text-white rounded-xl text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Associe-se
          </Link>
        </nav>
      )}
    </header>
  );
}
