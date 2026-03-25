"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre Nós" },
  { href: "/como-funciona", label: "Como Funciona" },
  { href: "/cannabis-medicinal", label: "Cannabis Medicinal" },
  { href: "/servicos", label: "Serviços" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-verde/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={38} />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-teal hover:text-verde-escuro transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/associe-se"
            className="ml-2 px-4 py-2 bg-verde text-white rounded-full text-sm font-medium hover:bg-verde-escuro transition-colors"
          >
            Associe-se
          </Link>
        </nav>

        <button
          className="md:hidden text-teal"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-white border-t border-verde/10 px-4 pb-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2 text-sm text-teal hover:text-verde-escuro"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/associe-se"
            className="mt-2 block text-center px-4 py-2 bg-verde text-white rounded-full text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Associe-se
          </Link>
        </nav>
      )}
    </header>
  );
}
