
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Menu, 
  X,
  BarChart3, 
  Settings, 
  Users, 
  FileText, 
  Megaphone, 
  Building2, 
  LayoutDashboard,
  MessagesSquare,
  Inbox,
  Bell
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MobileDashboardNavProps {
  type: 'admin' | 'department';
}

const MobileDashboardNav = ({ type }: MobileDashboardNavProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const adminLinks = [
    { href: '/admin', icon: <LayoutDashboard className="h-4 w-4" />, label: 'Overview' },
    { href: '/admin/issues', icon: <Inbox className="h-4 w-4" />, label: 'Issues' },
    { href: '/admin/feedback', icon: <MessagesSquare className="h-4 w-4" />, label: 'Feedback' },
    { href: '/admin/departments', icon: <Building2 className="h-4 w-4" />, label: 'Departments' },
    { href: '/admin/users', icon: <Users className="h-4 w-4" />, label: 'Users' },
    { href: '/admin/reports', icon: <FileText className="h-4 w-4" />, label: 'Reports' },
    { href: '/admin/analytics', icon: <BarChart3 className="h-4 w-4" />, label: 'Analytics' },
    { href: '/admin/announcements', icon: <Megaphone className="h-4 w-4" />, label: 'Announcements' },
    { href: '/admin/settings', icon: <Settings className="h-4 w-4" />, label: 'Settings' },
  ];

  const departmentLinks = [
    { href: '/department', icon: <LayoutDashboard className="h-4 w-4" />, label: 'Overview' },
    { href: '/department/issues', icon: <Inbox className="h-4 w-4" />, label: 'Department Issues' },
    { href: '/department/feedback', icon: <MessagesSquare className="h-4 w-4" />, label: 'Feedback' },
    { href: '/department/staff', icon: <Users className="h-4 w-4" />, label: 'Staff' },
    { href: '/department/reports', icon: <FileText className="h-4 w-4" />, label: 'Reports' },
    { href: '/department/analytics', icon: <BarChart3 className="h-4 w-4" />, label: 'Analytics' },
    { href: '/department/notifications', icon: <Bell className="h-4 w-4" />, label: 'Notifications' },
    { href: '/department/settings', icon: <Settings className="h-4 w-4" />, label: 'Settings' },
  ];

  const links = type === 'admin' ? adminLinks : departmentLinks;

  return (
    <div className="md:hidden sticky top-0 z-40 flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="font-semibold">
        {type === 'admin' ? 'Admin Portal' : 'Department Portal'}
      </div>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col gap-2 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="px-4 text-lg font-semibold tracking-tight">
                {type === 'admin' ? 'Admin Portal' : 'Department Portal'}
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <nav className="space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                    link.href === currentPath
                      ? "bg-secondary text-foreground font-medium"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileDashboardNav;
