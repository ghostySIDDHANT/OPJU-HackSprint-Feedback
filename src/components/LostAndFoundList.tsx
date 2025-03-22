
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Search, Calendar, MapPin } from 'lucide-react';

// Mock data for lost items
const mockLostItems = [
  {
    id: "L1001",
    name: "Black Laptop Bag",
    category: "Bags",
    dateReported: "2023-10-15",
    lastSeen: "Library, 2nd Floor",
    description: "Black laptop bag with a blue stripe, contains laptop charger and notebooks.",
    status: "active"
  },
  {
    id: "L1002",
    name: "iPhone 13 Pro",
    category: "Electronics",
    dateReported: "2023-10-18",
    lastSeen: "Cafeteria",
    description: "iPhone 13 Pro in a red case. Lock screen has a picture of a mountain.",
    status: "claimed"
  },
  {
    id: "L1003",
    name: "Student ID Card",
    category: "ID & Cards",
    dateReported: "2023-10-20",
    lastSeen: "Science Building",
    description: "Student ID card for Jane Smith, ID #12345.",
    status: "active"
  }
];

// Mock data for found items
const mockFoundItems = [
  {
    id: "F2001",
    name: "Blue Water Bottle",
    category: "Accessories",
    dateFound: "2023-10-16",
    location: "Gym",
    description: "Blue hydro flask with stickers.",
    status: "unclaimed"
  },
  {
    id: "F2002",
    name: "Calculator",
    category: "Electronics",
    dateFound: "2023-10-17",
    location: "Math Building, Room 102",
    description: "Scientific calculator, Texas Instruments.",
    status: "claimed"
  },
  {
    id: "F2003",
    name: "Glasses",
    category: "Accessories",
    dateFound: "2023-10-19",
    location: "Student Center",
    description: "Black-rimmed glasses in a brown case.",
    status: "unclaimed"
  }
];

export default function LostAndFoundList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('lost');
  
  // Filter items based on search term
  const filteredLostItems = mockLostItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredFoundItems = mockFoundItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary">Active</Badge>;
      case 'claimed':
        return <Badge variant="success">Claimed</Badge>;
      case 'unclaimed':
        return <Badge variant="outline">Unclaimed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <Card className="glass-card animate-blur-in">
      <CardHeader>
        <CardTitle>Lost & Found Registry</CardTitle>
        <CardDescription>
          Browse through lost and found items reported by students.
        </CardDescription>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by item name or description..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs 
          defaultValue="lost" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lost">Lost Items</TabsTrigger>
            <TabsTrigger value="found">Found Items</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lost" className="space-y-4">
            {filteredLostItems.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <p>No lost items match your search.</p>
              </div>
            ) : (
              filteredLostItems.map(item => (
                <div key={item.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Category: {item.category}</p>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                  
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>Reported on {item.dateReported}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>Last seen at {item.lastSeen}</span>
                    </div>
                  </div>
                  
                  <p className="mt-2 text-sm">
                    {item.description}
                  </p>
                  
                  {item.status === 'active' && (
                    <div className="mt-3 flex justify-end">
                      <Button size="sm" variant="outline">
                        I Found This
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="found" className="space-y-4">
            {filteredFoundItems.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <p>No found items match your search.</p>
              </div>
            ) : (
              filteredFoundItems.map(item => (
                <div key={item.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Category: {item.category}</p>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                  
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>Found on {item.dateFound}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>Location: {item.location}</span>
                    </div>
                  </div>
                  
                  <p className="mt-2 text-sm">
                    {item.description}
                  </p>
                  
                  {item.status === 'unclaimed' && (
                    <div className="mt-3 flex justify-end">
                      <Button size="sm" variant="outline">
                        This Is Mine
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
