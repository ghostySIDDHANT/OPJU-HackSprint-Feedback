
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color?: string;
  delay?: number;
}

export default function ActionCard({ 
  title, 
  description, 
  icon: Icon, 
  path, 
  color = "from-blue-500 to-primary", 
  delay = 0 
}: ActionCardProps) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(path);
  };

  return (
    <div 
      className="action-card animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
      onClick={handleClick}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
        "bg-gradient-to-br bg-clip-padding text-white",
        color
      )}>
        <Icon size={24} />
      </div>
      
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
