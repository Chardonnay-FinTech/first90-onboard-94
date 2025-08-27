
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Clock, User, Calendar, Phone } from "lucide-react";
import { MessageComposer } from "@/components/MessageComposer";
import { useToast } from "@/hooks/use-toast";

interface MessagesProps {
  userRole: 'advisor' | 'assistant' | 'client';
}

interface Message {
  id: number;
  from: string;
  to: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  type: 'message' | 'meeting_request';
}

export default function Messages({ userRole }: MessagesProps) {
  const { toast } = useToast();
  const [showComposer, setShowComposer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const mockMessages: Message[] = [
    {
      id: 1,
      from: "John Smith",
      to: "David Wilson",
      subject: "Question about investment allocation",
      preview: "Hi David, I wanted to ask about the recommended allocation for my portfolio...",
      timestamp: "2024-01-15 10:30 AM",
      read: false,
      type: 'message'
    },
    {
      id: 2,
      from: "Sarah Johnson", 
      to: "David Wilson",
      subject: "Meeting Request",
      preview: "Could we schedule a call to discuss my retirement planning?",
      timestamp: "2024-01-14 2:15 PM",
      read: true,
      type: 'meeting_request'
    },
    {
      id: 3,
      from: "Michael Brown",
      to: "Lisa Chen",
      subject: "Document upload confirmation",
      preview: "I've uploaded the requested documents to my profile...",
      timestamp: "2024-01-13 4:45 PM", 
      read: true,
      type: 'message'
    }
  ];

  const filteredMessages = mockMessages.filter(message =>
    message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMeetingRequest = (message: Message) => {
    if (userRole === 'client') return;
    
    toast({
      title: "Meeting Request",
      description: "Redirecting to schedule meeting...",
    });
    // Would redirect to meetings page with pre-filled client
  };

  const getMessageIcon = (type: string) => {
    return type === 'meeting_request' ? Calendar : MessageSquare;
  };

  const renderClientContactUs = () => (
    <div className="space-y-6">
      <Card className="card-elegant animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Contact Your Advisor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => setShowComposer(true)} 
            className="w-full btn-hero flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Send a Message
          </Button>
          <Button 
            onClick={() => handleMeetingRequest({} as Message)}
            variant="outline" 
            className="w-full flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Request a Meeting
          </Button>
        </CardContent>
      </Card>

      <Card className="card-elegant animate-slide-in">
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredMessages.map((message) => {
              const Icon = getMessageIcon(message.type);
              return (
                <div key={message.id} className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${!message.read ? 'bg-primary/5 border-primary/20' : ''}`}>
                  <div className="flex items-start gap-3">
                    <Icon className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{message.subject}</span>
                        {!message.read && <Badge variant="secondary" className="text-xs">New</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{message.preview}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{message.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (userRole === 'client') {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-serif font-bold">Contact Us</h1>
          <p className="text-muted-foreground">Get in touch with your advisor</p>
        </div>

        {renderClientContactUs()}

        <MessageComposer
          isOpen={showComposer}
          onClose={() => setShowComposer(false)}
          userRole={userRole}
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-serif font-bold">Messages</h1>
          <p className="text-muted-foreground">Communicate with clients and team members</p>
        </div>
        <Button onClick={() => setShowComposer(true)} className="btn-hero flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Compose Message
        </Button>
      </div>

      {/* Search */}
      <Card className="card-elegant animate-slide-in">
        <CardContent className="p-6">
          <div className="relative max-w-md">
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="grid gap-4">
        {filteredMessages.map((message, index) => {
          const Icon = getMessageIcon(message.type);
          return (
            <Card key={message.id} className={`card-elegant animate-scale-in cursor-pointer hover:shadow-lg transition-all ${!message.read ? 'ring-2 ring-primary/20' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{message.subject}</h3>
                      {!message.read && <Badge variant="secondary">New</Badge>}
                      {message.type === 'meeting_request' && <Badge className="priority-a">Meeting Request</Badge>}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        From: {message.from}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3">{message.preview}</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Reply</Button>
                      {message.type === 'meeting_request' && (
                        <Button onClick={() => handleMeetingRequest(message)} size="sm" className="btn-hero">
                          Schedule Meeting
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredMessages.length === 0 && (
        <Card className="card-elegant">
          <CardContent className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No messages found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search criteria." : "Start a conversation with your clients."}
            </p>
            <Button onClick={() => setShowComposer(true)} className="btn-hero flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Compose Message
            </Button>
          </CardContent>
        </Card>
      )}

      <MessageComposer
        isOpen={showComposer}
        onClose={() => setShowComposer(false)}
        userRole={userRole}
      />
    </div>
  );
}
