import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MessageSquare, Leaf, BookOpen, Trophy, Star, Award, Check, Lock, MapPin, Users } from 'lucide-react';

// Mock data for student achievements
const mockAchievements = [
  {
    id: 1,
    name: "First Report",
    description: "Submit your first issue report",
    completed: true,
    dateCompleted: "2023-05-10",
    points: 50,
    icon: MessageSquare
  },
  {
    id: 2,
    name: "Feedback Champion",
    description: "Submit 5 pieces of constructive feedback",
    completed: true,
    dateCompleted: "2023-06-15",
    points: 100,
    icon: Star
  },
  {
    id: 3,
    name: "Eco Initiative",
    description: "Report an environmental issue on campus",
    completed: true,
    dateCompleted: "2023-07-20",
    points: 75,
    icon: Leaf
  },
  {
    id: 4,
    name: "Academic Improver",
    description: "Suggest an improvement to course materials",
    completed: false,
    points: 100,
    progress: 75,
    icon: BookOpen
  },
  {
    id: 5,
    name: "Community Leader",
    description: "Have 10 of your suggestions implemented",
    completed: false,
    points: 200,
    progress: 30,
    icon: Trophy
  },
  {
    id: 6,
    name: "Issue Solver",
    description: "Help resolve 5 reported issues",
    completed: false,
    points: 150,
    progress: 40,
    icon: Check
  },
  {
    id: 7,
    name: "Campus Explorer",
    description: "Report issues from 10 different campus locations",
    completed: false,
    points: 125,
    progress: 60,
    icon: MapPin
  },
  {
    id: 8,
    name: "Collaboration Master",
    description: "Participate in 3 collaborative improvement projects",
    completed: false,
    points: 175,
    progress: 0,
    icon: Users
  }
];

// Badges for achievement levels
const badges = [
  { name: "Bronze Contributor", level: 1, pointsRequired: 100, color: "from-amber-700 to-amber-500", unlocked: true },
  { name: "Silver Innovator", level: 2, pointsRequired: 250, color: "from-slate-400 to-slate-300", unlocked: true },
  { name: "Gold Champion", level: 3, pointsRequired: 500, color: "from-amber-500 to-amber-300", unlocked: false },
  { name: "Platinum Leader", level: 4, pointsRequired: 1000, color: "from-cyan-500 to-cyan-300", unlocked: false },
  { name: "Diamond Visionary", level: 5, pointsRequired: 2000, color: "from-sky-500 to-indigo-500", unlocked: false }
];

export default function AchievementsTab() {
  const totalPoints = 450; // This would normally be calculated from student data
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">My Achievements</h2>
        <p className="text-muted-foreground">
          Track your progress and earn points for contributing to campus improvement.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Achievement Progress</CardTitle>
          <CardDescription>
            You've earned {totalPoints} points through your contributions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Level 4: Innovator</span>
              <span>{totalPoints} / 600 points to next level</span>
            </div>
            <Progress value={(totalPoints % 150) / 1.5} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.level} 
                className={`border rounded-lg p-4 flex items-center gap-4 ${
                  badge.unlocked ? 'bg-background/60' : 'bg-muted/30 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                  bg-gradient-to-br ${badge.color} text-white`}>
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{badge.name}</h3>
                    {!badge.unlocked && <Lock className="h-3 w-3 text-muted-foreground" />}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {badge.unlocked 
                      ? `Level ${badge.level} - Unlocked` 
                      : `Requires ${badge.pointsRequired} points`
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <h3 className="text-xl font-medium pt-4">Achievement List</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockAchievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <Card 
              key={achievement.id} 
              className={`${!achievement.completed && 'opacity-75'}`}
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center 
                    ${achievement.completed ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant={achievement.completed ? "success" : "outline"}>
                    {achievement.points} pts
                  </Badge>
                </div>
                
                <div>
                  <h3 className="font-medium">{achievement.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {achievement.description}
                  </p>
                </div>
                
                {achievement.completed ? (
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>Completed on {achievement.dateCompleted}</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-1" />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
