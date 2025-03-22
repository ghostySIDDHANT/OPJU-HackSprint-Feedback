
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TestimonialProps {
  content: string;
  name: string;
  role: string;
  avatarUrl?: string;
  delay: number;
}

const Testimonial = ({ content, name, role, avatarUrl, delay }: TestimonialProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card className="h-full glass-card">
        <CardContent className="p-6">
          <Quote className="h-8 w-8 text-primary/20 mb-4" />
          <p className="text-foreground mb-6 italic">{content}</p>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3 border border-primary/10">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{name}</div>
              <div className="text-sm text-muted-foreground">{role}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function TestimonialSection() {
  const testimonials = [
    {
      content: "The StudentHub platform transformed how we handle campus issues. The real-time tracking feature has significantly improved transparency between students and administration.",
      name: "Satendra Singh",
      role: "Campus Administrator",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      content: "As a student representative, I've seen firsthand how StudentHub has streamlined our communication with faculty. Issues that used to take weeks to resolve are now handled within days.",
      name: "Pratyush Behra",
      role: "Student Council President",
      avatarUrl: "https://randomuser.me/api/portraits/men/44.jpg"
    },
    {
      content: "The analytics dashboard gives us unprecedented insights into campus trends, allowing us to proactively address common issues before they become widespread problems.",
      name: "Rupesh Sao",
      role: "Department Chair",
      avatarUrl: "https://randomuser.me/api/portraits/men/46.jpg"
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
            What People Are Saying
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-lg text-muted-foreground"
          >
            See how StudentHub is making a difference across campus.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              content={testimonial.content}
              name={testimonial.name}
              role={testimonial.role}
              avatarUrl={testimonial.avatarUrl}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
