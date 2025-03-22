
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ClipboardList, MessageSquare, LineChart } from 'lucide-react';

import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import StatsSection from '@/components/StatsSection';
import TestimonialSection from '@/components/TestimonialSection';
import CTASection from '@/components/CTASection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import ActionCard from '@/components/ActionCard';
import FAQSection from '@/components/FAQSection';

const Index = () => {
  const navigate = useNavigate();
  
  // Sample FAQ items
  const faqItems = [
    {
      question: "How do I report an issue on campus?",
      answer: "You can report any issues by clicking on the 'Report Issue' button on the homepage or navigating to the Report page. Fill out the form with details about the issue and submit it."
    },
    {
      question: "How can I track the status of my reported issue?",
      answer: "Once you've reported an issue, you can track its status by going to the 'Track Status' page and entering your issue ID or searching for it by keywords."
    },
    {
      question: "What types of issues can I report?",
      answer: "You can report a variety of issues including facilities problems, academic concerns, administrative issues, technical problems, and other campus-related matters."
    },
    {
      question: "How quickly will my issue be resolved?",
      answer: "Resolution times vary based on the nature and complexity of the issue. Urgent matters are typically addressed within 24-48 hours, while standard issues may take 3-5 business days."
    },
    {
      question: "Can I provide feedback anonymously?",
      answer: "Yes, when submitting feedback, you have the option to do so anonymously by toggling the 'Submit anonymously' switch on the feedback form."
    }
  ];

  // Main action cards
  const actionCards = [
    {
      title: "Report an Issue",
      description: "Submit problems or concerns you've encountered on campus",
      icon: ClipboardList,
      path: "/report",
      color: "from-blue-500 to-primary",
      delay: 100
    },
    {
      title: "Provide Feedback",
      description: "Share your thoughts on how we can improve campus services",
      icon: MessageSquare,
      path: "/feedback",
      color: "from-green-500 to-teal-500",
      delay: 200
    },
    {
      title: "Track Status",
      description: "Check on the progress of your previously reported issues",
      icon: LineChart,
      path: "/track",
      color: "from-purple-500 to-violet-500",
      delay: 300
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <HeroSection />
        
        {/* Action Cards Section */}
        <section className="py-16 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">How Can We Help You?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose an option below to get started with our platform.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {actionCards.map((card, index) => (
              <ActionCard
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                path={card.path}
                color={card.color}
                delay={card.delay}
              />
            ))}
          </div>
        </section>
        
        <FeatureSection />
        <StatsSection />
        <TestimonialSection />
        
        {/* FAQ Section */}
        <FAQSection 
          title="Frequently Asked Questions"
          description="Find answers to common questions about using our platform."
          items={faqItems}
        />
        
        <CTASection />
      </main>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
