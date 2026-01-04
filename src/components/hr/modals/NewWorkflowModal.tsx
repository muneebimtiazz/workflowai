import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { onboardingService } from '../../../lib/mockServices';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2 } from 'lucide-react';

interface NewWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function NewWorkflowModal({ isOpen, onClose, onSuccess }: NewWorkflowModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    department: '',
    duration_days: '30'
  });
  const [tasks, setTasks] = useState<Array<{ title: string; description: string; days_from_start: string }>>([
    { title: '', description: '', days_from_start: '0' }
  ]);

  const addTask = () => {
    setTasks([...tasks, { title: '', description: '', days_from_start: '0' }]);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index: number, field: string, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], [field]: value };
    setTasks(newTasks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create the workflow template
      const workflow = await onboardingService.createTemplate({
        name: formData.name,
        description: formData.description || undefined,
        department: formData.department || undefined,
        duration_days: parseInt(formData.duration_days) || 30,
        is_active: true
      });

      // Add tasks to the workflow
      for (const task of tasks.filter(t => t.title.trim())) {
        await onboardingService.addWorkflowTask(workflow.id, {
          title: task.title,
          description: task.description || undefined,
          days_from_start: parseInt(task.days_from_start) || 0
        });
      }

      toast.success('Workflow created successfully!');
      onSuccess?.();
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        department: '',
        duration_days: '30'
      });
      setTasks([{ title: '', description: '', days_from_start: '0' }]);
    } catch (error: any) {
      console.error('Error creating workflow:', error);
      toast.error(error.message || 'Failed to create workflow');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Onboarding Workflow</DialogTitle>
          <DialogDescription>
            Set up a structured onboarding process with tasks and milestones
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Workflow Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Engineering Department Onboarding"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the purpose and scope of this workflow..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="e.g. Engineering"
                />
              </div>

              <div>
                <Label htmlFor="duration_days">Duration (Days) *</Label>
                <Input
                  id="duration_days"
                  type="number"
                  min="1"
                  value={formData.duration_days}
                  onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Workflow Tasks</Label>
              <Button type="button" variant="outline" size="sm" onClick={addTask}>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {tasks.map((task, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Task {index + 1}</h4>
                    {tasks.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTask(index)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <Label>Task Title *</Label>
                      <Input
                        value={task.title}
                        onChange={(e) => updateTask(index, 'title', e.target.value)}
                        placeholder="e.g. Complete IT setup"
                        required
                      />
                    </div>

                    <div>
                      <Label>Day</Label>
                      <Input
                        type="number"
                        min="0"
                        value={task.days_from_start}
                        onChange={(e) => updateTask(index, 'days_from_start', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={task.description}
                      onChange={(e) => updateTask(index, 'description', e.target.value)}
                      placeholder="Additional details about this task..."
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Workflow'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}