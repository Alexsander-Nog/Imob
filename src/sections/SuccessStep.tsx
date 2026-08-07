import { Brand } from "../components/Brand";
import { BackButton } from "../components/flow/BackButton";

interface SuccessStepProps { name: string; onBack: () => void }

const SPECIALIST_WHATSAPP = "554899957901";

function buildSpecialistWhatsappUrl(name: string): string {
  const message = [
    "Olá! Acabei de preencher o Diagnóstico Escala IMOB e gostaria de dar continuidade ao meu atendimento.",
    `Meu nome é ${name.trim() || "Nome"}. Podemos conversar?`,
  ].join("\n");

  return `https://wa.me/${SPECIALIST_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function SuccessStep({ name, onBack }: SuccessStepProps) {
  return (
      <div className="success-panel">
        <BackButton onClick={onBack} />
        <Brand variant="dark" />
        <span className="success-icon" aria-hidden="true">✓</span>
        <h1>Recebemos os seus dados<br />com sucesso!</h1>
        <p>Obrigado {name || "Nome"}, por se inscrever.<br />Um especialista da Escala IMOB entrará<br />em contato via WhatsApp.</p>
        <p>Se precisar de atendimento prioritário,<br />clique no botão abaixo e fale com um especialista.</p>
        <a className="whatsapp-button" href={buildSpecialistWhatsappUrl(name)} target="_blank" rel="noreferrer"><span aria-hidden="true">◉</span> Chamar especialista da Escala IMOB</a>
      </div>
  );
}
