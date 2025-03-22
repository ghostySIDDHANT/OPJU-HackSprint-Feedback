
import React, { useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { Calendar, Download, TrendingUp, TrendingDown, ArrowRight, Info } from 'lucide-react';

const issuesByDepartmentData = [
  { department: 'IT', total: 87, resolved: 76 },
  { department: 'Facilities', total: 64, resolved: 51 },
  { department: 'Academic', total: 42, resolved: 38 },
  { department: 'Admin', total: 36, resolved: 29 },
  { department: 'Financial', total: 28, resolved: 22 }
];

const issuesByPriorityData = [
  { name: 'Urgent', value: 23, color: '#ef4444' },
  { name: 'High', value: 45, color: '#f97316' },
  { name: 'Medium', value: 102, color: '#3b82f6' },
  { name: 'Low', value: 87, color: '#22c55e' }
];

const resolutionTrendData = [
  { month: 'Jan', issues: 58, resolved: 52, resolution_time: 4.2 },
  { month: 'Feb', issues: 64, resolved: 57, resolution_time: 3.9 },
  { month: 'Mar', issues: 72, resolved: 63, resolution_time: 4.1 },
  { month: 'Apr', issues: 68, resolved: 62, resolution_time: 3.8 },
  { month: 'May', issues: 82, resolved: 71, resolution_time: 4.3 },
  { month: 'Jun', issues: 76, resolved: 68, resolution_time: 3.7 },
  { month: 'Jul', issues: 65, resolved: 60, resolution_time: 3.5 },
  { month: 'Aug', issues: 71, resolved: 65, resolution_time: 3.3 },
  { month: 'Sep', issues: 89, resolved: 78, resolution_time: 3.6 },
  { month: 'Oct', issues: 97, resolved: 85, resolution_time: 3.8 },
  { month: 'Nov', issues: 85, resolved: 73, resolution_time: 4.0 },
  { month: 'Dec', issues: 62, resolved: 56, resolution_time: 3.9 }
];

const satisfactionData = [
  { month: 'Jan', score: 4.2 },
  { month: 'Feb', score: 4.1 },
  { month: 'Mar', score: 4.3 },
  { month: 'Apr', score: 4.4 },
  { month: 'May', score: 4.2 },
  { month: 'Jun', score: 4.5 },
  { month: 'Jul', score: 4.6 },
  { month: 'Aug', score: 4.5 },
  { month: 'Sep', score: 4.4 },
  { month: 'Oct', score: 4.7 },
  { month: 'Nov', score: 4.6 },
  { month: 'Dec', score: 4.5 }
];

const feedbackCategoriesData = [
  { name: 'Compliments', value: 32, color: '#22c55e' },
  { name: 'Suggestions', value: 45, color: '#3b82f6' },
  { name: 'Complaints', value: 28, color: '#f97316' },
  { name: 'Questions', value: 18, color: '#a855f7' }
];

const issuesByTypeData = [
  { type: 'Technical', count: 87 },
  { type: 'Facilities', count: 64 },
  { type: 'Academic', count: 42 },
  { type: 'Administrative', count: 36 },
  { type: 'Financial', count: 28 },
  { type: 'Others', count: 15 }
];

const AdminAnalytics = () => {
  useEffect(() => {
    document.title = 'Admin Analytics - Student Hub';
  }, []);

  return (
    <DashboardLayout type="admin">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            View and analyze data on issues, feedback, and system performance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
            <Select defaultValue="thisYear">
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
                <SelectItem value="thisQuarter">This Quarter</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Analytics
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">257</div>
              <div className="text-sm text-muted-foreground mt-1 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">12%</span>
                <span className="ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Resolution Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">86%</div>
              <div className="text-sm text-muted-foreground mt-1 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">4%</span>
                <span className="ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Resolution Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3.8 days</div>
              <div className="text-sm text-muted-foreground mt-1 flex items-center">
                <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">0.2 days</span>
                <span className="ml-1">improvement</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Satisfaction Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.6/5</div>
              <div className="text-sm text-muted-foreground mt-1 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">0.1</span>
                <span className="ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="issues" className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="issues">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Issues by Department</CardTitle>
                  <CardDescription>
                    Comparison of total vs. resolved issues across departments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={issuesByDepartmentData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barGap={4}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" name="Total Issues" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="resolved" name="Resolved" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Issues by Priority</CardTitle>
                  <CardDescription>
                    Distribution of issues by priority level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={issuesByPriorityData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          fill="#8884d8"
                          paddingAngle={4}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {issuesByPriorityData.map((entry, index) => (
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
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Issue Resolution Trends</CardTitle>
                  <CardDescription>
                    Monthly trends of issues reported vs. resolved and average resolution time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={resolutionTrendData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="issues"
                          name="Issues Reported"
                          stroke="#94a3b8"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="resolved"
                          name="Issues Resolved"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="resolution_time"
                          name="Avg. Resolution Time (days)"
                          stroke="#f97316"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="feedback">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Satisfaction Score Trend</CardTitle>
                  <CardDescription>
                    Monthly average satisfaction scores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={satisfactionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="score"
                          name="Satisfaction Score"
                          stroke="#3b82f6"
                          fillOpacity={1}
                          fill="url(#colorScore)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Feedback Categories</CardTitle>
                  <CardDescription>
                    Distribution of feedback by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={feedbackCategoriesData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          fill="#8884d8"
                          paddingAngle={4}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {feedbackCategoriesData.map((entry, index) => (
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
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Issue Types</CardTitle>
                  <CardDescription>
                    Distribution of issues by type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={issuesByTypeData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="type" type="category" />
                        <Tooltip />
                        <Bar dataKey="count" name="Number of Issues" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Department Performance</CardTitle>
                      <CardDescription>
                        Performance metrics by department
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full h-6 w-6">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Info</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {['IT', 'Facilities', 'Academic', 'Admin', 'Financial'].map((dept, index) => {
                      const percent = 90 - (index * 5);
                      return (
                        <div key={dept} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="font-medium">{dept}</div>
                            <div className="text-sm">{percent}%</div>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button variant="link" size="sm" className="flex items-center">
                      View details <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>System Health</CardTitle>
                      <CardDescription>
                        Key system performance metrics
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full h-6 w-6">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Info</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">System Uptime</div>
                        <div className="text-2xl font-bold">99.98%</div>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Avg. Response Time</div>
                        <div className="text-2xl font-bold">230ms</div>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-blue-500"></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Error Rate</div>
                        <div className="text-2xl font-bold">0.03%</div>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Database Load</div>
                        <div className="text-2xl font-bold">32%</div>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>
                    User login and activity patterns over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { hour: '00:00', users: 12 },
                          { hour: '02:00', users: 8 },
                          { hour: '04:00', users: 5 },
                          { hour: '06:00', users: 10 },
                          { hour: '08:00', users: 42 },
                          { hour: '10:00', users: 78 },
                          { hour: '12:00', users: 85 },
                          { hour: '14:00', users: 92 },
                          { hour: '16:00', users: 75 },
                          { hour: '18:00', users: 48 },
                          { hour: '20:00', users: 32 },
                          { hour: '22:00', users: 18 }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="users"
                          name="Active Users"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics;
