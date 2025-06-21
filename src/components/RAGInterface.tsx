import React, { useState, useRef, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { FileText, Gavel, Search, X, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";
import WelcomeLogo from "./WelcomeLogo";
import { useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import {
  analyzeFile,
  assistantResponse,
  getChat,
  loadAnalysis,
  newSession,
  similarSearch,
} from "@/services/ChatHandler";
import { handleFileUploadToDatabase } from "@/services/FileHandler";
import { useToast } from "@/hooks/use-toast";
import AnalysisDisplay, { AnalysisClause } from "./AnalysisDisplay";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
interface Message {
  query: string;
  response?: string;
  isUpload?: boolean;
  analysedDoc?: boolean;
  doc_id?: string;
}

export interface UploadedFile {
  name: string;
  size: number;
  uploadedAt: Date;
  file: File;
}
interface RootState {
  user: {
    email: string;
  };
}

const RAGInterface: React.FC = () => {
  const data = useSelector((state: RootState) => state.user);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  const [flagAbrupt, setFlagAbruptNew] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [activeFeature, setActiveFeature] = useState<
    "similar" | "analyze" | "resolve"
  >("resolve");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [analysisResults, setAnalysisResults] = useState<
    AnalysisClause[] | null
  >(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [flag, setFlag] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (session_id, content: string) => {
    setIsTyping(true);
    try {
      const userMessage: Message = {
        query: content,
        isUpload: uploadedFiles.length > 0,
      };
      setMessages((prev) => [...prev, userMessage]);
      setUploadedFiles([]);
      const response = await assistantResponse(
        content,
        session_id,
        uploadedFiles.length > 0
      );
      if (response.status == "failed") {
        toast.error(response.message);
      } else {
        setMessages((messages: Message[]) => {
          return messages.map((msg, idx) =>
            idx === messages.length - 1
              ? { ...msg, response: response.response }
              : msg
          );
        });
      }
    } catch (err) {
      toast.error(err);
      console.log("hello");
    }
    setIsTyping(false);
  };

  interface queryFile {
    name: string;
    size: string;
  }

  const handleFileUpload = async (file: File) => {
    setUploading(true);

    try {
      const newFile: UploadedFile = {
        name: file.name,
        size: file.size,
        uploadedAt: new Date(),
        file,
      };
      setUploadedFiles((prev) => [...prev, newFile]);
      let session_id = params.get("session_id");
      if (session_id == null) {
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

      const res = await handleFileUploadToDatabase(file, session_id);
      if (res.status == "failed") toast.error("File could not be uploaded");
      else {
        toast.success("file uploaded");
      }
    } catch (err) {
      toast.error(err);
    }
    setUploading(false);
  };

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const featureButtons = [
    { id: "similar" as const, label: "Similar Cases", icon: Search },
    { id: "analyze" as const, label: "Analyze Document", icon: FileText },
    { id: "resolve" as const, label: "Resolve Query", icon: Gavel },
  ];

  useEffect(() => {
    if (flag) {
      setFlag(false);
      return;
    }
    if (flagAbrupt) {
      setFlagAbruptNew(false);
      return;
    }
    const searchParam = query.get("session_id");
    if (searchParam === null) {
      return;
    }
    async function getMessages() {
      try {
        const res = (await getChat(searchParam)) as Recipi;
        if (res.status == "failed") {
          toast.error(res.message);
          setMessages([]);
        } else {
          setMessages(res.response);
        }
      } catch (err) {
        toast.error(err);
      }
    }
    getMessages();
    console.log("Query params changed:", {
      search: searchParam,
    });
  }, [location.search]);
  useEffect(() => {
    if (activeFeature == "similar") setUploadedFiles([]);
    if (activeFeature == "analyze") return;
  }, [activeFeature]);

  const onSearchSimilar = async function (session_id, content: string) {
    setIsTyping(true);

    try {
      const userMessage: Message = {
        query: content,
      };
      interface Res {
        response?: string;
        message?: string;
        status: string;
      }
      setMessages((prev) => [...prev, userMessage]);
      const response = (await similarSearch(content, session_id)) as Res;
      if (response.status == "failed") {
        toast.error(response.message);
      } else {
        setMessages((messages: Message[]) => {
          return messages.map((msg, idx) =>
            idx === messages.length - 1
              ? { ...msg, response: response.response }
              : msg
          );
        });
      }
    } catch (err) {
      toast.error(err);
    }
    setIsTyping(false);
  };

  const query = new URLSearchParams(location.search);
  interface Recipi {
    response?: Message[];
    status: string;
    message?: string;
  }

  async function onAnalyzeFile(session_id) {
    setIsTyping(true);
    try {
      const userMessage: Message = {
        query: "Used analyzed document",
        isUpload: true,
      };
      setMessages((prev) => [...prev, userMessage]);
      setUploadedFiles([]);
      const res = await analyzeFile(session_id);
      if (res.status == "failed") {
        toast.error(res.message);
      } else {
        const clauses_array = res.response;
        setAnalysisResults(clauses_array);
        setShowAnalysisModal(true);
        const totalClauses = clauses_array.length;
        const highBiasClauses = clauses_array.filter(
          (clause) => clause.bias_score >= 0.6
        ).length;
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          return [
            ...prev.slice(0, -1),
            {
              ...lastMessage,
              response: `Analysis complete. Found ${totalClauses} clauses, with ${highBiasClauses} clauses showing high bias scores. See the detailed analysis report for more information.`,
              analysedDoc: true,
            },
          ];
        });
      }
    } catch (err) {
      console.log("err");
      toast.error(err);
    }
    setIsTyping(false);
  }

  async function reSeeAnalysis(doc_id) {
    try {
      const session_id = params.get("session_id");
      const data = await loadAnalysis(session_id, doc_id);
      if (data.status == "failed") {
        toast.error(data.message);
      } else {
        setAnalysisResults(data.response);
        setShowAnalysisModal(true);
      }
    } catch (err) {
      console.log("he");
      toast.error(err);
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex w-full relative">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 ">
          {/* Header */}
          {
            <header
              className={`bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 p-3 sm:p-4 z-50 `}
              ref={ref}
            >
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <SidebarTrigger className="text-slate-400 hover:text-white hover:bg-black h-8 w-8 sm:h-9 sm:w-9" />

                  {
                    <h1 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent truncate">
                      {`LegalAI Assistant, Hey ${data.email}`}
                    </h1>
                  }
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/u/settings")}
                  className="text-slate-400 hover:text-white hover:bg-slate-700/50 h-8 w-8 sm:h-9 sm:w-9 p-0"
                >
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </header>
          }{" "}
          {!inView && (
            <header
              className={`bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 p-3 sm:p-4 z-50 top-0 transition-opacity duration-500 delay-300 ease-out fixed w-full`}
            >
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <SidebarTrigger className="text-slate-400 hover:text-white hover:bg-black h-8 w-8 sm:h-9 sm:w-9" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/u/settings")}
                  className="text-slate-400 hover:text-white hover:bg-slate-700/50 h-8 w-8 sm:h-9 sm:w-9 p-0"
                >
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </header>
          )}
          {/* Chat Area */}
          <div className="flex-1 flex flex-col min-h-0 relative">
            <ScrollArea className="flex-1">
              <div className="max-w-full sm:max-w-4xl mx-auto p-3 sm:p-6 pb-4">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center min-h-[50vh]">
                    <WelcomeLogo />
                  </div>
                ) : (
                  <>
                    {messages.map((message, index) => (
                      <div key={index} className="space-y-2 sm:space-y-4">
                        <ChatMessage
                          message={message.query}
                          type={"user"}
                          fileUpload={message.isUpload}
                        />
                        {message?.response && (
                          <ChatMessage
                            message={message.response}
                            type="assistant"
                            analysedDoc={message.analysedDoc}
                            onReSeeAnalysis={reSeeAnalysis}
                            doc_id={message.doc_id}
                          />
                        )}
                      </div>
                    ))}
                    {isTyping && <TypingIndicator />}
                  </>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Feature Buttons */}
            <div className="sticky absolute bottom-0">
              {/* Chat Input */}
              <ChatInput
                onSendMessage={handleSendMessage}
                onFileUpload={handleFileUpload}
                disabled={isTyping || isUploading}
                uploadedFiles={uploadedFiles}
                handleRemoveFile={handleRemoveFile}
                activeFeature={activeFeature}
                onSearchSimilar={onSearchSimilar}
                onSendFile={onAnalyzeFile}
                setFlagAbruptNew={setFlagAbruptNew}
              />
              <div className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3">
                <div className="max-w-full sm:max-w-4xl mx-auto">
                  <div className="flex gap-1 sm:gap-2 justify-center overflow-x-auto">
                    {featureButtons.map(({ id, label, icon: Icon }) => (
                      <Button
                        key={id}
                        variant={activeFeature === id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveFeature(id)}
                        className={`
                        flex-shrink-0 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-8 sm:h-9
                        ${
                          activeFeature === id
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white"
                            : "border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700/50"
                        }
                      `}
                      >
                        <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">{label}</span>
                        <span className="sm:hidden">
                          {id === "similar"
                            ? "Similar"
                            : id === "analyze"
                            ? "Analyze"
                            : "Resolve"}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Modal */}
        {showAnalysisModal && analysisResults && (
          <AnalysisDisplay
            analysisResults={analysisResults}
            onClose={() => setShowAnalysisModal(false)}
          />
        )}
      </div>
    </SidebarProvider>
  );
};

export default RAGInterface;
