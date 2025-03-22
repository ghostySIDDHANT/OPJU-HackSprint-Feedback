
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LostAndFoundForm from '@/components/LostAndFoundForm';
import LostAndFoundList from '@/components/LostAndFoundList';

export default function LostAndFound() {
  useEffect(() => {
    document.title = 'Lost & Found - Student Hub';
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <main className="pt-32 px-4 md:px-8 max-w-7xl mx-auto mb-20 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Lost & Found</h1>
          <p className="text-muted-foreground">
            Lost something? Found something? Let us help connect items with their owners.
          </p>
        </div>
        
        <Tabs defaultValue="search" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="search">Search Items</TabsTrigger>
            <TabsTrigger value="report-lost">Report Lost</TabsTrigger>
            <TabsTrigger value="report-found">Report Found</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search">
            <LostAndFoundList />
          </TabsContent>
          
          <TabsContent value="report-lost">
            <LostAndFoundForm type="lost" />
          </TabsContent>
          
          <TabsContent value="report-found">
            <LostAndFoundForm type="found" />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
