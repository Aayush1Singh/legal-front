import React from "react";
import {
  MessageSquare,
  Plus,
  Upload,
  Search,
  Settings,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink, Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const conversations = [
    {
      id: 1,
      title: "Document Analysis Q&A",
      time: "2 min ago",
      preview: "Can you explain the main findings...",
    },
    {
      id: 2,
      title: "Research Paper Review",
      time: "1 hour ago",
      preview: "What are the key methodologies...",
    },
    {
      id: 3,
      title: "Legal Document Query",
      time: "Yesterday",
      preview: "Please summarize the contract...",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-0
        w-80 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
        border-r border-slate-700/50 backdrop-blur-xl
        transform transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              RAG Assistant
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            New Conversation
          </Button>
        </div>

        {/* Actions */}
        <div className="p-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700/50"
          >
            <Upload className="w-4 h-4 mr-3" />
            Upload Documents
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700/50"
          >
            <Search className="w-4 h-4 mr-3" />
            Search Knowledge
          </Button>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-medium text-slate-400 mb-3">
            Recent Conversations
          </h3>
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 cursor-pointer transition-all duration-200 border border-slate-700/30 hover:border-slate-600/50"
              >
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {conv.title}
                    </p>
                    <p className="text-xs text-slate-400 truncate mt-1">
                      {conv.preview}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{conv.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/50">
          <Link
            to="/u/settings"
            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700/50"
          >
            Settings
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
