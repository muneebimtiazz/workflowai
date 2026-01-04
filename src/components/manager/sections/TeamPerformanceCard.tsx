import { TrendingUp, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Progress } from '../../ui/progress';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';

interface TeamPerformanceCardProps {
  onNavigate?: (page: string) => void;
}

export const TeamPerformanceCard: React.FC<TeamPerformanceCardProps> = ({ onNavigate }) => {
  const performanceMetrics = [
    {
      metric: 'Goal Completion',
      value: 87,
      target: 90,
      trend: '+5%',
      status: 'good'
    },
    {
      metric: 'Project Delivery',
      value: 94,
      target: 95,
      trend: '+2%',
      status: 'excellent'
    },
    {
      metric: 'Team Satisfaction',
      value: 4.2,
      target: 4.5,
      trend: '+0.3',
      status: 'good',
      isRating: true
    },
    {
      metric: 'Training Completion',
      value: 78,
      target: 85,
      trend: '-3%',
      status: 'needs-attention'
    }
  ];

  const topPerformers = [
    { name: 'Sarah Johnson', score: 96 },
    { name: 'Mike Chen', score: 94 },
    { name: 'Emily Rodriguez', score: 91 }
  ];


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent': return 'default';
      case 'good': return 'secondary';
      case 'needs-attention': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Team Performance
            </CardTitle>
            <CardDescription>
              Overall team metrics and top performers
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            94% Overall
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Metrics */}
        <div className="space-y-4">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{metric.metric}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {metric.isRating ? `${metric.value}/5.0` : `${metric.value}%`}
                  </span>
                  <Badge variant={getStatusBadge(metric.status)} className="text-xs">
                    {metric.trend}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress 
                  value={metric.isRating ? (metric.value / 5) * 100 : metric.value} 
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground min-w-fit">
                  Target: {metric.isRating ? `${metric.target}/5.0` : `${metric.target}%`}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Top Performers */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="font-medium text-sm">Top Performers This Month</span>
          </div>
          <div className="space-y-2">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{performer.name}</span>
                </div>
                <Badge variant="outline">{performer.score}%</Badge>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-2 border-t space-y-2">
          <Button 
            variant="outline" 
            className="w-full text-sm"
            onClick={() => onNavigate?.('performance')}
          >
            View Detailed Performance Report
          </Button>
          <Button 
            variant="outline" 
            className="w-full text-sm"
            onClick={() => onNavigate?.('performance')}
          >
            Schedule Performance Reviews
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};