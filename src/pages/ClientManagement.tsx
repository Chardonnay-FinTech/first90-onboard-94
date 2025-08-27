import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, Download, Edit, Send, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ClientManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClients, setSelectedClients] = useState<number[]>([]);

  const mockClients = [
    { id: 1, name: "John Smith", email: "john@example.com", phone: "(555) 123-4567", priority: "A", aum: 500000, completion: 95 },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", phone: "(555) 234-5678", priority: "B", aum: 250000, completion: 78 },
    { id: 3, name: "Michael Brown", email: "michael@example.com", phone: "(555) 345-6789", priority: "A", aum: 750000, completion: 85 },
    { id: 4, name: "Emily Davis", email: "emily@example.com", phone: "(555) 456-7890", priority: "C", aum: 150000, completion: 45 },
  ];

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectClient = (clientId: number) => {
    setSelectedClients(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = () => {
    setSelectedClients(
      selectedClients.length === filteredClients.length
        ? []
        : filteredClients.map(client => client.id)
    );
  };

  const handleExportSelected = () => {
    toast({
      title: "Export Started",
      description: `Exporting data for ${selectedClients.length} selected clients.`,
    });
  };

  const handleCreateClient = () => {
    window.location.href = '/client-profile/new';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-serif font-bold">Manage Clients</h1>
          <p className="text-muted-foreground">View, edit, and manage client onboarding</p>
        </div>
        <Button onClick={handleCreateClient} className="btn-hero flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create New Client
        </Button>
      </div>

      {/* Search and Actions */}
      <Card className="card-elegant animate-slide-in">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-3">
              {selectedClients.length > 0 && (
                <Button onClick={handleExportSelected} variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Selected ({selectedClients.length})
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Checkbox
            checked={selectedClients.length === filteredClients.length && filteredClients.length > 0}
            onCheckedChange={handleSelectAll}
          />
          <span className="text-sm text-muted-foreground">
            Select All ({filteredClients.length} clients)
          </span>
        </div>

        <div className="grid gap-4">
          {filteredClients.map((client, index) => (
            <Card key={client.id} className={`card-elegant animate-scale-in transition-all duration-200 ${selectedClients.includes(client.id) ? 'ring-2 ring-primary' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={selectedClients.includes(client.id)}
                      onCheckedChange={() => handleSelectClient(client.id)}
                    />
                    <div className="flex items-center gap-3">
                      <Badge className={`priority-${client.priority.toLowerCase()}`}>
                        {client.priority}
                      </Badge>
                      <div>
                        <h3 className="font-semibold text-lg">{client.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{client.email}</span>
                          <span>{client.phone}</span>
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
                      <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => window.location.href = `/client-profile/${client.id}`}>
                        <Edit className="w-3 h-3" />
                        Edit Profile
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Send className="w-3 h-3" />
                        Send
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1 text-destructive hover:text-destructive">
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <Card className="card-elegant">
            <CardContent className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No clients found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or create a new client.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}