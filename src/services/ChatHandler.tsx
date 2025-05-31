import React from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_URL;
export async function newSession() {
  const response = await axios.post(
    `${apiUrl}/new_session`,
    {},
    { withCredentials: true }
  );
  return response.data;
}
export async function getChat(session_id) {
  console.log(session_id);
  const response = await axios.get(
    `${apiUrl}/session/load_chat/${session_id}`,

    { withCredentials: true }
  );
  return response.data;
}
export async function assistantResponse(query, session_id) {
  console.log(session_id);
  const response = await axios.get(`${apiUrl}/session/query/${session_id}`, {
    params: {
      query: query,
    },
    withCredentials: true,
  });
  console.log(response);
  interface Res {
    response: string;
  }
  const res = response.data as Res;
  console.log(res);
  return res.response;
}
interface conversation {
  session_id: string;
}
interface Resi {
  response: conversation[];
}
export async function prevChats() {
  const response = await axios.get(`${apiUrl}/get_all_sessions`, {
    withCredentials: true,
  });
  interface Resi {
    response: string[];
  }
  const res = response.data as Resi;
  console.log(res);
  return res.response;
}
