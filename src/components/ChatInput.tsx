import React, { useState, useRef } from "react";
import { Send, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload?: (file: File) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onFileUpload,
  disabled,
}) => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
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
        toast({
          title: "File uploaded successfully",
          description: `${file.name} has been uploaded and is ready for analysis.`,
        });
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
            disabled={disabled}
            className="text-slate-400 hover:text-white p-2 flex-shrink-0"
          >
            <Paperclip className="w-5 h-5" />
          </Button>

          {/* Text Input */}
          <div className="flex-1 min-w-0">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your documents..."
              disabled={disabled}
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
            className="text-slate-400 hover:text-white p-2 flex-shrink-0"
          >
            <Mic className="w-5 h-5" />
          </Button>

          {/* Send Button */}
          <Button
            type="submit"
            disabled={!message.trim() || disabled}
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 p-2 flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>

        {/* Helper Text */}
        <p className="text-xs text-slate-500 mt-2 text-center">
          Press Enter to send, Shift + Enter for new line • Click 📎 to upload
          PDF files
        </p>
      </form>
    </div>
  );
};

export default ChatInput;
