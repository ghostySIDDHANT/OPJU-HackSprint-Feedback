import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { 
  FileText, Download, BarChart4, PieChart as PieChartIcon, Filter, Calendar, 
  RefreshCcw, Share2, ChevronDown 
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const mockDepartments = [
  'Computer Science',
  'Engineering',
  'Business',
  'Arts & Humanities',
  'Medical',
  'Law',
  'Science'
];

const mockCategoryData = [
  { name: 'Facilities', count: 42 },
  { name: 'Technical', count: 39 },
  { name: 'Academic', count: 28 },
  { name: 'Administrative', count: 15 },
  { name: 'Other', count: 7 }
];

const mockTimeData = [
  { month: 'Jan', issues: 32, resolved: 25 },
  { month: 'Feb', issues: 40, resolved: 30 },
  { month: 'Mar', issues: 45, resolved: 35 },
  { month: 'Apr', issues: 38, resolved: 32 },
  { month: 'May', issues: 35, resolved: 27 },
  { month: 'Jun', issues: 42, resolved: 34 }
];

const mockDepartmentData = [
  { name: 'Computer Science', issues: 38, resolved: 28, satisfaction: 82 },
  { name: 'Engineering', issues: 32, resolved: 25, satisfaction: 78 },
  { name: 'Business', issues: 28, resolved: 22, satisfaction: 85 },
  { name: 'Arts & Humanities', issues: 20, resolved: 18, satisfaction: 90 },
  { name: 'Medical', issues: 35, resolved: 30, satisfaction: 86 },
  { name: 'Law', issues: 22, resolved: 19, satisfaction: 88 },
  { name: 'Science', issues: 30, resolved: 24, satisfaction: 80 }
];

const mockPieData = [
  { name: 'Resolved', value: 183, color: '#22c55e' },
  { name: 'In Progress', value: 42, color: '#3b82f6' },
  { name: 'Pending', value: 65, color: '#eab308' }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const DepartmentalReportingComponent = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  
  return (
    <div className="space-y-8">
      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Departmental Reporting</CardTitle>
              <CardDescription>Comprehensive analysis of issues across departments</CardDescription>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {mockDepartments.map(dept => (
                    <SelectItem key={dept} value={dept.toLowerCase().replace(/\s+/g, '-')}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Filter Report Data</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label>Issue Categories</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {mockCategoryData.map(category => (
                          <div key={category.name} className="flex items-center space-x-2">
                            <Checkbox id={`category-${category.name}`} defaultChecked />
                            <Label htmlFor={`category-${category.name}`}>{category.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="mb-1 block">Start Date</Label>
                        <DatePicker date={startDate} setDate={setStartDate} />
                      </div>
                      <div>
                        <Label className="mb-1 block">End Date</Label>
                        <DatePicker date={endDate} setDate={setEndDate} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="status-pending" defaultChecked />
                          <Label htmlFor="status-pending">Pending</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="status-in-progress" defaultChecked />
                          <Label htmlFor="status-in-progress">In Progress</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="status-resolved" defaultChecked />
                          <Label htmlFor="status-resolved">Resolved</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="status-closed" defaultChecked />
                          <Label htmlFor="status-closed">Closed</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline">Reset</Button>
                    <Button>Apply Filters</Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" size="icon">
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary">
            <TabsList className="mb-6 grid w-full grid-cols-3 sm:grid-cols-5 md:w-auto">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="department">By Department</TabsTrigger>
              <TabsTrigger value="category">By Category</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="space-y-8">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">290</div>
                    <div className="text-xs text-muted-foreground mt-1">Across all departments</div>
                    <div className="text-sm text-green-600 mt-2 flex items-center">
                      <ChevronDown className="h-4 w-4 rotate-180" />
                      <span>8% increase from last period</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Resolution Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">76%</div>
                    <div className="text-xs text-muted-foreground mt-1">183 of 290 issues resolved</div>
                    <div className="text-sm text-green-600 mt-2 flex items-center">
                      <ChevronDown className="h-4 w-4 rotate-180" />
                      <span>5% improvement</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Avg Satisfaction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">83%</div>
                    <div className="text-xs text-muted-foreground mt-1">Based on feedback ratings</div>
                    <div className="text-sm text-green-600 mt-2 flex items-center">
                      <ChevronDown className="h-4 w-4 rotate-180" />
                      <span>3% improvement</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Issue Resolution Overview</CardTitle>
                    <CardDescription>Total issues vs. resolved issues by department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={mockDepartmentData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          barGap={4}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="issues" name="Total Issues" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="resolved" name="Resolved" fill="#22c55e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
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
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="department">
              <Card>
                <CardHeader>
                  <CardTitle>Department Performance</CardTitle>
                  <CardDescription>Comparing issue resolution across departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={mockDepartmentData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barGap={4}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="issues" name="Total Issues" fill="#8884d8" radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="left" dataKey="resolved" name="Resolved" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="right" dataKey="satisfaction" name="Satisfaction %" fill="#ffc658" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <Table className="mt-6">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Total Issues</TableHead>
                        <TableHead>Resolved</TableHead>
                        <TableHead>Resolution Rate</TableHead>
                        <TableHead>Satisfaction</TableHead>
                        <TableHead>Performance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockDepartmentData.map((dept) => (
                        <TableRow key={dept.name}>
                          <TableCell className="font-medium">{dept.name}</TableCell>
                          <TableCell>{dept.issues}</TableCell>
                          <TableCell>{dept.resolved}</TableCell>
                          <TableCell>{Math.round((dept.resolved / dept.issues) * 100)}%</TableCell>
                          <TableCell>{dept.satisfaction}%</TableCell>
                          <TableCell>
                            <Badge className={
                              dept.satisfaction >= 85 ? "bg-green-500" :
                              dept.satisfaction >= 80 ? "bg-blue-500" :
                              "bg-amber-500"
                            }>
                              {dept.satisfaction >= 85 ? "Excellent" :
                               dept.satisfaction >= 80 ? "Good" :
                               "Average"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="category">
              <Card>
                <CardHeader>
                  <CardTitle>Issues by Category</CardTitle>
                  <CardDescription>Distribution of issues across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="count"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {mockCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`${value} issues`, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trends">
              <Card>
                <CardHeader>
                  <CardTitle>Issue Trends Over Time</CardTitle>
                  <CardDescription>Monthly trends of issues reported and resolved</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={mockTimeData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="issues" name="Issues Reported" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="resolved" name="Issues Resolved" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="detailed">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Analysis</CardTitle>
                  <CardDescription>Comprehensive breakdown of issue data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Total Issues</TableHead>
                        <TableHead>Resolved</TableHead>
                        <TableHead>In Progress</TableHead>
                        <TableHead>Pending</TableHead>
                        <TableHead>Avg. Resolution Time</TableHead>
                        <TableHead>Satisfaction</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockDepartmentData.map((dept) => (
                        <TableRow key={dept.name}>
                          <TableCell className="font-medium">{dept.name}</TableCell>
                          <TableCell>{dept.issues}</TableCell>
                          <TableCell>{dept.resolved}</TableCell>
                          <TableCell>{Math.floor(Math.random() * 10) + 1}</TableCell>
                          <TableCell>{dept.issues - dept.resolved - (Math.floor(Math.random() * 10) + 1)}</TableCell>
                          <TableCell>{Math.floor(Math.random() * 5) + 2}.{Math.floor(Math.random() * 9)} days</TableCell>
                          <TableCell>{dept.satisfaction}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export CSV
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <FileText className="h-4 w-4" />
                      Generate Report
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
        <Button className="gap-2">
          <FileText className="h-4 w-4" />
          Generate Full Analysis
        </Button>
      </div>
    </div>
  );
};

export default DepartmentalReportingComponent;
