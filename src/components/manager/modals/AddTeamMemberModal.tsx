import { useState, useEffect } from 'react';
import { UserPlus, Search, AlertCircle, Mail, Building2, User as UserIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { userService, User, authService } from '../../../lib/mockServices';
import { toast } from 'sonner';

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMemberAdded?: () => void;
}

export function AddTeamMemberModal({ isOpen, onClose, onMemberAdded }: AddTeamMemberModalProps) {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allEmployees, setAllEmployees] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentManager, setCurrentManager] = useState<User | null>(null);
  const [addingEmployeeId, setAddingEmployeeId] = useState<string | null>(null);
  const [managerNames, setManagerNames] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      fetchData();
    } else {
      // Reset state when modal closes
      setSearchTerm('');
      setAllEmployees([]);
      setAddingEmployeeId(null);
    }
  }, [isOpen]);

  async function fetchData() {
    try {
      setLoading(true);
      // Get current manager (route is protected, so user is definitely a manager)
      const manager = await authService.getCurrentUser();
      setCurrentManager(manager);

      if (manager) {
        // Get current team members
        const members = await userService.getTeamMembers(manager.id);
        setTeamMembers(members);

        // Get all employees
        const employees = await userService.getAllUsers();
        const employeeList = employees.filter(emp => emp.role === 'employee');
        setAllEmployees(employeeList);
      }
    } catch (error: any) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  }

  const getEmployeeManager = async (employee: User): Promise<User | null> => {
    if (!employee.manager_id) return null;
    // Get the manager by ID
    try {
      const manager = await userService.getUserById(employee.manager_id);
      return manager;
    } catch {
      return null;
    }
  }

  const isEmployeeInCurrentTeam = (employeeId: string): boolean => {
    return teamMembers.some(member => {
      // Check if employee is already in team by comparing IDs
      // We need to match by email or employee_id since TeamMember uses different ID structure
      return member.email === allEmployees.find(e => e.id === employeeId)?.email;
    });
  }

  const filteredEmployees = allEmployees.filter(employee => {
    const searchLower = searchTerm.toLowerCase();
    return (
      employee.full_name.toLowerCase().includes(searchLower) ||
      employee.email.toLowerCase().includes(searchLower) ||
      employee.job_title.toLowerCase().includes(searchLower) ||
      employee.department.toLowerCase().includes(searchLower) ||
      employee.employee_id.toLowerCase().includes(searchLower)
    );
  });

  const handleAddEmployee = async (employee: User) => {
    if (!currentManager) return;

    // Check if employee is already in current manager's team
    if (isEmployeeInCurrentTeam(employee.id)) {
      toast.error('This employee is already in your team');
      return;
    }

    // Check if employee has a different manager
    const currentManagerOfEmployee = await getEmployeeManager(employee);
    if (currentManagerOfEmployee && currentManagerOfEmployee.id !== currentManager.id) {
      toast.error(`This employee is already part of ${currentManagerOfEmployee.full_name}'s team. Please contact them first.`);
      return;
    }

    try {
      setAddingEmployeeId(employee.id);

      // Update employee's manager_id
      await userService.updateUser(employee.id, { manager_id: currentManager.id });

      toast.success(`${employee.full_name} has been added to your team`);
      
      // Refresh team members
      const updatedMembers = await userService.getTeamMembers(currentManager.id);
      setTeamMembers(updatedMembers);
      
      // Notify parent component
      if (onMemberAdded) {
        onMemberAdded();
      }
      
      // Close modal after a short delay
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error: any) {
      console.error('Error adding team member:', error);
      toast.error(error.message || 'Failed to add team member');
    } finally {
      setAddingEmployeeId(null);
    }
  };

  useEffect(() => {
    // Pre-fetch manager names for all employees
    const fetchManagerNames = async () => {
      const names: Record<string, string> = {};
      for (const employee of allEmployees) {
        if (employee.manager_id) {
          try {
            const manager = await userService.getUserById(employee.manager_id);
            if (manager) {
              names[employee.id] = manager.full_name;
            }
          } catch {
            // Manager not found, ignore
          }
        }
      }
      setManagerNames(names);
    };

    if (allEmployees.length > 0) {
      fetchManagerNames();
    }
  }, [allEmployees]);

  const getManagerName = (employee: User): string | null => {
    return managerNames[employee.id] || null;
  };

  if (!currentManager) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div>Add Team Member</div>
              <div className="text-sm font-normal text-muted-foreground mt-1">
                Search and select an employee to add to your team
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>
            All employees from the database are shown below. Select one to add them to your team.
          </DialogDescription>
        </DialogHeader>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, job title, department, or employee ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Employee List */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-2 min-h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-muted-foreground">Loading employees...</span>
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="text-center py-12">
              <UserIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">No employees found</p>
              <p className="text-sm text-muted-foreground mt-2">
                {searchTerm ? 'Try adjusting your search terms' : 'No employees available'}
              </p>
            </div>
          ) : (
            filteredEmployees.map((employee) => {
              const managerName = getManagerName(employee);
              const isInCurrentTeam = isEmployeeInCurrentTeam(employee.id);
              const isAlreadyAssigned = managerName && managerName !== currentManager.full_name;
              const isAdding = addingEmployeeId === employee.id;
              const canAdd = !isInCurrentTeam && (!isAlreadyAssigned || managerName === currentManager.full_name);

              return (
                <div
                  key={employee.id}
                  className={`p-5 border rounded-xl transition-all ${
                    isAlreadyAssigned && !isInCurrentTeam
                      ? 'border-red-200 bg-red-50/30'
                      : isInCurrentTeam
                      ? 'border-gray-200 bg-gray-50/50'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md hover:bg-blue-50/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="h-14 w-14 ring-2 ring-gray-100">
                        <AvatarImage src={employee.avatar_url} alt={employee.full_name} />
                        <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {employee.full_name
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .toUpperCase()
                            .substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{employee.full_name}</h3>
                          {isInCurrentTeam && (
                            <Badge variant="secondary">
                              In Team
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{employee.email}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1.5">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{employee.department}</span>
                            </div>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{employee.job_title}</span>
                          </div>
                        </div>
                        {isAlreadyAssigned && !isInCurrentTeam && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                              <p className="text-sm text-red-800">
                                <span className="font-semibold">Note:</span> This employee is already part of{' '}
                                <span className="font-semibold">{managerName}</span>'s team. Please contact{' '}
                                <span className="font-semibold">{managerName}</span> before adding this employee to your team.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {!isInCurrentTeam && !isAlreadyAssigned && (
                      <div className="ml-4">
                        <Button
                          onClick={() => handleAddEmployee(employee)}
                          disabled={!canAdd || isAdding}
                          size="sm"
                        >
                          {isAdding ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Adding...
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-4 w-4 mr-2" />
                              Add
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                    {isInCurrentTeam && (
                      <div className="ml-4">
                        <Badge variant="secondary">
                          In Team
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t mt-4">
          <div className="text-sm text-muted-foreground">
            {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? 's' : ''} found
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
