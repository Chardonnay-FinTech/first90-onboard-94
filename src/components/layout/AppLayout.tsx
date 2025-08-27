
import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun, User, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";

interface AppLayoutProps {
  children: ReactNode;
  userRole: 'advisor' | 'assistant' | 'client';
  onLogout: () => void;
}

export const AppLayout = ({ children, userRole, onLogout }: AppLayoutProps) => {
  const { theme, setTheme } = useTheme();

  const roleConfig = {
    advisor: { label: 'Advisor', color: 'primary' },
    assistant: { label: 'Assistant', color: 'warning' },
    client: { label: 'Client', color: 'accent' }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background">
        <div className="flex flex-1 w-full">
          <AppSidebar userRole={userRole} />
          
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="h-16 border-b bg-card flex items-center justify-between px-6 shadow-sm">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-serif font-semibold text-primary">First 90</h1>
                  <Badge className={`priority-${roleConfig[userRole].color.slice(0, 1).toLowerCase()}`}>
                    {roleConfig[userRole].label}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t bg-card px-6 py-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Created by</span>
            <a 
              href="https://www.linkedin.com/in/chardonnay-botero-2b07959a/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <Linkedin className="w-4 h-4" />
              Chardonnay Botero
            </a>
          </div>
        </footer>
      </div>
    </SidebarProvider>
  );
};
