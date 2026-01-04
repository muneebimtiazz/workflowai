import { useState, useEffect } from 'react';
import { Users, Plus, Search, Mail, Phone, MapPin, Eye, UserMinus} from 'lucide-react';
import { AddTeamMemberModal } from '../modals/AddTeamMemberModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Label } from '../../ui/label';
import { toast } from 'sonner';
import { authService, userService, User } from '../../../lib/mockServices';

export const MyTeam: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<User | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRemoveConfirmModal, setShowRemoveConfirmModal] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<User | null>(null);

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        setLoading(true);
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) return;

        // For managers: get their team members
        const members = await userService.getTeamMembers(currentUser.id);
        setTeamMembers(members);
      } catch (err) {
        console.error('Error fetching team members:', err);
        toast.error('Failed to load team members');
      } finally {
        setLoading(false);
      }
    }
    fetchTeamMembers();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Remote': return 'secondary';
      case 'On Leave': return 'outline';
      case 'Inactive': return 'destructive';
      case 'available': return 'default';
      case 'busy': return 'destructive';
      case 'away': return 'outline';
      case 'offline': return 'secondary';
      default: return 'outline';
    }
  };

  const handleViewProfile = (member: User) => {
    setSelectedMember(member);
    setShowProfileModal(true);
  };

  const handleEmail = (member: User) => {
    if (member.email) {
      window.location.href = `mailto:${member.email}`;
      toast.success(`Opening email client for ${member.full_name}`);
    } else {
      toast.error('Email address not available');
    }
  };

  const handleRemoveFromTeam = (member: User) => {
    setMemberToRemove(member);
    setShowRemoveConfirmModal(true);
  };

  const confirmRemoveFromTeam = async () => {
    if (!memberToRemove) return;
    
    try {
      // Remove employee from team by setting manager_id to undefined
      await userService.updateUser(memberToRemove.id, { manager_id: undefined });
      toast.success(`${memberToRemove.full_name} has been removed from your team`);
      
      // Refresh team members list
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        const members = await userService.getTeamMembers(currentUser.id);
        setTeamMembers(members);
      }
      
      setShowRemoveConfirmModal(false);
      setMemberToRemove(null);
    } catch (err) {
      console.error('Error removing team member:', err);
      toast.error('Failed to remove team member');
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const normalizedStatus = member.status.toLowerCase().replace('_', '-');
    const matchesStatus = statusFilter === 'all' || normalizedStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const TeamCard: React.FC<{ member: User }> = ({ member }) => {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={member.avatar_url} alt={member.full_name} />
                <AvatarFallback>{member.full_name?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'XX'}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{member.full_name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{member.job_title}</p>
                <Badge variant={getStatusColor(member.status === 'active' ? 'Active' : member.status === 'on_leave' ? 'On Leave' : 'Inactive')} className="mt-1">
                  {member.status === 'active' ? 'Active' : member.status === 'on_leave' ? 'On Leave' : 'Inactive'}
                </Badge>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleRemoveFromTeam(member)}
              title="Remove from Team"
              className="text-destructive hover:text-destructive"
            >
              <UserMinus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{member.email}</span>
            </div>
            {member.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{member.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{member.location}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-end pt-2 border-t">
            <span className="text-xs text-muted-foreground">
              Hired: {new Date(member.hire_date).toLocaleDateString()}
            </span>
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => handleViewProfile(member)}
            >
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => handleEmail(member)}
            >
              <Mail className="h-3 w-3 mr-1" />
              Email
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">My Team</h1>
          <p className="text-sm text-muted-foreground">
            Manage your team members and their information
          </p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => setShowAddMemberModal(true)}>
          <Plus className="w-4 h-4" />
          Add Team Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Active Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {teamMembers.filter(m => m.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">On Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {teamMembers.filter(m => m.status === 'on_leave').length}
            </div>
            <p className="text-xs text-muted-foreground">On leave</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-72"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="on-leave">On Leave</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="away">Away</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            Table View
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Card View
          </Button>
        </div>
      </div>

      {/* Team Directory */}
      {viewMode === 'table' ? (
        <Card>
          <CardHeader>
            <CardTitle>Team Directory</CardTitle>
            <CardDescription>Manage and view your team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid gap-4 text-sm font-medium text-muted-foreground border-b pb-3 grid-cols-4">
                <div>EMPLOYEE</div>
                <div>ROLE</div>
                <div>STATUS</div>
                <div>ACTIONS</div>
              </div>

              {/* Team Members Rows */}
              {filteredMembers.map((member) => {
                return (
                  <div key={member.id} className="grid gap-4 items-center py-3 border-b last:border-b-0 hover:bg-muted/30 rounded-lg px-2 grid-cols-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar_url} alt={member.full_name} />
                        <AvatarFallback>{member.full_name?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'XX'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{member.full_name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.job_title}</p>
                      <p className="text-xs text-muted-foreground">{member.department}</p>
                    </div>
                    <div>
                      <Badge variant={getStatusColor(member.status === 'active' ? 'Active' : member.status === 'on_leave' ? 'On Leave' : 'Inactive')} className="text-xs">
                        {member.status === 'active' ? 'Active' : member.status === 'on_leave' ? 'On Leave' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewProfile(member)}
                        title="View Profile"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEmail(member)}
                        title="Send Email"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleRemoveFromTeam(member)}
                        title="Remove from Team"
                      >
                        <UserMinus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      )}

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No team members found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters to find team members.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Add Team Member Modal */}
      <AddTeamMemberModal 
        isOpen={showAddMemberModal} 
        onClose={() => setShowAddMemberModal(false)}
        onMemberAdded={async () => {
          const currentUser = await authService.getCurrentUser();
          if (currentUser && currentUser.role === 'manager') {
            const members = await userService.getTeamMembers(currentUser.id);
            setTeamMembers(members);
          }
        }}
      />

      {/* View Full Profile Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={selectedMember?.avatar_url} alt={selectedMember?.full_name} />
                <AvatarFallback>
                  {selectedMember?.full_name?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'XX'}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-2xl">{selectedMember?.full_name}</div>
                <DialogDescription className="text-base mt-1">
                  {selectedMember?.job_title}
                </DialogDescription>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {selectedMember && (
            <div className="space-y-6 mt-4">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <div className="mt-1">
                    <Badge variant={getStatusColor(selectedMember.status === 'active' ? 'Active' : selectedMember.status === 'on_leave' ? 'On Leave' : 'Inactive')}>
                      {selectedMember.status === 'active' ? 'Active' : selectedMember.status === 'on_leave' ? 'On Leave' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Hire Date</Label>
                  <div className="mt-1">
                    <span className="text-lg font-semibold text-muted-foreground">
                      {new Date(selectedMember.hire_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="font-semibold">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label className="text-xs text-muted-foreground">Email</Label>
                      <p className="text-sm">{selectedMember.email || 'N/A'}</p>
                    </div>
                  </div>
                  {selectedMember.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label className="text-xs text-muted-foreground">Phone</Label>
                        <p className="text-sm">{selectedMember.phone}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label className="text-xs text-muted-foreground">Location</Label>
                      <p className="text-sm">{selectedMember.location || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label className="text-xs text-muted-foreground">Department</Label>
                      <p className="text-sm">{selectedMember.department || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <Label className="text-xs text-muted-foreground">Employee ID</Label>
                <p className="text-sm mt-1">{selectedMember.employee_id}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Remove from Team Confirmation Modal */}
      <Dialog open={showRemoveConfirmModal} onOpenChange={setShowRemoveConfirmModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserMinus className="h-5 w-5 text-destructive" />
              Remove from Team
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {memberToRemove?.full_name} from your team?
            </DialogDescription>
          </DialogHeader>
          
          {memberToRemove && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={memberToRemove.avatar_url} alt={memberToRemove.full_name} />
                  <AvatarFallback>
                    {memberToRemove.full_name?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'XX'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{memberToRemove.full_name}</p>
                  <p className="text-sm text-muted-foreground">{memberToRemove.job_title}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                This employee will no longer be part of your team and will not have access to team-related features.
              </p>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowRemoveConfirmModal(false);
                    setMemberToRemove(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={confirmRemoveFromTeam}
                >
                  Remove from Team
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

