
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Award, CheckCircle, BookOpen, MessageSquare, LucideIcon } from 'lucide-react';

interface Achievement {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  points: number;
  icon: LucideIcon;
}

interface GamificationProfileProps {
  studentName: string;
  level: number;
  points: number;
  nextLevelPoints: number;
  achievements: Achievement[];
}

const GamificationProfile = ({
  studentName,
  level,
  points,
  nextLevelPoints,
  achievements
}: GamificationProfileProps) => {
  const progress = Math.min(Math.round((points / nextLevelPoints) * 100), 100);
  const completedAchievements = achievements.filter(a => a.completed).length;
  
  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-amber-500" />
              <span>{studentName}'s Profile</span>
            </CardTitle>
            <Badge variant="outline" className="bg-primary/10 text-primary">Level {level}</Badge>
          </div>
          <CardDescription>Your gamification progress and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Progress to Level {level + 1}</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">{points} / {nextLevelPoints} points</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-secondary/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{points}</div>
              <div className="text-xs text-muted-foreground">Total Points</div>
            </div>
            <div className="bg-secondary/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{completedAchievements}</div>
              <div className="text-xs text-muted-foreground">Achievements</div>
            </div>
            <div className="bg-secondary/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{level}</div>
              <div className="text-xs text-muted-foreground">Current Level</div>
            </div>
            <div className="bg-secondary/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{achievements.length - completedAchievements}</div>
              <div className="text-xs text-muted-foreground">Available</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="gap-1">
              <BookOpen className="h-3 w-3" /> Engaged
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <MessageSquare className="h-3 w-3" /> Communicator
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3" /> Problem Spotter
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            <span>Achievements</span>
          </CardTitle>
          <CardDescription>Unlock achievements by participating</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-start">
                <div className="mr-3 mt-0.5">
                  {achievement.completed ? (
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <achievement.icon className="h-4 w-4 text-primary" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <achievement.icon className="h-4 w-4 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{achievement.name}</h4>
                      <Badge variant="outline" className="text-xs">+{achievement.points}</Badge>
                    </div>
                    {achievement.completed && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            View All Achievements
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationProfile;
