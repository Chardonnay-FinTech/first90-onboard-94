import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Copy, 
  Send, 
  Download, 
  Plus, 
  Users,
  DollarSign 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ClientProfileFormModal } from "@/components/ClientProfileFormModal";

interface Client {
  id: number;
  name: string;
  email: string;
  priority: string;
  aum: number;
  completion: number;
}

export default function HouseholdDetail() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | undefined>();
  const [selectedClients, setSelectedClients] = useState<number[]>([]);

  // Mock household data
  const household = {
    id: 1,
    name: "Smith Family Trust",
    totalAUM: 1250000,
    members: [
      { id: 1, name: "John Smith", email: "john@example.com", priority: "A", aum: 500000, completion: 95 },
      { id: 2, name: "Jane Smith", email: "jane@example.com", priority: "A", aum: 400000, completion: 88 },
      { id: 3, name: "Smith Jr. Trust", email: "trust@example.com", priority: "B", aum: 350000, completion: 65 },
    ] as Client[]
  };

  const handleEditClient = (clientId: number) => {
    setSelectedClientId(clientId.toString());
    setIsModalOpen(true);
  };

  const handleCreateClient = () => {
    setSelectedClientId('new');
    setIsModalOpen(true);
  };

  const handleDuplicateClient = (client: Client) => {
    toast({
      title: "Client Duplicated",
      description: `${client.name} has been duplicated.`,
    });
  };

  const handleDeleteClient = (client: Client) => {
    toast({
      title: "Client Removed",
      description: `${client.name} has been removed from the household.`,
      variant: "destructive",
    });
  };

  const handleSendToClient = (client: Client) => {
    toast({
      title: "Message Sent",
      description: `Profile update notification sent to ${client.name}.`,
    });
  };

  const handleSelectClient = (clientId: number) => {
    setSelectedClients(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleExportSelected = () => {
    toast({
      title: "Export Started",
      description: `Exporting data for ${selectedClients.length} selected clients.`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Households
          </Button>
          <div>
            <h1 className="text-3xl font-serif font-bold">{household.name}</h1>
            <p className="text-muted-foreground">Manage household members and profiles</p>
          </div>
        </div>
        <Button onClick={handleCreateClient} className="btn-hero flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Client to Household
        </Button>
      </div>

      {/* Household Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-elegant animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{household.members.length}</div>
            <p className="text-xs text-muted-foreground">Active clients</p>
          </CardContent>
        </Card>

        <Card className="card-elegant animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Combined AUM</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(household.totalAUM / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Total household assets</p>
          </CardContent>
        </Card>

        <Card className="card-elegant animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
            <Progress className="h-4 w-4 text-muted-foreground" value={83} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83%</div>
            <p className="text-xs text-muted-foreground">Average progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions */}
      {selectedClients.length > 0 && (
        <Card className="card-elegant animate-slide-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedClients.length} clients selected
              </span>
              <div className="flex items-center gap-2">
                <Button onClick={handleExportSelected} variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Client List */}
      <Card className="card-elegant animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <CardHeader>
          <CardTitle>Household Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {household.members.map((client, index) => (
              <div key={client.id} className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 ${selectedClients.includes(client.id) ? 'ring-2 ring-primary' : ''}`}>
                <div className="flex items-center gap-4">
                  <Input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectedClients.includes(client.id)}
                    onChange={() => handleSelectClient(client.id)}
                  />
                  <div className="flex items-center gap-3">
                    <Badge className={`priority-${client.priority.toLowerCase()}`}>
                      {client.priority}
                    </Badge>
                    <div>
                      <h3 className="font-semibold text-lg">{client.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{client.email}</span>
                        <span>${client.aum.toLocaleString()} AUM</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-semibold">{client.completion}%</div>
                    <Progress value={client.completion} className="w-32" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditClient(client.id)} className="flex items-center gap-1">
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDuplicateClient(client)} className="flex items-center gap-1">
                      <Copy className="w-3 h-3" />
                      Duplicate
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleSendToClient(client)} className="flex items-center gap-1">
                      <Send className="w-3 h-3" />
                      Send
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteClient(client)} className="flex items-center gap-1 text-destructive hover:text-destructive">
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
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
        userRole="advisor"
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
    </div>
  );
}