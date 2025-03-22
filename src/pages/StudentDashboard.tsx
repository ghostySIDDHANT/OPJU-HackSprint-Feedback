import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import GamificationProfile from '@/components/GamificationProfile';
import LeaderboardComponent from '@/components/LeaderboardComponent';
import ReportsTab from '@/components/student/ReportsTab';
import FeedbackTab from '@/components/student/FeedbackTab';
import AchievementsTab from '@/components/student/AchievementsTab';
import { MessageSquare, Leaf, BookOpen, Trophy, Star, Box, Search } from 'lucide-react';

// Mock data for the student profile
const studentData = {
  studentName: "Aarav Sharma",
  level: 4,
  points: 450,
  nextLevelPoints: 600,
  achievements: [
    {
      id: 1,
      name: "First Report",
      description: "Submit your first issue report",
      completed: true,
      points: 50,
      icon: MessageSquare
    },
    {
      id: 2,
      name: "Feedback Champion",
      description: "Submit 5 pieces of constructive feedback",
      completed: true,
      points: 100,
      icon: Star
    },
    {
      id: 3,
      name: "Eco Initiative",
      description: "Report an environmental issue on campus",
      completed: true,
      points: 75,
      icon: Leaf
    },
    {
      id: 4,
      name: "Academic Improver",
      description: "Suggest an improvement to course materials",
      completed: false,
      points: 100,
      icon: BookOpen
    },
    {
      id: 5,
      name: "Community Leader",
      description: "Have 10 of your suggestions implemented",
      completed: false,
      points: 200,
      icon: Trophy
    }
  ]
};

// Mock data for leaderboard
const leaderboardUsers = [
  { id: "1", name: "Rohan Mehta", points: 720, level: 6, rank: 1, department: "Computer Science" },
  { id: "2", name: "Priya Singh", points: 645, level: 5, rank: 2, department: "Engineering" },
  { id: "3", name: "Aarav Sharma", points: 450, level: 4, rank: 3, department: "Business" },
  { id: "4", name: "Raj Patel", points: 410, level: 4, rank: 4, department: "Medicine" },
  { id: "5", name: "Ananya Gupta", points: 380, level: 3, rank: 5, department: "Psychology" }
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Student Dashboard - Student Hub';
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <section className="pt-32 px-4 md:px-8 max-w-7xl mx-auto mb-20 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-muted-foreground">
              Track your contributions, achievements, and campus improvement impact
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/lost-and-found')}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Lost & Found
            </Button>
            <Button onClick={() => navigate('/report')}>
              Submit New Report
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">My Reports</TabsTrigger>
            <TabsTrigger value="feedback">My Feedback</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <GamificationProfile 
                  studentName={studentData.studentName}
                  level={studentData.level}
                  points={studentData.points}
                  nextLevelPoints={studentData.nextLevelPoints}
                  achievements={studentData.achievements}
                />
              </div>
              
              <div className="md:col-span-1">
                <LeaderboardComponent 
                  title="Top Contributors"
                  users={leaderboardUsers}
                  timeframe="monthly"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Wi-Fi Issues in Library</h3>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Pending</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Submitted 3 days ago</p>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Water Fountain Repair</h3>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Resolved</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Submitted 2 weeks ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Course Material Suggestions</h3>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} className={`h-3 w-3 ${star <= 4 ? 'text-amber-400' : 'text-gray-300'}`} fill={star <= 4 ? 'currentColor' : 'none'} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Submitted 1 week ago</p>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Cafeteria Menu Feedback</h3>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} className={`h-3 w-3 ${star <= 3 ? 'text-amber-400' : 'text-gray-300'}`} fill={star <= 3 ? 'currentColor' : 'none'} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Submitted 3 weeks ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <ReportsTab />
          </TabsContent>
          
          <TabsContent value="feedback">
            <FeedbackTab />
          </TabsContent>
          
          <TabsContent value="achievements">
            <AchievementsTab />
          </TabsContent>
        </Tabs>
      </section>
      
      <Footer />
    </div>
  );
};

export default StudentDashboard;
