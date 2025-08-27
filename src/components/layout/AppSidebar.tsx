
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  FileText, 
  MessageSquare, 
  Calendar,
  Settings, 
  Building,
  UserCheck,
  Download,
  Upload,
  Phone
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  userRole: 'advisor' | 'assistant' | 'client';
}

export function AppSidebar({ userRole }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  const advisorItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Manage Clients", url: "/clients", icon: Users },
    { title: "Households", url: "/households", icon: Building },
    { title: "Documents", url: "/documents", icon: FileText },
    { title: "Messages", url: "/messages", icon: MessageSquare },
    { title: "Meetings", url: "/meetings", icon: Calendar },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  const assistantItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Manage Clients", url: "/clients", icon: Users },
    { title: "Households", url: "/households", icon: Building },
    { title: "Documents", url: "/documents", icon: FileText },
    { title: "Messages", url: "/messages", icon: MessageSquare },
    { title: "Meetings", url: "/meetings", icon: Calendar },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  const clientItems = [
    { title: "Client Dashboard", url: "/client-dashboard", icon: Home },
    { title: "Edit Client Profile", url: "/client-profile", icon: UserCheck },
    { title: "Documents", url: "/client-documents", icon: FileText },
    { title: "Contact Us", url: "/client-messages", icon: Phone },
    { title: "Settings", url: "/client-settings", icon: Settings },
  ];

  const items = userRole === 'advisor' ? advisorItems : 
                userRole === 'assistant' ? assistantItems : clientItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className="border-r bg-sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
