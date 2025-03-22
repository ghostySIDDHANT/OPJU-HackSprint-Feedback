
import React from 'react';
import Footer from '@/components/Footer';
import DashboardSidebar from '@/components/DashboardSidebar';
import MobileDashboardNav from '@/components/MobileDashboardNav';

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: 'admin' | 'department';
}

const DashboardLayout = ({ children, type }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <MobileDashboardNav type={type} />
      <div className="flex flex-1">
        <DashboardSidebar type={type} />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
