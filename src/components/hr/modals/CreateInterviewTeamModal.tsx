import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { X, Plus, Trash2 } from 'lucide-react';
import { userService } from '../../../lib/mockServices';

interface CreateInterviewTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function CreateInterviewTeamModal({ isOpen, onClose, onSubmit }: CreateInterviewTeamModalProps) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    members: [
      { employee_id: '', employee_name: '', employee_email: '', role: 'Interviewer' as 'Interviewer' | 'Observer' }
    ]
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const users = await userService.getAllUsers();
      setEmployees(users);
    } catch (err) {
      console.error('Error loading employees:', err);
    }
  };

  const handleAddMember = () => {
    setFormData({
      ...formData,
      members: [
        ...formData.members,
        { employee_id: '', employee_name: '', employee_email: '', role: 'Interviewer' as 'Interviewer' | 'Observer' }
      ]
    });
  };

  const handleRemoveMember = (index: number) => {
    setFormData({
      ...formData,
      members: formData.members.filter((_, i) => i !== index)
    });
  };

  const handleMemberChange = (index: number, field: string, value: any) => {
    const updatedMembers = [...formData.members];
    
    if (field === 'employee_id') {
      const employee = employees.find(e => e.id === value);
      if (employee) {
        updatedMembers[index] = {
          ...updatedMembers[index],
          employee_id: value,
          employee_name: employee.name,
          employee_email: employee.email
        };
      }
    } else {
      updatedMembers[index] = {
        ...updatedMembers[index],
        [field]: value
      };
    }
    
    setFormData({
      ...formData,
      members: updatedMembers
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty members
    const validMembers = formData.members.filter(m => m.employee_id);
    
    if (validMembers.length === 0) {
      alert('Please add at least one team member');
      return;
    }
    
    onSubmit({
      name: formData.name,
      members: validMembers
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border shadow-lg">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-background">
          <h2 className="text-xl font-semibold text-gray-900">Create Interview Team</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="team-name">Team Name *</Label>
            <Input
              id="team-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Engineering Interview Panel"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Team Members *</Label>
              <Button 
                type="button" 
                size="sm" 
                variant="outline"
                onClick={handleAddMember}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>

            <div className="space-y-3">
              {formData.members.map((member, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-gray-700">Member {index + 1}</p>
                    {formData.members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`employee-${index}`}>Employee *</Label>
                    <select
                      id={`employee-${index}`}
                      value={member.employee_id}
                      onChange={(e) => handleMemberChange(index, 'employee_id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select an employee</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name} ({emp.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor={`role-${index}`}>Role *</Label>
                    <select
                      id={`role-${index}`}
                      value={member.role}
                      onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="Interviewer">Interviewer</option>
                      <option value="Observer">Observer</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Team
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
