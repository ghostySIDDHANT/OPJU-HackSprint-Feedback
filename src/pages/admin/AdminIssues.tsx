
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockIssues = [
  {
    id: 'ISS-001',
    title: 'Slow Internet in Library',
    description: 'The WiFi in the main library has been extremely slow for the past week, making it difficult to do research.',
    category: 'Technical',
    status: 'pending',
    priority: 'high',
    date: '2023-11-21',
    reporter: 'John Smith',
    assignedTo: 'Jacob Jones',
  },
  {
    id: 'ISS-002',
    title: 'Broken Desk in Room 302',
    description: 'The desk in Room 302 has a broken leg and is unstable.',
    category: 'Facilities',
    status: 'in-progress',
    priority: 'medium',
    date: '2023-11-20',
    reporter: 'Sarah Johnson',
    assignedTo: 'Robert Fox',
  },
  {
    id: 'ISS-003',
    title: 'Missing Textbooks in Bookstore',
    description: 'The required textbooks for CS101 are not available in the bookstore.',
    category: 'Academic',
    status: 'resolved',
    priority: 'medium',
    date: '2023-11-18',
    reporter: 'Michael Brown',
    assignedTo: 'Leslie Alexander',
  },
  {
    id: 'ISS-004',
    title: 'Parking Permit Issues',
    description: 'Several students have reported problems with their parking permits not working at the garage entrance.',
    category: 'Administrative',
    status: 'pending',
    priority: 'urgent',
    date: '2023-11-19',
    reporter: 'Emma Wilson',
    assignedTo: 'Pending Assignment',
  },
  {
    id: 'ISS-005',
    title: 'Air Conditioning Not Working',
    description: 'The AC in the science building (rooms 401-410) is not functioning properly.',
    category: 'Facilities',
    status: 'in-progress',
    priority: 'high',
    date: '2023-11-17',
    reporter: 'David Lee',
    assignedTo: 'Jane Cooper',
  },
];

const AdminIssues = () => {
  const [issues, setIssues] = useState(mockIssues);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    document.title = 'Admin Issues - Student Hub';
  }, []);

  useEffect(() => {
    let filtered = [...mockIssues];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(issue => 
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.reporter.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(issue => issue.status === filter);
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(issue => issue.category === categoryFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(issue => issue.priority === priorityFilter);
    }
    
    // Apply tab filter
    if (activeTab === 'assigned') {
      filtered = filtered.filter(issue => issue.assignedTo !== 'Pending Assignment');
    } else if (activeTab === 'unassigned') {
      filtered = filtered.filter(issue => issue.assignedTo === 'Pending Assignment');
    }
    
    setIssues(filtered);
  }, [searchTerm, filter, categoryFilter, priorityFilter, activeTab]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <DashboardLayout type="admin">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Issue Management</h1>
          <p className="text-muted-foreground mt-2">
            View, assign, and resolve issues reported by students and staff.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Issues</TabsTrigger>
            <TabsTrigger value="assigned">Assigned</TabsTrigger>
            <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Issue Tickets</CardTitle>
                <CardDescription>Manage and resolve reported issues</CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search issues..."
                    className="pl-10 w-full sm:w-60"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="text-muted-foreground h-4 w-4" />
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Facilities">Facilities</SelectItem>
                  <SelectItem value="Academic">Academic</SelectItem>
                  <SelectItem value="Administrative">Administrative</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="ml-auto" onClick={() => window.print()}>
                Export
              </Button>
              <Button>
                New Issue
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {issues.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">Title</th>
                      <th className="text-left py-3 px-4 font-medium">Category</th>
                      <th className="text-left py-3 px-4 font-medium">Reporter</th>
                      <th className="text-left py-3 px-4 font-medium">Assigned To</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Priority</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issues.map((issue) => (
                      <tr key={issue.id} className="border-b hover:bg-secondary/50 transition-colors">
                        <td className="py-3 px-4 text-sm">{issue.id}</td>
                        <td className="py-3 px-4">
                          <div className="font-medium">{issue.title}</div>
                          <div className="text-xs text-muted-foreground mt-1 max-w-xs truncate">
                            {issue.description}
                          </div>
                        </td>
                        <td className="py-3 px-4">{issue.category}</td>
                        <td className="py-3 px-4">{issue.reporter}</td>
                        <td className="py-3 px-4">
                          {issue.assignedTo === 'Pending Assignment' ? (
                            <span className="inline-flex items-center text-amber-600">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Unassigned
                            </span>
                          ) : (
                            issue.assignedTo
                          )}
                        </td>
                        <td className="py-3 px-4">{formatDate(issue.date)}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            issue.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                            issue.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                            issue.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge status={issue.status as 'pending' | 'in-progress' | 'resolved' | 'closed'} />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Assign</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-muted-foreground">No issues found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminIssues;
