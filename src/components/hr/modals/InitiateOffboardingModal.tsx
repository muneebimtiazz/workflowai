import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Calendar } from '../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { offboardingService, userService } from '../../../lib/mockServices';
import { toast } from 'sonner';
import { Loader2, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface InitiateOffboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  employeeId?: string;
  employeeName?: string;
}

export function InitiateOffboardingModal({ isOpen, onClose, onSuccess, employeeId, employeeName }: InitiateOffboardingModalProps) {
  const [loading, setLoading] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [employees, setEmployees] = useState<any[]>([]);
  const [lastWorkingDate, setLastWorkingDate] = useState<Date>();
  const [formData, setFormData] = useState({
    employee_id: employeeId || '',
    reason: 'resignation',
    notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (employeeId) {
        setFormData(prev => ({ ...prev, employee_id: employeeId }));
        setLoadingEmployees(false);
      } else {
        fetchEmployees();
      }
    }
  }, [isOpen, employeeId]);

  const fetchEmployees = async () => {
    try {
      setLoadingEmployees(true);
      const data = await userService.getAllUsers();
      // Filter active employees
      setEmployees(data.filter((user: any) => user.status === 'active'));
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to load employees');
    } finally {
      setLoadingEmployees(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!lastWorkingDate) {
      toast.error('Please select the last working date');
      return;
    }

    setLoading(true);

    try {
      // Initiate offboarding workflow
      await offboardingService.initiateOffboarding({
        employee_id: formData.employee_id,
        last_working_date: format(lastWorkingDate, 'yyyy-MM-dd'),
        reason: formData.reason as any,
        notes: formData.notes || undefined
      });

      toast.success('Offboarding process initiated successfully!');
      onSuccess?.();
      onClose();
      
      // Reset form
      setFormData({
        employee_id: employeeId || '',
        reason: 'resignation',
        notes: ''
      });
      setLastWorkingDate(undefined);
    } catch (error: any) {
      console.error('Error initiating offboarding:', error);
      toast.error(error.message || 'Failed to initiate offboarding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Initiate Offboarding Process</DialogTitle>
          <DialogDescription>
            Start the offboarding process for an employee who is leaving the organization
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {!employeeId && (
              <div>
                <Label htmlFor="employee_id">Select Employee *</Label>
                {loadingEmployees ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  </div>
                ) : (
                  <Select 
                    value={formData.employee_id}
                    onValueChange={(value) => setFormData({ ...formData, employee_id: value })}
                    required
                  >
                    <SelectTrigger id="employee_id">
                      <SelectValue placeholder="Select an employee..." />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.length === 0 ? (
                        <SelectItem value="none" disabled>No active employees found</SelectItem>
                      ) : (
                        employees.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.full_name} - {employee.email}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}
            
            {employeeId && employeeName && (
              <div>
                <Label>Employee</Label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <p className="font-medium text-gray-900">{employeeName}</p>
                </div>
              </div>
            )}
            
            <div>
              <Label htmlFor="reason">Reason for Departure *</Label>
              <Select 
                value={formData.reason}
                onValueChange={(value) => setFormData({ ...formData, reason: value })}
                required
              >
                <SelectTrigger id="reason">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resignation">Resignation</SelectItem>
                  <SelectItem value="termination">Termination</SelectItem>
                  <SelectItem value="retirement">Retirement</SelectItem>
                  <SelectItem value="contract_end">Contract End</SelectItem>
                  <SelectItem value="mutual_agreement">Mutual Agreement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Last Working Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {lastWorkingDate ? format(lastWorkingDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={lastWorkingDate}
                    onSelect={(date) => {
                      if (date instanceof Date) {
                        setLastWorkingDate(date);
                      } else if (date && typeof date === 'object' && 'from' in date && date.from) {
                        setLastWorkingDate(date.from);
                      } else {
                        setLastWorkingDate(undefined);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any additional information about the departure..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || loadingEmployees}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Initiating...
                </>
              ) : (
                'Initiate Offboarding'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}