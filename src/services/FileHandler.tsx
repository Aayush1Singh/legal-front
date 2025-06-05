import { UploadedFile } from "@/components/RAGInterface";
import axios from "axios";
import React from "react";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

export async function FileHandler() {
  return <div>FileHandler</div>;
}

export async function handleFileUploadToDatabase(file: File, session_id) {
  const formData = new FormData();

  formData.append("file", file); // 'file' is the field name expected by the backend
  try {
    const response = await axios.post(
      `${apiUrl}/session/upload_pdf/${session_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Upload successful:", response.data);
  } catch (error) {
    console.error("Upload failed:", error);
  }
}
