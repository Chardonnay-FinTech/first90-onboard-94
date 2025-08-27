import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Save, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClientData {
  // Profile
  legalFirst: string;
  legalMiddle: string;
  legalLast: string;
  suffix: string;
  preferredName: string;
  email: string;
  mobile: string;
  smsOptIn: boolean;
  altPhone: string;
  residentialStreet: string;
  residentialUnit: string;
  residentialCity: string;
  residentialState: string;
  residentialZip: string;
  mailingIsSame: boolean;
  mailingStreet: string;
  mailingUnit: string;
  mailingCity: string;
  mailingState: string;
  mailingZip: string;
  ssn: string;
  dob: string;
  birthPlace: string;
  citizenship: string;
  country: string;
  taxId: string;
  visaType: string;
  maritalStatus: string;
  dependents: number;
  
  // Employment
  employmentStatus: string;
  employer: string;
  occupation: string;
  industry: string;
  annualIncome: string;
  netWorth: string;
  liquidNetWorth: string;
  sourceOfFunds: string[];
  
  // Bank & Funding
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: string;
  fundingMethod: string;
  recurringContribution: boolean;
  
  // Advisory
  advisoryProgram: string;
  advisoryFee: number;
  estimatedAUM: string;
  
  // Notes
  notes: string;
}

interface ClientProfileFormProps {
  clientId?: string;
  userRole: 'advisor' | 'assistant' | 'client';
  isEditing?: boolean;
  onSave?: (data: ClientData) => void;
  onSend?: (data: ClientData) => void;
}

export const ClientProfileForm = ({ 
  clientId, 
  userRole, 
  isEditing = false,
  onSave,
  onSend 
}: ClientProfileFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ClientData>({
    // Initialize with empty values
    legalFirst: '', legalMiddle: '', legalLast: '', suffix: '',
    preferredName: '', email: '', mobile: '', smsOptIn: false, altPhone: '',
    residentialStreet: '', residentialUnit: '', residentialCity: '', 
    residentialState: '', residentialZip: '', mailingIsSame: true,
    mailingStreet: '', mailingUnit: '', mailingCity: '', 
    mailingState: '', mailingZip: '', ssn: '', dob: '',
    birthPlace: '', citizenship: 'US', country: '', taxId: '', 
    visaType: '', maritalStatus: '', dependents: 0,
    employmentStatus: '', employer: '', occupation: '', industry: '',
    annualIncome: '', netWorth: '', liquidNetWorth: '', sourceOfFunds: [],
    bankName: '', routingNumber: '', accountNumber: '', accountType: '',
    fundingMethod: '', recurringContribution: false,
    advisoryProgram: '', advisoryFee: 0, estimatedAUM: '',
    notes: ''
  });

  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [activeTab, setActiveTab] = useState("profile");

  // Calculate completion percentage
  useEffect(() => {
    const requiredFields = [
      'legalFirst', 'legalLast', 'email', 'mobile', 'residentialStreet',
      'residentialCity', 'residentialState', 'residentialZip', 'ssn', 'dob',
      'citizenship', 'employmentStatus'
    ];
    
    const completedFields = requiredFields.filter(field => 
      formData[field as keyof ClientData] && 
      String(formData[field as keyof ClientData]).trim() !== ''
    );
    
    setCompletionPercentage((completedFields.length / requiredFields.length) * 100);
  }, [formData]);

  const handleInputChange = (field: keyof ClientData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave?.(formData);
    toast({
      title: "Profile Saved",
      description: "Your client profile has been saved successfully.",
    });
  };

  const handleSaveAndSend = () => {
    onSave?.(formData);
    onSend?.(formData);
    toast({
      title: "Profile Saved & Sent",
      description: "Your profile has been saved and your advisor has been notified.",
    });
  };

  const tabSections = [
    { id: "profile", label: "Profile", icon: CheckCircle },
    { id: "employment", label: "Employment", icon: CheckCircle },
    { id: "banking", label: "Banking", icon: AlertCircle },
    { id: "advisory", label: "Advisory", icon: AlertCircle },
    { id: "notes", label: "Notes", icon: CheckCircle },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="card-elegant rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-serif font-bold">Client Profile</h1>
            <p className="text-muted-foreground">Complete your information for account opening</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{Math.round(completionPercentage)}%</div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </div>
        </div>
        
        <Progress value={completionPercentage} className="mb-4" />
        
        <div className="flex flex-wrap gap-2">
          {tabSections.map((section) => (
            <Badge 
              key={section.id}
              variant={activeTab === section.id ? "default" : "outline"}
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setActiveTab(section.id)}
            >
              <section.icon className="w-3 h-3" />
              {section.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Form Sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          {tabSections.map((section) => (
            <TabsTrigger key={section.id} value={section.id}>
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Profile Section */}
        <TabsContent value="profile">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="legalFirst">Legal First Name *</Label>
                  <Input 
                    id="legalFirst"
                    value={formData.legalFirst}
                    onChange={(e) => handleInputChange('legalFirst', e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legalMiddle">Middle Name</Label>
                  <Input 
                    id="legalMiddle"
                    value={formData.legalMiddle}
                    onChange={(e) => handleInputChange('legalMiddle', e.target.value)}
                    placeholder="Michael"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legalLast">Legal Last Name *</Label>
                  <Input 
                    id="legalLast"
                    value={formData.legalLast}
                    onChange={(e) => handleInputChange('legalLast', e.target.value)}
                    placeholder="Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="suffix">Suffix</Label>
                  <Select value={formData.suffix} onValueChange={(value) => handleInputChange('suffix', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jr">Jr.</SelectItem>
                      <SelectItem value="Sr">Sr.</SelectItem>
                      <SelectItem value="II">II</SelectItem>
                      <SelectItem value="III">III</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john.smith@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Phone *</Label>
                  <Input 
                    id="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ssn">SSN/ITIN *</Label>
                  <Input 
                    id="ssn"
                    type={userRole === 'client' ? 'password' : 'text'}
                    value={formData.ssn}
                    onChange={(e) => handleInputChange('ssn', e.target.value)}
                    placeholder="XXX-XX-XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input 
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="citizenship">Citizenship *</Label>
                  <Select value={formData.citizenship} onValueChange={(value) => handleInputChange('citizenship', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">US Citizen</SelectItem>
                      <SelectItem value="Non-US">Non-US Citizen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employment Section */}
        <TabsContent value="employment">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle>Employment & Income</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employmentStatus">Employment Status *</Label>
                  <Select value={formData.employmentStatus} onValueChange={(value) => handleInputChange('employmentStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Employed">Employed</SelectItem>
                      <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                      <SelectItem value="Unemployed">Unemployed</SelectItem>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input 
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income</Label>
                  <Select value={formData.annualIncome} onValueChange={(value) => handleInputChange('annualIncome', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<50k">Less than $50,000</SelectItem>
                      <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                      <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                      <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                      <SelectItem value="500k+">$500,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="netWorth">Net Worth</Label>
                  <Select value={formData.netWorth} onValueChange={(value) => handleInputChange('netWorth', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<100k">Less than $100,000</SelectItem>
                      <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                      <SelectItem value="500k-1M">$500,000 - $1,000,000</SelectItem>
                      <SelectItem value="1M-5M">$1,000,000 - $5,000,000</SelectItem>
                      <SelectItem value="5M+">$5,000,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liquidNetWorth">Liquid Net Worth</Label>
                  <Select value={formData.liquidNetWorth} onValueChange={(value) => handleInputChange('liquidNetWorth', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<50k">Less than $50,000</SelectItem>
                      <SelectItem value="50k-250k">$50,000 - $250,000</SelectItem>
                      <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                      <SelectItem value="500k-1M">$500,000 - $1,000,000</SelectItem>
                      <SelectItem value="1M+">$1,000,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Banking Section */}
        <TabsContent value="banking">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle>Banking & Funding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input 
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                    placeholder="Chase Bank"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select value={formData.accountType} onValueChange={(value) => handleInputChange('accountType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Checking">Checking</SelectItem>
                      <SelectItem value="Savings">Savings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input 
                    id="routingNumber"
                    value={formData.routingNumber}
                    onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                    placeholder="XXXX-XXXX-X"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input 
                    id="accountNumber"
                    type={userRole === 'client' ? 'password' : 'text'}
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    placeholder="XXXXXXXXXX"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advisory Section */}
        <TabsContent value="advisory">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle>Advisory Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="advisoryProgram">Advisory Program</Label>
                  <Select value={formData.advisoryProgram} onValueChange={(value) => handleInputChange('advisoryProgram', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Growth">Growth Strategy</SelectItem>
                      <SelectItem value="Conservative">Conservative Strategy</SelectItem>
                      <SelectItem value="Income">Income Strategy</SelectItem>
                      <SelectItem value="Balanced">Balanced Strategy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedAUM">Estimated AUM</Label>
                  <Input 
                    id="estimatedAUM"
                    value={formData.estimatedAUM}
                    onChange={(e) => handleInputChange('estimatedAUM', e.target.value)}
                    placeholder="$100,000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Section */}
        <TabsContent value="notes">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="notes">Internal Notes</Label>
                <Textarea 
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Add any additional information or notes..."
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="sticky bottom-0 bg-background border-t p-4">
        <div className="flex gap-3 justify-end max-w-6xl mx-auto">
          <Button variant="outline" onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save
          </Button>
          <Button onClick={handleSaveAndSend} className="btn-hero flex items-center gap-2">
            <Send className="w-4 h-4" />
            Save & Send
          </Button>
        </div>
      </div>
    </div>
  );
};