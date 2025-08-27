import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, FileText, Eye, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  clientId?: number;
  clientName?: string;
}

interface DocumentsProps {
  userRole: 'advisor' | 'assistant' | 'client';
}

export default function Documents({ userRole }: DocumentsProps) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const mockDocuments: Document[] = [
    {
      id: 1,
      name: "Driver_License_Front.pdf",
      type: "ID Document",
      size: "2.3 MB",
      uploadedBy: "John Smith",
      uploadDate: "2024-01-15",
      clientId: 1,
      clientName: "John Smith"
    },
    {
      id: 2,
      name: "W9_Form.pdf",
      type: "Tax Form",
      size: "1.1 MB",
      uploadedBy: "Sarah Johnson",
      uploadDate: "2024-01-14",
      clientId: 2,
      clientName: "Sarah Johnson"
    },
    {
      id: 3,
      name: "Bank_Statement.pdf",
      type: "Financial",
      size: "3.7 MB",
      uploadedBy: "Michael Brown",
      uploadDate: "2024-01-13",
      clientId: 3,
      clientName: "Michael Brown"
    }
  ];

  const filteredDocuments = mockDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.clientName && doc.clientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpload = () => {
    toast({
      title: "Upload Document",
      description: "Document upload feature would open here.",
    });
  };

  const handleDownload = (docName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${docName}...`,
    });
  };

  const handleDelete = (docName: string) => {
    toast({
      title: "Document Deleted",
      description: `${docName} has been removed.`,
      variant: "destructive",
    });
  };

  const getDocumentIcon = (type: string) => {
    return FileText;
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'id document': return 'priority-a';
      case 'tax form': return 'priority-b';
      case 'financial': return 'priority-c';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-serif font-bold">Documents</h1>
          <p className="text-muted-foreground">
            {userRole === 'client' 
              ? "Upload and manage your documents" 
              : "View and manage client documents"}
          </p>
        </div>
        <Button onClick={handleUpload} className="btn-hero flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="card-elegant animate-slide-in">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">Total: {filteredDocuments.length}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid gap-4">
        {filteredDocuments.map((document, index) => {
          const DocIcon = getDocumentIcon(document.type);
          return (
            <Card key={document.id} className="card-elegant animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <DocIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{document.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Badge className={getTypeColor(document.type)}>
                          {document.type}
                        </Badge>
                        <span>{document.size}</span>
                        {userRole !== 'client' && document.clientName && (
                          <span>Client: {document.clientName}</span>
                        )}
                        <span>Uploaded: {new Date(document.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleDownload(document.name)}
                    >
                      <Download className="w-3 h-3" />
                      Download
                    </Button>
                    {(userRole === 'advisor' || (userRole === 'client' && document.uploadedBy === 'You')) && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(document.name)}
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredDocuments.length === 0 && (
        <Card className="card-elegant">
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No documents found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search criteria." : "Start by uploading your first document."}
            </p>
            <Button onClick={handleUpload} className="btn-hero flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Upload Document
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}