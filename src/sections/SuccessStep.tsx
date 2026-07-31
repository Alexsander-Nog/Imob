import { Brand } from "../components/Brand";
import { BackButton } from "../components/flow/BackButton";

interface SuccessStepProps { name: string; onBack: () => void }

export function SuccessStep({ name, onBack }: SuccessStepProps) {
  return (
      <div className="success-panel">
        <BackButton onClick={onBack} />
        <Brand variant="dark" />
        <span className="success-icon" aria-hidden="true">✓</span>
        <h1>Recebemos os seus dados<br />com sucesso!</h1>
        <p>Obrigado {name || "Nome"}, por se inscrever.<br />Um especialista da Escala IMOB entrará<br />em contato via WhatsApp.</p>
        <p>Se precisar de atendimento prioritário,<br />clique no botão abaixo e fale com um especialista.</p>
        <a className="whatsapp-button" href="https://wa.me/" target="_blank" rel="noreferrer"><span aria-hidden="true">◉</span> Chamar especialista da Escala IMOB</a>
      </div>
  );
}
