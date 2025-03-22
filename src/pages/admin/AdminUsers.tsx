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
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Plus, UserPlus, UserMinus, Mail, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const roleColors = {
  admin: 'bg-red-100 text-red-800',
  staff: 'bg-blue-100 text-blue-800',
  student: 'bg-green-100 text-green-800',
  faculty: 'bg-purple-100 text-purple-800',
  department: 'bg-yellow-100 text-yellow-800'
};

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  suspended: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800'
};

const mockUsers = [
  {
    id: 'USR-001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@studenthub.edu',
    role: 'admin',
    department: 'Information Technology',
    status: 'active',
    lastActive: '2023-11-21T14:32:00',
    joined: '2021-05-12'
  },
  {
    id: 'USR-002',
    name: 'Ananya Singh',
    email: 'ananya.singh@studenthub.edu',
    role: 'staff',
    department: 'Facilities Management',
    status: 'active',
    lastActive: '2023-11-20T09:45:00',
    joined: '2020-08-03'
  },
  {
    id: 'USR-003',
    name: 'Rohan Gupta',
    email: 'rohan.gupta@studenthub.edu',
    role: 'student',
    department: 'Computer Science',
    status: 'active',
    lastActive: '2023-11-19T16:20:00',
    joined: '2022-09-01'
  },
  {
    id: 'USR-004',
    name: 'Priya Patel',
    email: 'priya.patel@studenthub.edu',
    role: 'faculty',
    department: 'Business Administration',
    status: 'active',
    lastActive: '2023-11-21T11:15:00',
    joined: '2019-02-15'
  },
  {
    id: 'USR-005',
    name: 'Diya Mehta',
    email: 'diya.mehta@studenthub.edu',
    role: 'department',
    department: 'Student Affairs',
    status: 'inactive',
    lastActive: '2023-10-30T13:40:00',
    joined: '2021-01-20'
  },
  {
    id: 'USR-006',
    name: 'Karan Verma',
    email: 'karan.verma@studenthub.edu',
    role: 'department',
    department: 'Academic Affairs',
    status: 'active',
    lastActive: '2023-11-21T08:50:00',
    joined: '2020-11-15'
  },
  {
    id: 'USR-007',
    name: 'Isha Reddy',
    email: 'isha.reddy@studenthub.edu',
    role: 'student',
    department: 'Engineering',
    status: 'suspended',
    lastActive: '2023-09-15T10:22:00',
    joined: '2022-01-10'
  },
  {
    id: 'USR-008',
    name: 'Vikram Rao',
    email: 'vikram.rao@studenthub.edu',
    role: 'staff',
    department: 'Information Technology',
    status: 'active',
    lastActive: '2023-11-20T15:37:00',
    joined: '2022-03-05'
  },
  {
    id: 'USR-009',
    name: 'Sneha Nair',
    email: 'sneha.nair@studenthub.edu',
    role: 'student',
    department: 'Psychology',
    status: 'pending',
    lastActive: null,
    joined: '2023-11-15'
  },
  {
    id: 'USR-010',
    name: 'Aditi Desai',
    email: 'aditi.desai@studenthub.edu',
    role: 'faculty',
    department: 'Arts and Humanities',
    status: 'active',
    lastActive: '2023-11-19T09:12:00',
    joined: '2021-08-20'
  }
];

const AdminUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    document.title = 'Admin Users - Student Hub';
  }, []);

  useEffect(() => {
    let filtered = [...mockUsers];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }
    
    // Apply department filter
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(user => user.department === departmentFilter);
    }
    
    // Apply tab filter
    if (activeTab === 'active') {
      filtered = filtered.filter(user => user.status === 'active');
    } else if (activeTab === 'inactive') {
      filtered = filtered.filter(user => user.status === 'inactive' || user.status === 'suspended');
    } else if (activeTab === 'recent') {
      // Get users joined in the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = filtered.filter(user => new Date(user.joined) >= thirtyDaysAgo);
    }
    
    setUsers(filtered);
  }, [searchTerm, roleFilter, statusFilter, departmentFilter, activeTab]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateTime = (dateTimeString: string | null) => {
    if (!dateTimeString) return 'Never';
    
    const date = new Date(dateTimeString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // If it's today, show time only
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // If it's yesterday, show "Yesterday"
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise show date and time
    return `${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at ${date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Get unique departments for filter
  const departments = [...new Set(mockUsers.map(user => user.department))];

  return (
    <DashboardLayout type="admin">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage user accounts, permissions, and access controls.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="recent">Recently Joined</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>User Accounts</CardTitle>
                <CardDescription>Manage and oversee all user accounts</CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-10 w-full sm:w-60"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="text-muted-foreground h-4 w-4" />
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                      <SelectItem value="department">Department</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2 ml-auto">
                <Button variant="outline" className="flex items-center gap-1">
                  <UserPlus className="h-4 w-4" />
                  Import Users
                </Button>
                <Button className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Add User
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">User</th>
                      <th className="text-left py-3 px-4 font-medium">Role</th>
                      <th className="text-left py-3 px-4 font-medium">Department</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Last Active</th>
                      <th className="text-left py-3 px-4 font-medium">Joined</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-secondary/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} />
                              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge 
                            className={`${roleColors[user.role as keyof typeof roleColors]} border-none font-normal`}
                          >
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{user.department}</td>
                        <td className="py-3 px-4">
                          <Badge 
                            className={`${statusColors[user.status as keyof typeof statusColors]} border-none font-normal`}
                          >
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">{formatDateTime(user.lastActive)}</td>
                        <td className="py-3 px-4 text-sm">{formatDate(user.joined)}</td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px]">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              <DropdownMenuItem>Reset Password</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <UserMinus className="h-4 w-4 mr-2" />
                                Disable Account
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-muted-foreground">No users found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
