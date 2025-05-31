
import React, { useState } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-3 p-3 bg-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
          {/* Attachment Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white p-2"
          >
            <Paperclip className="w-5 h-5" />
          </Button>

          {/* Text Input */}
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your documents..."
            disabled={disabled}
            className="flex-1 min-h-0 resize-none border-0 bg-transparent text-white placeholder-slate-400 focus:ring-0 focus:ring-offset-0 p-0"
            rows={1}
          />

          {/* Voice Input Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white p-2"
          >
            <Mic className="w-5 h-5" />
          </Button>

          {/* Send Button */}
          <Button
            type="submit"
            disabled={!message.trim() || disabled}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 p-2"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>

        {/* Helper Text */}
        <p className="text-xs text-slate-500 mt-2 text-center">
          Press Enter to send, Shift + Enter for new line
        </p>
      </form>
    </div>
  );
};

export default ChatInput;
