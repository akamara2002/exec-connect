/** Unified API client for all agents. */
import axios from "axios";
import type {
  CFOInput,
  CFOAnalysisOut,
  CFOAnalysisListItem,
  CFOChatRequest,
  CFOChatResponse,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// CFO API
export async function postCfoDiagnostic(
  payload: CFOInput
): Promise<{ id: number }> {
  const response = await apiClient.post<CFOAnalysisOut>("/api/cfo/diagnose", payload);
  return { id: response.data.id };
}

export async function getCfoAnalyses(
  page: number = 1,
  pageSize: number = 10
): Promise<CFOAnalysisListItem[]> {
  const response = await apiClient.get<CFOAnalysisListItem[]>("/api/cfo/analyses", {
    params: { page, page_size: pageSize },
  });
  return response.data;
}

export async function getAnalyses(
  page: number = 1,
  pageSize: number = 10
): Promise<CFOAnalysisListItem[]> {
  return getCfoAnalyses(page, pageSize);
}

export async function getCfoAnalysis(id: number): Promise<CFOAnalysisOut> {
  const response = await apiClient.get<CFOAnalysisOut>(`/api/cfo/analyses/${id}`);
  return response.data;
}

// Legacy alias for CFO
export async function getAnalysis(id: number): Promise<CFOAnalysisOut> {
  return getCfoAnalysis(id);
}

export async function postCfoChat(payload: CFOChatRequest): Promise<CFOChatResponse> {
  const response = await apiClient.post<CFOChatResponse>("/api/cfo/chat", payload);
  return response.data;
}

// CMO API
export async function postCmoDiagnostic(payload: any): Promise<any> {
  const response = await apiClient.post("/api/cmo/diagnose", payload);
  return response.data;
}

export async function getCmoAnalyses(params?: { offset?: number; limit?: number; user_id?: number }): Promise<any> {
  const response = await apiClient.get("/api/cmo/analyses", { params });
  return response.data;
}

export async function getCmoAnalysis(id: number): Promise<any> {
  const response = await apiClient.get(`/api/cmo/analyses/${id}`);
  return response.data;
}

export async function postCmoChat(payload: { question: string; user_id?: number }): Promise<any> {
  const response = await apiClient.post("/api/cmo/chat", payload);
  return response.data;
}

// CMO API object (for backward compatibility)
export const api = {
  diagnose: postCmoDiagnostic,
  getAnalyses: getCmoAnalyses,
  getAnalysis: getCmoAnalysis,
  chat: async (request: { question: string; user_id?: number }) => {
    return postCmoChat(request);
  },
  getChatMessages: async (userId?: number, limit: number = 50) => {
    const response = await apiClient.get("/api/cmo/chat/messages", {
      params: { user_id: userId, limit },
    });
    return response.data.map((msg: any) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
      sources: msg.sources,
      timestamp: new Date(msg.created_at),
    }));
  },
};

// COO API
export async function postCooDiagnostic(payload: any): Promise<{ id: number }> {
  const response = await apiClient.post("/api/coo/diagnose", payload);
  return { id: response.data.id };
}

export async function getCooAnalyses(params?: { page?: number; page_size?: number }): Promise<any> {
  const response = await apiClient.get("/api/coo/analyses", { params });
  return response.data;
}

export async function getCooAnalysis(id: number): Promise<any> {
  const response = await apiClient.get(`/api/coo/analyses/${id}`);
  return response.data;
}

export async function sendChatMessage(
  message: string,
  analysisId?: number | null,
  sessionId?: string | null
): Promise<any> {
  const response = await apiClient.post("/api/coo/chat/message", {
    message,
    analysis_id: analysisId,
    session_id: sessionId,
  });
  return response.data;
}

export async function getChatHistory(sessionId: string): Promise<any[]> {
  const response = await apiClient.get("/api/coo/chat/history", {
    params: { session_id: sessionId },
  });
  return response.data;
}

// CTO API
export async function postCtoDiagnostic(payload: any): Promise<any> {
  const response = await apiClient.post("/api/cto/diagnose", payload);
  return response.data;
}

export async function getCtoAnalyses(params?: { page?: number; page_size?: number }): Promise<any> {
  const response = await apiClient.get("/api/cto/analyses", { params });
  return response.data;
}

export async function getCtoAnalysis(id: number): Promise<any> {
  const response = await apiClient.get(`/api/cto/analyses/${id}`);
  return response.data;
}

export async function postCtoChat(payload: { message: string; conversation_history?: any[] }): Promise<any> {
  const response = await apiClient.post("/api/cto/chat", payload);
  return response.data;
}

// CTO API object (for backward compatibility)
export const ctoApi = {
  diagnose: postCtoDiagnostic,
  getAnalyses: async (page: number = 1, pageSize: number = 20) => {
    return getCtoAnalyses({ page, page_size: pageSize });
  },
  getAnalysis: getCtoAnalysis,
  chat: postCtoChat,
};

// Legacy aliases
export const cooApi = {
  diagnose: postCooDiagnostic,
  getAnalyses: getCooAnalyses,
  chat: sendChatMessage,
};
