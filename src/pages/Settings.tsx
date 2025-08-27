import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { Moon, Sun, User, Lock, Bell, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsProps {
  userRole: 'advisor' | 'assistant' | 'client';
}

export default function Settings({ userRole }: SettingsProps) {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleExportToWealthbox = () => {
    toast({
      title: "Export Started",
      description: "Client data export to Wealthbox has been initiated.",
    });
  };

  const handleExportToRedtail = () => {
    toast({
      title: "Export Started", 
      description: "Client data export to Redtail has been initiated.",
    });
  };

  const handleExportToSalesforce = () => {
    toast({
      title: "Export Started",
      description: "Client data export to Salesforce has been initiated.", 
    });
  };

  const handleResetData = () => {
    if (confirm("Are you sure you want to reset all demo data? This cannot be undone.")) {
      localStorage.clear();
      toast({
        title: "Data Reset",
        description: "All demo data has been reset.",
      });
    }
  };
  
  const [profile, setProfile] = useState({
    email: "user@example.com",
    phone: "(555) 123-4567",
    timezone: "America/New_York"
  });

  const [notifications, setNotifications] = useState({
    emailDigests: true,
    messageNotifications: true,
    completionAlerts: false
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved.",
    });
  };

  const handlePasswordChange = () => {
    toast({
      title: "Password Update",
      description: "Password change functionality would open here.",
    });
  };

  const handleResetDemo = () => {
    toast({
      title: "Demo Data Reset",
      description: "All demo data has been cleared.",
      variant: "destructive",
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-serif font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and security</p>
      </div>

      <Tabs defaultValue="profile" className="animate-slide-in">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>
              <Button onClick={handleSaveProfile} className="btn-hero">
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Password</h3>
                    <p className="text-sm text-muted-foreground">Update your account password</p>
                  </div>
                  <Button variant="outline" onClick={handlePasswordChange}>
                    Change Password
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                Appearance Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Dark Mode</h3>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Reduce Motion</h3>
                  <p className="text-sm text-muted-foreground">Minimize animations for accessibility</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Export Data</h3>
                    <p className="text-sm text-muted-foreground">Download your data in JSON format</p>
                  </div>
                  <Button variant="outline">
                    Download Data
                  </Button>
                </div>
                
                {userRole === 'advisor' && (
                  <div className="flex items-center justify-between p-4 border rounded-lg border-destructive">
                    <div>
                      <h3 className="font-semibold text-destructive">Reset Demo Data</h3>
                      <p className="text-sm text-muted-foreground">Clear all demo data and start fresh</p>
                    </div>
                    <Button variant="destructive" onClick={handleResetDemo}>
                      Reset Demo
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}