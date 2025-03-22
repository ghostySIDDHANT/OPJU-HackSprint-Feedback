import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Building, BarChart4, FileText, Search, Filter, Users, CheckCircle, Clock,
  AlertTriangle
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatusBadge from '@/components/StatusBadge';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';

const mockDepartment = {
  name: "Computer Science Department",
  issueCount: 48,
  resolvedCount: 35,
  pendingCount: 10,
  inProgressCount: 3,
  feedbackCount: 29,
  averageResolutionTime: "3.5 days",
  satisfaction: "78%"
};

const mockCategoryData = [
  { name: 'Labs', issues: 20, resolved: 15 },
  { name: 'Software', issues: 12, resolved: 9 },
  { name: 'Hardware', issues: 8, resolved: 6 },
  { name: 'Network', issues: 8, resolved: 5 }
];

const mockTimeData = [
  { month: 'Jan', issues: 5, resolved: 4 },
  { month: 'Feb', issues: 8, resolved: 7 },
  { month: 'Mar', issues: 12, resolved: 9 },
  { month: 'Apr', issues: 6, resolved: 5 },
  { month: 'May', issues: 10, resolved: 6 },
  { month: 'Jun', issues: 7, resolved: 4 }
];

const mockPieData = [
  { name: 'Resolved', value: 35, color: '#22c55e' },
  { name: 'In Progress', value: 3, color: '#3b82f6' },
  { name: 'Pending', value: 10, color: '#eab308' }
];

const mockIssues = [
  {
    id: 'CS-001',
    title: 'Lab 3 Projector Malfunction',
    category: 'Hardware',
    priority: 'high',
    status: 'in-progress',
    reporter: 'John Smith',
    date: '2023-11-05',
    assignee: 'Tech Support'
  },
  {
    id: 'CS-002',
    title: 'Outdated Compiler in Lab Machines',
    category: 'Software',
    priority: 'medium',
    status: 'pending',
    reporter: 'Emma Johnson',
    date: '2023-11-10',
    assignee: 'Unassigned'
  },
  {
    id: 'CS-003',
    title: 'Missing Mouse in Lab 2',
    category: 'Hardware',
    priority: 'low',
    status: 'resolved',
    reporter: 'Michael Brown',
    date: '2023-11-02',
    assignee: 'Tech Support'
  },
  {
    id: 'CS-004',
    title: 'Wi-Fi Connectivity Issues',
    category: 'Network',
    priority: 'high',
    status: 'pending',
    reporter: 'Sarah Wilson',
    date: '2023-11-12',
    assignee: 'Network Admin'
  },
  {
    id: 'CS-005',
    title: 'Software License Expiration',
    category: 'Software',
    priority: 'urgent',
    status: 'resolved',
    reporter: 'David Lee',
    date: '2023-10-28',
    assignee: 'Dept. Chair'
  }
];

const DepartmentalDashboard = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [issues, setIssues] = useState(mockIssues);
  
  useEffect(() => {
    document.title = 'Department Dashboard - Student Hub';
  }, []);
  
  useEffect(() => {
    let filtered = [...mockIssues];
    
    if (searchTerm) {
      filtered = filtered.filter(issue => 
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.reporter.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filter !== 'all') {
      filtered = filtered.filter(issue => issue.status === filter);
    }
    
    setIssues(filtered);
  }, [searchTerm, filter]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const chartConfig = {
    resolved: { label: "Resolved", color: "#22c55e" },
    pending: { label: "Pending", color: "#eab308" },
    inProgress: { label: "In Progress", color: "#3b82f6" },
  };

  return (
    <DashboardLayout type="department">
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-blur-in">
          <h1 className="text-3xl font-bold mb-4">
            <span className="flex items-center justify-center gap-2">
              <Building className="h-8 w-8 text-primary" />
              {mockDepartment.name}
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Monitor and manage department-specific issues and feedback
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                Total Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockDepartment.issueCount}</div>
              <p className="text-sm text-muted-foreground mt-1">This academic year</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Resolved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockDepartment.resolvedCount}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {Math.round((mockDepartment.resolvedCount / mockDepartment.issueCount) * 100)}% completion rate
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                Avg. Resolution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockDepartment.averageResolutionTime}</div>
              <p className="text-sm text-muted-foreground mt-1">For closed issues</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-500" />
                Satisfaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockDepartment.satisfaction}</div>
              <p className="text-sm text-muted-foreground mt-1">Based on student feedback</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="byCategory">By Category</TabsTrigger>
            <TabsTrigger value="byTime">Trend Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="glass-card col-span-2">
                <CardHeader>
                  <CardTitle>Issues Overview</CardTitle>
                  <CardDescription>Summary of department issues by status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer config={chartConfig}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={mockCategoryData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          barGap={4}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <ChartTooltip
                            content={<ChartTooltipContent />}
                          />
                          <Legend />
                          <Bar
                            dataKey="issues"
                            name="Total Issues"
                            fill="#94a3b8"
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar
                            dataKey="resolved"
                            name="Resolved"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Status Distribution</CardTitle>
                  <CardDescription>Current status of all issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockPieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          label
                        >
                          {mockPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="byCategory">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Issues by Category</CardTitle>
                <CardDescription>Breakdown of department issues by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={mockCategoryData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barGap={4}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                        />
                        <Legend />
                        <Bar
                          dataKey="issues"
                          name="Total Issues"
                          fill="#94a3b8"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="resolved"
                          name="Resolved"
                          fill="#22c55e"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                  {mockCategoryData.map((category) => (
                    <Card key={category.name} className="bg-secondary/20">
                      <CardHeader className="py-4 px-5">
                        <CardTitle className="text-base">{category.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 pb-4 px-5">
                        <div className="flex justify-between items-center text-sm">
                          <span>Total: {category.issues}</span>
                          <span className="text-green-600">Resolved: {category.resolved}</span>
                        </div>
                        <div className="mt-2">
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${(category.resolved / category.issues) * 100}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="byTime">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Issue Trends Over Time</CardTitle>
                <CardDescription>Monthly trend of issues reported and resolved</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={mockTimeData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barGap={4}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                        />
                        <Legend />
                        <Bar
                          dataKey="issues"
                          name="Issues Reported"
                          fill="#94a3b8"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="resolved"
                          name="Issues Resolved"
                          fill="#22c55e"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="glass-card animate-scale-in mb-12">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Department Issues</CardTitle>
                <CardDescription>Current issues and tickets for the department</CardDescription>
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
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {issues.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Reported By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {issues.map((issue) => (
                      <TableRow key={issue.id}>
                        <TableCell className="font-mono text-xs">{issue.id}</TableCell>
                        <TableCell className="font-medium">{issue.title}</TableCell>
                        <TableCell>{issue.category}</TableCell>
                        <TableCell>{issue.reporter}</TableCell>
                        <TableCell>{formatDate(issue.date)}</TableCell>
                        <TableCell>
                          <StatusBadge status={issue.status as 'pending' | 'in-progress' | 'resolved' | 'closed'} />
                        </TableCell>
                        <TableCell>{issue.assignee}</TableCell>
                        <TableCell>
                          <Badge className={cn(
                            issue.priority === 'urgent' && 'bg-red-500',
                            issue.priority === 'high' && 'bg-orange-500',
                            issue.priority === 'medium' && 'bg-amber-500',
                            issue.priority === 'low' && 'bg-green-500'
                          )}>
                            {issue.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Update</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-muted-foreground">No issues found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="flex justify-between items-center">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Export Report
          </Button>
          
          <Button variant="default" className="gap-2">
            <BarChart4 className="h-4 w-4" />
            Advanced Analytics
          </Button>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DepartmentalDashboard;
