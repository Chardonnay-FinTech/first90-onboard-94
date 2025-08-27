import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MeetingsProps {
  userRole: 'advisor' | 'assistant' | 'client';
}

interface Meeting {
  id: number;
  title: string;
  client: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
}

export default function Meetings({ userRole }: MeetingsProps) {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 1,
      title: "Initial Consultation",
      client: "John Smith",
      date: "2024-01-15",
      time: "10:00",
      duration: "60",
      type: "consultation",
      status: "scheduled",
      notes: "Discuss investment goals and risk tolerance"
    },
    {
      id: 2,
      title: "Portfolio Review",
      client: "Sarah Johnson",
      date: "2024-01-16",
      time: "14:00",
      duration: "45",
      type: "review",
      status: "completed",
      notes: "Quarterly portfolio review completed"
    }
  ]);

  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    client: "",
    date: "",
    time: "",
    duration: "60",
    type: "consultation",
    notes: ""
  });

  const mockClients = [
    "John Smith",
    "Sarah Johnson", 
    "Michael Brown",
    "Emily Davis"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMeeting) {
      // Update existing meeting
      const updatedMeetings = meetings.map(meeting => 
        meeting.id === editingMeeting.id 
          ? { ...meeting, ...newMeeting }
          : meeting
      );
      setMeetings(updatedMeetings);
      
      toast({
        title: "Meeting Updated", 
        description: `Meeting with ${newMeeting.client} has been updated. Email notification sent.`,
      });
    } else {
      // Create new meeting
      const meeting: Meeting = {
        id: meetings.length + 1,
        ...newMeeting,
        status: "scheduled"
      };

      setMeetings([...meetings, meeting]);
      
      toast({
        title: "Meeting Scheduled",
        description: `Meeting with ${newMeeting.client} has been scheduled. Email notification sent.`,
      });
    }

    setNewMeeting({
      title: "",
      client: "",
      date: "",
      time: "",
      duration: "60", 
      type: "consultation",
      notes: ""
    });
    setShowForm(false);
    setEditingMeeting(null);
  };

  const handleEditMeeting = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    setNewMeeting({
      title: meeting.title,
      client: meeting.client,
      date: meeting.date,
      time: meeting.time,
      duration: meeting.duration,
      type: meeting.type,
      notes: meeting.notes
    });
    setShowForm(true);
  };

  const handleDeleteMeeting = (meetingId: number) => {
    const meeting = meetings.find(m => m.id === meetingId);
    setMeetings(meetings.filter(m => m.id !== meetingId));
    
    toast({
      title: "Meeting Cancelled",
      description: `Meeting with ${meeting?.client} has been cancelled. Email notification sent.`,
      variant: "destructive"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-serif font-bold">Meetings</h1>
          <p className="text-muted-foreground">Schedule and manage client meetings</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="btn-hero flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Schedule Meeting
        </Button>
      </div>

      {/* Meeting Form */}
      {showForm && (
        <Card className="card-elegant animate-slide-in">
          <CardHeader>
            <CardTitle>{editingMeeting ? 'Edit Meeting' : 'Schedule New Meeting'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Meeting Title</Label>
                  <Input
                    id="title"
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                    placeholder="Initial Consultation"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Select value={newMeeting.client} onValueChange={(value) => setNewMeeting({...newMeeting, client: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClients.map((client) => (
                        <SelectItem key={client} value={client}>{client}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select value={newMeeting.duration} onValueChange={(value) => setNewMeeting({...newMeeting, duration: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Meeting Type</Label>
                  <Select value={newMeeting.type} onValueChange={(value) => setNewMeeting({...newMeeting, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Initial Consultation</SelectItem>
                      <SelectItem value="review">Portfolio Review</SelectItem>
                      <SelectItem value="planning">Financial Planning</SelectItem>
                      <SelectItem value="followup">Follow-up</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newMeeting.notes}
                  onChange={(e) => setNewMeeting({...newMeeting, notes: e.target.value})}
                  placeholder="Meeting agenda or notes..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">{editingMeeting ? 'Update Meeting' : 'Schedule Meeting'}</Button>
                <Button type="button" variant="outline" onClick={() => {
                  setShowForm(false);
                  setEditingMeeting(null);
                  setNewMeeting({
                    title: "",
                    client: "",
                    date: "",
                    time: "",
                    duration: "60", 
                    type: "consultation",
                    notes: ""
                  });
                }}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Meetings List */}
      <div className="space-y-4">
        {meetings.map((meeting, index) => (
          <Card key={meeting.id} className={`card-elegant animate-scale-in`} style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{meeting.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{meeting.time} ({meeting.duration}min)</span>
                  </div>
                  <Badge className={getStatusColor(meeting.status)}>
                    {meeting.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditMeeting(meeting)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDeleteMeeting(meeting.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-lg">{meeting.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{meeting.client}</span>
                </div>
                {meeting.notes && (
                  <p className="text-sm text-muted-foreground mt-2">{meeting.notes}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {meetings.length === 0 && (
          <Card className="card-elegant">
            <CardContent className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No meetings scheduled</h3>
              <p className="text-muted-foreground">Create your first meeting to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}