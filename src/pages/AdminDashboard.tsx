import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Users, AlertTriangle, CheckCircle, Clock, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockStatistics = {
  totalIssues: 124,
  resolvedIssues: 86,
  pendingIssues: 28,
  inProgressIssues: 10,
  averageResolutionTime: '4.2 days',
  satisfactionRate: '87%'
};

const mockChartData = [
  { name: 'Facilities', issues: 42, resolved: 35 },
  { name: 'Academic', issues: 28, resolved: 21 },
  { name: 'Administrative', issues: 15, resolved: 10 },
  { name: 'Technical', issues: 39, resolved: 20 }
];

const mockPieData = [
  { name: 'Resolved', value: 86, color: '#22c55e' },
  { name: 'In Progress', value: 10, color: '#3b82f6' },
  { name: 'Pending', value: 28, color: '#eab308' }
];

const mockRecentIssues = [
  {
    id: 'REP-004',
    title: 'Slow Internet in Library',
    category: 'Technical',
    status: 'pending',
    priority: 'high',
    date: '2023-11-21',
    reporter: 'John Smith',
    type: 'issue'
  },
  {
    id: 'REP-005',
    title: 'Classroom Heating Problem',
    category: 'Facilities',
    status: 'in-progress',
    priority: 'medium',
    date: '2023-11-20',
    reporter: 'Sarah Johnson',
    type: 'issue'
  },
  {
    id: 'REP-006',
    title: 'Software Licenses Missing',
    category: 'Technical',
    status: 'pending',
    priority: 'urgent',
    date: '2023-11-19',
    reporter: 'Michael Brown',
    type: 'issue'
  },
  {
    id: 'FDB-003',
    title: 'Food Court Suggestions',
    category: 'Facilities',
    status: 'pending',
    rating: 3,
    date: '2023-11-18',
    reporter: 'Emma Wilson',
    type: 'feedback'
  },
];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [issues, setIssues] = useState(mockRecentIssues);

  useEffect(() => {
    document.title = 'Admin Dashboard - Student Hub';
  }, []);

  useEffect(() => {
    let filtered = [...mockRecentIssues];
    
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

  return (
    <DashboardLayout type="admin">
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-blur-in">
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Manage issues, analyze feedback, and gain insights from reports.
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
              <div className="text-3xl font-bold">{mockStatistics.totalIssues}</div>
              <p className="text-sm text-muted-foreground mt-1">Across all categories</p>
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
              <div className="text-3xl font-bold">{mockStatistics.resolvedIssues}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {Math.round((mockStatistics.resolvedIssues / mockStatistics.totalIssues) * 100)}% completion rate
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
              <div className="text-3xl font-bold">{mockStatistics.averageResolutionTime}</div>
              <p className="text-sm text-muted-foreground mt-1">Time to resolve issues</p>
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
              <div className="text-3xl font-bold">{mockStatistics.satisfactionRate}</div>
              <p className="text-sm text-muted-foreground mt-1">Based on feedback ratings</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="glass-card animate-blur-in col-span-2">
            <CardHeader>
              <CardTitle>Issues by Category</CardTitle>
              <CardDescription>Resolution status across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    barGap={4}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="issues" name="Total Issues" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="resolved" name="Resolved" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card animate-blur-in">
            <CardHeader>
              <CardTitle>Resolution Status</CardTitle>
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
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="glass-card animate-scale-in mb-12">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Recent Issues & Feedback</CardTitle>
                <CardDescription>Manage and assign reported issues</CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
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
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
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
                      <th className="text-left py-3 px-4 font-medium">Date</th>
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
                          <div className="text-xs text-muted-foreground mt-1">
                            {issue.type === 'issue' ? 
                              `Priority: ${issue.priority}` : 
                              `Rating: ${issue.rating}/5`
                            }
                          </div>
                        </td>
                        <td className="py-3 px-4">{issue.category}</td>
                        <td className="py-3 px-4">{issue.reporter}</td>
                        <td className="py-3 px-4">{formatDate(issue.date)}</td>
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
                <p className="text-muted-foreground">No issues or feedback found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Tabs defaultValue="assignment" className="animate-fade-in">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
            <TabsTrigger value="assignment">Staff Assignment</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="assignment">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Assign Staff to Categories</CardTitle>
                <CardDescription>
                  Configure which staff members are responsible for different categories of issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-1 block">Facilities Issues</Label>
                      <Select defaultValue="jane">
                        <SelectTrigger>
                          <SelectValue placeholder="Select staff member" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jane">Jane Cooper (Facilities Manager)</SelectItem>
                          <SelectItem value="robert">Robert Fox (Maintenance)</SelectItem>
                          <SelectItem value="leslie">Leslie Alexander (Administration)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium mb-1 block">Academic Issues</Label>
                      <Select defaultValue="cameron">
                        <SelectTrigger>
                          <SelectValue placeholder="Select staff member" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cameron">Cameron Williamson (Academic Dean)</SelectItem>
                          <SelectItem value="brooklyn">Brooklyn Simmons (Department Head)</SelectItem>
                          <SelectItem value="leslie">Leslie Alexander (Administration)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-1 block">Technical Issues</Label>
                      <Select defaultValue="jacob">
                        <SelectTrigger>
                          <SelectValue placeholder="Select staff member" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jacob">Jacob Jones (IT Manager)</SelectItem>
                          <SelectItem value="wade">Wade Warren (Systems Admin)</SelectItem>
                          <SelectItem value="esther">Esther Howard (Help Desk)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium mb-1 block">Administrative Issues</Label>
                      <Select defaultValue="leslie">
                        <SelectTrigger>
                          <SelectValue placeholder="Select staff member" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leslie">Leslie Alexander (Administration)</SelectItem>
                          <SelectItem value="dianne">Dianne Russell (Student Affairs)</SelectItem>
                          <SelectItem value="eleanor">Eleanor Pena (Office Manager)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button>Save Assignments</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure notification preferences and system behavior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium block">Email Notifications</Label>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="new-issue" className="flex items-center cursor-pointer">
                          <span>New issue reported</span>
                        </label>
                        <Switch id="new-issue" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="status-change" className="flex items-center cursor-pointer">
                          <span>Status changes</span>
                        </label>
                        <Switch id="status-change" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="new-feedback" className="flex items-center cursor-pointer">
                          <span>New feedback submitted</span>
                        </label>
                        <Switch id="new-feedback" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium block">Default Priority for Categories</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Facilities</label>
                        <Select defaultValue="medium">
                          <SelectTrigger>
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
                      
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Academic</label>
                        <Select defaultValue="high">
                          <SelectTrigger>
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
                      
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Technical</label>
                        <Select defaultValue="high">
                          <SelectTrigger>
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
                      
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Administrative</label>
                        <Select defaultValue="medium">
                          <SelectTrigger>
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
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </DashboardLayout>
  );
};

function Label({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & { className?: string }) {
  return (
    <label className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props}>
      {children}
    </label>
  )
}

function Switch({ id, ...props }: { id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("w-11 h-6 bg-muted rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 relative")}>
      <input type="checkbox" id={id} className="sr-only peer" {...props} />
    </div>
  )
}

export default AdminDashboard;

