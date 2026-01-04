import { useState, useEffect } from 'react';
import { Target, Users, Calendar, Plus, Clock, CheckCircle, Eye, FileCheck, Star, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Label } from '../../ui/label';
import { AssignTasksModal } from '../modals/AssignTasksModal';
import { authService } from '../../../lib/mockServices';
import { taskService, Task } from '../../../lib/mockServices';
import { toast } from 'sonner';
import { format } from 'date-fns';

export const TaskAssignment = () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [performanceScore, setPerformanceScore] = useState<number>(5);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      const user = await authService.getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      
      const teamTasks = await taskService.getManagerTeamTasks(user.id);
      setTasks(teamTasks);
    } catch (err: any) {
      console.error('Error fetching tasks:', err);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }

  async function handleStartReview(task: Task) {
    try {
      const user = await authService.getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      
      await taskService.startTaskReview(task.id, user.id);
      await fetchTasks();
      toast.success('Review started');
    } catch (err: any) {
      console.error('Error starting review:', err);
      toast.error(err.message || 'Failed to start review');
    }
  }

  async function handleFinishReview() {
    if (!selectedTask) return;
    
    try {
      const user = await authService.getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      
      await taskService.finishTaskReview(selectedTask.id, user.id, performanceScore);
      await fetchTasks();
      setReviewDialogOpen(false);
      setSelectedTask(null);
      setPerformanceScore(5);
      toast.success('Review completed');
    } catch (err: any) {
      console.error('Error finishing review:', err);
      toast.error(err.message || 'Failed to complete review');
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Assigned</Badge>;
      case 'completed':
        return <Badge variant="default">Completed</Badge>;
      case 'under_review':
        return <Badge variant="outline">Under Review</Badge>;
      case 'review_completed':
        return <Badge variant="default">Review Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>;
      case 'high':
        return <Badge variant="outline">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assigned_to_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === 'all') return matchesSearch;
    return matchesSearch && task.status === selectedTab;
  });

  const assignedCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const underReviewCount = tasks.filter(t => t.status === 'under_review').length;
  const reviewCompletedCount = tasks.filter(t => t.status === 'review_completed').length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-sm text-muted-foreground">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Task Assignment & Review</h2>
          <p className="text-sm text-muted-foreground">Assign tasks and review team performance</p>
        </div>
        <Button onClick={() => setShowAssignModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Assign Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Target className="w-4 h-4 text-muted-foreground" />
              Assigned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{assignedCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting completion</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{completedCount}</div>
            <p className="text-xs text-muted-foreground">Ready for review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              Under Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{underReviewCount}</div>
            <p className="text-xs text-muted-foreground">Being reviewed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-primary" />
              Review Done
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{reviewCompletedCount}</div>
            <p className="text-xs text-muted-foreground">Review completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks or employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Tasks ({tasks.length})</TabsTrigger>
          <TabsTrigger value="pending">Assigned ({assignedCount})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
          <TabsTrigger value="under_review">Under Review ({underReviewCount})</TabsTrigger>
          <TabsTrigger value="review_completed">Review Completed ({reviewCompletedCount})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4 mt-6">
          <TaskList 
            tasks={filteredTasks} 
            getStatusBadge={getStatusBadge} 
            getPriorityBadge={getPriorityBadge}
            onStartReview={handleStartReview}
            onFinishReview={(task) => {
              setSelectedTask(task);
              setReviewDialogOpen(true);
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Finish Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finish Review</DialogTitle>
            <DialogDescription>
              Rate the employee's performance on this task (0-10)
            </DialogDescription>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              <div>
                <Label>Task: {selectedTask.title}</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedTask.description}</p>
              </div>
              <div>
                <Label>Employee: {selectedTask.assigned_to_name}</Label>
              </div>
              <div>
                <Label htmlFor="score">Performance Score (0-10)</Label>
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  value={performanceScore}
                  onChange={(e) => setPerformanceScore(parseFloat(e.target.value) || 0)}
                  className="mt-2"
                />
                <div className="flex items-center gap-2 mt-2">
                  {[0, 2, 4, 6, 8, 10].map(score => (
                    <Button
                      key={score}
                      variant={performanceScore === score ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPerformanceScore(score)}
                    >
                      {score}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleFinishReview}>
                  Complete Review
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Task Modal */}
      <AssignTasksModal 
        isOpen={showAssignModal} 
        onClose={() => {
          setShowAssignModal(false);
          fetchTasks();
        }} 
      />
    </div>
  );
};

interface TaskListProps {
  tasks: Task[];
  getStatusBadge: (status: string) => React.ReactNode;
  getPriorityBadge: (priority: string) => React.ReactNode;
  onStartReview: (task: Task) => void;
  onFinishReview: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, getStatusBadge, getPriorityBadge, onStartReview, onFinishReview }) => {
  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl font-semibold text-foreground mb-2">No tasks found</p>
            <p className="text-sm text-muted-foreground">No tasks match the current filter</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-base font-semibold text-foreground">{task.title}</CardTitle>
                <CardDescription className="mt-1">{task.description}</CardDescription>
              </div>
              {getPriorityBadge(task.priority)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-foreground text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{task.assigned_to_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Due: {format(new Date(task.due_date), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Assigned: {format(new Date(task.assigned_date), 'MMM dd, yyyy')}</span>
                </div>
              </div>
              {task.completed_date && (
                <div className="text-xs text-muted-foreground">
                  Completed: {format(new Date(task.completed_date), 'MMM dd, yyyy')}
                </div>
              )}
              {task.review_started_date && (
                <div className="text-xs text-muted-foreground">
                  Review started: {format(new Date(task.review_started_date), 'MMM dd, yyyy')}
                </div>
              )}
              {task.review_completed_date && (
                <div className="text-xs text-muted-foreground">
                  Review completed: {format(new Date(task.review_completed_date), 'MMM dd, yyyy')}
                </div>
              )}
              {task.performance_score !== undefined && (
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Star className="w-4 h-4 text-muted-foreground fill-current" />
                  <span className="font-medium">Performance Score: {task.performance_score}/10</span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              {getStatusBadge(task.status)}
              <div className="gap-2">
                {task.status === 'completed' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onStartReview(task)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Start Review
                  </Button>
                )}
                {task.status === 'under_review' && (
                  <Button
                    size="sm"
                    onClick={() => onFinishReview(task)}
                  >
                    <FileCheck className="w-4 h-4 mr-2" />
                    Finish Review
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

