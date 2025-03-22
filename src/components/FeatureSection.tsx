
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, LineChart, BarChart3, Clock, Shield, Award } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature = ({ icon, title, description, delay }: FeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20"
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default function FeatureSection() {
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Centralized Reporting",
      description: "Submit issues and feedback through a single, unified platform designed for simplicity and clarity."
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "Real-time Tracking",
      description: "Follow the progress of your submitted reports with transparent status updates throughout the resolution process."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Rest assured that your feedback and reports are handled with the utmost privacy and security considerations."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics Dashboard",
      description: "Administrators gain valuable insights through comprehensive data visualization of campus issues."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Efficient Resolution",
      description: "Our streamlined process ensures issues are directed to the right department for faster resolution times."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Engagement Rewards",
      description: "Gain recognition and rewards for your constructive feedback and active participation."
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            A Better Campus Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-lg text-muted-foreground"
          >
            Our platform offers comprehensive solutions to enhance communication between students and administration.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 + index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
