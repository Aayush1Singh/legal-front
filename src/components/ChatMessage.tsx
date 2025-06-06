import React from "react";
import { User, Bot, Copy, ThumbsUp, ThumbsDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
interface ChatMessageProps {
  message: string;
  type: string;
  fileUpload?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  type,
  fileUpload = false,
}) => {
  const isUser = type === "user";

  return (
    <div
      className={`flex gap-4 mb-6 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`
        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
        ${
          isUser
            ? "bg-gradient-to-br from-blue-500 to-purple-600"
            : "bg-gradient-to-br from-emerald-500 to-teal-600"
        }
      `}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={`flex-1 max-w-3xl ${
          isUser ? "flex flex-col items-end" : ""
        }`}
      >
        <div
          className={`
          p-4 rounded-2xl shadow-lg backdrop-blur-sm
          ${
            isUser
              ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white ml-auto"
              : "bg-white/10 border border-white/20 text-slate-100"
          }
        `}
        >
          <div className="prose prose-sm max-w-none">
            {fileUpload && (
              <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                <FileText className="w-4 h-4 text-red-400" />
                <div className="flex flex-col">
                  <span className="text-sm text-slate-200 font-medium truncate max-w-[200px]">
                    {"File"}
                  </span>
                </div>
              </div>
            )}
            <p
              className={`${
                isUser ? "text-white" : "text-slate-100"
              } leading-relaxed`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message}
              </ReactMarkdown>
            </p>
          </div>

          {/* Sources for assistant messages */}
          {/* {!isUser  && message.sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-slate-400 mb-2">Sources:</p>
              <div className="flex flex-wrap gap-2">
                {message.sources.map((source, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-white/10 rounded-md text-slate-300"
                  >
                    {source}
                  </span>
                ))}
              </div>
            </div>
          )} */}
        </div>

        {/* Message Actions */}
        {!isUser && (
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white h-8 px-2"
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white h-8 px-2"
            >
              <ThumbsUp className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white h-8 px-2"
            >
              <ThumbsDown className="w-3 h-3" />
            </Button>
            <span className="text-xs text-slate-500 ml-2">
              {/* {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })} */}
            </span>
          </div>
        )}

        {/* User message timestamp */}
        {isUser && (
          <span className="text-xs text-slate-500 mt-2">
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
