import React from "react";
import axios from "axios";
import { AnalysisClause } from "@/components/AnalysisDisplay";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_BACKEND_URL;
export async function newSession() {
  const response = await axios.post(
    `${apiUrl}/new_session`,
    {},
    { withCredentials: true }
  );
  if (response.status !== 200) {
    toast.error("Internal Server Error");
  }
  return response.data;
}
export async function getChat(session_id) {
  console.log(session_id);
  const response = await axios.get(
    `${apiUrl}/session/load_chat/${session_id}`,

    { withCredentials: true }
  );
  if (response.status !== 200) {
    toast.error("Internal Server Error");
  }
  return response.data;
}
export async function assistantResponse(query, session_id, isUpload: boolean) {
  console.log(session_id);
  const response = await axios.get(`${apiUrl}/session/query/${session_id}`, {
    params: {
      query: query,
      isUpload: isUpload,
    },
    withCredentials: true,
  });
  if (response.status !== 200) {
    toast.error("Internal Server Error");
  }
  interface Res {
    response?: string;
    status: string;
    message?: string;
  }
  const res = response.data as Res;
  console.log(res);
  return res;
}
interface conversation {
  session_id: string;
}
interface Resi {
  response: conversation[];
}
interface SessionTemplate {
  title: string;
  session_id: string;
  created_at?: Date;
}
export async function prevChats() {
  const response = await axios.get(`${apiUrl}/get_all_sessions`, {
    withCredentials: true,
  });
  if (response.status !== 200) {
    toast.error("Internal Server Error");
  }
  interface Resi {
    response?: SessionTemplate[];
    message?: string;
    status: string;
  }
  const res = response.data as Resi;
  console.log(res);
  return res;
}
export async function similarSearch(query, session_id) {
  const response = await axios.get(
    `${apiUrl}/session/get_similar/${session_id}`,
    {
      params: {
        query: query,
      },
      withCredentials: true,
    }
  );
  if (response.status !== 200) {
    toast.error("Internal Server Error");
  }

  return response.data;
}
export async function analyzeFile(session_id) {
  interface AnalyzedClauses {
    identified_parties: string;
    bias_flags: string[];
    ambiguities: string[];
    potential_loopholes: string[];
    legal_conflicts: string[];
    improvements?: string[];
    bias_score: number;
    clause: string;
  }
  interface res {
    response?: AnalyzedClauses[];
    message?: string;
    status: string;
  }
  const response = await axios.get(`${apiUrl}/session/analyze/${session_id}`, {
    withCredentials: true,
  });
  if (response.status !== 200) {
    toast.error("Internal Server Error");
  }
  const data = response.data as res;
  return data;
}
export async function loadAnalysis(session_id, doc_id) {
  const response = await axios.get(
    `${apiUrl}/session/load_analysis/${session_id}`,
    {
      params: {
        doc_id,
      },
      withCredentials: true,
    }
  );
  if (response.status !== 200) {
    toast.error("Internal Server Error");
  }
  interface res {
    response?: AnalysisClause[];
    message?: string;
    status: string;
  }
  const data = response.data as res;
  return data;
}
