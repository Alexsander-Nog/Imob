import type { DiagnosticData } from "../../types/diagnostic";

export interface StepOption {
  value: string;
  label: string;
}

export interface RemainingStepConfig {
  currentStep: number;
  percentage?: number;
  eyebrow: string;
  title: string;
  field: keyof Pick<DiagnosticData, "marketArea" | "instagram" | "location" | "mainGoal" | "priority">;
  fieldType: "text" | "select";
  placeholder: string;
  errorMessage: string;
  options?: StepOption[];
}

export const remainingSteps: RemainingStepConfig[] = [
  {
    currentStep: 4, eyebrow: "Vamos entender a sua atuação...", title: "Em qual área do mercado você atua?",
    field: "marketArea", fieldType: "select", placeholder: "Selecione o tipo de atuação", errorMessage: "Selecione sua área de atuação.",
    options: [
      { value: "autonomous", label: "Corretor autônomo" }, { value: "associated", label: "Corretor associado a imobiliária" },
      { value: "agency", label: "Imobiliária" }, { value: "developer", label: "Incorporadora" },
      { value: "builder", label: "Construtora" }, { value: "other", label: "Outra" },
    ],
  },
  {
    currentStep: 5, eyebrow: "Agora me conta...", title: "Qual é o seu perfil do instagram?",
    field: "instagram", fieldType: "text", placeholder: "Digite aqui o @usuário", errorMessage: "Informe seu perfil do Instagram.",
  },
  {
    currentStep: 6, eyebrow: "Estamos nos últimos detalhes...", title: "Cidade e estado de atuação?",
    field: "location", fieldType: "text", placeholder: "Ex.: Tubarão, SC", errorMessage: "Informe sua cidade e estado de atuação.",
  },
  {
    currentStep: 8, percentage: 80, eyebrow: "Vamos focar no essencial...", title: "Qual objetivo você quer alcançar?",
    field: "mainGoal", fieldType: "select", placeholder: "Selecione...", errorMessage: "Selecione o objetivo que deseja alcançar.",
    options: [
      { value: "portfolio", label: "Aumentar a carteira de imóveis" }, { value: "clients", label: "Atrair mais clientes" },
      { value: "digital", label: "Melhorar a presença digital" }, { value: "sales", label: "Alavancar vendas" },
      { value: "revenue", label: "Aumentar o VGV mensal" }, { value: "all", label: "Todas as opções acima" },
    ],
  },
  {
    currentStep: 8, percentage: 100, eyebrow: "Para fechar, me conta...", title: "Qual é a urgência de alcançar esse(s) objetivo(s)?",
    field: "priority", fieldType: "select", placeholder: "Selecione a prioridade", errorMessage: "Selecione a prioridade do seu objetivo.",
    options: [
      { value: "high", label: "Prioridade Alta: Preciso resolver logo" },
      { value: "medium", label: "Prioridade Média: A outras prioridades no momento" },
      { value: "low", label: "Prioridade Baixa: Estou apenas explorando" },
    ],
  },
];
