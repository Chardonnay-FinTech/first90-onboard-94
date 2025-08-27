import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, DollarSign, CheckCircle, AlertTriangle, TrendingUp, FileText } from "lucide-react";
import { ClientProfileFormModal } from "@/components/ClientProfileFormModal";
import { MessageComposer } from "@/components/MessageComposer";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  userRole: 'advisor' | 'assistant' | 'client';
}

export default function Dashboard({ userRole }: DashboardProps) {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | undefined>();

  // Mock data
  const mockClients = [
    { id: 1, name: "John Smith", priority: "A", aum: 500000, completion: 95 },
    { id: 2, name: "Sarah Johnson", priority: "B", aum: 250000, completion: 78 },
    { id: 3, name: "Michael Brown", priority: "A", aum: 750000, completion: 85 },
    { id: 4, name: "Emily Davis", priority: "C", aum: 150000, completion: 45 },
  ];

  const totalAUM = mockClients.reduce((sum, client) => sum + client.aum, 0);
  const avgCompletion = mockClients.reduce((sum, client) => sum + client.completion, 0) / mockClients.length;
  const needsAttention = mockClients.filter(client => client.completion < 80).length;

  const handleOpenClient = (clientId: number) => {
    setSelectedClientId(clientId.toString());
    setIsModalOpen(true);
  };

  const [isMessageComposerOpen, setIsMessageComposerOpen] = useState(false);
  const [preselectedClient, setPreselectedClient] = useState<string>("");

  const handleMessageClient = (clientName: string) => {
    setPreselectedClient(clientName);
    setIsMessageComposerOpen(true);
  };

  if (userRole === 'client') {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-serif font-bold mb-2">Welcome to Your Client Portal</h1>
          <p className="text-muted-foreground">Complete your profile and track your onboarding progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="card-elegant animate-scale-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
              <CheckCircle className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <Progress value={78} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                6 of 8 sections complete
              </p>
            </CardContent>
          </Card>

          <Card className="card-elegant animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
              <FileText className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Documents uploaded
              </p>
            </CardContent>
          </Card>

          <Card className="card-elegant animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Unread messages
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="card-elegant animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-accent-light rounded-lg">
              <div>
                <h3 className="font-semibold">Complete Banking Information</h3>
                <p className="text-sm text-muted-foreground">Add your bank details for funding</p>
              </div>
              <Button className="btn-success">Complete</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-warning-light rounded-lg">
              <div>
                <h3 className="font-semibold">Upload ID Documents</h3>
                <p className="text-sm text-muted-foreground">Driver's license front and back required</p>
              </div>
              <Button variant="outline">Upload</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-serif font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Monitor client onboarding progress and key metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-elegant animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClients.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card className="card-elegant animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalAUM / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-elegant animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(avgCompletion)}%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="card-elegant animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{needsAttention}</div>
            <p className="text-xs text-muted-foreground">
              Clients below 80%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Priority Clients */}
      <Card className="card-elegant animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <CardHeader>
          <CardTitle>Priority Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockClients.map((client, index) => (
              <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Badge className={`priority-${client.priority.toLowerCase()}`}>
                    {client.priority}
                  </Badge>
                  <div>
                    <h3 className="font-semibold">{client.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${client.aum.toLocaleString()} AUM
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-semibold">{client.completion}%</div>
                    <Progress value={client.completion} className="w-24" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenClient(client.id)}>Open</Button>
                    <Button variant="outline" size="sm" onClick={() => handleMessageClient(client.name)}>Message</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Client Profile Modal */}
      <ClientProfileFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clientId={selectedClientId}
        userRole={userRole}
        onSave={(data) => {
          toast({
            title: "Profile Saved",
            description: "Client profile has been saved successfully.",
          });
        }}
        onSend={(data) => {
          toast({
            title: "Profile Saved & Sent",
            description: "Profile saved and client has been notified.",
          });
        }}
      />

      {/* Message Composer Modal */}
      <MessageComposer
        isOpen={isMessageComposerOpen}
        onClose={() => setIsMessageComposerOpen(false)}
        userRole={userRole}
        preselectedClient={preselectedClient}
      />
    </div>
  );
}