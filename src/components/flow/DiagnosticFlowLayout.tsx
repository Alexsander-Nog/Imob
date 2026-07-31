import type { ReactNode } from "react";
import { Brand } from "../Brand";
import { DiagnosticSidebar } from "./DiagnosticSidebar";
import { StepIndicator } from "./StepIndicator";

interface DiagnosticFlowLayoutProps {
  children: ReactNode;
  currentStep: number;
  percentage?: number;
}

export function DiagnosticFlowLayout({ children, currentStep, percentage }: DiagnosticFlowLayoutProps) {
  return (
    <div className="diagnostic diagnostic--flow">
      <DiagnosticSidebar />
      <section className="diagnostic__form-panel" id="para-quem">
        <div className="diagnostic__form">
          <Brand variant="dark" />
          <StepIndicator currentStep={currentStep} totalSteps={9} percentage={percentage} />
          {children}
          <p className="legal">Ao clicar em Prosseguir você concorda com os termos de uso e a política de privacidade.</p>
        </div>
      </section>
    </div>
  );
}
