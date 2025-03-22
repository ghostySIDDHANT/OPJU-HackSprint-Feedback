
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Star, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const mockFeedback = [
  {
    id: 'FDB-001',
    title: 'Great Campus Support',
    message: 'I wanted to thank the IT department for their quick response to my computer issues. They were very helpful and professional.',
    category: 'Service',
    rating: 5,
    date: '2023-11-21',
    sender: 'John Smith',
    status: 'new',
    tags: ['IT Support', 'Positive']
  },
  {
    id: 'FDB-002',
    title: 'Suggestion for Library Hours',
    message: 'I would like to suggest extending the library hours during exam weeks. Many students need a quiet place to study late at night.',
    category: 'Suggestion',
    rating: 4,
    date: '2023-11-20',
    sender: 'Sarah Johnson',
    status: 'reviewed',
    tags: ['Library', 'Hours', 'Improvements']
  },
  {
    id: 'FDB-003',
    title: 'Cafeteria Food Variety',
    message: 'There should be more vegetarian and vegan options in the cafeteria. The current selection is very limited.',
    category: 'Complaint',
    rating: 2,
    date: '2023-11-19',
    sender: 'Michael Brown',
    status: 'in-progress',
    tags: ['Cafeteria', 'Food', 'Vegetarian']
  },
  {
    id: 'FDB-004',
    title: 'Parking Issues',
    message: 'The parking situation on campus is becoming increasingly difficult. More spaces should be allocated for students.',
    category: 'Complaint',
    rating: 1,
    date: '2023-11-18',
    sender: 'Emma Wilson',
    status: 'new',
    tags: ['Parking', 'Urgent']
  },
  {
    id: 'FDB-005',
    title: 'Course Registration System',
    message: 'The new online course registration system is much more efficient than the previous one. Great improvement!',
    category: 'Compliment',
    rating: 5,
    date: '2023-11-17',
    sender: 'David Lee',
    status: 'resolved',
    tags: ['Registration', 'Online Systems', 'Positive']
  },
];

const AdminFeedback = () => {
  const [feedback, setFeedback] = useState(mockFeedback);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    document.title = 'Admin Feedback - Student Hub';
  }, []);

  useEffect(() => {
    let filtered = [...mockFeedback];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    // Apply rating filter
    if (ratingFilter !== 'all') {
      filtered = filtered.filter(item => item.rating === parseInt(ratingFilter));
    }
    
    // Apply tab filter
    if (activeTab === 'positive') {
      filtered = filtered.filter(item => item.rating >= 4);
    } else if (activeTab === 'negative') {
      filtered = filtered.filter(item => item.rating <= 2);
    } else if (activeTab === 'suggestions') {
      filtered = filtered.filter(item => item.category === 'Suggestion');
    }
    
    setFeedback(filtered);
  }, [searchTerm, categoryFilter, statusFilter, ratingFilter, activeTab]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <DashboardLayout type="admin">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Feedback Management</h1>
          <p className="text-muted-foreground mt-2">
            Review, categorize, and respond to feedback from students and staff.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All Feedback</TabsTrigger>
            <TabsTrigger value="positive">Positive</TabsTrigger>
            <TabsTrigger value="negative">Negative</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Feedback Entries</CardTitle>
                <CardDescription>Manage and categorize user feedback</CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search feedback..."
                    className="pl-10 w-full sm:w-60"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="text-muted-foreground h-4 w-4" />
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Compliment">Compliments</SelectItem>
                      <SelectItem value="Complaint">Complaints</SelectItem>
                      <SelectItem value="Suggestion">Suggestions</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="ml-auto" onClick={() => window.print()}>
                Export
              </Button>
              <Button>
                Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {feedback.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {feedback.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="border-l-4 h-full" 
                      style={{ 
                        borderColor: item.rating >= 4 ? '#22c55e' : 
                                    item.rating === 3 ? '#3b82f6' : 
                                    '#ef4444' 
                      }}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <div className="flex items-center mt-1">
                              <div className="flex mr-2">
                                {renderStars(item.rating)}
                              </div>
                              <span className="text-sm text-muted-foreground">{item.category}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{item.id}</div>
                            <div className="text-sm text-muted-foreground">{formatDate(item.date)}</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm">{item.message}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center border-t pt-4">
                        <div className="text-sm">
                          From: <span className="font-medium">{item.sender}</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge 
                            className={`${
                              item.status === 'new' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                              item.status === 'reviewed' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' :
                              item.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                              'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                          >
                            {item.status === 'in-progress' ? 'In Progress' : 
                              item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            Reply
                          </Button>
                          <Button size="sm">View</Button>
                        </div>
                      </CardFooter>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-muted-foreground">No feedback found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminFeedback;
