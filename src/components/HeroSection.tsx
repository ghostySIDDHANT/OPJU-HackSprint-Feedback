
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] }
  };

  return (
    <section className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] left-[20%] h-[800px] w-[800px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[20%] right-[20%] h-[600px] w-[600px] rounded-full bg-blue-400/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{ ...fadeIn.transition, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Simplifying Campus Life Through Feedback
            </h1>
          </motion.div>

          <motion.div
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{ ...fadeIn.transition, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground mb-8 md:mb-10 max-w-3xl mx-auto text-balance">
              A seamless platform where students can report issues, provide feedback, and track status updates — all in one place.
            </p>
          </motion.div>

          <motion.div
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{ ...fadeIn.transition, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto"
          >
            <Button 
              onClick={() => navigate('/report')} 
              size="lg" 
              className="w-full sm:w-auto"
            >
              Report an Issue
            </Button>
            <Button 
              onClick={() => navigate('/track')} 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto"
            >
              Track Status
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 md:mt-24 relative"
          >
            <div className="w-full max-w-5xl mx-auto relative rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-24 bottom-0 top-auto"></div>
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Students collaborating" 
                className="w-full h-auto rounded-xl object-cover aspect-[16/9]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
