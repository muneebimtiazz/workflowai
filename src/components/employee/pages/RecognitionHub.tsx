import { useState } from 'react'
import { Award, Plus, Heart, Star, Trophy, Send, Users, Target, Lightbulb, Gift, ThumbsUp, MessageCircle, Share, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card'
import { Button } from '../../ui/button'
import { Badge } from '../../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../../ui/dialog'
import { Textarea } from '../../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Label } from '../../ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { Separator } from '../../ui/separator'
import { toast } from 'sonner'

interface Recognition {
  id: string
  type: 'peer-to-peer' | 'manager' | 'achievement' | 'anniversary'
  sender: {
    name: string
    avatar?: string
    department: string
  }
  recipient: {
    name: string
    avatar?: string
    department: string
  }
  message: string
  category: string
  date: string
  likes: number
  comments: number
  isLiked: boolean
  badge?: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  dateEarned: string
  points: number
  category: string
}

interface Reward {
  id: string
  title: string
  description: string
  pointsCost: number
  type: 'gift-card' | 'experience' | 'merchandise' | 'time-off'
  available: boolean
  claimed: boolean
}

const recognitions: Recognition[] = [
  {
    id: '1',
    type: 'peer-to-peer',
    sender: { name: 'Sarah Johnson', department: 'Marketing' },
    recipient: { name: 'You', department: 'Engineering' },
    message: 'Thank you for helping with the website integration! Your technical expertise made our campaign launch seamless.',
    category: 'Collaboration',
    date: '2025-08-14',
    likes: 12,
    comments: 3,
    isLiked: false,
    badge: 'Team Player'
  },
  {
    id: '2',
    type: 'manager',
    sender: { name: 'Mike Chen', department: 'Engineering' },
    recipient: { name: 'You', department: 'Engineering' },
    message: 'Outstanding work on the Q3 project delivery. Your attention to detail and proactive communication kept us on track.',
    category: 'Excellence',
    date: '2025-08-10',
    likes: 18,
    comments: 5,
    isLiked: true,
    badge: 'Project Champion'
  },
  {
    id: '3',
    type: 'peer-to-peer',
    sender: { name: 'Emily Rodriguez', department: 'Design' },
    recipient: { name: 'Alex Thompson', department: 'Marketing' },
    message: 'Alex went above and beyond to help redesign our user onboarding flow. The new design is fantastic!',
    category: 'Innovation',
    date: '2025-08-12',
    likes: 15,
    comments: 2,
    isLiked: false,
    badge: 'Creative Spark'
  }
]

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Month Complete',
    description: 'Successfully completed your first month at the company',
    icon: Target,
    dateEarned: '2025-07-15',
    points: 100,
    category: 'Milestone'
  },
  {
    id: '2',
    title: 'Team Player',
    description: 'Received 5 peer recognitions for collaboration',
    icon: Users,
    dateEarned: '2025-08-01',
    points: 250,
    category: 'Collaboration'
  },
  {
    id: '3',
    title: 'Innovation Leader',
    description: 'Contributed 3 innovative solutions to team projects',
    icon: Lightbulb,
    dateEarned: '2025-08-10',
    points: 300,
    category: 'Innovation'
  },
  {
    id: '4',
    title: 'Mentor',
    description: 'Helped onboard 2 new team members',
    icon: Award,
    dateEarned: '2025-08-05',
    points: 200,
    category: 'Leadership'
  }
]

const rewards: Reward[] = [
  {
    id: '1',
    title: '$50 Amazon Gift Card',
    description: 'Perfect for personal shopping or gifts',
    pointsCost: 500,
    type: 'gift-card',
    available: true,
    claimed: false
  },
  {
    id: '2',
    title: 'Extra Day Off',
    description: 'Take an additional paid day off',
    pointsCost: 800,
    type: 'time-off',
    available: true,
    claimed: false
  },
  {
    id: '3',
    title: 'Company Hoodie',
    description: 'Premium branded hoodie in your size',
    pointsCost: 300,
    type: 'merchandise',
    available: true,
    claimed: true
  },
  {
    id: '4',
    title: 'Team Lunch Experience',
    description: 'Lunch for you and your team at a local restaurant',
    pointsCost: 1000,
    type: 'experience',
    available: false,
    claimed: false
  }
]

const recognitionCategories = [
  'Excellence', 'Innovation', 'Collaboration', 'Leadership', 'Customer Focus', 'Problem Solving'
]

const rewardTypeColors = {
  'gift-card': 'bg-green-100 text-green-800',
  'experience': 'bg-purple-100 text-purple-800',
  'merchandise': 'bg-blue-100 text-blue-800',
  'time-off': 'bg-orange-100 text-orange-800'
}

const RecognitionHub: React.FC = () => {
  const [isGivingRecognition, setIsGivingRecognition] = useState(false)
  const [selectedRecognitionType, setSelectedRecognitionType] = useState<string>('')
  const [recognitionMessage, setRecognitionMessage] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState<string>('')

  const totalPoints = achievements.reduce((sum, achievement) => sum + achievement.points, 0)
  const availablePoints = totalPoints - rewards.filter(r => r.claimed).reduce((sum, reward) => sum + reward.pointsCost, 0)

  const getRecognitionIcon = (type: Recognition['type']) => {
    switch (type) {
      case 'peer-to-peer': return Users
      case 'manager': return Star
      case 'achievement': return Trophy
      case 'anniversary': return Gift
      default: return Award
    }
  }

  const handleGiveRecognition = () => {
    if (selectedEmployee && recognitionMessage && selectedRecognitionType) {
      // Show success message
      toast.success(`Recognition sent to ${selectedEmployee} successfully!`)
      
      // Reset form
      setSelectedEmployee('')
      setRecognitionMessage('')
      setSelectedRecognitionType('')
      setIsGivingRecognition(false)
    }
  }

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Recognition Hub</h2>
          <p className="text-muted-foreground">Celebrate achievements and recognize great work</p>
        </div>
        <Dialog open={isGivingRecognition} onOpenChange={setIsGivingRecognition}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Give Recognition
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Give Recognition</DialogTitle>
              <DialogDescription>
                Recognize a colleague for their great work
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="recipient">Recipient</Label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a colleague" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Johnson - Marketing</SelectItem>
                    <SelectItem value="mike">Mike Chen - Engineering</SelectItem>
                    <SelectItem value="emily">Emily Rodriguez - Design</SelectItem>
                    <SelectItem value="alex">Alex Thompson - Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={selectedRecognitionType} onValueChange={setSelectedRecognitionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {recognitionCategories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe why you're recognizing this person..."
                  className="min-h-[100px]"
                  value={recognitionMessage}
                  onChange={(e) => setRecognitionMessage(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsGivingRecognition(false)}>
                  Cancel
                </Button>
                <Button onClick={handleGiveRecognition}>
                  <Send className="w-4 h-4 mr-2" />
                  Send Recognition
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-2xl font-semibold">{totalPoints}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Available Points</p>
                <p className="text-2xl font-semibold">{availablePoints}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="text-2xl font-semibold">{achievements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Given</p>
                <p className="text-2xl font-semibold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="feed" className="space-y-4">
        <TabsList>
          <TabsTrigger value="feed">Recognition Feed</TabsTrigger>
          <TabsTrigger value="achievements">My Achievements</TabsTrigger>
          <TabsTrigger value="rewards">Rewards Store</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          <div className="space-y-4">
            {recognitions.map((recognition) => {
              const IconComponent = getRecognitionIcon(recognition.type)
              return (
                <Card key={recognition.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={recognition.sender.avatar} />
                          <AvatarFallback>
                            {recognition.sender.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">
                                <span className="text-blue-600">{recognition.sender.name}</span>
                                {' '}recognized{' '}
                                <span className="text-blue-600">{recognition.recipient.name}</span>
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {recognition.sender.department} • {new Date(recognition.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <IconComponent className="w-4 h-4 text-muted-foreground" />
                              <Badge variant="secondary">{recognition.category}</Badge>
                            </div>
                          </div>
                          
                          <p className="text-sm">{recognition.message}</p>
                          
                          {recognition.badge && (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              <Trophy className="w-3 h-3 mr-1" />
                              {recognition.badge}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`space-x-2 ${recognition.isLiked ? 'text-red-600' : ''}`}
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>{recognition.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="space-x-2">
                            <MessageCircle className="w-4 h-4" />
                            <span>{recognition.comments}</span>
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <achievement.icon className="w-12 h-12 text-blue-600" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <Badge variant="secondary">+{achievement.points} pts</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{achievement.category}</Badge>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(achievement.dateEarned).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <div className="mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Your Points Balance</h3>
                    <p className="text-muted-foreground">Redeem points for amazing rewards</p>
                  </div>
                  <div className="text-3xl font-bold text-primary">{availablePoints}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <Card key={reward.id} className={`${!reward.available ? 'opacity-50' : ''}`}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold">{reward.title}</h3>
                        <p className="text-sm text-muted-foreground">{reward.description}</p>
                      </div>
                      <Badge className={rewardTypeColors[reward.type]}>
                        {reward.type.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Gift className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">{reward.pointsCost} points</span>
                      </div>
                      
                      {reward.claimed ? (
                        <Badge>Claimed</Badge>
                      ) : reward.available ? (
                        availablePoints >= reward.pointsCost ? (
                          <Button size="sm">Redeem</Button>
                        ) : (
                          <Button size="sm" disabled>
                            Insufficient Points
                          </Button>
                        )
                      ) : (
                        <Button size="sm" disabled>
                          Out of Stock
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Recognition Leaderboard</CardTitle>
              <CardDescription>Top performers this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 1, name: 'Sarah Johnson', department: 'Marketing', points: 850, recognitions: 12 },
                  { rank: 2, name: 'Mike Chen', department: 'Engineering', points: 720, recognitions: 9 },
                  { rank: 3, name: 'You', department: 'Engineering', points: 650, recognitions: 8 },
                  { rank: 4, name: 'Emily Rodriguez', department: 'Design', points: 580, recognitions: 7 },
                  { rank: 5, name: 'Alex Thompson', department: 'Marketing', points: 420, recognitions: 5 }
                ].map((person) => (
                  <div key={person.rank} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-semibold">
                      {person.rank}
                    </div>
                    <Avatar>
                      <AvatarFallback>
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{person.points} pts</p>
                      <p className="text-sm text-muted-foreground">{person.recognitions} recognitions</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default RecognitionHub

export { RecognitionHub }