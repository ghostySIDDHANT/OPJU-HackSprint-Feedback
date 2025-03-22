
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'pending' | 'in-progress' | 'resolved' | 'closed';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case 'pending':
        return { 
          label: 'Pending', 
          className: 'bg-yellow-50 text-yellow-700 border-yellow-200' 
        };
      case 'in-progress':
        return { 
          label: 'In Progress', 
          className: 'bg-blue-50 text-blue-700 border-blue-200' 
        };
      case 'resolved':
        return { 
          label: 'Resolved', 
          className: 'bg-green-50 text-green-700 border-green-200' 
        };
      case 'closed':
        return { 
          label: 'Closed', 
          className: 'bg-gray-50 text-gray-700 border-gray-200' 
        };
      default:
        return { 
          label: 'Unknown', 
          className: 'bg-gray-50 text-gray-700 border-gray-200' 
        };
    }
  };

  const { label, className: statusClassName } = getStatusConfig(status);

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      statusClassName,
      className
    )}>
      <span className={cn(
        'w-1.5 h-1.5 rounded-full mr-1.5',
        status === 'pending' && 'bg-yellow-400',
        status === 'in-progress' && 'bg-blue-400',
        status === 'resolved' && 'bg-green-400',
        status === 'closed' && 'bg-gray-400',
      )} />
      {label}
    </span>
  );
}

export default StatusBadge;
