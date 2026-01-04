import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'
import { Button } from '../../ui/button'
import { Badge } from '../../ui/badge'
import { Avatar, AvatarFallback } from '../../ui/avatar'
import { Award, Heart, Trophy} from 'lucide-react'

interface RecognitionCardProps {
  onNavigate?: (page: string) => void
}

export function RecognitionCard({ onNavigate }: RecognitionCardProps) {
  const recentRecognition = {
    from: 'Sarah Johnson',
    department: 'Marketing',
    message: 'Thank you for helping with the website integration! Your technical expertise made our campaign launch seamless.',
    badge: 'Team Player',
    date: 'Aug 14'
  }

  const stats = {
    totalPoints: 850,
    recognitionsReceived: 8,
    recognitionsGiven: 5
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-600" />
            <span>Recognition</span>
          </CardTitle>
          <CardDescription>Celebrate achievements</CardDescription>
        </div>
        <Trophy className="w-6 h-6 text-yellow-500" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-bold">{stats.totalPoints}</div>
            <div className="text-xs text-muted-foreground">Points</div>
          </div>
          <div>
            <div className="text-xl font-bold">{stats.recognitionsReceived}</div>
            <div className="text-xs text-muted-foreground">Received</div>
          </div>
          <div>
            <div className="text-xl font-bold">{stats.recognitionsGiven}</div>
            <div className="text-xs text-muted-foreground">Given</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="text-sm font-medium">Latest Recognition</div>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs">SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{recentRecognition.from}</p>
                <p className="text-xs text-muted-foreground">{recentRecognition.department} • {recentRecognition.date}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{recentRecognition.message}</p>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs">
              <Trophy className="w-3 h-3 mr-1" />
              {recentRecognition.badge}
            </Badge>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            className="flex-1" 
            size="sm" 
            variant="outline"
            onClick={() => onNavigate?.('recognition')}
          >
            <Heart className="w-3 h-3 mr-1" />
            Give Recognition
          </Button>
          <Button 
            className="flex-1" 
            size="sm"
            onClick={() => onNavigate?.('recognition')}
          >
            View All
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}