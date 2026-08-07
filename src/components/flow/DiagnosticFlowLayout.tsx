import type { ReactNode } from "react";
import { Brand } from "../Brand";
import { DiagnosticSidebar } from "./DiagnosticSidebar";
import { StepIndicator } from "./StepIndicator";
import { LegalNotice } from "../legal/LegalNotice";

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
          <LegalNotice />
        </div>
      </section>
    </div>
  );
}
