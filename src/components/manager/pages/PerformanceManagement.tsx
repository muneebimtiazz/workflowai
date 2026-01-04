import { useState, useEffect } from 'react';
import { Target, Users, Star, Trophy, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { authService } from '../../../lib/mockServices';
import { taskService } from '../../../lib/mockServices';
import { toast } from 'sonner';

interface PerformanceStats {
  employeeId: string;
  employeeName: string;
  totalTasksCompleted: number;
  averageScore: number;
  totalTasksReviewed: number;
}

export const PerformanceManagement: React.FC = () => {
  const [performanceStats, setPerformanceStats] = useState<PerformanceStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformanceStats();
  }, []);

  async function fetchPerformanceStats() {
    try {
      setLoading(true);
      const user = await authService.getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      
      const stats = await taskService.getTeamPerformanceStats(user.id);
      // Sort by average score (highest first)
      stats.sort((a, b) => b.averageScore - a.averageScore);
      setPerformanceStats(stats);
    } catch (err: any) {
      console.error('Error fetching performance stats:', err);
      toast.error('Failed to load performance data');
    } finally {
      setLoading(false);
    }
  }

  const teamAverage = performanceStats.length > 0
    ? performanceStats.reduce((sum, stat) => sum + stat.averageScore, 0) / performanceStats.length
    : 0;

  const topPerformer = performanceStats.length > 0 ? performanceStats[0] : null;
  const lowestPerformer = performanceStats.length > 0 ? performanceStats[performanceStats.length - 1] : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-muted-foreground">Loading performance data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Performance Management</h2>
          <p className="text-muted-foreground">Team performance based on task reviews</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{teamAverage.toFixed(1)}</div>
                <p className="text-sm text-muted-foreground">Team Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">{topPerformer?.averageScore.toFixed(1) || 'N/A'}</div>
                <p className="text-sm text-muted-foreground">Top Performer</p>
                {topPerformer && (
                  <p className="text-xs text-muted-foreground mt-1">{topPerformer.employeeName}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{lowestPerformer?.averageScore.toFixed(1) || 'N/A'}</div>
                <p className="text-sm text-muted-foreground">Lowest Performer</p>
                {lowestPerformer && (
                  <p className="text-xs text-muted-foreground mt-1">{lowestPerformer.employeeName}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{performanceStats.length}</div>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Rankings */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Performance Rankings</CardTitle>
          <CardDescription>Ranked by average performance score from task reviews</CardDescription>
        </CardHeader>
        <CardContent>
          {performanceStats.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No performance data available</p>
              <p className="text-sm mt-2">Complete task reviews to see performance scores</p>
            </div>
          ) : (
            <div className="space-y-4">
              {performanceStats.map((stat, index) => (
                <div
                  key={stat.employeeId}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-semibold">
                      {index + 1}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {stat.employeeName
                          .split(' ')
                          .map(n => n[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{stat.employeeName}</p>
                        {index === 0 && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Trophy className="w-3 h-3 mr-1" />
                            Top Performer
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {stat.totalTasksCompleted} tasks completed
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="text-2xl font-bold">
                        {stat.averageScore > 0 ? stat.averageScore.toFixed(1) : 'N/A'}
                      </span>
                      <span className="text-muted-foreground">/10</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stat.totalTasksReviewed} reviewed
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};