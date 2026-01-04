import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { X, Mail } from 'lucide-react';
import { recruitmentService, Candidate } from '../../../lib/mockServices';

interface ScheduleInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  candidate: Candidate;
}

export function ScheduleInterviewModal({ isOpen, onClose, onSubmit, candidate }: ScheduleInterviewModalProps) {
  const [teams, setTeams] = useState<any[]>([]);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [emailContent, setEmailContent] = useState('');
  const [formData, setFormData] = useState({
    interview_date: '',
    interview_time: '10:00 AM',
    location: 'Google Meet',
    interview_type: 'Technical' as 'Technical' | 'HR' | 'Final',
    interview_team_id: '',
    interview_team_name: '',
    additional_notes: ''
  });

  useEffect(() => {
    loadTeams();
  }, []);

  useEffect(() => {
    if (showEmailPreview) {
      generateEmailPreview();
    }
  }, [showEmailPreview, formData]);

  const loadTeams = async () => {
    try {
      const teamsData = await recruitmentService.getInterviewTeams();
      setTeams(teamsData);
    } catch (err) {
      console.error('Error loading teams:', err);
    }
  };

  const generateEmailPreview = async () => {
    try {
      const email = await recruitmentService.generateInterviewEmail({
        candidate_name: candidate.name,
        job_title: candidate.job_title,
        interview_date: formData.interview_date || 'TBD',
        interview_time: formData.interview_time,
        location: formData.location,
        hr_contact_name: 'HR Team',
        hr_contact_email: 'hr@company.com',
        additional_notes: formData.additional_notes
      });
      setEmailContent(email);
    } catch (err) {
      console.error('Error generating email:', err);
    }
  };

  const handleTeamChange = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    setFormData({
      ...formData,
      interview_team_id: teamId,
      interview_team_name: team?.name || ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border shadow-lg">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-background">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Schedule Interview</h2>
            <p className="text-sm text-gray-600">For {candidate.name} - {candidate.job_title}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!showEmailPreview ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <Label htmlFor="date">Interview Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.interview_date}
                onChange={(e) => setFormData({ ...formData, interview_date: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="time">Interview Time *</Label>
              <Input
                id="time"
                value={formData.interview_time}
                onChange={(e) => setFormData({ ...formData, interview_time: e.target.value })}
                placeholder="e.g., 10:00 AM, 2:30 PM"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location / Meeting Link *</Label>
              <select
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option>Google Meet - meet.google.com/xxx-xxxx-xxx</option>
                <option>Zoom - zoom.us/j/123456789</option>
                <option>Office - Main Building, Conference Room A</option>
                <option>Office - Main Building, Conference Room B</option>
                <option>Custom</option>
              </select>
            </div>

            <div>
              <Label htmlFor="type">Interview Type *</Label>
              <select
                id="type"
                value={formData.interview_type}
                onChange={(e) => setFormData({ ...formData, interview_type: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
                <option value="Final">Final</option>
              </select>
            </div>

            <div>
              <Label htmlFor="team">Interview Team (optional)</Label>
              <select
                id="team"
                value={formData.interview_team_id}
                onChange={(e) => handleTeamChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">No team assigned</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name} ({team.members.length} members)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes (optional)</Label>
              <textarea
                id="notes"
                value={formData.additional_notes}
                onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                placeholder="Any additional information for the candidate..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setShowEmailPreview(true)}
              >
                <Mail className="w-4 h-4 mr-2" />
                Preview Email
              </Button>
              <div className="flex items-center space-x-3">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  Schedule Interview
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Email Preview:</p>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans">
                {emailContent}
              </pre>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowEmailPreview(false)}
              >
                Back to Form
              </Button>
              <Button onClick={handleSubmit}>
                Send & Schedule
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
