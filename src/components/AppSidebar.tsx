import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  Plus,
  Upload,
  Search,
  Settings,
  FileText,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { newSession, prevChats } from "@/services/ChatHandler";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

interface Response {
  session_id: string;
  message?: string;
  status?: string;
}
interface conversation {
  session_id: string;
}
interface SessionTemplate {
  title: string;
  session_id: string;
  created_at?: Date;
}
const AppSidebar: React.FC = () => {
  // const conversations: conversation[] = [];
  const [conversations, setConversations] = useState<SessionTemplate[]>([]);

  useEffect(() => {
    async function getChats() {
      const res = await prevChats();
      console.log(res);
      setConversations(res.reverse());
    }

    getChats();
  }, []);

  // const conversations = [
  //   {
  //     id: 1,
  //     title: "Document Analysis Q&A",
  //     time: "2 min ago",
  //     preview: "Can you explain the main findings...",
  //   },
  //   {
  //     id: 2,
  //     title: "Research Paper Review",
  //     time: "1 hour ago",
  //     preview: "What are the key methodologies...",
  //   },
  //   {
  //     id: 3,
  //     title: "Legal Document Query",
  //     time: "Yesterday",
  //     preview: "Please summarize the contract...",
  //   },
  // ];
  const Navigate = useNavigate();
  const location = useLocation();
  const mainActions = [
    { icon: Upload, label: "Upload Documents", action: () => {} },
    { icon: Search, label: "Search Knowledge", action: () => {} },
    { icon: FileText, label: "Document Library", action: () => {} },
  ];
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  async function createSession() {
    const response = (await newSession()) as Response;
    if (response.status == "failed") {
      toast.error(response.message);
    } else {
      console.log(response);
      searchParams.set("session_id", response.session_id);
      navigate(`?${searchParams.toString()}`);
    }
  }
  return (
    <Sidebar
      style={{
        color: "red",
      }}
      className="!bg-black border-slate-700/50"
    >
      <SidebarHeader className=" bg-slate-900 p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            LegalAI Assistant
          </h1>
        </div>

        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg"
          onClick={createSession}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Conversation
        </Button>
      </SidebarHeader>

      <SidebarContent className="bg-slate-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400">
            Recent Conversations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="bg-slate-900">
              {conversations?.map((conv, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    className="text-slate-300 hover:text-white hover:bg-black
                     h-auto p-3"
                    onClick={() => {
                      const params = new URLSearchParams(location.search);

                      params.set("session_id", conv.session_id);
                      navigate(`${location.pathname}?${params.toString()}`, {
                        replace: true,
                      });
                    }}
                  >
                    <div className="flex items-start space-x-3 w-full">
                      <MessageSquare className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {conv.title}

                          {/* {conv.title} */}
                        </p>
                        <p className="text-xs text-slate-400 truncate mt-1">
                          {/* {conv.preview} */}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {/* {conv.time} */}
                        </p>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-700/50 bg-black">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-slate-300 hover:text-white hover:bg-slate-700/50">
              <Settings className="w-4 h-4" />
              <NavLink to="/u/settings" className="w-full">
                Settings
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
