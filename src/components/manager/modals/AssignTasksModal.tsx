import { useState, useEffect } from 'react';
import { Target, Calendar, AlertCircle, Plus, Clock, Flag, Search, CheckCircle2 } from 'lucide-react';
import { authService } from '../../../lib/mockServices';
import { taskService, userService } from '../../../lib/mockServices';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Alert, AlertDescription } from '../../ui/alert';
import { Calendar as CalendarComponent } from '../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface AssignTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  title?: string;
  description?: string;
  deadline?: string;
  assignee?: string;
}

export function AssignTasksModal({ isOpen, onClose }: AssignTasksModalProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [memberSearchTerm, setMemberSearchTerm] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [deadline, setDeadline] = useState<Date>();
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    project: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    deadline: '',
    assignedEmployeeId: '',
    assignedEmployeeName: ''
  });

  useEffect(() => {
    if (isOpen) {
      fetchTeamMembers();
      // Reset form when modal opens
      setNewTask({
        title: '',
        description: '',
        project: '',
        priority: 'medium',
        deadline: '',
        assignedEmployeeId: '',
        assignedEmployeeName: ''
      });
      setDeadline(undefined);
      setMemberSearchTerm('');
      setErrors({});
    }
  }, [isOpen]);

  async function fetchTeamMembers() {
    try {
      setLoadingMembers(true);
      const user = await authService.getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      
      const allUsers = await userService.getAllUsers();
      const team = allUsers.filter(u => u.manager_id === user.id && u.role === 'employee');
      setTeamMembers(team);
    } catch (error: any) {
      console.error('Error fetching team members:', error);
      toast.error('Failed to load team members');
    } finally {
      setLoadingMembers(false);
    }
  }

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!newTask.title?.trim()) {
      newErrors.title = 'Task title is required';
    }

    if (!newTask.description?.trim()) {
      newErrors.description = 'Task description is required';
    }

    if (!newTask.deadline) {
      newErrors.deadline = 'Deadline is required';
    }

    if (!newTask.assignedEmployeeId) {
      newErrors.assignee = 'Please select a team member to assign this task';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectEmployee = (member: any) => {
    setNewTask(prev => ({
      ...prev,
      assignedEmployeeId: member.id,
      assignedEmployeeName: member.full_name
    }));
    if (errors.assignee) {
      setErrors(prev => ({ ...prev, assignee: undefined }));
    }
  };

  const handleCreateTask = async () => {
    if (!validateForm()) {
      toast.error('Please fix the form errors before submitting');
      return;
    }

    setIsCreating(true);
    
    try {
      const user = await authService.getCurrentUser();
      if (!user) throw new Error('Not authenticated');

      const assignedEmployee = teamMembers.find(m => m.id === newTask.assignedEmployeeId);
      await taskService.createTask({
        title: newTask.title,
        description: newTask.description,
        assigned_to_id: newTask.assignedEmployeeId,
        assigned_to_name: assignedEmployee?.full_name || newTask.assignedEmployeeName,
        assigned_by_id: user.id,
        assigned_by_name: user.full_name,
        due_date: newTask.deadline,
        assigned_date: new Date().toISOString(),
        priority: newTask.priority,
        status: 'pending',
        category: newTask.project || 'General',
      });
      
      toast.success('Task created and assigned successfully!', {
        description: `Task assigned to ${newTask.assignedEmployeeName}`
      });
      
      onClose();
    } catch (error: any) {
      console.error('Error creating task:', error);
      toast.error(error.message || 'Failed to create task');
    } finally {
      setIsCreating(false);
    }
  };

  const filteredMembers = teamMembers.filter(member => 
    member.full_name.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
    (member.job_title && member.job_title.toLowerCase().includes(memberSearchTerm.toLowerCase()))
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="h-10 w-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <div>Assign Task</div>
              <DialogDescription className="text-base mt-1">
                Create and assign a new task to a team member
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Details</CardTitle>
              <CardDescription>Provide information about the task</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title *</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => {
                    setNewTask(prev => ({ ...prev, title: e.target.value }));
                    if (errors.title) setErrors(prev => ({ ...prev, title: undefined }));
                  }}
                  placeholder="Enter task title"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.title}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => {
                    setNewTask(prev => ({ ...prev, description: e.target.value }));
                    if (errors.description) setErrors(prev => ({ ...prev, description: undefined }));
                  }}
                  placeholder="Describe the task requirements..."
                  rows={4}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project">Project Name (Optional)</Label>
                  <Input
                    id="project"
                    value={newTask.project}
                    onChange={(e) => setNewTask(prev => ({ ...prev, project: e.target.value }))}
                    placeholder="e.g., Dashboard UI, API Gateway"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Priority *</Label>
                  <Select 
                    value={newTask.priority} 
                    onValueChange={(value: any) => setNewTask(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          Low
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-yellow-500" />
                          Medium
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4 text-red-500" />
                          High
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Deadline *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${errors.deadline ? 'border-red-500' : ''}`}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {deadline ? format(deadline, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={deadline}
                      onSelect={(date) => {
                        if (date) {
                          const selectedDate = date instanceof Date ? date : (date as { from?: Date }).from;
                          if (selectedDate) {
                            setDeadline(selectedDate);
                            setNewTask(prev => ({ ...prev, deadline: format(selectedDate, 'yyyy-MM-dd') }));
                            if (errors.deadline) {
                              setErrors(prev => ({ ...prev, deadline: undefined }));
                            }
                          }
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.deadline && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.deadline}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assign To</CardTitle>
              <CardDescription>Select a team member to assign this task</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Search Team Members</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or role..."
                    value={memberSearchTerm}
                    onChange={(e) => setMemberSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {loadingMembers ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading team members...
                </div>
              ) : filteredMembers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {memberSearchTerm ? 'No team members found' : 'No team members available'}
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto border rounded-lg p-2">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => handleSelectEmployee(member)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        newTask.assignedEmployeeId === member.id
                          ? 'bg-blue-50 border-2 border-blue-500'
                          : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {member.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{member.full_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.job_title || member.role} {member.department ? `• ${member.department}` : ''}
                        </p>
                      </div>
                      {newTask.assignedEmployeeId === member.id && (
                        <CheckCircle2 className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {errors.assignee && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.assignee}</AlertDescription>
                </Alert>
              )}

              {newTask.assignedEmployeeId && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-900">
                    Selected: {newTask.assignedEmployeeName}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {newTask.assignedEmployeeId 
                ? `Task will be assigned to ${newTask.assignedEmployeeName}`
                : 'Select a team member to assign this task'
              }
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask} disabled={isCreating}>
                {isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create & Assign Task
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};