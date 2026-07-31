interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  percentage?: number;
}

export function StepIndicator({ currentStep, totalSteps, percentage: percentageOverride }: StepIndicatorProps) {
  const percentage = percentageOverride ?? Math.round((currentStep / totalSteps) * 100);

  return (
    <div aria-label={`Progresso: etapa ${currentStep} de ${totalSteps}`}>
      <div className="progress">
        <span className="progress__fill" style={{ width: `${percentage}%` }} />
      </div>
      <div className="progress__labels">
        <span>Etapa {currentStep} de {totalSteps}</span>
        <span>{percentage}%</span>
      </div>
    </div>
  );
}
