import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { BackButton } from "../components/flow/BackButton";
import { DiagnosticFlowLayout } from "../components/flow/DiagnosticFlowLayout";
import { DiagnosticSidebar } from "../components/flow/DiagnosticSidebar";
import { PrimaryButton } from "../components/PrimaryButton";
import { remainingSteps } from "../features/diagnostic/remainingSteps";
import type { RemainingStepConfig } from "../features/diagnostic/remainingSteps";
import { DiagnosticApiError, submitDiagnostic } from "../services/diagnosticApi";
import type { DiagnosticData, DiagnosticSubmissionPayload } from "../types/diagnostic";
import { SuccessStep } from "./SuccessStep";

const initialData: DiagnosticData = {
  name: "", whatsapp: "", email: "", marketArea: "", instagram: "", location: "", mainGoal: "", priority: "",
};

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildSubmissionPayload(data: DiagnosticData): DiagnosticSubmissionPayload | null {
  if (!data.marketArea || !data.mainGoal || !data.priority) return null;

  return {
    name: data.name.trim(),
    whatsapp: data.whatsapp,
    email: data.email.trim().toLowerCase(),
    marketArea: data.marketArea,
    instagram: data.instagram.trim(),
    location: data.location.trim(),
    mainGoal: data.mainGoal,
    priority: data.priority,
    source: "escala-imob-diagnostico",
  };
}

export function DiagnosticCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [data, setData] = useState<DiagnosticData>(initialData);
  const [error, setError] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fieldRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  const goBack = (): void => {
    if (isSubmitting) return;
    setError("");
    setSubmissionError("");
    setCurrentSlide((current) => Math.max(0, current - 1));
  };
  const goNext = (): void => {
    setError("");
    setSubmissionError("");
    setCurrentSlide((current) => Math.min(8, current + 1));
  };

  const actions = (onBack: () => void, submitting = false) => (
    <div className="question__actions">
      <BackButton onClick={onBack} disabled={submitting} />
      <PrimaryButton type="submit" className="question__submit" disabled={submitting} aria-busy={submitting}>
        {submitting ? "Enviando..." : "Prosseguir"} {!submitting && <span aria-hidden="true">→</span>}
      </PrimaryButton>
    </div>
  );

  function submitName(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const name = data.name.trim();
    if (name.length < 2) return showError("Informe seu nome para prosseguir.");
    setData((current) => ({ ...current, name }));
    goNext();
  }

  function submitWhatsApp(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (data.whatsapp.replace(/\D/g, "").length < 10) return showError("Informe um WhatsApp válido com DDD.");
    goNext();
  }

  function submitEmail(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!emailPattern.test(data.email.trim())) return showError("Informe um e-mail válido.");
    setData((current) => ({ ...current, email: current.email.trim().toLowerCase() }));
    goNext();
  }

  function showError(message: string): void {
    setSubmissionError("");
    setError(message);
    fieldRef.current?.focus();
  }

  async function sendDiagnostic(): Promise<void> {
    const payload = buildSubmissionPayload(data);

    if (!payload) {
      showError("Revise as respostas anteriores antes de finalizar.");
      return;
    }

    setError("");
    setSubmissionError("");
    setIsSubmitting(true);

    try {
      await submitDiagnostic(payload);
      setCurrentSlide(8);
    } catch (apiError) {
      const message = apiError instanceof DiagnosticApiError
        ? apiError.message
        : "Não foi possível enviar seus dados. Tente novamente.";
      setSubmissionError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function submitConfigured(event: FormEvent<HTMLFormElement>, config: RemainingStepConfig): Promise<void> {
    event.preventDefault();
    if (isSubmitting) return;

    const value = data[config.field].trim();
    const minimum = config.field === "instagram" ? 2 : 3;
    if (!value || (config.fieldType === "text" && value.length < minimum)) return showError(config.errorMessage);

    if (config.field === "priority") {
      await sendDiagnostic();
      return;
    }

    goNext();
  }

  const changeField = (field: keyof DiagnosticData) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setData((current) => ({ ...current, [field]: event.target.value }));
    setError("");
    setSubmissionError("");
  };

  let slideContent;
  if (currentSlide === 0) {
    slideContent = (
      <DiagnosticFlowLayout currentStep={1}>
        <form onSubmit={submitName} noValidate>
          <div className="question carousel-slide">
            <p>Responda algumas perguntas para entendermos seu momento como corretor.</p>
            <h1>Qual é o seu nome?</h1>
            <label className="sr-only" htmlFor="name">Nome</label>
            <input ref={fieldRef as React.RefObject<HTMLInputElement>} id="name" name="name" type="text" autoComplete="name" placeholder="Digite seu nome aqui" value={data.name} aria-invalid={Boolean(error)} aria-describedby={error ? "carousel-error" : undefined} onChange={changeField("name")} />
            {error && <span className="field-error" id="carousel-error" role="alert">{error}</span>}
            <div className="question__actions question__actions--first">
              <PrimaryButton type="submit" className="question__submit">Prosseguir <span aria-hidden="true">→</span></PrimaryButton>
            </div>
          </div>
        </form>
      </DiagnosticFlowLayout>
    );
  } else if (currentSlide === 1) {
    slideContent = (
      <DiagnosticFlowLayout currentStep={2}>
        <form onSubmit={submitWhatsApp} noValidate>
          <div className="question carousel-slide">
            <p>Prazer, {data.name || "Nome"}!</p><h1>Qual é o seu WhatsApp?</h1>
            <label className="sr-only" htmlFor="whatsapp">WhatsApp com DDD</label>
            <div className={`phone-field${error ? " phone-field--error" : ""}`}>
              <span className="phone-field__prefix" aria-hidden="true"><small>BR</small> +55</span>
              <input ref={fieldRef as React.RefObject<HTMLInputElement>} id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(00) 00000-0000" value={data.whatsapp} aria-invalid={Boolean(error)} aria-describedby={error ? "carousel-error" : undefined} onChange={(event) => { setData((current) => ({ ...current, whatsapp: formatPhone(event.target.value) })); setError(""); setSubmissionError(""); }} />
            </div>
            {error && <span className="field-error" id="carousel-error" role="alert">{error}</span>}
            {actions(goBack)}
          </div>
        </form>
      </DiagnosticFlowLayout>
    );
  } else if (currentSlide === 2) {
    slideContent = (
      <DiagnosticFlowLayout currentStep={3}>
        <form onSubmit={submitEmail} noValidate>
          <div className="question carousel-slide">
            <p>Registrado, {data.name || "Nome"}!</p><h1>Qual é o seu e-mail?</h1>
            <label className="sr-only" htmlFor="email">E-mail</label>
            <input ref={fieldRef as React.RefObject<HTMLInputElement>} id="email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="Digite o seu e-mail" value={data.email} aria-invalid={Boolean(error)} aria-describedby={error ? "carousel-error" : undefined} onChange={changeField("email")} />
            {error && <span className="field-error" id="carousel-error" role="alert">{error}</span>}
            {actions(goBack)}
          </div>
        </form>
      </DiagnosticFlowLayout>
    );
  } else if (currentSlide < 8) {
    const config = remainingSteps[currentSlide - 3];
    slideContent = (
      <DiagnosticFlowLayout currentStep={config.currentStep} percentage={config.percentage}>
        <form onSubmit={(event) => void submitConfigured(event, config)} noValidate aria-busy={isSubmitting}>
          <div className="question carousel-slide">
            <p>{config.eyebrow}</p><h1>{config.title}</h1>
            <label className="sr-only" htmlFor={config.field}>{config.title}</label>
            {config.fieldType === "select" ? (
              <select ref={fieldRef as React.RefObject<HTMLSelectElement>} id={config.field} name={config.field} value={data[config.field]} disabled={isSubmitting} aria-invalid={Boolean(error)} aria-describedby={error ? "carousel-error" : undefined} onChange={changeField(config.field)}>
                <option value="">{config.placeholder}</option>{config.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            ) : <input ref={fieldRef as React.RefObject<HTMLInputElement>} id={config.field} name={config.field} type="text" autoComplete="off" placeholder={config.placeholder} value={data[config.field]} disabled={isSubmitting} aria-invalid={Boolean(error)} aria-describedby={error ? "carousel-error" : undefined} onChange={changeField(config.field)} />}
            {error && <span className="field-error" id="carousel-error" role="alert">{error}</span>}
            {submissionError && <span className="submission-error" role="alert">{submissionError}</span>}
            {actions(goBack, isSubmitting)}
          </div>
        </form>
      </DiagnosticFlowLayout>
    );
  } else {
    slideContent = <div className="diagnostic diagnostic--success"><DiagnosticSidebar /><SuccessStep name={data.name} onBack={goBack} /></div>;
  }

  return (
    <section id="diagnostico-interativo" className="diagnostic-carousel" aria-roledescription="carrossel" aria-label="Diagnóstico interativo" data-current-slide={currentSlide + 1}>
      <span className="sr-only" aria-live="polite">Slide {currentSlide + 1} de 9</span>
      <div className="carousel-stage" key={currentSlide}>{slideContent}</div>
    </section>
  );
}
