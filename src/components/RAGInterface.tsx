import React, { useState, useRef, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { FileText, Gavel, Search, X } from "lucide-react";
import AppSidebar from "./AppSidebar";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";
import WelcomeLogo from "./WelcomeLogo";
import { useLocation, useNavigate } from "react-router-dom";
import { assistantResponse, getChat, newSession } from "@/services/ChatHandler";
import { handleFileUploadToDatabase } from "@/services/FileHandler";
import { useToast } from "@/hooks/use-toast";

interface Message {
  query: string;
  response?: string;
}

export interface UploadedFile {
  name: string;
  size: number;
  uploadedAt: Date;
  file: File;
}

const RAGInterface: React.FC = () => {
  const { toast } = useToast();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeFeature, setActiveFeature] = useState<
    "similar" | "analyze" | "resolve"
  >("resolve");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const handleSendMessage = async (content: string) => {
    console.log("content", content);
    const userMessage: Message = {
      query: content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    const searchParams = new URLSearchParams(location.search);
    // console.log(query);
    interface Response {
      session_id: string;
    }
    let temp = "";
    async function createSession() {
      const response = (await newSession()) as Response;
      console.log(response);
      searchParams.set("session_id", response.session_id);
      temp = response.session_id;
      setFlag(true);
      navigate(`?${searchParams.toString()}`);
    }

    if (params.get("session_id") == null) {
      await createSession();
      setMessages([{ query: content }]);
    }
    console.log(params);
    const response = await assistantResponse(
      content,
      temp === "" ? params.get("session_id") : temp
    );
    if (response.message == "failed") toast({ title: "failed" });
    setIsTyping(false);

    console.log(response);
    setMessages((messages: Message[]) => {
      // Ensure response is a string
      // Create a new array with the last message's response updated

      return messages.map((msg, idx) =>
        idx === messages.length - 1
          ? { ...msg, response: response.response }
          : msg
      );
    });
    // Simulate AI response based on active feature
  };
  interface queryFile {
    name: string;
    size: string;
  }
  const handleFileUpload = async (file: File) => {
    console.log("Uploaded file:", file.name);
    // Add the file to the uploaded files list
    const newFile: UploadedFile = {
      name: file.name,
      size: file.size,
      uploadedAt: new Date(),
      file,
    };
    setUploadedFiles((prev) => [...prev, newFile]);
    const session_id = params.get("session_id");
    const res = await handleFileUploadToDatabase(file, session_id);
    if (res.message == "failed") toast({ title: "failed" });
    else {
      toast({
        title: "File uploaded To DB",
        description: `${file.name} has been uploaded and is ready for analysis.`,
      });
    }
  };

  async function onSendFile() {
    const session_id = params.get("session_id");
    const query: queryFile[] = uploadedFiles.map((file) => {
      handleFileUploadToDatabase(file.file, session_id);
      return { name: file.name, size: String(file.size) } as queryFile;
    });

    console.log(query);

    setUploadedFiles([]);
  }

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const featureButtons = [
    { id: "similar" as const, label: "Similar Cases", icon: Search },
    { id: "analyze" as const, label: "Analyze Document", icon: FileText },
    { id: "resolve" as const, label: "Resolve Query", icon: Gavel },
  ];
  // const location = useLocation();
  const query = new URLSearchParams(location.search);
  interface Recipi {
    response: Message[];
  }
  useEffect(() => {
    if (flag) {
      setFlag(false);
      return;
    }
    const searchParam = query.get("session_id");
    if (searchParam === null) {
      return;
    }
    async function getMessages() {
      const res = (await getChat(searchParam)) as Recipi;
      if (res == null) return;

      setMessages(res.response);
    }
    getMessages();

    console.log("Query params changed:", {
      search: searchParam,
    });

    // Do something with the query param changes...
  }, [location.search]); // Reacts to any query string change

  return (
    <SidebarProvider>
      <div className="!bg-black min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex w-full">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 p-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-slate-400 hover:text-white hover:bg-black" />
              <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                LegalAI Assistant
              </h1>
            </div>
          </header>

          {/* Uploaded Files Display */}
          {/* {uploadedFiles.length > 0 && (
            <div className="border-b border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-4">
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
          )} */}

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6">
              {messages.length === 0 ? (
                <WelcomeLogo />
              ) : (
                <>
                  {messages.map((message, index) => (
                    <>
                      <ChatMessage
                        key={index}
                        message={message.query}
                        type={"user"}
                      />
                      {message?.response && (
                        <ChatMessage
                          key={`response_${index}`}
                          message={message.response}
                          type="assistant"
                        ></ChatMessage>
                      )}
                      {/* <ChatMessage key={message.id+1} message={message}> */}
                    </>
                  ))}
                  {isTyping && <TypingIndicator />}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Feature Buttons */}
          <div className="sticky bottom-0">
            {/* Chat Input */}
            <ChatInput
              onSendMessage={handleSendMessage}
              onFileUpload={handleFileUpload}
              disabled={isTyping}
              uploadedFiles={uploadedFiles}
              handleRemoveFile={handleRemoveFile}
              activeFeature={activeFeature}
            />
            <div className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm px-4 py-3">
              <div className="max-w-4xl mx-auto">
                <div className="flex gap-2 justify-center">
                  {featureButtons.map(({ id, label, icon: Icon }) => (
                    <Button
                      key={id}
                      variant={activeFeature === id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFeature(id)}
                      className={
                        activeFeature === id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white"
                          : "border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700/50"
                      }
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RAGInterface;
