
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ReportForm from '@/components/ReportForm';
import Footer from '@/components/Footer';

const ReportIssue = () => {
  useEffect(() => {
    document.title = 'Report Issue - Student Hub';
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <section className="pt-32 px-4 md:px-8 max-w-3xl mx-auto mb-20 flex-grow">
        <ReportForm />
      </section>
      
      <Footer />
    </div>
  );
};

export default ReportIssue;
