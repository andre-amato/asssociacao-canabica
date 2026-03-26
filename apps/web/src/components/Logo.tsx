import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({
  size = 40,
  className = "",
}: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Associação Fazenda Canábica"
      width={size}
      height={Math.round(size * 1.1)}
      className={`shrink-0 ${className}`}
    />
  );
}
