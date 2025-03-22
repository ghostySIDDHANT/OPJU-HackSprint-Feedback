
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
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

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarLink = ({ href, icon, label, active }: SidebarLinkProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
      active
        ? "bg-secondary text-foreground font-medium"
        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
    )}
  >
    {icon}
    {label}
  </Link>
);

interface DashboardSidebarProps {
  type: 'admin' | 'department';
}

const DashboardSidebar = ({ type }: DashboardSidebarProps) => {
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
    <div className="hidden md:block min-h-screen w-64 border-r bg-background/70 backdrop-blur-sm">
      <div className="flex flex-col gap-2 p-6">
        <h3 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          {type === 'admin' ? 'Admin Portal' : 'Department Portal'}
        </h3>
        <nav className="space-y-1">
          {links.map((link) => (
            <SidebarLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.label}
              active={link.href === currentPath}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;
