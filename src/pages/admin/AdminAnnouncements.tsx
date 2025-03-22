
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Plus, Megaphone, Clock, Users, Calendar, Eye, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { format, formatDistance } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';

const mockAnnouncements = [
  {
    id: 'ANN-001',
    title: 'System Maintenance Notification',
    message: 'The student portal will be unavailable for scheduled maintenance on Saturday, December 2nd from 2:00 AM to 6:00 AM. Please plan accordingly.',
    category: 'System',
    priority: 'high',
    audience: ['all'],
    status: 'scheduled',
    author: 'Jacob Jones',
    publishDate: '2023-12-02T02:00:00',
    expiryDate: '2023-12-09T23:59:59',
    departments: ['All Departments'],
    views: 0
  },
  {
    id: 'ANN-002',
    title: 'New Issue Reporting Feature Available',
    message: 'We\'ve launched a new feature that allows you to attach images to your issue reports. This will help staff better understand and resolve your issues more quickly.',
    category: 'Feature',
    priority: 'medium',
    audience: ['students', 'staff'],
    status: 'published',
    author: 'Leslie Alexander',
    publishDate: '2023-11-28T09:00:00',
    expiryDate: '2023-12-28T23:59:59',
    departments: ['All Departments'],
    views: 245
  },
  {
    id: 'ANN-003',
    title: 'Library Extended Hours During Finals Week',
    message: 'The main library will have extended hours during finals week (December 10-16). The library will be open from 7:00 AM to 2:00 AM each day to provide additional study space.',
    category: 'Academic',
    priority: 'medium',
    audience: ['students'],
    status: 'published',
    author: 'Dianne Russell',
    publishDate: '2023-11-25T14:30:00',
    expiryDate: '2023-12-16T23:59:59',
    departments: ['Library Services'],
    views: 567
  },
  {
    id: 'ANN-004',
    title: 'IT Help Desk Holiday Hours',
    message: 'The IT Help Desk will have modified hours during the winter break. From December 20 to January 5, support will be available from 9:00 AM to 3:00 PM, Monday through Friday. 24/7 online support will still be available through the portal.',
    category: 'Operational',
    priority: 'low',
    audience: ['all'],
    status: 'published',
    author: 'Wade Warren',
    publishDate: '2023-11-20T10:15:00',
    expiryDate: '2024-01-05T23:59:59',
    departments: ['Information Technology'],
    views: 423
  },
  {
    id: 'ANN-005',
    title: 'Emergency Weather Protocol Update',
    message: 'We have updated our emergency weather protocol. In case of severe weather conditions, alerts will be sent through the campus notification system, email, and SMS. Please ensure your contact information is up to date in your profile.',
    category: 'Safety',
    priority: 'urgent',
    audience: ['all'],
    status: 'draft',
    author: 'Jacob Jones',
    publishDate: null,
    expiryDate: null,
    departments: ['All Departments'],
    views: 0
  },
  {
    id: 'ANN-006',
    title: 'Facilities Management Survey',
    message: 'Please take a moment to complete our annual facilities management survey. Your feedback helps us improve campus buildings and grounds maintenance. The survey will be open until December 15.',
    category: 'Survey',
    priority: 'low',
    audience: ['students', 'faculty'],
    status: 'published',
    author: 'Jane Cooper',
    publishDate: '2023-11-15T08:00:00',
    expiryDate: '2023-12-15T23:59:59',
    departments: ['Facilities Management'],
    views: 189
  }
];

const priorityColors = {
  urgent: 'bg-red-100 text-red-800',
  high: 'bg-orange-100 text-orange-800',
  medium: 'bg-blue-100 text-blue-800',
  low: 'bg-green-100 text-green-800'
};

const statusColors = {
  published: 'bg-green-100 text-green-800',
  scheduled: 'bg-blue-100 text-blue-800',
  draft: 'bg-gray-100 text-gray-800',
  archived: 'bg-purple-100 text-purple-800'
};

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [isNewAnnouncementOpen, setIsNewAnnouncementOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    category: 'System',
    priority: 'medium',
    audience: ['all'],
    status: 'draft',
    departments: ['All Departments']
  });

  useEffect(() => {
    document.title = 'Admin Announcements - Student Hub';
  }, []);

  useEffect(() => {
    let filtered = [...mockAnnouncements];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(announcement => 
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(announcement => announcement.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(announcement => announcement.status === statusFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(announcement => announcement.priority === priorityFilter);
    }
    
    // Apply tab filter
    if (activeTab === 'published') {
      filtered = filtered.filter(announcement => announcement.status === 'published');
    } else if (activeTab === 'scheduled') {
      filtered = filtered.filter(announcement => announcement.status === 'scheduled');
    } else if (activeTab === 'drafts') {
      filtered = filtered.filter(announcement => announcement.status === 'draft');
    }
    
    setAnnouncements(filtered);
  }, [searchTerm, categoryFilter, statusFilter, priorityFilter, activeTab]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return format(new Date(dateString), 'PPP');
  };

  const getRelativeTime = (dateString: string | null) => {
    if (!dateString) return 'Not published';
    const date = new Date(dateString);
    const now = new Date();
    
    if (date > now) {
      return `Scheduled ${formatDistance(date, now, { addSuffix: true })}`;
    }
    
    return `Published ${formatDistance(date, now, { addSuffix: true })}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAnnouncement(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAudienceChange = (audience: string) => {
    setNewAnnouncement(prev => {
      if (audience === 'all') {
        return {
          ...prev,
          audience: ['all']
        };
      }
      
      // Remove 'all' if it exists and toggle the selected audience
      const currentAudience = prev.audience.filter(a => a !== 'all');
      if (currentAudience.includes(audience)) {
        return {
          ...prev,
          audience: currentAudience.filter(a => a !== audience)
        };
      } else {
        return {
          ...prev,
          audience: [...currentAudience, audience]
        };
      }
    });
  };

  const handleAddAnnouncement = () => {
    const now = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const newAnnouncementObj = {
      ...newAnnouncement,
      id: `ANN-00${announcements.length + 1}`,
      author: 'Jacob Jones',
      publishDate: newAnnouncement.status === 'published' ? now.toISOString() : null,
      expiryDate: nextWeek.toISOString(),
      views: 0
    };
    
    setAnnouncements(prev => [...prev, newAnnouncementObj]);
    setNewAnnouncement({
      title: '',
      message: '',
      category: 'System',
      priority: 'medium',
      audience: ['all'],
      status: 'draft',
      departments: ['All Departments']
    });
    setIsNewAnnouncementOpen(false);
  };

  // Get unique categories for filter
  const categories = [...new Set(mockAnnouncements.map(a => a.category))];

  return (
    <DashboardLayout type="admin">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage announcements for students, faculty, and staff.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search announcements..."
              className="pl-10 w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Dialog open={isNewAnnouncementOpen} onOpenChange={setIsNewAnnouncementOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
                <DialogDescription>
                  Create an announcement to notify users about important information.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Announcement Title</Label>
                  <Input 
                    id="title" 
                    name="title"
                    value={newAnnouncement.title}
                    onChange={handleInputChange}
                    placeholder="Enter a clear, concise title" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={newAnnouncement.message}
                    onChange={handleInputChange}
                    placeholder="Enter the announcement details"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      name="category" 
                      value={newAnnouncement.category}
                      onValueChange={(value) => setNewAnnouncement(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="System">System</SelectItem>
                        <SelectItem value="Academic">Academic</SelectItem>
                        <SelectItem value="Operational">Operational</SelectItem>
                        <SelectItem value="Feature">Feature</SelectItem>
                        <SelectItem value="Safety">Safety</SelectItem>
                        <SelectItem value="Survey">Survey</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      name="priority" 
                      value={newAnnouncement.priority}
                      onValueChange={(value) => setNewAnnouncement(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Target Audience</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="audience-all" 
                        checked={newAnnouncement.audience.includes('all')}
                        onCheckedChange={() => handleAudienceChange('all')}
                      />
                      <label htmlFor="audience-all" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        All Users
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="audience-students" 
                        checked={newAnnouncement.audience.includes('students')}
                        disabled={newAnnouncement.audience.includes('all')}
                        onCheckedChange={() => handleAudienceChange('students')}
                      />
                      <label htmlFor="audience-students" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Students
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="audience-faculty" 
                        checked={newAnnouncement.audience.includes('faculty')}
                        disabled={newAnnouncement.audience.includes('all')}
                        onCheckedChange={() => handleAudienceChange('faculty')}
                      />
                      <label htmlFor="audience-faculty" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Faculty
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="audience-staff" 
                        checked={newAnnouncement.audience.includes('staff')}
                        disabled={newAnnouncement.audience.includes('all')}
                        onCheckedChange={() => handleAudienceChange('staff')}
                      />
                      <label htmlFor="audience-staff" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Staff
                      </label>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Publication Status</Label>
                  <Select 
                    name="status" 
                    value={newAnnouncement.status}
                    onValueChange={(value) => setNewAnnouncement(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Save as Draft</SelectItem>
                      <SelectItem value="published">Publish Immediately</SelectItem>
                      <SelectItem value="scheduled">Schedule for Later</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewAnnouncementOpen(false)}>Cancel</Button>
                <Button onClick={handleAddAnnouncement}>
                  {newAnnouncement.status === 'draft' ? 'Save Draft' : 
                   newAnnouncement.status === 'published' ? 'Publish' : 'Schedule'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <Card key={announcement.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-start gap-2">
                      <div className="rounded-md bg-primary/10 p-2">
                        <Megaphone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{announcement.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            className={`${priorityColors[announcement.priority as keyof typeof priorityColors]} border-none font-normal`}
                          >
                            {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                          </Badge>
                          <Badge 
                            className={`${statusColors[announcement.status as keyof typeof statusColors]} border-none font-normal`}
                          >
                            {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{announcement.category}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{announcement.id}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm">{announcement.message}</p>
                  
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {announcement.audience.includes('all') ? 'All Users' : announcement.audience.join(', ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{getRelativeTime(announcement.publishDate)}</span>
                    </div>
                    {announcement.status !== 'draft' && (
                      <>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Expires: {formatDate(announcement.expiryDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{announcement.views} views</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <div className="text-sm">
                    By <span className="font-medium">{announcement.author}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    {announcement.status === 'draft' ? (
                      <Button size="sm">Publish</Button>
                    ) : (
                      <Button variant="destructive" size="sm" className="flex items-center gap-1">
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center p-8">
              <p className="text-muted-foreground">No announcements found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnnouncements;
