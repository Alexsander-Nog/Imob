import type { DiagnosticSubmissionPayload } from "../types/diagnostic";

const REQUEST_TIMEOUT_MS = 12_000;

interface SubmitDiagnosticSuccessResponse {
  success: true;
  data: {
    submissionId: string;
    submittedAt: string;
  };
}

interface ApiErrorPayload {
  success?: false;
  error?: {
    code?: string;
    message?: string;
  };
}

export interface SubmitDiagnosticResult {
  submissionId: string;
  submittedAt: string;
}

export class DiagnosticApiError extends Error {
  readonly code: string;
  readonly status?: number;

  constructor(message: string, code: string, status?: number) {
    super(message);
    this.name = "DiagnosticApiError";
    this.code = code;
    this.status = status;
  }
}

function getApiBaseUrl(): string {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (!configuredUrl) {
    throw new DiagnosticApiError(
      "O envio ainda não está disponível. Tente novamente em alguns instantes.",
      "API_NOT_CONFIGURED",
    );
  }

  return configuredUrl.replace(/\/+$/, "");
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function messageForStatus(status: number, payload: unknown): string {
  const apiPayload = payload as ApiErrorPayload | null;

  if (status === 422) {
    return "Não foi possível validar os dados. Revise as respostas e tente novamente.";
  }

  if (status === 429) {
    return "Recebemos muitas tentativas em pouco tempo. Aguarde um instante e tente novamente.";
  }

  if (status >= 500) {
    return "O envio está temporariamente indisponível. Seus dados continuam preenchidos; tente novamente em instantes.";
  }

  return apiPayload?.error?.message || "Não foi possível enviar seus dados. Tente novamente.";
}

export async function submitDiagnostic(
  payload: DiagnosticSubmissionPayload,
): Promise<SubmitDiagnosticResult> {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${getApiBaseUrl()}/diagnostics`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const responsePayload = await readJson(response);

    if (!response.ok) {
      const apiPayload = responsePayload as ApiErrorPayload | null;
      throw new DiagnosticApiError(
        messageForStatus(response.status, responsePayload),
        apiPayload?.error?.code || "API_ERROR",
        response.status,
      );
    }

    const successPayload = responsePayload as SubmitDiagnosticSuccessResponse | null;

    if (
      successPayload?.success !== true ||
      typeof successPayload.data?.submissionId !== "string" ||
      typeof successPayload.data?.submittedAt !== "string"
    ) {
      throw new DiagnosticApiError(
        "Recebemos uma resposta inesperada do servidor. Tente novamente.",
        "INVALID_API_RESPONSE",
        response.status,
      );
    }

    return successPayload.data;
  } catch (error) {
    if (error instanceof DiagnosticApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new DiagnosticApiError(
        "O envio demorou mais que o esperado. Seus dados continuam preenchidos; tente novamente.",
        "REQUEST_TIMEOUT",
      );
    }

    throw new DiagnosticApiError(
      "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.",
      "NETWORK_ERROR",
    );
  } finally {
    globalThis.clearTimeout(timeout);
  }
}
