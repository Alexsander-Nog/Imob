import { Hero } from "./sections/Hero";
import { DiagnosticCarousel } from "./sections/DiagnosticCarousel";

export function App() {
  const footerMessage = <>MARCA <span>•</span> AUTORIDADE <span>•</span> TECNOLOGIA <span>•</span> CAPTAÇÃO <span>•</span> PROCESSO COMERCIAL</>;

  return (
    <main>
      <Hero />
      <DiagnosticCarousel />
      <footer className="brand-strip" aria-label="Marca, autoridade, tecnologia, captação e processo comercial">
        <div className="brand-strip__track">
          <span className="brand-strip__group">{footerMessage}</span>
          <span className="brand-strip__group" aria-hidden="true">{footerMessage}</span>
        </div>
      </footer>
    </main>
  );
}
