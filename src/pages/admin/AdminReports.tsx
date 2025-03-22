
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
import { Search, Filter, Download, FileText, BarChart, Calendar, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

const mockReports = [
  {
    id: 'REP-001',
    title: 'Monthly Issue Resolution Summary',
    description: 'Summary of all issues resolved in the past month, categorized by department and priority.',
    type: 'summary',
    format: 'pdf',
    createdBy: 'Jacob Jones',
    createdDate: '2023-11-15',
    category: 'Issues',
    size: '1.2 MB',
    shared: true
  },
  {
    id: 'REP-002',
    title: 'Student Satisfaction Survey Results',
    description: 'Analysis of the semesterly student satisfaction survey with key findings and recommendations.',
    type: 'analysis',
    format: 'xlsx',
    createdBy: 'Jane Cooper',
    createdDate: '2023-11-10',
    category: 'Feedback',
    size: '3.5 MB',
    shared: true
  },
  {
    id: 'REP-003',
    title: 'IT Infrastructure Audit',
    description: 'Comprehensive audit of campus IT infrastructure, highlighting strengths and areas for improvement.',
    type: 'audit',
    format: 'docx',
    createdBy: 'Wade Warren',
    createdDate: '2023-11-05',
    category: 'Technical',
    size: '2.8 MB',
    shared: false
  },
  {
    id: 'REP-004',
    title: 'Maintenance Request Analytics',
    description: 'Analysis of maintenance requests received and resolved over the past quarter.',
    type: 'analysis',
    format: 'pdf',
    createdBy: 'Leslie Alexander',
    createdDate: '2023-10-28',
    category: 'Facilities',
    size: '1.5 MB',
    shared: true
  },
  {
    id: 'REP-005',
    title: 'Department Performance Review',
    description: 'Quarterly performance review of all departments based on issue resolution times and feedback scores.',
    type: 'review',
    format: 'pptx',
    createdBy: 'Jacob Jones',
    createdDate: '2023-10-20',
    category: 'Management',
    size: '4.2 MB',
    shared: false
  },
  {
    id: 'REP-006',
    title: 'Annual Security Incidents Summary',
    description: 'Overview of security incidents reported and addressed throughout the year.',
    type: 'summary',
    format: 'pdf',
    createdBy: 'Dianne Russell',
    createdDate: '2023-10-15',
    category: 'Security',
    size: '2.1 MB',
    shared: true
  },
  {
    id: 'REP-007',
    title: 'Budget Allocation Analysis',
    description: 'Analysis of budget allocation and utilization across departments for issue resolution initiatives.',
    type: 'analysis',
    format: 'xlsx',
    createdBy: 'Cameron Williamson',
    createdDate: '2023-10-05',
    category: 'Financial',
    size: '3.0 MB',
    shared: false
  }
];

const typeIcons = {
  summary: <FileText className="h-4 w-4" />,
  analysis: <BarChart className="h-4 w-4" />,
  audit: <FileText className="h-4 w-4" />,
  review: <FileText className="h-4 w-4" />
};

const formatIcons = {
  pdf: <FileText className="h-4 w-4 text-red-500" />,
  xlsx: <FileText className="h-4 w-4 text-green-500" />,
  docx: <FileText className="h-4 w-4 text-blue-500" />,
  pptx: <FileText className="h-4 w-4 text-orange-500" />
};

const AdminReports = () => {
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sharedFilter, setSharedFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  useEffect(() => {
    document.title = 'Admin Reports - Student Hub';
  }, []);

  useEffect(() => {
    let filtered = [...mockReports];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(report => report.type === typeFilter);
    }
    
    // Apply format filter
    if (formatFilter !== 'all') {
      filtered = filtered.filter(report => report.format === formatFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(report => report.category === categoryFilter);
    }
    
    // Apply shared filter
    if (sharedFilter !== 'all') {
      const isShared = sharedFilter === 'shared';
      filtered = filtered.filter(report => report.shared === isShared);
    }
    
    // Apply date filter
    if (dateFilter) {
      const filterDate = dateFilter.toISOString().split('T')[0];
      filtered = filtered.filter(report => report.createdDate === filterDate);
    }
    
    setReports(filtered);
  }, [searchTerm, typeFilter, formatFilter, categoryFilter, sharedFilter, dateFilter]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get unique categories for filter
  const categories = [...new Set(mockReports.map(report => report.category))];

  return (
    <DashboardLayout type="admin">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground mt-2">
            Generate, view, and download reports about campus operations and issue resolution.
          </p>
        </div>

        <Tabs defaultValue="reports" className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="reports">All Reports</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Generated Reports</CardTitle>
                    <CardDescription>Browse, filter, and download system reports</CardDescription>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search reports..."
                        className="pl-10 w-full sm:w-60"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[240px] justify-start text-left font-normal flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          {dateFilter ? format(dateFilter, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={dateFilter}
                          onSelect={setDateFilter}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="summary">Summary</SelectItem>
                      <SelectItem value="analysis">Analysis</SelectItem>
                      <SelectItem value="audit">Audit</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={formatFilter} onValueChange={setFormatFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Formats</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="xlsx">Excel</SelectItem>
                      <SelectItem value="docx">Word</SelectItem>
                      <SelectItem value="pptx">PowerPoint</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sharedFilter} onValueChange={setSharedFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Sharing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="shared">Shared</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button className="ml-auto">
                    Generate Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {reports.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {reports.map((report) => (
                      <Card key={report.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="flex items-center justify-center p-6 bg-secondary/40 md:w-16">
                            {formatIcons[report.format as keyof typeof formatIcons]}
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-medium">{report.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                              </div>
                              <Badge>{report.id}</Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 mt-4">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                {typeIcons[report.type as keyof typeof typeIcons]}
                                <span>{report.type.charAt(0).toUpperCase() + report.type.slice(1)}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <FileText className="h-4 w-4" />
                                <span>{report.category}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(report.createdDate)}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <span>Size: {report.size}</span>
                              </div>
                              {report.shared && (
                                <Badge variant="outline" className="text-xs flex items-center gap-1">
                                  <Share2 className="h-3 w-3" />
                                  Shared
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="p-6 flex flex-row md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Share2 className="h-3 w-3" />
                              Share
                            </Button>
                            <Button size="sm" className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <p className="text-muted-foreground">No reports found matching your criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shared">
            <Card>
              <CardHeader>
                <CardTitle>Shared Reports</CardTitle>
                <CardDescription>Reports that have been shared with other departments or users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {mockReports.filter(r => r.shared).map((report) => (
                    <Card key={report.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex items-center justify-center p-6 bg-secondary/40 md:w-16">
                          {formatIcons[report.format as keyof typeof formatIcons]}
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-medium">{report.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                            </div>
                            <Badge>{report.id}</Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 mt-4">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              {typeIcons[report.type as keyof typeof typeIcons]}
                              <span>{report.type.charAt(0).toUpperCase() + report.type.slice(1)}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <FileText className="h-4 w-4" />
                              <span>{report.category}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(report.createdDate)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-6 flex flex-row md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l">
                          <Button size="sm" className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>Standard templates for generating new reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Monthly Issue Summary</CardTitle>
                      <CardDescription>Summarizes all issues by category, status, and department</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <Button size="sm">Generate</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Department Performance</CardTitle>
                      <CardDescription>Analysis of department issue resolution rates and times</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <Button size="sm">Generate</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Feedback Analysis</CardTitle>
                      <CardDescription>Analyzes feedback ratings and comments by category</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <Button size="sm">Generate</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">User Activity Report</CardTitle>
                      <CardDescription>Overview of user logins, actions, and interactions</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <Button size="sm">Generate</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;
