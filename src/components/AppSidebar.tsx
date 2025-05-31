
import React from 'react';
import { MessageSquare, Plus, Upload, Search, Settings, FileText, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/sidebar';

const AppSidebar: React.FC = () => {
  const conversations = [
    { id: 1, title: "Document Analysis Q&A", time: "2 min ago", preview: "Can you explain the main findings..." },
    { id: 2, title: "Research Paper Review", time: "1 hour ago", preview: "What are the key methodologies..." },
    { id: 3, title: "Legal Document Query", time: "Yesterday", preview: "Please summarize the contract..." },
  ];

  const mainActions = [
    { icon: Upload, label: "Upload Documents", action: () => {} },
    { icon: Search, label: "Search Knowledge", action: () => {} },
    { icon: FileText, label: "Document Library", action: () => {} },
  ];

  return (
    <Sidebar className="border-slate-700/50">
      <SidebarHeader className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            RAG Assistant
          </h1>
        </div>
        
        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          New Conversation
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400">Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainActions.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    onClick={item.action}
                    className="text-slate-300 hover:text-white hover:bg-slate-700/50"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400">Recent Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations.map((conv) => (
                <SidebarMenuItem key={conv.id}>
                  <SidebarMenuButton className="text-slate-300 hover:text-white hover:bg-slate-700/50 h-auto p-3">
                    <div className="flex items-start space-x-3 w-full">
                      <MessageSquare className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{conv.title}</p>
                        <p className="text-xs text-slate-400 truncate mt-1">{conv.preview}</p>
                        <p className="text-xs text-slate-500 mt-1">{conv.time}</p>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-700/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-slate-300 hover:text-white hover:bg-slate-700/50">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
