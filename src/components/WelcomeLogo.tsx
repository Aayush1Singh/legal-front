
import React from 'react';
import { Brain, FileText, Search, Zap } from 'lucide-react';

const WelcomeLogo: React.FC = () => {
  const features = [
    { icon: Brain, text: "AI-powered document analysis" },
    { icon: Search, text: "Intelligent search across your knowledge base" },
    { icon: FileText, text: "Comprehensive document understanding" },
    { icon: Zap, text: "Instant insights and recommendations" }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
          <Brain className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
          RAG Assistant
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Your intelligent document companion powered by advanced AI
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="flex items-center space-x-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
              <feature.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-300 font-medium">{feature.text}</span>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 backdrop-blur-sm max-w-2xl mx-auto">
        <p className="text-slate-300 text-lg mb-2">Ready to get started?</p>
        <p className="text-slate-400">
          Upload your documents, ask questions, or explore your knowledge base using the tools above.
        </p>
      </div>
    </div>
  );
};

export default WelcomeLogo;
