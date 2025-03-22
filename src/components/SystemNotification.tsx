
import React, { useState } from 'react';
import { X, Bell, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type NotificationType = 'info' | 'warning' | 'success' | 'maintenance';

interface SystemNotificationProps {
  type?: NotificationType;
  title: string;
  message: string;
  showCloseButton?: boolean;
  className?: string;
}

const SystemNotification = ({
  type = 'info',
  title,
  message,
  showCloseButton = true,
  className
}: SystemNotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'maintenance':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'maintenance':
        return <Bell className="h-5 w-5 text-purple-600" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className={cn(
      'flex items-start p-4 border rounded-lg shadow-sm',
      getTypeStyles(),
      className
    )}>
      <div className="shrink-0 mr-3">
        {getIcon()}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-sm">{title}</h3>
        <div className="mt-1 text-sm opacity-90">{message}</div>
      </div>
      {showCloseButton && (
        <button
          type="button"
          className="shrink-0 ml-3 -mt-1 -mr-1 p-1.5 rounded-full hover:bg-white/20 transition-colors"
          onClick={() => setIsVisible(false)}
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SystemNotification;
