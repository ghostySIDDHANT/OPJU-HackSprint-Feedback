
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy-loaded pages for better performance
const ReportIssue = lazy(() => import("./pages/ReportIssue"));
const Feedback = lazy(() => import("./pages/Feedback"));
const TrackStatus = lazy(() => import("./pages/TrackStatus"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const DepartmentalDashboard = lazy(() => import("./pages/DepartmentalDashboard"));
const LostAndFound = lazy(() => import("./pages/LostAndFound"));

// Admin pages
const AdminIssues = lazy(() => import("./pages/admin/AdminIssues"));
const AdminFeedback = lazy(() => import("./pages/admin/AdminFeedback"));
const AdminDepartments = lazy(() => import("./pages/admin/AdminDepartments"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminReports = lazy(() => import("./pages/admin/AdminReports"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminAnnouncements = lazy(() => import("./pages/admin/AdminAnnouncements"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

// Framer Motion import
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

// Loading component shown during lazy loading
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-16 h-16 bg-primary/20 rounded-full mb-4"></div>
      <div className="h-4 w-32 bg-primary/20 rounded mb-2"></div>
      <div className="h-3 w-24 bg-primary/10 rounded"></div>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/report" element={<ReportIssue />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/track" element={<TrackStatus />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/department" element={<DepartmentalDashboard />} />
              <Route path="/lost-and-found" element={<LostAndFound />} />
              
              {/* Admin Routes */}
              <Route path="/admin/issues" element={<AdminIssues />} />
              <Route path="/admin/feedback" element={<AdminFeedback />} />
              <Route path="/admin/departments" element={<AdminDepartments />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/announcements" element={<AdminAnnouncements />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
