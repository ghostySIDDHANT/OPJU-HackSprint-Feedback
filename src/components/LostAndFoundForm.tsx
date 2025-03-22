
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Box, Tag, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

type FormType = 'lost' | 'found';

interface LostAndFoundFormProps {
  type?: FormType;
}

export default function LostAndFoundForm({ type = 'lost' }: LostAndFoundFormProps) {
  const [formType, setFormType] = useState<FormType>(type);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { register, handleSubmit, reset } = useForm();
  
  const onSubmit = (data: any) => {
    console.log('Form data:', { ...data, date });
    // Here you would typically send the data to a backend API
    
    // Show success message
    alert(`Your ${formType} item report has been submitted successfully!`);
    
    // Reset form
    reset();
    setDate(new Date());
  };
  
  return (
    <Card className="glass-card animate-blur-in">
      <CardHeader>
        <CardTitle>{formType === 'lost' ? 'Report a Lost Item' : 'Report a Found Item'}</CardTitle>
        <CardDescription>
          {formType === 'lost' 
            ? 'Fill in the details of your lost item to help us find it.' 
            : 'Fill in the details of the item you found to help return it to its owner.'}
        </CardDescription>
        <div className="flex space-x-2 mt-2">
          <Button 
            variant={formType === 'lost' ? 'default' : 'outline'} 
            onClick={() => setFormType('lost')}
          >
            <Search className="mr-2 h-4 w-4" />
            Lost Something
          </Button>
          <Button 
            variant={formType === 'found' ? 'default' : 'outline'} 
            onClick={() => setFormType('found')}
          >
            <Box className="mr-2 h-4 w-4" />
            Found Something
          </Button>
        </div>
      </CardHeader>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="itemName">Item Name</Label>
            <Input 
              id="itemName"
              placeholder="e.g. Blue Backpack, iPhone, Student ID Card"
              {...register('itemName', { required: true })}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue="electronics">
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="books">Books & Notes</SelectItem>
                  <SelectItem value="id">ID & Cards</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Date {formType === 'lost' ? 'Lost' : 'Found'}</Label>
              <DatePicker date={date} setDate={setDate} className="w-full" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                id="location"
                className="pl-10"
                placeholder={`Where did you ${formType === 'lost' ? 'last see' : 'find'} the item?`}
                {...register('location', { required: true })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              placeholder="Provide a detailed description of the item..."
              className="min-h-[120px]"
              {...register('description', { required: true })}
            />
          </div>
          
          {formType === 'lost' && (
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Information</Label>
              <Input 
                id="contact"
                placeholder="How can someone reach you if they find your item?"
                {...register('contact', { required: true })}
              />
            </div>
          )}
          
          {formType === 'found' && (
            <div className="space-y-2">
              <Label htmlFor="turnedIn">Where was the item turned in?</Label>
              <Select defaultValue="frontDesk">
                <SelectTrigger id="turnedIn">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontDesk">Main Building Front Desk</SelectItem>
                  <SelectItem value="library">Library</SelectItem>
                  <SelectItem value="securityOffice">Security Office</SelectItem>
                  <SelectItem value="studentCenter">Student Center</SelectItem>
                  <SelectItem value="other">Other (Specify in description)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full">
            <Tag className="mr-2 h-4 w-4" />
            Submit {formType === 'lost' ? 'Lost' : 'Found'} Item Report
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
