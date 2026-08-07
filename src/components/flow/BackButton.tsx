interface BackButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function BackButton({ onClick, disabled = false }: BackButtonProps) {
  return <button className="back-button" type="button" onClick={onClick} disabled={disabled}>← Voltar</button>;
}
