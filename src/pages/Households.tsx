import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Plus, Edit, Trash2, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Household {
  id: number;
  name: string;
  memberCount: number;
  totalAUM: number;
  members: string[];
}

export default function Households() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const mockHouseholds: Household[] = [
    {
      id: 1,
      name: "Smith Family Trust",
      memberCount: 3,
      totalAUM: 1250000,
      members: ["John Smith", "Jane Smith", "Smith Jr. Trust"]
    },
    {
      id: 2,
      name: "Johnson Retirement Accounts",
      memberCount: 2,
      totalAUM: 850000,
      members: ["Sarah Johnson", "Mark Johnson"]
    },
    {
      id: 3,
      name: "Brown Estate",
      memberCount: 4,
      totalAUM: 2100000,
      members: ["Michael Brown", "Lisa Brown", "Brown Family LLC", "Brown Foundation"]
    }
  ];

  const filteredHouseholds = mockHouseholds.filter(household =>
    household.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    household.members.some(member => member.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateHousehold = () => {
    toast({
      title: "Create Household",
      description: "Opening new household creation form...",
    });
  };

  const handleEditHousehold = (householdId: number) => {
    window.location.href = `/household-detail`;
  };

  const handleDeleteHousehold = (householdName: string) => {
    toast({
      title: "Household Deleted",
      description: `${householdName} has been removed.`,
      variant: "destructive",
    });
  };

  const totalHouseholds = mockHouseholds.length;
  const totalCombinedAUM = mockHouseholds.reduce((sum, h) => sum + h.totalAUM, 0);
  const avgHouseholdSize = mockHouseholds.reduce((sum, h) => sum + h.memberCount, 0) / mockHouseholds.length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-serif font-bold">Households</h1>
          <p className="text-muted-foreground">Manage family and entity groupings</p>
        </div>
        <Button onClick={handleCreateHousehold} className="btn-hero flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Household
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-elegant animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Households</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHouseholds}</div>
            <p className="text-xs text-muted-foreground">Active household groups</p>
          </CardContent>
        </Card>

        <Card className="card-elegant animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Combined AUM</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalCombinedAUM / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Total household assets</p>
          </CardContent>
        </Card>

        <Card className="card-elegant animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgHouseholdSize.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Members per household</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="card-elegant animate-slide-in">
        <CardContent className="p-6">
          <div className="relative max-w-md">
            <Input
              placeholder="Search households by name or member..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Households Grid */}
      <div className="grid gap-6">
        {filteredHouseholds.map((household, index) => (
          <Card key={household.id} className="card-elegant animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">{household.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {household.memberCount} members
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        ${household.totalAUM.toLocaleString()} AUM
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {household.members.map((member, memberIndex) => (
                        <Badge key={memberIndex} variant="outline" className="text-xs">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => handleEditHousehold(household.id)}
                  >
                    <Edit className="w-3 h-3" />
                    Open
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1 text-destructive hover:text-destructive"
                    onClick={() => handleDeleteHousehold(household.name)}
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHouseholds.length === 0 && (
        <Card className="card-elegant">
          <CardContent className="text-center py-12">
            <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No households found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search criteria." : "Create your first household to group related clients."}
            </p>
            <Button onClick={handleCreateHousehold} className="btn-hero flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Household
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}