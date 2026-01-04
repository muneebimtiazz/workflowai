/**
 * ============================================================================
 * MOCK SERVICES
 * ============================================================================
 * 
 * This file contains all mock service implementations for the application.
 * 
 * ORGANIZATION:
 * - Type Definitions: All interfaces/types grouped by domain
 * - Mock Data: Imported from mockData.ts (all plain data arrays/objects)
 * - Services: Mock service implementations with business logic
 * 
 * BACKEND MIGRATION NOTES:
 * - When migrating to backend, replace service implementations with API calls
 * - Keep interfaces/types as they match backend API contracts
 * - Mock data in mockData.ts can be used for seeding database or removed after migration
 * 
 * ============================================================================
 */

// ============================================================================
// TYPE DEFINITIONS - Core Entities
// ============================================================================

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'employee' | 'manager' | 'hr' | 'admin' | 'executive';
  avatar_url?: string;
  department: string;
  job_title: string;
  employee_id: string;
  hire_date: string;
  manager_id?: string;
  phone?: string;
  location?: string;
  status: 'active' | 'inactive' | 'on_leave';
  lifecycle_state?: 'applied' | 'hired' | 'onboarding' | 'active' | 'notice' | 'offboarded';
  notice_period_end?: string;
  exit_date?: string;
}

export interface TimeEntry {
  id: string;
  employee_id: string;
  date: string;
  clock_in: string;
  clock_out?: string;
  break_start?: string;
  break_end?: string;
  total_hours: number;
  status: 'clocked_in' | 'clocked_out' | 'on_break';
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  employee_id: string;
  employee_name: string;
  leave_type: 'vacation' | 'sick' | 'personal' | 'parental' | 'unpaid';
  start_date: string;
  end_date: string;
  days_requested: number;
  status: 'pending_manager_approval' | 'pending_hr_approval' | 'approved' | 'rejected' | 'cancelled';
  reason: string;
  approver_id?: string;
  approver_name?: string;
  submitted_date: string;
  approved_date?: string;
  rejected_date?: string;
  rejection_reason?: string;
  notes?: string;
}


export interface Task {
  id: string;
  title: string;
  description: string;
  assigned_to_id: string;
  assigned_to_name: string;
  assigned_by_id: string;
  assigned_by_name: string;
  due_date: string;
  assigned_date: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'completed' | 'under_review' | 'review_completed';
  category: string;
  created_date: string;
  completed_date?: string;
  review_started_date?: string;
  review_completed_date?: string;
  performance_score?: number;
}

export interface TeamMember {
  id: string;
  employee_id: string;
  full_name: string;
  email: string;
  job_title: string;
  department: string;
  avatar_url?: string;
  status: 'active' | 'inactive' | 'on_leave';
  performance_score?: number;
  tasks_completed?: number;
  attendance_rate?: number;
  hire_date: string;
}

export interface PerformanceReview {
  id: string;
  employee_id: string;
  employee_name: string;
  reviewer_id: string;
  reviewer_name: string;
  review_period: string;
  review_date: string;
  overall_rating: number;
  ratings: {
    quality_of_work: number;
    productivity: number;
    communication: number;
    teamwork: number;
    leadership: number;
    innovation: number;
  };
  strengths: string[];
  areas_for_improvement: string[];
  goals_met: number;
  goals_total: number;
  comments: string;
  status: 'draft' | 'submitted' | 'completed' | 'acknowledged';
}

export interface Approval {
  id: string;
  type: 'leave' | 'expense' | 'timesheet' | 'document' | 'purchase' | 'policy_exception';
  requester_id: string;
  requester_name: string;
  approver_id: string;
  title: string;
  description: string;
  amount?: number;
  submitted_date: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
}

export interface Employee {
  id: string;
  employee_id: string;
  full_name: string;
  email: string;
  phone?: string;
  job_title: string;
  department: string;
  manager_id?: string;
  manager_name?: string;
  hire_date: string;
  status: 'active' | 'inactive' | 'on_leave' | 'terminated';
  employment_type: 'full_time' | 'part_time' | 'contract' | 'intern';
  location: string;
  salary?: number;
  avatar_url?: string;
  skills?: string[];
  certifications?: string[];
}

export interface LifecycleChecklistItem {
  id: string;
  title: string;
  description?: string;
  assigned_to: 'hr' | 'manager' | 'employee';
  status: 'pending' | 'completed';
  completed_date?: string;
  completed_by?: string;
}

export interface LifecycleTimelineEvent {
  id: string;
  employee_id: string;
  event_type: 'state_change' | 'promotion' | 'transfer' | 'role_change' | 'other';
  title: string;
  description?: string;
  from_state?: string;
  to_state?: string;
  date: string;
  created_by?: string;
}

export interface OnboardingWorkflow {
  id: string;
  employee_id: string;
  employee_name: string;
  start_date: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  checklist: LifecycleChecklistItem[];
  tasks: OnboardingTask[];
}

export interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  due_date: string;
  status: 'pending' | 'in_progress' | 'completed';
  category: 'documentation' | 'equipment' | 'training' | 'access' | 'orientation';
}

export interface OffboardingWorkflow {
  id: string;
  employee_id: string;
  employee_name: string;
  termination_date: string;
  last_working_day: string;
  status: 'initiated' | 'in_progress' | 'completed';
  reason: 'resignation' | 'termination' | 'retirement' | 'contract_end';
  progress: number;
  checklist: LifecycleChecklistItem[];
  exit_interview_completed: boolean;
  exit_interview_date?: string;
  tasks: OffboardingTask[];
}

export interface OffboardingTask {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  due_date: string;
  status: 'pending' | 'in_progress' | 'completed';
  category: 'documentation' | 'equipment' | 'access' | 'knowledge_transfer' | 'exit_interview';
}

// Legacy Candidate interface - kept for backward compatibility with old mock data
export interface CandidateLegacy {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  position_applied: string;
  department: string;
  source: 'linkedin' | 'job_board' | 'referral' | 'direct_application' | 'recruiter';
  status: 'new' | 'screening' | 'interviewing' | 'offer' | 'hired' | 'rejected';
  applied_date: string;
  resume_url?: string;
  experience_years: number;
  expected_salary?: number;
  interview_stage?: string;
  notes?: string;
}

// Modern Candidate interface for HR module
export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  job_title: string;
  department: string;
  status: 'new' | 'screening' | 'interviewing' | 'offer' | 'hired' | 'rejected';
  applied_date: string;
  resume_score?: number;
  overall_rank?: number;
  resume_url?: string;
  notes?: string;
}

// JobOpening interface (similar to JobPosting but with additional fields)
export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: 'full_time' | 'part_time' | 'contract';
  experience_level: 'entry' | 'mid' | 'senior' | 'lead';
  salary_range_min?: number;
  salary_range_max?: number;
  description: string;
  required_skills: string[];
  status: 'draft' | 'open' | 'closed';
  applicants_count: number;
  interviews_scheduled: number;
  cv_analyzer_link: string;
  posted_to_linkedin?: boolean;
  created_at: string;
  published_at?: string;
}

// Interview interface
export interface Interview {
  id: string;
  candidate_id: string;
  candidate_name: string;
  job_id: string;
  job_title: string;
  interview_date: string;
  interview_time: string;
  interview_type: 'Technical' | 'HR' | 'Final' | 'Phone Screen';
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  interview_team_id?: string;
  interview_team_name?: string;
  notes?: string;
}

// InterviewTeam interface
export interface InterviewTeam {
  id: string;
  name: string;
  department: string;
  members: Array<{
    employee_id: string;
    employee_name: string;
    employee_email: string;
    role: 'Interviewer' | 'Observer' | 'Coordinator';
  }>;
  created_at: string;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: 'full_time' | 'part_time' | 'contract';
  experience_level: 'entry' | 'mid' | 'senior' | 'lead';
  salary_range_min?: number;
  salary_range_max?: number;
  description: string;
  requirements: string[];
  posted_date: string;
  closing_date?: string;
  status: 'draft' | 'active' | 'closed' | 'on_hold';
  applications_count: number;
}


export interface WeeklyOvertimeRecord {
  employee_id: string;
  week_start_date: string;
  total_hours: number;
  approved_hours: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ComplianceItem {
  id: string;
  title: string;
  category: 'certification' | 'training' | 'policy' | 'audit' | 'regulation';
  status: 'compliant' | 'non_compliant' | 'pending' | 'expired';
  due_date: string;
  assigned_to?: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface DashboardStats {
  employees: {
    total: number;
    active: number;
    on_leave: number;
    new_this_month: number;
  };
  attendance: {
    present_today: number;
    absent_today: number;
    on_leave_today: number;
    late_today: number;
    average_attendance_rate: number;
  };
  leave: {
    pending_requests: number;
    approved_this_month: number;
    total_days_taken: number;
  };
  performance: {
    average_rating: number;
    reviews_completed: number;
    reviews_pending: number;
    high_performers: number;
  };
  recruitment: {
    open_positions: number;
    active_candidates: number;
    interviews_scheduled: number;
    offers_pending: number;
  };
  payroll?: {
    total_payroll: number;
    pending_payslips: number;
    processed_this_month: number;
  };
}

// ============================================================================
// MOCK DATA - Import from mockData.ts
// ============================================================================

import {
  mockUsers,
  mockTimeEntries,
  mockLeaveRequests,
  mockLeaveTypes,
  mockLeaveBalances,
  mockEmployeeTasks,
  mockAllEmployees,
  mockCandidates,
  mockJobPostings,
  mockAllPerformanceReviews,
  hrDashboardStats,
  mockLifecycleTimelineEvents,
  mockOnboardingWorkflowsDetailed,
  mockOffboardingWorkflowsDetailed,
  mockPolicies,
} from './mockData';

// Re-export data for backward compatibility
export {
  mockUsers,
  mockTimeEntries,
  mockLeaveRequests,
  mockLeaveTypes,
  mockLeaveBalances,
  mockEmployeeTasks,
  mockAllEmployees,
  mockCandidates,
  mockJobPostings,
  mockAllPerformanceReviews,
  hrDashboardStats,
  mockLifecycleTimelineEvents,
  mockOnboardingWorkflowsDetailed,
  mockOffboardingWorkflowsDetailed,
  mockPolicies,
};

// Initialize mock data for HR module
let mockJobOpenings: JobOpening[] = [];
let mockCandidatesModern: Candidate[] = [];
let mockInterviews: Interview[] = [];
let mockInterviewTeams: InterviewTeam[] = [];

// Function to initialize mock data lazily
function initializeMockData() {
  // Initialize mockJobOpenings from mockJobPostings
  if (mockJobOpenings.length === 0 && mockJobPostings.length > 0) {
    mockJobOpenings = mockJobPostings.map(jp => ({
      id: jp.id,
      title: jp.title,
      department: jp.department,
      location: jp.location,
      employment_type: jp.employment_type,
      experience_level: jp.experience_level,
      salary_range_min: jp.salary_range_min,
      salary_range_max: jp.salary_range_max,
      description: jp.description,
      required_skills: jp.requirements,
      status: jp.status === 'active' ? 'open' : jp.status === 'closed' ? 'closed' : 'draft',
      applicants_count: jp.applications_count,
      interviews_scheduled: Math.floor(Math.random() * 10),
      cv_analyzer_link: `https://cvanalyzer.example.com/job/${jp.id}`,
      posted_to_linkedin: jp.status === 'active',
      created_at: jp.posted_date,
      published_at: jp.status === 'active' ? jp.posted_date : undefined,
    }));
  }

  // Initialize mockCandidatesModern from mockCandidates
  if (mockCandidatesModern.length === 0 && mockCandidates.length > 0) {
    mockCandidatesModern = mockCandidates.map(c => ({
      id: c.id,
      name: c.full_name,
      email: c.email,
      phone: c.phone,
      job_title: c.position_applied,
      department: c.department,
      status: c.status,
      applied_date: c.applied_date,
      resume_score: Math.floor(Math.random() * 30) + 70,
      overall_rank: Math.floor(Math.random() * 20) + 1,
      resume_url: c.resume_url,
      notes: c.notes,
    }));
  }

  // Initialize mockInterviewTeams
  if (mockInterviewTeams.length === 0 && mockUsers.length > 0) {
    mockInterviewTeams = [
      {
        id: 'team-1',
        name: 'Engineering Interview Team',
        department: 'Engineering',
        members: [
          { employee_id: 'user-10', employee_name: 'Robert Martinez', employee_email: 'robert.manager@company.com', role: 'Interviewer' },
          { employee_id: 'user-1', employee_name: 'John Doe', employee_email: 'john.doe@company.com', role: 'Interviewer' },
        ],
        created_at: new Date().toISOString(),
      },
    ];
  }

  // Initialize mockInterviews
  if (mockInterviews.length === 0 && mockCandidatesModern.length > 0 && mockJobOpenings.length > 0) {
    mockInterviews = [
      {
        id: 'interview-1',
        candidate_id: mockCandidatesModern[0].id,
        candidate_name: mockCandidatesModern[0].name,
        job_id: mockJobOpenings[0]?.id || 'job-1',
        job_title: mockJobOpenings[0]?.title || 'Senior React Developer',
        interview_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        interview_time: '10:00 AM',
        interview_type: 'Technical',
        location: 'Conference Room A / Zoom',
        status: 'scheduled',
        interview_team_id: 'team-1',
        interview_team_name: 'Engineering Interview Team',
        notes: 'Focus on React and TypeScript skills',
      },
    ];
  }
}

// Initialize immediately
initializeMockData();

// ============================================================================
// MOCK SERVICES
// ============================================================================
// 
// These services simulate backend API calls.
// When migrating to backend, replace these with actual API calls.
// 
// Example migration:
//   Before: authService.login(email, password)
//   After:  await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
//
// ============================================================================

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// ----------------------------------------------------------------------------
// Authentication Service
// ----------------------------------------------------------------------------

export const authService = {
  login: async (email: string, _password: string): Promise<User> => {
    await delay(1000);
    const user = mockUsers.find(u => u.email === email);
    if (!user) throw new Error('Invalid credentials');
    return user;
  },

  logout: async (): Promise<void> => {
    await delay(300);
  },

  getCurrentUser: async (): Promise<User> => {
    await delay();
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/manager')) {
      const manager = mockUsers.find(u => u.id === 'user-10');
      if (manager) return manager;
    }
    return mockUsers[0];
  },

  updateProfile: async (userId: string, updates: Partial<User>): Promise<User> => {
    await delay();
    const user = mockUsers.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    Object.assign(user, updates);
    return user;
  },
};

// ----------------------------------------------------------------------------
// User Service
// ----------------------------------------------------------------------------

export interface UserStatistics {
  total_users: number
  active_users: number
  by_department: Record<string, number>
  by_status: Record<string, number>
  by_position: Record<string, number>
}

export interface UserStats {
  leaveRequests: number
  tasks: number
  goals: number
}

export const userService = {
  async getCurrentUser(): Promise<User | null> {
    await delay(50);
    return mockUsers[0] || null;
  },

  async getUserById(userId: string): Promise<User | null> {
    await delay(50);
    return mockUsers.find(u => u.id === userId) || null;
  },

  async getAllUsers(): Promise<User[]> {
    await delay(100);
    return [...mockUsers];
  },

  async getUsersByDepartment(department: string): Promise<User[]> {
    await delay(50);
    return mockUsers.filter(u => u.department === department);
  },

  async getUsersByRole(role: User['role']): Promise<User[]> {
    await delay(50);
    return mockUsers.filter(u => u.role === role);
  },

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    await delay(100);
    const user = mockUsers.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    Object.assign(user, updates);
    return user;
  },

  async getStatistics(): Promise<UserStatistics> {
    await delay(100);
    const byDepartment: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    const byPosition: Record<string, number> = {};

    mockUsers.forEach(user => {
      byDepartment[user.department] = (byDepartment[user.department] || 0) + 1;
      byStatus[user.status] = (byStatus[user.status] || 0) + 1;
      byPosition[user.job_title] = (byPosition[user.job_title] || 0) + 1;
    });

    return {
      total_users: mockUsers.length,
      active_users: mockUsers.filter(u => u.status === 'active').length,
      by_department: byDepartment,
      by_status: byStatus,
      by_position: byPosition,
    };
  },

  async getUserStatistics(): Promise<UserStatistics> {
    return this.getStatistics();
  },

  async getTeamMembers(managerId: string): Promise<User[]> {
    await delay(50);
    return mockUsers.filter(u => u.manager_id === managerId);
  },
};

// ----------------------------------------------------------------------------
// Task Service
// ----------------------------------------------------------------------------

export const taskService = {
  async getTasksByEmployee(employeeId: string): Promise<Task[]> {
    await delay(100);
    return mockEmployeeTasks.filter(t => t.assigned_to_id === employeeId);
  },

  async getTaskById(taskId: string): Promise<Task | null> {
    await delay(50);
    return mockEmployeeTasks.find(t => t.id === taskId) || null;
  },

  async createTask(task: Omit<Task, 'id' | 'created_date'>): Promise<Task> {
    await delay(200);
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      created_date: new Date().toISOString(),
    };
    mockEmployeeTasks.push(newTask);
    return newTask;
  },

  async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
    await delay(100);
    const task = mockEmployeeTasks.find(t => t.id === taskId);
    if (!task) throw new Error('Task not found');
    Object.assign(task, updates);
    return task;
  },

  async deleteTask(taskId: string): Promise<void> {
    await delay(100);
    const index = mockEmployeeTasks.findIndex(t => t.id === taskId);
    if (index === -1) throw new Error('Task not found');
    mockEmployeeTasks.splice(index, 1);
  },

  async getManagerTeamTasks(managerId: string): Promise<Task[]> {
    await delay(100);
    // Get all team members who report to this manager
    const teamMemberIds = mockUsers
      .filter(u => u.manager_id === managerId)
      .map(u => u.id);
    
    // Get all tasks assigned to team members
    return mockEmployeeTasks.filter(t => teamMemberIds.includes(t.assigned_to_id));
  },

  async getTeamPerformanceStats(managerId: string): Promise<Array<{
    employeeId: string;
    employeeName: string;
    totalTasksCompleted: number;
    averageScore: number;
    totalTasksReviewed: number;
  }>> {
    await delay(100);
    // Get all team members who report to this manager
    const teamMembers = mockUsers.filter(u => u.manager_id === managerId);
    
    // Calculate performance stats for each team member
    return teamMembers.map(member => {
      const memberTasks = mockEmployeeTasks.filter(t => t.assigned_to_id === member.id);
      const completedTasks = memberTasks.filter(t => t.status === 'completed' || t.status === 'under_review' || t.status === 'review_completed');
      const reviewedTasks = memberTasks.filter(t => t.status === 'review_completed' && t.performance_score !== undefined);
      
      const totalScore = reviewedTasks.reduce((sum, t) => sum + (t.performance_score || 0), 0);
      const averageScore = reviewedTasks.length > 0 ? totalScore / reviewedTasks.length : 0;
      
      return {
        employeeId: member.id,
        employeeName: member.full_name,
        totalTasksCompleted: completedTasks.length,
        averageScore: averageScore,
        totalTasksReviewed: reviewedTasks.length,
      };
    });
  },

  async startTaskReview(taskId: string, _reviewerId: string): Promise<Task> {
    await delay(100);
    const task = mockEmployeeTasks.find(t => t.id === taskId);
    if (!task) throw new Error('Task not found');
    if (task.status !== 'completed') {
      throw new Error('Task must be completed before starting review');
    }
    task.status = 'under_review';
    task.review_started_date = new Date().toISOString();
    return task;
  },

  async finishTaskReview(taskId: string, _reviewerId: string, performanceScore: number): Promise<Task> {
    await delay(100);
    const task = mockEmployeeTasks.find(t => t.id === taskId);
    if (!task) throw new Error('Task not found');
    if (task.status !== 'under_review') {
      throw new Error('Task must be under review before finishing review');
    }
    if (performanceScore < 0 || performanceScore > 10) {
      throw new Error('Performance score must be between 0 and 10');
    }
    task.status = 'review_completed';
    task.performance_score = performanceScore;
    task.review_completed_date = new Date().toISOString();
    return task;
  },
};

// ----------------------------------------------------------------------------
// Leave Service
// ----------------------------------------------------------------------------

export const leaveService = {
  async getLeaveRequests(employeeId?: string): Promise<LeaveRequest[]> {
    await delay(100);
    if (employeeId) {
      return mockLeaveRequests.filter(lr => lr.employee_id === employeeId);
    }
    return [...mockLeaveRequests];
  },

  async getLeaveRequestById(requestId: string): Promise<LeaveRequest | null> {
    await delay(50);
    return mockLeaveRequests.find(lr => lr.id === requestId) || null;
  },

  async createLeaveRequest(request: Omit<LeaveRequest, 'id' | 'submitted_date' | 'approved_date' | 'rejected_date'>): Promise<LeaveRequest> {
    await delay(200);
    
    // Check if the requester is a manager - managers go directly to HR approval
    const requester = mockUsers.find(u => u.id === request.employee_id);
    const isManager = requester?.role === 'manager';
    
    // If manager, set status to pending_hr_approval, otherwise pending_manager_approval
    const initialStatus = isManager ? 'pending_hr_approval' : (request.status || 'pending_manager_approval');
    
    const newRequest: LeaveRequest = {
      ...request,
      id: `leave-${Date.now()}`,
      submitted_date: new Date().toISOString().split('T')[0],
      status: initialStatus,
    };
    mockLeaveRequests.push(newRequest);
    return newRequest;
  },

  async updateLeaveRequest(requestId: string, updates: Partial<LeaveRequest>): Promise<LeaveRequest> {
    await delay(100);
    const request = mockLeaveRequests.find(lr => lr.id === requestId);
    if (!request) throw new Error('Leave request not found');
    Object.assign(request, updates);
    return request;
  },

  async approveLeaveRequest(requestId: string, approverId: string, approverRoleOrName: string): Promise<LeaveRequest> {
    await delay(200);
    const request = mockLeaveRequests.find(lr => lr.id === requestId);
    if (!request) throw new Error('Leave request not found');
    
    // Get approver name from user if approverRoleOrName is a role
    let approverName = approverRoleOrName;
    const approver = mockUsers.find(u => u.id === approverId);
    if (approver && (approverRoleOrName === 'manager' || approverRoleOrName === 'hr')) {
      approverName = approver.full_name;
    }
    
    // If manager approves, set status to pending_hr_approval, otherwise approved
    if (approverRoleOrName === 'manager' || (approver && approver.role === 'manager')) {
      request.status = 'pending_hr_approval';
    } else {
      request.status = 'approved';
    }
    
    request.approver_id = approverId;
    request.approver_name = approverName;
    request.approved_date = new Date().toISOString().split('T')[0];
    return request;
  },

  async rejectLeaveRequest(requestId: string, approverId: string, reasonOrName: string, roleOrReason?: string): Promise<LeaveRequest> {
    await delay(200);
    const request = mockLeaveRequests.find(lr => lr.id === requestId);
    if (!request) throw new Error('Leave request not found');
    
    // Handle different call signatures:
    // 1. rejectLeaveRequest(id, approverId, approverName, reason?)
    // 2. rejectLeaveRequest(id, approverId, reason, role) - from ApprovalWorkflows
    let approverName: string;
    let rejectionReason: string | undefined;
    
    if (roleOrReason === 'manager' || roleOrReason === 'hr') {
      // Signature: (id, approverId, reason, role)
      rejectionReason = reasonOrName;
      const approver = mockUsers.find(u => u.id === approverId);
      approverName = approver ? approver.full_name : reasonOrName;
    } else {
      // Signature: (id, approverId, approverName, reason?)
      approverName = reasonOrName;
      rejectionReason = roleOrReason;
    }
    
    request.status = 'rejected';
    request.approver_id = approverId;
    request.approver_name = approverName;
    request.rejected_date = new Date().toISOString().split('T')[0];
    if (rejectionReason) request.rejection_reason = rejectionReason;
    return request;
  },

  async getAllLeaveRequests(): Promise<LeaveRequest[]> {
    await delay(100);
    return [...mockLeaveRequests];
  },

  async getPendingManagerApprovalRequests(managerId: string): Promise<LeaveRequest[]> {
    await delay(100);
    // Get all team members who report to this manager
    const teamMemberIds = mockUsers
      .filter(u => u.manager_id === managerId)
      .map(u => u.id);
    
    // Get pending requests from team members
    return mockLeaveRequests.filter(lr => 
      teamMemberIds.includes(lr.employee_id) && 
      lr.status === 'pending_manager_approval'
    );
  },

  async getLeaveTypes(): Promise<typeof mockLeaveTypes> {
    await delay(50);
    return [...mockLeaveTypes];
  },

  async getLeaveBalances(employeeId: string): Promise<typeof mockLeaveBalances> {
    await delay(50);
    return mockLeaveBalances.filter(lb => lb.user_id === employeeId);
  },

  async getPendingHRApprovalRequests(): Promise<LeaveRequest[]> {
    await delay(100);
    return mockLeaveRequests.filter(lr => lr.status === 'pending_hr_approval');
  },

  async getManagerLeaveRequests(managerId: string): Promise<LeaveRequest[]> {
    await delay(100);
    // Get all leave requests for a specific manager
    return mockLeaveRequests.filter(lr => lr.employee_id === managerId);
  },

  async getManagerPendingRequests(managerId: string): Promise<LeaveRequest[]> {
    await delay(100);
    // Get pending leave requests for a specific manager (should be pending_hr_approval)
    return mockLeaveRequests.filter(lr => 
      lr.employee_id === managerId && 
      lr.status === 'pending_hr_approval'
    );
  },
};

// ----------------------------------------------------------------------------
// Time & Attendance Service
// ----------------------------------------------------------------------------

export const timeService = {
  async getTimeEntries(employeeId?: string, startDate?: string, endDate?: string): Promise<TimeEntry[]> {
    await delay(100);
    let entries = [...mockTimeEntries];
    
    if (employeeId) {
      entries = entries.filter(te => te.employee_id === employeeId);
    }
    
    if (startDate) {
      entries = entries.filter(te => te.date >= startDate);
    }
    
    if (endDate) {
      entries = entries.filter(te => te.date <= endDate);
    }
    
    return entries.sort((a, b) => b.date.localeCompare(a.date));
  },

  async getTimeEntryById(entryId: string): Promise<TimeEntry | null> {
    await delay(50);
    return mockTimeEntries.find(te => te.id === entryId) || null;
  },

  async clockIn(employeeId: string): Promise<TimeEntry> {
    await delay(200);
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toTimeString().split(' ')[0];
    
    const existingEntry = mockTimeEntries.find(
      te => te.employee_id === employeeId && te.date === today
    );
    
    if (existingEntry) {
      existingEntry.clock_in = now;
      existingEntry.status = 'clocked_in';
      return existingEntry;
    }
    
    const newEntry: TimeEntry = {
      id: `time-${Date.now()}`,
      employee_id: employeeId,
      date: today,
      clock_in: now,
      status: 'clocked_in',
      total_hours: 0,
    };
    
    mockTimeEntries.push(newEntry);
    return newEntry;
  },

  async clockOut(employeeId: string): Promise<TimeEntry> {
    await delay(200);
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toTimeString().split(' ')[0];
    
    const entry = mockTimeEntries.find(
      te => te.employee_id === employeeId && te.date === today && te.status === 'clocked_in'
    );
    
    if (!entry) throw new Error('No active clock-in found');
    
    entry.clock_out = now;
    entry.status = 'clocked_out';
    
    if (entry.clock_in && entry.break_start && entry.break_end) {
      const clockInTime = new Date(`${entry.date}T${entry.clock_in}`);
      const clockOutTime = new Date(`${entry.date}T${entry.clock_out}`);
      const breakStartTime = new Date(`${entry.date}T${entry.break_start}`);
      const breakEndTime = new Date(`${entry.date}T${entry.break_end}`);
      
      const totalMs = clockOutTime.getTime() - clockInTime.getTime();
      const breakMs = breakEndTime.getTime() - breakStartTime.getTime();
      entry.total_hours = Math.round(((totalMs - breakMs) / (1000 * 60 * 60)) * 10) / 10; // Round to 1 decimal place
    }
    
    return entry;
  },

  async startBreak(employeeId: string): Promise<TimeEntry> {
    await delay(200);
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toTimeString().split(' ')[0];
    
    const entry = mockTimeEntries.find(
      te => te.employee_id === employeeId && te.date === today && te.status === 'clocked_in'
    );
    
    if (!entry) throw new Error('No active clock-in found');
    
    entry.break_start = now;
    return entry;
  },

  async endBreak(employeeId: string): Promise<TimeEntry> {
    await delay(200);
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toTimeString().split(' ')[0];
    
    const entry = mockTimeEntries.find(
      te => te.employee_id === employeeId && te.date === today && te.status === 'clocked_in'
    );
    
    if (!entry) throw new Error('No active clock-in found');
    
    entry.break_end = now;
    return entry;
  },
};

// ----------------------------------------------------------------------------
// Onboarding Service
// ----------------------------------------------------------------------------

export const onboardingService = {
  async getOnboardingWorkflows(): Promise<OnboardingWorkflow[]> {
    await delay(100);
    return [...mockOnboardingWorkflowsDetailed];
  },

  async getOnboardingWorkflowById(workflowId: string): Promise<OnboardingWorkflow | null> {
    await delay(50);
    return mockOnboardingWorkflowsDetailed.find(w => w.id === workflowId) || null;
  },

  async createOnboardingWorkflow(workflow: Omit<OnboardingWorkflow, 'id'>): Promise<OnboardingWorkflow> {
    await delay(200);
    const newWorkflow: OnboardingWorkflow = {
      ...workflow,
      id: `onboarding-${Date.now()}`,
    };
    mockOnboardingWorkflowsDetailed.push(newWorkflow);
    return newWorkflow;
  },

  async updateOnboardingWorkflow(workflowId: string, updates: Partial<OnboardingWorkflow>): Promise<OnboardingWorkflow> {
    await delay(100);
    const workflow = mockOnboardingWorkflowsDetailed.find(w => w.id === workflowId);
    if (!workflow) throw new Error('Onboarding workflow not found');
    Object.assign(workflow, updates);
    return workflow;
  },

  async getOnboardingStats(): Promise<any> {
    await delay(100);
    const active = mockOnboardingWorkflowsDetailed.filter(w => w.status === 'in_progress');
    const completed = mockOnboardingWorkflowsDetailed.filter(w => w.status === 'completed');
    const allTasks = mockOnboardingWorkflowsDetailed.flatMap(w => w.tasks || []);
    const pendingTasks = allTasks.filter(t => t.status === 'pending');
    const completedTasks = allTasks.filter(t => t.status === 'completed');
    const overdueTasks = allTasks.filter(t => {
      if (t.status === 'pending' && t.due_date) {
        return new Date(t.due_date) < new Date();
      }
      return false;
    });

    const avgCompletion = mockOnboardingWorkflowsDetailed.length > 0
      ? Math.round(mockOnboardingWorkflowsDetailed.reduce((sum, w) => sum + w.progress, 0) / mockOnboardingWorkflowsDetailed.length)
      : 0;

    return {
      active_processes: active.length,
      completed_processes: completed.length,
      total_processes: mockOnboardingWorkflowsDetailed.length,
      pending_tasks: pendingTasks.length,
      completed_tasks: completedTasks.length,
      overdue_tasks: overdueTasks.length,
      average_completion_rate: avgCompletion,
    };
  },

  async getOnboardingProcesses(filters?: { status?: string }): Promise<any[]> {
    await delay(100);
    let processes = mockOnboardingWorkflowsDetailed.map(w => ({
      id: w.id,
      user: mockUsers.find(u => u.id === w.employee_id) || { full_name: w.employee_name, email: '' },
      start_date: w.start_date,
      target_completion_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completion_percentage: w.progress,
      status: w.status,
    }));

    if (filters?.status) {
      const statusMap: Record<string, string> = {
        'in-progress': 'in_progress',
        'in_progress': 'in_progress',
      };
      const mappedStatus = statusMap[filters.status] || filters.status;
      processes = processes.filter(p => p.status === mappedStatus);
    }

    return processes;
  },

  async createTemplate(template: any): Promise<any> {
    await delay(200);
    return {
      id: `template-${Date.now()}`,
      ...template,
    };
  },

  async addWorkflowTask(workflowId: string, task: any): Promise<any> {
    await delay(200);
    const workflow = mockOnboardingWorkflowsDetailed.find(w => w.id === workflowId);
    if (!workflow) throw new Error('Workflow not found');
    const newTask: OnboardingTask = {
      ...task,
      id: `task-${Date.now()}`,
    };
    workflow.tasks.push(newTask);
    return newTask;
  },
};

// ----------------------------------------------------------------------------
// Offboarding Service
// ----------------------------------------------------------------------------

export const offboardingService = {
  async getOffboardingWorkflows(): Promise<OffboardingWorkflow[]> {
    await delay(100);
    return [...mockOffboardingWorkflowsDetailed];
  },

  async getOffboardingWorkflowById(workflowId: string): Promise<OffboardingWorkflow | null> {
    await delay(50);
    return mockOffboardingWorkflowsDetailed.find(w => w.id === workflowId) || null;
  },

  async createOffboardingWorkflow(workflow: Omit<OffboardingWorkflow, 'id'>): Promise<OffboardingWorkflow> {
    await delay(200);
    const newWorkflow: OffboardingWorkflow = {
      ...workflow,
      id: `offboarding-${Date.now()}`,
    };
    mockOffboardingWorkflowsDetailed.push(newWorkflow);
    return newWorkflow;
  },

  async updateOffboardingWorkflow(workflowId: string, updates: Partial<OffboardingWorkflow>): Promise<OffboardingWorkflow> {
    await delay(100);
    const workflow = mockOffboardingWorkflowsDetailed.find(w => w.id === workflowId);
    if (!workflow) throw new Error('Offboarding workflow not found');
    Object.assign(workflow, updates);
    return workflow;
  },

  async getOffboardingStats(): Promise<any> {
    await delay(100);
    const active = mockOffboardingWorkflowsDetailed.filter(w => w.status === 'in_progress');
    const completed = mockOffboardingWorkflowsDetailed.filter(w => w.status === 'completed');
    const initiated = mockOffboardingWorkflowsDetailed.filter(w => w.status === 'initiated');
    const allTasks = mockOffboardingWorkflowsDetailed.flatMap(w => w.tasks || []);
    const pendingTasks = allTasks.filter(t => t.status === 'pending');
    const inProgressTasks = allTasks.filter(t => t.status === 'in_progress');
    const completedTasks = allTasks.filter(t => t.status === 'completed');
    const exitInterviewsScheduled = mockOffboardingWorkflowsDetailed.filter(w => !w.exit_interview_completed).length;
    const exitInterviewsCompleted = mockOffboardingWorkflowsDetailed.filter(w => w.exit_interview_completed).length;

    const avgCompletion = mockOffboardingWorkflowsDetailed.length > 0
      ? Math.round(mockOffboardingWorkflowsDetailed.reduce((sum, w) => sum + w.progress, 0) / mockOffboardingWorkflowsDetailed.length)
      : 0;

    return {
      active_processes: active.length,
      completed_processes: completed.length,
      total_processes: mockOffboardingWorkflowsDetailed.length,
      initiated_processes: initiated.length,
      pending_tasks: pendingTasks.length,
      in_progress_tasks: inProgressTasks.length,
      completed_tasks: completedTasks.length,
      exit_interviews_scheduled: exitInterviewsScheduled,
      exit_interviews_completed: exitInterviewsCompleted,
      average_completion_rate: avgCompletion,
    };
  },

  async getOffboardingProcesses(filters?: { status?: string }): Promise<any[]> {
    await delay(100);
    let processes = mockOffboardingWorkflowsDetailed.map(w => ({
      id: w.id,
      user: mockUsers.find(u => u.id === w.employee_id) || { 
        full_name: w.employee_name, 
        email: '',
        department: '',
        position: '',
      },
      last_working_day: w.last_working_day,
      termination_date: w.termination_date,
      completion_percentage: w.progress,
      status: w.status,
      exit_interview_scheduled: w.exit_interview_completed,
    }));

    if (filters?.status) {
      const statusMap: Record<string, string> = {
        'in-progress': 'in_progress',
        'in_progress': 'in_progress',
      };
      const mappedStatus = statusMap[filters.status] || filters.status;
      processes = processes.filter(p => p.status === mappedStatus);
    }

    return processes;
  },

  async initiateOffboarding(data: any): Promise<OffboardingWorkflow> {
    await delay(200);
    const employee = mockUsers.find(u => u.id === data.employee_id);
    const newWorkflow: OffboardingWorkflow = {
      id: `offboarding-${Date.now()}`,
      employee_id: data.employee_id,
      employee_name: employee?.full_name || 'Unknown',
      termination_date: data.termination_date,
      last_working_day: data.last_working_day || data.termination_date,
      status: 'initiated',
      reason: data.reason || 'resignation',
      progress: 0,
      exit_interview_completed: false,
      checklist: [],
      tasks: [],
    };
    mockOffboardingWorkflowsDetailed.push(newWorkflow);
    return newWorkflow;
  },
};

// ----------------------------------------------------------------------------
// Recruitment Service
// ----------------------------------------------------------------------------

export const recruitmentService = {
  async getJobPostings(): Promise<JobPosting[]> {
    await delay(100);
    return [...mockJobPostings];
  },

  async getJobPostingById(postingId: string): Promise<JobPosting | null> {
    await delay(50);
    return mockJobPostings.find(jp => jp.id === postingId) || null;
  },

  async createJobPosting(posting: Omit<JobPosting, 'id' | 'posted_date' | 'applications_count'>): Promise<JobPosting> {
    await delay(200);
    const newPosting: JobPosting = {
      ...posting,
      id: `job-${Date.now()}`,
      posted_date: new Date().toISOString().split('T')[0],
      applications_count: 0,
    };
    mockJobPostings.push(newPosting);
    return newPosting;
  },

  async updateJobPosting(postingId: string, updates: Partial<JobPosting>): Promise<JobPosting> {
    await delay(100);
    const posting = mockJobPostings.find(jp => jp.id === postingId);
    if (!posting) throw new Error('Job posting not found');
    Object.assign(posting, updates);
    return posting;
  },

  async getCandidates(): Promise<CandidateLegacy[] | Candidate[]> {
    await delay(100);
    initializeMockData();
    return [...mockCandidatesModern];
  },

  async getCandidateById(candidateId: string): Promise<CandidateLegacy | Candidate | null> {
    await delay(50);
    return mockCandidatesModern.find(c => c.id === candidateId) || mockCandidates.find(c => c.id === candidateId) || null;
  },

  // New methods for HR module
  async getRecruitmentStats(): Promise<any> {
    await delay(100);
    initializeMockData();
    return {
      total_jobs: mockJobOpenings.length,
      open_jobs: mockJobOpenings.filter(j => j.status === 'open').length,
      total_applicants: mockCandidatesModern.length,
      top_candidates: mockCandidatesModern.filter(c => c.overall_rank && c.overall_rank <= 5).length,
      interviews_scheduled: mockInterviews.filter(i => i.status === 'scheduled').length,
      avg_resume_score: mockCandidatesModern.length > 0 
        ? Math.round(mockCandidatesModern.reduce((sum, c) => sum + (c.resume_score || 0), 0) / mockCandidatesModern.length)
        : 0,
    };
  },

  async getJobOpenings(filters?: { status?: string }): Promise<JobOpening[]> {
    await delay(100);
    initializeMockData();
    let jobs = [...mockJobOpenings];
    if (filters?.status) {
      jobs = jobs.filter(j => j.status === filters.status);
    }
    return jobs;
  },

  async createJobOpening(job: Omit<JobOpening, 'id' | 'created_at' | 'applicants_count' | 'interviews_scheduled'>): Promise<JobOpening> {
    await delay(200);
    const newJob: JobOpening = {
      ...job,
      id: `job-${Date.now()}`,
      created_at: new Date().toISOString(),
      applicants_count: 0,
      interviews_scheduled: 0,
    };
    mockJobOpenings.push(newJob);
    return newJob;
  },

  async publishJobOpening(jobId: string): Promise<JobOpening> {
    await delay(200);
    const job = mockJobOpenings.find(j => j.id === jobId);
    if (!job) throw new Error('Job opening not found');
    job.status = 'open';
    job.published_at = new Date().toISOString();
    job.posted_to_linkedin = true;
    return job;
  },

  async closeJobOpening(jobId: string): Promise<JobOpening> {
    await delay(200);
    const job = mockJobOpenings.find(j => j.id === jobId);
    if (!job) throw new Error('Job opening not found');
    job.status = 'closed';
    return job;
  },

  async deleteJobOpening(jobId: string): Promise<void> {
    await delay(100);
    const index = mockJobOpenings.findIndex(j => j.id === jobId);
    if (index === -1) throw new Error('Job opening not found');
    mockJobOpenings.splice(index, 1);
  },

  async getInterviews(filters?: { status?: string }): Promise<Interview[]> {
    await delay(100);
    initializeMockData();
    let interviews = [...mockInterviews];
    if (filters?.status) {
      interviews = interviews.filter(i => i.status === filters.status);
    }
    return interviews;
  },

  async getInterviewTeams(): Promise<InterviewTeam[]> {
    await delay(100);
    initializeMockData();
    return [...mockInterviewTeams];
  },

  async createInterviewTeam(team: Omit<InterviewTeam, 'id' | 'created_at'>): Promise<InterviewTeam> {
    await delay(200);
    const newTeam: InterviewTeam = {
      ...team,
      id: `team-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    mockInterviewTeams.push(newTeam);
    return newTeam;
  },

  async deleteInterviewTeam(teamId: string): Promise<void> {
    await delay(100);
    const index = mockInterviewTeams.findIndex(t => t.id === teamId);
    if (index === -1) throw new Error('Interview team not found');
    mockInterviewTeams.splice(index, 1);
  },

  async scheduleInterview(interviewData: Omit<Interview, 'id'>): Promise<Interview> {
    await delay(200);
    const newInterview: Interview = {
      ...interviewData,
      id: `interview-${Date.now()}`,
    };
    mockInterviews.push(newInterview);
    return newInterview;
  },

  async updateCandidateStatus(candidateId: string, status: string): Promise<Candidate> {
    await delay(100);
    const candidate = mockCandidatesModern.find(c => c.id === candidateId);
    if (!candidate) throw new Error('Candidate not found');
    candidate.status = status as any;
    return candidate;
  },

  async generateInterviewEmail(data: any): Promise<string> {
    await delay(100);
    return `Email template for interview scheduled on ${data.interview_date} at ${data.interview_time}`;
  },
};

// ----------------------------------------------------------------------------
// Performance Service
// ----------------------------------------------------------------------------

export const performanceService = {
  async getPerformanceReviews(employeeId?: string, managerId?: string): Promise<PerformanceReview[]> {
    await delay(100);
    let reviews = [...mockAllPerformanceReviews];
    
    if (employeeId) {
      reviews = reviews.filter(r => r.employee_id === employeeId);
    }
    
    if (managerId) {
      // Get all team members who report to this manager
      const teamMemberIds = mockUsers
        .filter(u => u.manager_id === managerId)
        .map(u => u.id);
      reviews = reviews.filter(r => teamMemberIds.includes(r.employee_id));
    }
    
    return reviews;
  },

  async getPerformanceReviewById(reviewId: string): Promise<PerformanceReview | null> {
    await delay(50);
    return mockAllPerformanceReviews.find(r => r.id === reviewId) || null;
  },

  async createPerformanceReview(review: Omit<PerformanceReview, 'id'>): Promise<PerformanceReview> {
    await delay(200);
    const newReview: PerformanceReview = {
      ...review,
      id: `review-${Date.now()}`,
    };
    mockAllPerformanceReviews.push(newReview);
    return newReview;
  },

  async updatePerformanceReview(reviewId: string, updates: Partial<PerformanceReview>): Promise<PerformanceReview> {
    await delay(100);
    const review = mockAllPerformanceReviews.find(r => r.id === reviewId);
    if (!review) throw new Error('Performance review not found');
    Object.assign(review, updates);
    return review;
  },

  async getTeamPerformanceStats(managerId: string): Promise<Array<{
    employeeId: string;
    employeeName: string;
    overallRating: number;
    reviewsCompleted: number;
    lastReviewDate?: string;
  }>> {
    await delay(100);
    // Get all team members who report to this manager
    const teamMembers = mockUsers.filter(u => u.manager_id === managerId);
    
    // Calculate performance stats for each team member
    return teamMembers.map(member => {
      const memberReviews = mockAllPerformanceReviews.filter(r => r.employee_id === member.id);
      const completedReviews = memberReviews.filter(r => r.status === 'completed');
      const latestReview = completedReviews.sort((a, b) => 
        new Date(b.review_date).getTime() - new Date(a.review_date).getTime()
      )[0];
      
      const avgRating = completedReviews.length > 0
        ? completedReviews.reduce((sum, r) => sum + r.overall_rating, 0) / completedReviews.length
        : 0;
      
      return {
        employeeId: member.id,
        employeeName: member.full_name,
        overallRating: avgRating,
        reviewsCompleted: completedReviews.length,
        lastReviewDate: latestReview?.review_date,
      };
    });
  },
};

// ----------------------------------------------------------------------------
// Lifecycle Service
// ----------------------------------------------------------------------------

export const lifecycleService = {
  async getLifecycleTimelineEvents(employeeId: string): Promise<LifecycleTimelineEvent[]> {
    await delay(100);
    return mockLifecycleTimelineEvents.filter(e => e.employee_id === employeeId);
  },
};

// ----------------------------------------------------------------------------
// Overtime Service
// ----------------------------------------------------------------------------

// Mock data for weekly attendance reports
let mockWeeklyAttendanceReports: any[] = [];

// Initialize mock weekly attendance reports
function initializeWeeklyReports() {
  if (mockWeeklyAttendanceReports.length === 0 && mockUsers.length > 0 && mockTimeEntries.length > 0) {
    const weekStart = '2025-12-15';
    const weekEnd = '2025-12-21';
    
    mockWeeklyAttendanceReports = mockUsers.slice(0, 8).map((user, index) => {
      const regularHours = 40 + (Math.random() * 5 - 2.5); // 37.5 to 42.5 hours
      const overtimeHours = Math.max(0, regularHours - 40);
      const totalHours = regularHours;
      
      return {
        id: `report-${user.id}`,
        employee_id: user.id,
        employee_name: user.full_name,
        week_start: weekStart,
        week_end: weekEnd,
        regular_hours: Math.round((Math.max(0, 40 - overtimeHours)) * 10) / 10, // Round to 1 decimal
        overtime_hours: Math.round(overtimeHours * 10) / 10, // Round to 1 decimal
        total_hours: Math.round(totalHours * 10) / 10, // Round to 1 decimal
        status: index < 3 ? 'active' : index < 5 ? 'finalized' : 'paid',
      };
    });
  }
}

export const overtimeService = {
  async getWeeklyOvertimeRecords(employeeId?: string, weekStartDate?: string): Promise<any[]> {
    await delay(100);
    initializeWeeklyReports();
    let reports = [...mockWeeklyAttendanceReports];
    
    if (employeeId) {
      reports = reports.filter(r => r.employee_id === employeeId);
    }
    
    if (weekStartDate) {
      reports = reports.filter(r => r.week_start === weekStartDate);
    }
    
    return reports;
  },

  async finalizeWeeklyOvertime(recordId: string): Promise<any> {
    await delay(200);
    initializeWeeklyReports();
    const record = mockWeeklyAttendanceReports.find(r => r.id === recordId);
    if (!record) throw new Error('Overtime record not found');
    record.status = 'finalized';
    return record;
  },
};

// ----------------------------------------------------------------------------
// Policy Service
// ----------------------------------------------------------------------------

// Mock data for policy violations and compliance frameworks
let mockPolicyViolations: any[] = [
  {
    id: 'violation-1',
    policy_id: 'policy-1',
    policy: { name: 'Remote Work Policy' },
    employee_id: 'user-1',
    employee: { full_name: 'John Doe', department: 'Engineering' },
    description: 'Employee did not follow remote work guidelines',
    severity: 'medium',
    status: 'open',
    reported_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
];

let mockComplianceFrameworks: any[] = [
  {
    id: 'framework-1',
    name: 'GDPR Compliance',
    description: 'General Data Protection Regulation compliance framework',
    status: 'compliant',
    compliance_score: 95,
    last_audit_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    id: 'framework-2',
    name: 'SOC 2 Type II',
    description: 'Service Organization Control 2 Type II compliance',
    status: 'partial',
    compliance_score: 78,
    last_audit_date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
];

export const policyService = {
  async getPolicies(): Promise<any[]> {
    await delay(100);
    // Add name property for compatibility with components that use both name and title
    return mockPolicies.map(p => ({
      ...p,
      name: p.title,
    }));
  },

  async getPolicyById(policyId: string): Promise<typeof mockPolicies[0] | null> {
    await delay(50);
    return mockPolicies.find(p => p.id === policyId) || null;
  },

  async getPolicyViolations(filters?: { status?: string }): Promise<any[]> {
    await delay(100);
    let violations = [...mockPolicyViolations];
    if (filters?.status) {
      violations = violations.filter(v => v.status === filters.status);
    }
    return violations;
  },

  async getComplianceFrameworks(): Promise<any[]> {
    await delay(100);
    return [...mockComplianceFrameworks];
  },

  async getPolicyStatistics(): Promise<any> {
    await delay(100);
    const activePolicies = mockPolicies.filter(p => p.status === 'active');
    const byCategory: Record<string, number> = {};
    const violationsBySeverity: Record<string, number> = {};
    
    mockPolicies.forEach(p => {
      byCategory[p.category] = (byCategory[p.category] || 0) + 1;
    });

    mockPolicyViolations.forEach(v => {
      violationsBySeverity[v.severity] = (violationsBySeverity[v.severity] || 0) + 1;
    });

    const openViolations = mockPolicyViolations.filter(v => v.status === 'open');
    const resolvedViolations = mockPolicyViolations.filter(v => v.status === 'resolved');
    const highSeverityViolations = mockPolicyViolations.filter(v => v.severity === 'high' || v.severity === 'critical');

    // Calculate average compliance score (mock calculation)
    const avgCompliance = mockComplianceFrameworks.length > 0
      ? Math.round(mockComplianceFrameworks.reduce((sum, f) => sum + (f.compliance_score || 0), 0) / mockComplianceFrameworks.length)
      : 94;

    return {
      total_policies: mockPolicies.length,
      active_policies: activePolicies.length,
      active: activePolicies.length,
      archived: 0, // Mock policies don't have archived status by default
      by_category: byCategory,
      open_violations: openViolations.length,
      resolved_violations: resolvedViolations.length,
      total_violations: mockPolicyViolations.length,
      violations_by_severity: violationsBySeverity,
      high_severity_violations: highSeverityViolations.length,
      average_compliance_score: avgCompliance,
    };
  },

  async createPolicy(policy: any): Promise<any> {
    await delay(200);
    const newPolicy = {
      id: `policy-${Date.now()}`,
      name: policy.title,
      title: policy.title,
      category: policy.category,
      description: policy.description,
      content: policy.content,
      version: policy.version || '1.0',
      status: policy.status || 'active',
      effective_date: policy.effective_date || new Date().toISOString().split('T')[0],
      review_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      owner: { full_name: 'HR Department' },
      last_updated: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      compliance_score: 100,
    };
    mockPolicies.push(newPolicy as any);
    return newPolicy;
  },

  async updatePolicy(policyId: string, updates: any): Promise<any> {
    await delay(200);
    const policy = mockPolicies.find(p => p.id === policyId);
    if (!policy) throw new Error('Policy not found');
    
    const updatedPolicy = {
      ...policy,
      ...updates,
      title: updates.title || policy.title,
      name: updates.title || policy.title, // Add name for compatibility
      last_updated: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString(),
    };
    
    // Update the policy in the array
    const index = mockPolicies.findIndex(p => p.id === policyId);
    if (index !== -1) {
      mockPolicies[index] = updatedPolicy as any;
    }
    
    return updatedPolicy;
  },
};

// ----------------------------------------------------------------------------
