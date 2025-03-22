
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Star } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Mock data for student feedback
const mockFeedback = [
  {
    id: "F1001",
    title: "Course Material Suggestions",
    category: "Academic",
    dateSubmitted: "2023-09-17",
    rating: 4,
    status: "Reviewed",
    description: "The course materials could be more interactive. I suggest adding more practical examples.",
    response: "Thank you for your suggestion. We are working to improve course materials for the next semester."
  },
  {
    id: "F1002",
    title: "Cafeteria Menu Feedback",
    category: "Facilities",
    dateSubmitted: "2023-09-05",
    rating: 3,
    status: "Pending",
    description: "I would like to see more vegetarian options in the cafeteria menu.",
    response: ""
  },
  {
    id: "F1003",
    title: "Library Hours Extension Request",
    category: "Facilities",
    dateSubmitted: "2023-09-12",
    rating: 5,
    status: "Implemented",
    description: "Many students need more time in the library during exam periods. Could the library extend hours?",
    response: "We've extended library hours from 8AM-10PM to 7AM-12AM during exam weeks."
  }
];

export default function FeedbackTab() {
  const [filterDate, setFilterDate] = React.useState<Date | undefined>(undefined);
  const [selectedFeedback, setSelectedFeedback] = React.useState<typeof mockFeedback[0] | null>(null);
  
  // Filter feedback based on date if selected
  const filteredFeedback = filterDate 
    ? mockFeedback.filter(feedback => 
        new Date(feedback.dateSubmitted).toDateString() === filterDate.toDateString()
      )
    : mockFeedback;
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'reviewed':
        return <Badge variant="warning">Reviewed</Badge>;
      case 'implemented':
        return <Badge variant="success">Implemented</Badge>;
      case 'declined':
        return <Badge variant="destructive">Declined</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <Star 
            key={star} 
            className={`h-4 w-4 ${star <= rating ? 'text-amber-400' : 'text-gray-300'}`} 
            fill={star <= rating ? 'currentColor' : 'none'} 
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-2xl font-semibold">My Feedback</h2>
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
            {filteredFeedback.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  <p>No feedback found for the selected date.</p>
                </CardContent>
              </Card>
            ) : (
              filteredFeedback.map(feedback => (
                <Card 
                  key={feedback.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${selectedFeedback?.id === feedback.id ? 'border-primary' : ''}`}
                  onClick={() => setSelectedFeedback(feedback)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-medium">{feedback.title}</h3>
                        <p className="text-xs text-muted-foreground">{feedback.id} • {feedback.category}</p>
                      </div>
                      {getStatusBadge(feedback.status)}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{feedback.dateSubmitted}</span>
                      </div>
                      <div className="flex">
                        {renderStars(feedback.rating)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
        
        <div className="md:col-span-2">
          {!selectedFeedback ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                <Star className="h-8 w-8 mx-auto mb-3 opacity-50" />
                <p>Select feedback to view details</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{selectedFeedback.title}</CardTitle>
                  {getStatusBadge(selectedFeedback.status)}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-muted-foreground">
                    {selectedFeedback.id} • {selectedFeedback.category}
                  </p>
                  {renderStars(selectedFeedback.rating)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Date Submitted</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {selectedFeedback.dateSubmitted}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Your Feedback</p>
                  <p className="text-sm bg-secondary/20 p-3 rounded-md">
                    {selectedFeedback.description}
                  </p>
                </div>
                
                {selectedFeedback.response && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Response</p>
                      <div className="bg-secondary/20 rounded-lg p-3">
                        <p className="text-sm">{selectedFeedback.response}</p>
                      </div>
                    </div>
                  </>
                )}
                
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    Request Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
