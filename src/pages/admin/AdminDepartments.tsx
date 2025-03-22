
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
import { Search, Plus, Building2, Users, MessageSquare, Phone, Mail, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockDepartments = [
  {
    id: 'DEP-001',
    name: 'Information Technology',
    description: 'Manages all technical infrastructure and provides IT support to the campus community.',
    head: 'Jacob Jones',
    staff: 15,
    issues: { total: 42, resolved: 36, pending: 6 },
    contact: { email: 'it@studenthub.edu', phone: '(555) 123-4567' },
    location: 'Tech Building, 3rd Floor',
    operationalHours: 'Mon-Fri: 8:00 AM - 5:00 PM'
  },
  {
    id: 'DEP-002',
    name: 'Facilities Management',
    description: 'Responsible for maintaining campus buildings, grounds, and infrastructure.',
    head: 'Jane Cooper',
    staff: 28,
    issues: { total: 67, resolved: 52, pending: 15 },
    contact: { email: 'facilities@studenthub.edu', phone: '(555) 234-5678' },
    location: 'Maintenance Building, 1st Floor',
    operationalHours: 'Mon-Fri: 7:00 AM - 6:00 PM, Sat: 8:00 AM - 1:00 PM'
  },
  {
    id: 'DEP-003',
    name: 'Student Affairs',
    description: 'Provides services and support for student success, engagement, and campus life.',
    head: 'Leslie Alexander',
    staff: 22,
    issues: { total: 31, resolved: 27, pending: 4 },
    contact: { email: 'studentaffairs@studenthub.edu', phone: '(555) 345-6789' },
    location: 'Student Center, 2nd Floor',
    operationalHours: 'Mon-Fri: 8:30 AM - 4:30 PM'
  },
  {
    id: 'DEP-004',
    name: 'Academic Affairs',
    description: 'Oversees academic programs, policies, and faculty development.',
    head: 'Cameron Williamson',
    staff: 18,
    issues: { total: 25, resolved: 22, pending: 3 },
    contact: { email: 'academic@studenthub.edu', phone: '(555) 456-7890' },
    location: 'Administration Building, 4th Floor',
    operationalHours: 'Mon-Fri: 9:00 AM - 5:00 PM'
  },
  {
    id: 'DEP-005',
    name: 'Financial Services',
    description: 'Manages financial aid, student accounts, and payment processing.',
    head: 'Dianne Russell',
    staff: 12,
    issues: { total: 38, resolved: 32, pending: 6 },
    contact: { email: 'finance@studenthub.edu', phone: '(555) 567-8901' },
    location: 'Administration Building, 2nd Floor',
    operationalHours: 'Mon-Fri: 8:00 AM - 4:00 PM'
  },
];

const AdminDepartments = () => {
  const [departments, setDepartments] = useState(mockDepartments);
  const [searchTerm, setSearchTerm] = useState('');
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    description: '',
    head: '',
    contact: { email: '', phone: '' },
    location: '',
    operationalHours: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    document.title = 'Admin Departments - Student Hub';
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = mockDepartments.filter(dept => 
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.contact.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDepartments(filtered);
    } else {
      setDepartments(mockDepartments);
    }
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setNewDepartment(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setNewDepartment(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddDepartment = () => {
    // In a real app, this would make an API call to add the department
    const newDept = {
      ...newDepartment,
      id: `DEP-00${departments.length + 1}`,
      staff: 0,
      issues: { total: 0, resolved: 0, pending: 0 }
    };
    
    setDepartments(prev => [...prev, newDept]);
    setNewDepartment({
      name: '',
      description: '',
      head: '',
      contact: { email: '', phone: '' },
      location: '',
      operationalHours: ''
    });
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout type="admin">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Department Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage departments, staff assignments, and operational information.
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search departments..."
              className="pl-10 w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogDescription>
                  Create a new department to manage specific areas of campus operations.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Department Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={newDepartment.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Student Services" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    value={newDepartment.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the department's responsibilities"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="head">Department Head</Label>
                  <Input 
                    id="head" 
                    name="head"
                    value={newDepartment.head}
                    onChange={handleInputChange}
                    placeholder="Full name of department head" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="contact.email"
                      value={newDepartment.contact.email}
                      onChange={handleInputChange}
                      placeholder="department@studenthub.edu" 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="contact.phone"
                      value={newDepartment.contact.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567" 
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location"
                    value={newDepartment.location}
                    onChange={handleInputChange}
                    placeholder="Building name and room/floor" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="hours">Operational Hours</Label>
                  <Input 
                    id="hours" 
                    name="operationalHours"
                    value={newDepartment.operationalHours}
                    onChange={handleInputChange}
                    placeholder="e.g. Mon-Fri: 9:00 AM - 5:00 PM" 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddDepartment}>Save Department</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {departments.map((dept) => (
            <Card key={dept.id} className="overflow-hidden">
              <CardHeader className="pb-0">
                <div className="flex justify-between">
                  <div className="flex items-start gap-2">
                    <div className="rounded-md bg-primary/10 p-2">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{dept.name}</CardTitle>
                      <CardDescription className="mt-1">{dept.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className="ml-auto">{dept.id}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="overview">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="issues">Issues</TabsTrigger>
                    <TabsTrigger value="contact">Contact Info</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-secondary/40 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                          <Users className="h-4 w-4" />
                          Staff Members
                        </div>
                        <div className="text-2xl font-bold">{dept.staff}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Head: {dept.head}
                        </div>
                      </div>
                      <div className="bg-secondary/40 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                          <MessageSquare className="h-4 w-4" />
                          Issues
                        </div>
                        <div className="text-2xl font-bold">{dept.issues.total}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {dept.issues.resolved} resolved, {dept.issues.pending} pending
                        </div>
                      </div>
                      <div className="bg-secondary/40 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                          <Building2 className="h-4 w-4" />
                          Location
                        </div>
                        <div className="text-sm font-medium">{dept.location}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {dept.operationalHours}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="issues">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Issue Resolution Rate</h3>
                        <Badge variant="outline" className="font-normal">
                          {Math.round((dept.issues.resolved / dept.issues.total) * 100)}%
                        </Badge>
                      </div>
                      <div className="w-full bg-secondary/40 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${Math.round((dept.issues.resolved / dept.issues.total) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Total: {dept.issues.total}</span>
                        <span>Resolved: {dept.issues.resolved}</span>
                        <span>Pending: {dept.issues.pending}</span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="contact">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${dept.contact.email}`} className="text-primary hover:underline">
                          {dept.contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${dept.contact.phone}`} className="hover:underline">
                          {dept.contact.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>{dept.location}</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  Manage Staff
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    Performance
                  </Button>
                  <Button size="sm">View Details</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDepartments;
