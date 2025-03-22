
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Users, MessageCircle } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      value: "94%",
      label: "Resolution Rate",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-green-500"
    },
    {
      value: "3.2k",
      label: "Active Users",
      icon: <Users className="h-5 w-5" />,
      color: "text-blue-500"
    },
    {
      value: "48h",
      label: "Avg. Response Time",
      icon: <Clock className="h-5 w-5" />,
      color: "text-amber-500"
    },
    {
      value: "12k+",
      label: "Issues Resolved",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "text-purple-500"
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full sm:w-1/2 lg:w-1/4 p-6 text-center"
            >
              <div className="flex flex-col items-center">
                <div className={`${stat.color} mb-3`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
