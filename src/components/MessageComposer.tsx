import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MessageComposerProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: 'advisor' | 'assistant' | 'client';
  preselectedClient?: string;
}

export const MessageComposer = ({ isOpen, onClose, userRole, preselectedClient }: MessageComposerProps) => {
  const { toast } = useToast();
  const [message, setMessage] = useState({
    to: preselectedClient || "",
    subject: "",
    body: ""
  });

  const mockClients = [
    "John Smith",
    "Sarah Johnson", 
    "Michael Brown",
    "Emily Davis"
  ];

  const mockAdvisors = [
    "David Wilson - Advisor",
    "Lisa Chen - Senior Advisor"
  ];

  const handleSend = () => {
    if (!message.to || !message.subject || !message.body) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent",
      description: `Message sent to ${message.to}`,
    });
    
    setMessage({ to: preselectedClient || "", subject: "", body: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Compose Message</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Select value={message.to} onValueChange={(value) => setMessage({...message, to: value})}>
              <SelectTrigger>
                <SelectValue placeholder={userRole === 'client' ? "Select advisor" : "Select client"} />
              </SelectTrigger>
              <SelectContent>
                {userRole === 'client' ? (
                  mockAdvisors.map((advisor) => (
                    <SelectItem key={advisor} value={advisor}>{advisor}</SelectItem>
                  ))
                ) : (
                  mockClients.map((client) => (
                    <SelectItem key={client} value={client}>{client}</SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={message.subject}
              onChange={(e) => setMessage({...message, subject: e.target.value})}
              placeholder="Enter subject line"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="body">Message</Label>
            <Textarea
              id="body"
              value={message.body}
              onChange={(e) => setMessage({...message, body: e.target.value})}
              placeholder="Type your message here..."
              rows={8}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSend} className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};