import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Mic, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { UploadedFile } from "./RAGInterface";
import { useLocation, useNavigate } from "react-router-dom";
import { newSession } from "@/services/ChatHandler";

interface ChatInputProps {
  onSendMessage: (session_id: string, message: string) => void;
  onFileUpload?: (file: File) => void;
  disabled?: boolean;
  uploadedFiles?: UploadedFile[];
  handleRemoveFile?: (fileName: string) => void;
  activeFeature?: "similar" | "analyze" | "resolve";
  onSendFile?: (session_id: string) => Promise<void>;
  onSearchSimilar?: (session_id: string, message: string) => void;
}
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onFileUpload,
  disabled,
  uploadedFiles,
  handleRemoveFile,
  activeFeature,
  onSendFile,
  onSearchSimilar,
}) => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    let session_id = params.get("session_id");
    if (session_id == null) {
      console.log("jojojoijo", session_id, params, location);
      async function createSession() {
        interface Response {
          session_id: string;
        }
        const response = (await newSession()) as Response;
        console.log(response);
        params.set("session_id", response.session_id);
        navigate(`?${params.toString()}`);
        session_id = response.session_id;
      }
      await createSession();
    }

    if (activeFeature == "analyze") {
      onSendFile(session_id);
    } else if (activeFeature == "similar") {
      onSearchSimilar(session_id, message.trim());
      setMessage("");
    } else if (message.trim() && !disabled) {
      onSendMessage(session_id, message.trim());
      setMessage("");
    }

    console.log(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        onFileUpload?.(file);
        // toast({
        //   title: "File uploaded successfully",
        //   description: `${file.name} has been uploaded and is ready for analysis.`,
        // });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file only.",
          variant: "destructive",
        });
      }
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  useEffect(() => {
    if (activeFeature == "analyze") setMessage("");
  }, [activeFeature]);
  return (
    <div className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-2 p-3 bg-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Attachment Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={triggerFileUpload}
            disabled={
              activeFeature == "similar" ||
              uploadedFiles?.length > 0 ||
              disabled
            }
            className="text-slate-400 hover:text-white p-2 flex-shrink-0 hover:bg-black"
          >
            <Paperclip className="w-5 h-5" />
          </Button>

          {/* Text Input */}
          <div className="flex-1 min-w-0">
            <div className="mb-1">
              {uploadedFiles.length > 0 && (
                <div className=" border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-2 pt-1">
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-sm font-medium text-slate-300 mb-3">
                      Uploaded Documents
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 backdrop-blur-sm"
                        >
                          <FileText className="w-4 h-4 text-red-400" />
                          <div className="flex flex-col">
                            <span className="text-sm text-slate-200 font-medium truncate max-w-[200px]">
                              {file.name}
                            </span>
                            <span className="text-xs text-slate-400">
                              {formatFileSize(file.size)}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFile(file.name)}
                            className="text-slate-400 hover:text-red-400 h-6 w-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your documents..."
              disabled={activeFeature == "analyze" || disabled}
              className=" resize-none border-0 bg-transparent text-white placeholder-slate-400 focus:ring-0 focus:ring-offset-0 p-0 text-lg leading-6 h-full"
              rows={1}
              style={{
                minHeight: "32px",
                maxHeight: "120px",
                overflow: message.length > 100 ? "auto" : "hidden",
              }}
            />
          </div>

          {/* Voice Input Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled}
            className="text-slate-400 hover:text-white p-2 flex-shrink-0 hover:bg-black"
          >
            <Mic className="w-5 h-5" />
          </Button>

          <Button
            type="submit"
            disabled={
              (activeFeature != "analyze" && !message.trim()) ||
              disabled ||
              (activeFeature == "analyze" && uploadedFiles?.length == 0)
            }
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 p-2 flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>

        <p className="text-xs text-slate-500 mt-2 text-center">
          Press Enter to send, Shift + Enter for new line • Click 📎 to upload
          PDF files
        </p>
      </form>
    </div>
  );
};

export default ChatInput;
