import { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { X } from 'lucide-react';

interface CreateJobOpeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function CreateJobOpeningModal({ isOpen, onClose, onSubmit }: CreateJobOpeningModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    description: '',
    required_skills: '',
    experience_level: 'Mid-Level (3-5 years)',
    location: 'Remote',
    cv_analyzer_link: '',
    status: 'draft' as 'draft' | 'open' | 'closed'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const skills = formData.required_skills
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    onSubmit({
      ...formData,
      required_skills: skills,
      cv_analyzer_link: formData.cv_analyzer_link || `https://cvanalyzer.example.com/apply/${Date.now()}`
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border shadow-lg">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-background">
          <h2 className="text-xl font-semibold text-gray-900">Create Job Opening</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Senior Frontend Developer"
              required
            />
          </div>

          <div>
            <Label htmlFor="department">Department *</Label>
            <Input
              id="department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="e.g., Engineering"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Job Description *</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the role, responsibilities, and requirements..."
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="skills">Required Skills * (comma-separated)</Label>
            <Input
              id="skills"
              value={formData.required_skills}
              onChange={(e) => setFormData({ ...formData, required_skills: e.target.value })}
              placeholder="e.g., React, TypeScript, Tailwind CSS"
              required
            />
          </div>

          <div>
            <Label htmlFor="experience">Experience Level *</Label>
            <select
              id="experience"
              value={formData.experience_level}
              onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option>Entry Level (0-2 years)</option>
              <option>Mid-Level (3-5 years)</option>
              <option>Senior (5+ years)</option>
              <option>Lead/Principal (8+ years)</option>
            </select>
          </div>

          <div>
            <Label htmlFor="location">Location *</Label>
            <select
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option>Remote</option>
              <option>Onsite</option>
              <option>Hybrid</option>
            </select>
          </div>

          <div>
            <Label htmlFor="cv_link">CV Analyzer Link (optional)</Label>
            <Input
              id="cv_link"
              value={formData.cv_analyzer_link}
              onChange={(e) => setFormData({ ...formData, cv_analyzer_link: e.target.value })}
              placeholder="Leave empty to auto-generate"
            />
            <p className="text-xs text-gray-500 mt-1">
              If empty, a CV Analyzer link will be automatically generated
            </p>
          </div>

          <div>
            <Label htmlFor="status">Initial Status *</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="draft">Draft</option>
              <option value="open">Open (Publish immediately)</option>
            </select>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Job Opening
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
