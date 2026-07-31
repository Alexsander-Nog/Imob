import brandLogo from "../assets/brand/escala-imob-white.png";

interface BrandProps {
  variant?: "light" | "dark";
}

export function Brand({ variant = "light" }: BrandProps) {
  return (
    <a className={`brand brand--${variant}`} href="#inicio" aria-label="Escala IMOB — início">
      <img className="brand__image" src={brandLogo} alt="" />
    </a>
  );
}
