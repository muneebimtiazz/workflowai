import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Progress } from "../../ui/progress"
import { Avatar, AvatarFallback } from "../../ui/avatar"
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Users, 
  AlertTriangle, 
  Plus,
  Eye
} from 'lucide-react'
import { authService, taskService, Task } from '../../../lib/mockServices'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"

interface TaskOverviewCardProps {
  onNewTask?: () => void;
  onNavigate?: (page: string) => void;
}

export function TaskOverviewCard({ onNewTask, onNavigate }: TaskOverviewCardProps = {}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  useEffect(() => {
    async function fetchTasks() {
      try {
        const user = await authService.getCurrentUser()
        if (user && user.role === 'manager') {
          const teamTasks = await taskService.getManagerTeamTasks(user.id)
          setTasks(teamTasks)
        }
      } catch (err) {
        console.error('Error fetching tasks:', err)
      }
    }
    fetchTasks()
  }, [])



  // Get team member data (this should ideally come from a context)
  const teamMembers = [
    { id: 'emp-001', name: 'Sarah Johnson', initials: 'SJ' },
    { id: 'emp-002', name: 'Mike Chen', initials: 'MC' },
    { id: 'emp-003', name: 'Emily Rodriguez', initials: 'ER' },
    { id: 'emp-004', name: 'James Wilson', initials: 'JW' },
    { id: 'emp-005', name: 'Lisa Park', initials: 'LP' }
  ];

  const getMemberById = (id: string) => teamMembers.find(member => member.id === id);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'review_completed': return 'text-green-700 bg-green-100';
      case 'under_review': return 'text-blue-700 bg-blue-100';
      case 'pending': return 'text-gray-700 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status !== 'completed' && status !== 'review_completed';
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed' || task.status === 'review_completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'under_review').length;
  const overdueTasks = tasks.filter(task => isOverdue(task.due_date, task.status)).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span className="truncate">Task Overview</span>
          </CardTitle>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center gap-2 text-sm w-auto shrink-0"
            onClick={() => onNavigate ? onNavigate('task-assignment') : onNewTask?.()}
          >
            <Plus className="h-4 w-4" />
            <span>New Task</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Task Statistics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{totalTasks}</div>
            <div className="text-sm text-muted-foreground">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{completedTasks}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{inProgressTasks}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-destructive">{overdueTasks}</div>
            <div className="text-sm text-muted-foreground">Overdue</div>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Team Completion Rate</span>
            <span className="text-sm font-medium text-foreground font-bold">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-3" />
        </div>

        {/* Filters */}
        <div className="flex flex-row gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32 text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="review_completed">Review Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-32 text-sm">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Recent Tasks */}
        <div className="space-y-3">
          <div className="flex flex-row items-center justify-between gap-2">
            <h4 className="font-medium text-base">Recent Tasks</h4>
            <Badge variant="outline" className="text-xs">{filteredTasks.length} tasks</Badge>
          </div>
          
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No tasks found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or create a new task</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {filteredTasks.slice(0, 10).map((task) => {
                const taskIsOverdue = isOverdue(task.due_date, task.status);
                
                return (
                  <div key={task.id} className="border rounded-lg p-3 space-y-2 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-sm truncate">{task.title}</h5>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {task.description}
                        </p>
                      </div>
                      <Button size="sm" variant="ghost" className="p-1 h-6 w-6 shrink-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                        {task.priority}
                      </Badge>
                      <Badge className={`${getStatusColor(task.status)} text-xs`} variant="outline">
                        {task.status.replace('_', ' ')}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {task.category}
                      </Badge>
                    </div>

                    <div className="flex flex-row items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 shrink-0" />
                          <span className={taskIsOverdue ? 'text-red-600 font-medium' : ''}>
                            {new Date(task.due_date).toLocaleDateString()}
                          </span>
                        </div>
                        {taskIsOverdue && (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertTriangle className="h-3 w-3 shrink-0" />
                            <span className="font-medium">Overdue</span>
                          </div>
                        )}
                      </div>

                      {/* Assignees */}
                      <div className="flex items-center gap-1 shrink-0">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <Avatar className="h-5 w-5 border border-white">
                          <AvatarFallback className="text-xs">
                            {task.assigned_to_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {filteredTasks.length > 10 && (
          <div className="text-center">
            <Button 
              variant="outline" 
              size="sm"
              className="w-auto text-sm"
              onClick={() => onNavigate?.('task-assignment')}
            >
              View All Tasks ({filteredTasks.length})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}