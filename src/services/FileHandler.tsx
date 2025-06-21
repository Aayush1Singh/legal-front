import { UploadedFile } from "@/components/RAGInterface";
import axios from "axios";
import React from "react";
import { createClient } from "@supabase/supabase-js";

const apiUrl = import.meta.env.VITE_BACKEND_URL;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

export async function FileHandler() {
  return <div>FileHandler</div>;
}

export async function handleFileUploadToDatabase(file: File, session_id) {
  // const formData = new FormData();

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const randomNumber = Math.random();
  console.log(randomNumber, String(randomNumber).slice(2));
  const { data, error } = await supabase.storage
    .from("file-storage")
    .update(`${session_id}/${String(randomNumber).slice(2)}.pdf`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return { message: "failed" };
  }

  const response = await axios.post(
    `${apiUrl}/session/add_document/${session_id}`,
    {
      id: String(randomNumber).slice(2),
    },
    {
      withCredentials: true,
    }
  );
  return { status: "success" };
  console.log(data, error);
  // formData.append("file", file); // 'file' is the field name expected by the backend
  // try {
  //   const response = await axios.post(
  //     `${apiUrl}/session/upload_pdf/${session_id}`,
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );
  //   console.log("Upload successful:", response.data);
  // } catch (error) {
  //   console.error("Upload failed:", error);
  // }
}
