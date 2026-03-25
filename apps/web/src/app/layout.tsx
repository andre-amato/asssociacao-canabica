import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Associação Fazenda Canábica",
  description:
    "Acesso seguro, responsável e humanizado à cannabis medicinal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-creme text-teal font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
