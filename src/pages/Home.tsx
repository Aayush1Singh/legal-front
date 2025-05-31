import React from "react";
import { Button } from "@/components/ui/button";
import {
  Brain,
  FileText,
  Search,
  Zap,
  ArrowRight,
  Upload,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced AI understands and analyzes your documents with unprecedented accuracy",
    },
    {
      icon: Search,
      title: "Intelligent Search",
      description:
        "Find exactly what you need across your entire knowledge base instantly",
    },
    {
      icon: FileText,
      title: "Document Understanding",
      description:
        "Upload PDFs and get comprehensive insights and answers to your questions",
    },
    {
      icon: MessageSquare,
      title: "Natural Conversations",
      description:
        "Chat naturally with your documents using advanced conversational AI",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              RAG Assistant
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="text-slate-300 hover:text-white"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Your Intelligent
              <br />
              Document Assistant
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Transform how you interact with documents. Upload, analyze, and
              get intelligent answers from your knowledge base using
              cutting-edge AI technology.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-lg px-8 py-6 h-auto"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/login")}
              className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700/50 text-lg px-8 py-6 h-auto"
            >
              Learn More
            </Button>
          </div>

          {/* Demo Preview */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold">Upload Documents</h3>
                  <p className="text-slate-400 text-sm">
                    Drop your PDFs and let AI analyze them
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold">Ask Questions</h3>
                  <p className="text-slate-400 text-sm">
                    Chat naturally about your content
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold">Get Insights</h3>
                  <p className="text-slate-400 text-sm">
                    Receive intelligent, contextual answers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Everything you need to unlock the potential of your documents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 rounded-3xl p-12 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of users who are already using RAG Assistant to
              unlock insights from their documents.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/u")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-lg px-8 py-6 h-auto"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              RAG Assistant
            </span>
          </div>
          <p className="text-slate-400">
            © 2024 RAG Assistant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
