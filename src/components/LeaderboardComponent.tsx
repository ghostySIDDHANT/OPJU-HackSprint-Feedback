
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  level: number;
  avatarUrl?: string;
  department?: string;
  rank: number;
}

interface LeaderboardComponentProps {
  title?: string;
  users: LeaderboardUser[];
  className?: string;
  timeframe?: 'weekly' | 'monthly' | 'all-time';
}

const LeaderboardComponent = ({
  title = "Leaderboard",
  users,
  className,
  timeframe = 'monthly'
}: LeaderboardComponentProps) => {
  // Sort users by points (highest first)
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  
  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm text-muted-foreground font-medium">{rank}</span>;
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-primary/5 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Award className="h-5 w-5" />
            {title}
          </CardTitle>
          <div className="text-xs font-medium text-muted-foreground">
            {timeframe === 'weekly' && 'This Week'}
            {timeframe === 'monthly' && 'This Month'}
            {timeframe === 'all-time' && 'All Time'}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {sortedUsers.map((user) => (
            <div 
              key={user.id} 
              className={cn(
                "flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors",
                user.rank <= 3 && "bg-primary/5"
              )}
            >
              <div className="flex items-center justify-center w-8">
                {getRankIcon(user.rank)}
              </div>
              <Avatar className="h-8 w-8 border border-border">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                {user.department && (
                  <p className="text-xs text-muted-foreground truncate">{user.department}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{user.points} pts</p>
                <p className="text-xs text-muted-foreground">Level {user.level}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardComponent;
