
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { StatusBadge } from '@/components/StatusBadge';
import { Search, Clock, CalendarDays, BarChart, MessageSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Define the StatusType locally to match what StatusBadge expects
type StatusType = 'pending' | 'in-progress' | 'resolved' | 'closed';

// Mock data for demo with proper typing
const mockIssues = [
  { 
    id: "ISSUE-1023", 
    title: "Broken AC in Library Study Room", 
    status: "in-progress" as StatusType, 
    category: "facilities", 
    dateSubmitted: "2023-05-15", 
    lastUpdated: "2023-05-18",
    comments: [
      { author: "Maintenance Team", date: "2023-05-16", text: "We've inspected the AC and ordered replacement parts." },
      { author: "Maintenance Team", date: "2023-05-18", text: "Parts have arrived, repair scheduled for tomorrow." }
    ]
  },
  { 
    id: "ISSUE-1019", 
    title: "Wi-Fi Connectivity Issues in Dorm Building C", 
    status: "resolved" as StatusType, 
    category: "technical", 
    dateSubmitted: "2023-05-10", 
    lastUpdated: "2023-05-14",
    comments: [
      { author: "IT Support", date: "2023-05-11", text: "We're looking into the network access points in this building." },
      { author: "IT Support", date: "2023-05-14", text: "All access points have been reset and connections improved. Please let us know if issues persist." }
    ]
  },
  { 
    id: "ISSUE-1021", 
    title: "Water Fountain Leaking in Science Building", 
    status: "pending" as StatusType, 
    category: "facilities", 
    dateSubmitted: "2023-05-12", 
    lastUpdated: "2023-05-12",
    comments: []
  }
];

export default function IssueTracker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<typeof mockIssues[0] | null>(null);
  
  const filteredIssues = mockIssues.filter(issue => 
    issue.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    issue.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="animate-blur-in space-y-8">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Track Your Issues</CardTitle>
          <CardDescription>
            Enter an issue ID or search by keywords to check the status of your reported issues.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter issue ID or keywords..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium mb-4">Results</h3>
          
          {filteredIssues.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="p-6 text-center text-muted-foreground">
                <p>No issues found matching your search.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredIssues.map(issue => (
                <Card 
                  key={issue.id} 
                  className={`glass-card cursor-pointer transition-all hover:shadow-md ${selectedIssue?.id === issue.id ? 'border-primary' : ''}`}
                  onClick={() => setSelectedIssue(issue)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">{issue.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{issue.id}</p>
                      </div>
                      <StatusBadge status={issue.status} />
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Last updated: {issue.lastUpdated}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium mb-4">Issue Details</h3>
          
          {!selectedIssue ? (
            <Card className="glass-card">
              <CardContent className="p-8 text-center text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
                <p>Select an issue to view its details</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedIssue.title}</CardTitle>
                    <CardDescription>{selectedIssue.id} • {selectedIssue.category.charAt(0).toUpperCase() + selectedIssue.category.slice(1)}</CardDescription>
                  </div>
                  <StatusBadge status={selectedIssue.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs">Date Submitted</Label>
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      {selectedIssue.dateSubmitted}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Last Updated</Label>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {selectedIssue.lastUpdated}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs">Progress</Label>
                  <div className="h-2 rounded-full bg-secondary">
                    <div 
                      className={`h-full rounded-full ${
                        selectedIssue.status === 'pending' ? 'w-1/4 bg-yellow-400' :
                        selectedIssue.status === 'in-progress' ? 'w-1/2 bg-blue-500' :
                        selectedIssue.status === 'resolved' ? 'w-full bg-green-500' : 'w-0'
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Submitted</span>
                    <span>In Progress</span>
                    <span>Resolved</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <h4 className="font-medium">Updates & Comments</h4>
                  </div>
                  
                  {selectedIssue.comments.length === 0 ? (
                    <div className="text-sm text-muted-foreground text-center bg-muted/30 rounded-md p-4">
                      No updates yet. Check back later.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedIssue.comments.map((comment, index) => (
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
              <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm">
                  Request Update
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
