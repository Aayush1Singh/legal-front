import React from "react";
import { User, Bot, Copy, ThumbsUp, ThumbsDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
interface ChatMessageProps {
  message: string;
  type: string;
  fileUpload?: boolean;
  analysedDoc?: boolean;
  onReSeeAnalysis?: () => Promise<void>;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  type,
  fileUpload = false,
  analysedDoc = false,
  onReSeeAnalysis,
}) => {
  function fetchAndDisplay() {}
  const isUser = type === "user";

  return (
    <div
      className={`flex gap-2 sm:gap-4 mb-4 sm:mb-6 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div
        className={`
        flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
        ${
          isUser
            ? "bg-gradient-to-br from-blue-500 to-purple-600"
            : "bg-gradient-to-br from-emerald-500 to-teal-600"
        }
      `}
      >
        {isUser ? (
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        ) : (
          <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={`flex-1 max-w-[85%] sm:max-w-3xl min-w-0 ${
          isUser ? "flex flex-col items-end" : ""
        }`}
      >
        <div
          className={`
          p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm
          ${
            isUser
              ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white ml-auto"
              : "bg-white/10 border border-white/20 text-slate-100"
          }
        `}
        >
          <div className="prose prose-sm sm:prose max-w-none">
            {fileUpload && (
              <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 backdrop-blur-sm mb-2">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm text-slate-200 font-medium truncate">
                    {"File"}
                  </span>
                </div>
              </div>
            )}
            <div
              className={`${
                isUser ? "text-white" : "text-slate-100"
              } leading-relaxed text-sm sm:text-base`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message}
              </ReactMarkdown>
              {analysedDoc && (
                <Button
                  onClick={() => onReSeeAnalysis()}
                  className="mt-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 h-auto"
                >
                  See Analysis
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Message Actions */}
        {!isUser && (
          <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white h-6 w-6 sm:h-8 sm:w-8 px-0 sm:px-2"
            >
              <Copy className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white h-6 w-6 sm:h-8 sm:w-8 px-0 sm:px-2"
            >
              <ThumbsUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white h-6 w-6 sm:h-8 sm:w-8 px-0 sm:px-2"
            >
              <ThumbsDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </Button>
          </div>
        )}

        {/* User message timestamp */}
        {isUser && (
          <span className="text-xs text-slate-500 mt-1 sm:mt-2">
            {/* {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })} */}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
