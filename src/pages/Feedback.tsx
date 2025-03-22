
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FeedbackForm from '@/components/FeedbackForm';
import Footer from '@/components/Footer';

const Feedback = () => {
  useEffect(() => {
    document.title = 'Give Feedback - Student Hub';
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <section className="pt-32 px-4 md:px-8 max-w-3xl mx-auto mb-20 flex-grow">
        <FeedbackForm />
      </section>
      
      <Footer />
    </div>
  );
};

export default Feedback;
