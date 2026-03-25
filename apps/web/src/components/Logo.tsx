import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textColor?: string;
}

export default function Logo({
  size = 40,
  className = "",
  showText = true,
  textColor = "text-verde-escuro",
}: LogoProps) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logo.svg"
        alt="Fazenda Canábica"
        width={size}
        height={size}
        className="shrink-0"
      />
      {showText && (
        <span className={`font-bold tracking-tight leading-tight ${textColor}`}>
          <span className="block text-xs opacity-60">Associação</span>
          <span className="block text-sm">Fazenda Canábica</span>
        </span>
      )}
    </span>
  );
}
