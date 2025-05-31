
import React, { useState, useRef, useEffect } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { FileText, Gavel, Search } from 'lucide-react';
import AppSidebar from './AppSidebar';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';
import WelcomeLogo from './WelcomeLogo';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
}

const RAGInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeFeature, setActiveFeature] = useState<'similar' | 'analyze' | 'resolve'>('resolve');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response based on active feature
    setTimeout(() => {
      let responseContent = '';
      let sources: string[] = [];

      switch (activeFeature) {
        case 'similar':
          responseContent = `Based on your query "${content}", I found several similar cases in your knowledge base. Here are the most relevant matches with their precedents and outcomes.`;
          sources = ['Case_Study_A.pdf', 'Legal_Brief_B.docx', 'Precedent_C.pdf'];
          break;
        case 'analyze':
          responseContent = `I've analyzed the document content related to "${content}". Here's a comprehensive breakdown of the key points, legal implications, and recommendations based on the document analysis.`;
          sources = ['Document_Analysis.pdf', 'Legal_Framework.docx', 'Compliance_Guide.pdf'];
          break;
        case 'resolve':
          responseContent = `To resolve your query about "${content}", I've reviewed the relevant documentation and legal precedents. Here's a detailed resolution with actionable steps and recommendations.`;
          sources = ['Resolution_Guide.pdf', 'Best_Practices.docx', 'Legal_Opinions.pdf'];
          break;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responseContent,
        timestamp: new Date(),
        sources
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleFileUpload = (file: File) => {
    console.log('Uploaded file:', file.name);
    // Handle PDF upload logic here
  };

  const featureButtons = [
    { id: 'similar' as const, label: 'Similar Cases', icon: Search },
    { id: 'analyze' as const, label: 'Analyze Document', icon: FileText },
    { id: 'resolve' as const, label: 'Resolve Query', icon: Gavel }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 p-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-slate-400 hover:text-white" />
              <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                RAG Assistant
              </h1>
            </div>
          </header>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6">
              {messages.length === 0 ? (
                <WelcomeLogo />
              ) : (
                <>
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isTyping && <TypingIndicator />}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Feature Buttons */}
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

          {/* Chat Input */}
          <ChatInput 
            onSendMessage={handleSendMessage} 
            onFileUpload={handleFileUpload}
            disabled={isTyping} 
          />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RAGInterface;
