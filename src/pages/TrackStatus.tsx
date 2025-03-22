
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import IssueTracker from '@/components/IssueTracker';
import Footer from '@/components/Footer';

const TrackStatus = () => {
  useEffect(() => {
    document.title = 'Track Issue Status - Student Hub';
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <section className="pt-32 px-4 md:px-8 max-w-6xl mx-auto mb-20 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Track Issue Status</h1>
        <p className="text-muted-foreground mb-8">
          View the current status and progress of your reported issues. You can search by issue ID or keywords.
        </p>
        
        <IssueTracker />
      </section>
      
      <Footer />
    </div>
  );
};

export default TrackStatus;
