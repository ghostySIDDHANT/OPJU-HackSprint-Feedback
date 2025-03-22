
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, MessageSquare } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Mock data for student reports
const mockReports = [
  {
    id: "R1001",
    title: "Wi-Fi Issues in Library",
    category: "Technical",
    dateSubmitted: "2023-09-15",
    lastUpdated: "2023-09-18",
    location: "Library, 2nd Floor",
    status: "Pending",
    description: "Poor Wi-Fi connection in the library study areas, particularly on the second floor.",
    comments: [
      { author: "IT Support", date: "2023-09-16", text: "We're investigating the issue and will update soon." }
    ]
  },
  {
    id: "R1002",
    title: "Water Fountain Repair",
    category: "Facilities",
    dateSubmitted: "2023-09-10",
    lastUpdated: "2023-09-12",
    location: "Science Building, 1st Floor",
    status: "Resolved",
    description: "The water fountain near the main entrance is leaking and needs repair.",
    comments: [
      { author: "Maintenance Team", date: "2023-09-11", text: "The repair team has been notified." },
      { author: "Maintenance Team", date: "2023-09-12", text: "The water fountain has been repaired and is now working properly." }
    ]
  },
  {
    id: "R1003",
    title: "Classroom Projector Not Working",
    category: "Equipment",
    dateSubmitted: "2023-09-20",
    lastUpdated: "2023-09-20",
    location: "Arts Building, Room 105",
    status: "In Progress",
    description: "The projector in Room 105 is not connecting to laptops properly.",
    comments: []
  }
];

export default function ReportsTab() {
  const [filterDate, setFilterDate] = React.useState<Date | undefined>(undefined);
  const [selectedReport, setSelectedReport] = React.useState<typeof mockReports[0] | null>(null);
  
  // Filter reports based on date if selected
  const filteredReports = filterDate 
    ? mockReports.filter(report => 
        new Date(report.dateSubmitted).toDateString() === filterDate.toDateString()
      )
    : mockReports;
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'in progress':
        return <Badge variant="warning">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolved</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-2xl font-semibold">My Reports</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter by date:</span>
          <DatePicker 
            date={filterDate} 
            setDate={setFilterDate} 
            className="w-[200px]" 
          />
          {filterDate && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setFilterDate(undefined)}
              className="h-9"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="space-y-3">
            {filteredReports.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  <p>No reports found for the selected date.</p>
                </CardContent>
              </Card>
            ) : (
              filteredReports.map(report => (
                <Card 
                  key={report.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${selectedReport?.id === report.id ? 'border-primary' : ''}`}
                  onClick={() => setSelectedReport(report)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-xs text-muted-foreground">{report.id} • {report.category}</p>
                      </div>
                      {getStatusBadge(report.status)}
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Submitted: {report.dateSubmitted}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
        
        <div className="md:col-span-2">
          {!selectedReport ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                <MessageSquare className="h-8 w-8 mx-auto mb-3 opacity-50" />
                <p>Select a report to view details</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{selectedReport.title}</CardTitle>
                  {getStatusBadge(selectedReport.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedReport.id} • {selectedReport.category}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Date Submitted</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {selectedReport.dateSubmitted}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Last Updated</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {selectedReport.lastUpdated}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Location</p>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {selectedReport.location}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Description</p>
                  <p className="text-sm bg-secondary/20 p-3 rounded-md">
                    {selectedReport.description}
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">Updates & Comments</h4>
                    <Button variant="outline" size="sm">
                      Request Update
                    </Button>
                  </div>
                  
                  {selectedReport.comments.length === 0 ? (
                    <div className="text-sm text-muted-foreground text-center bg-muted/30 rounded-md p-4">
                      No updates yet. Check back later.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedReport.comments.map((comment, index) => (
                        <div key={index} className="bg-secondary/20 rounded-lg p-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium">{comment.author}</span>
                            <span className="text-muted-foreground">{comment.date}</span>
                          </div>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
