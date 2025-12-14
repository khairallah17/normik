import { CalendarEvent, PlannerTask } from '@/types/calendar'

// Mock calendar events
export const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    name: 'Team Meeting',
    description: 'Weekly team standup meeting',
    startDate: new Date('2025-01-15'),
    endDate: new Date('2025-01-15'),
    startTime: '09:00',
    endTime: '10:00',
    location: 'Conference Room A',
    category: 'meeting',
    priority: 'medium',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: '2',
    name: 'Safety Training',
    description: 'Monthly safety training session',
    startDate: new Date('2025-01-20'),
    endDate: new Date('2025-01-20'),
    startTime: '14:00',
    endTime: '16:00',
    location: 'Training Room',
    category: 'training',
    priority: 'high',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: '3',
    name: 'Equipment Maintenance',
    description: 'Quarterly equipment maintenance check',
    startDate: new Date('2025-01-25'),
    endDate: new Date('2025-01-25'),
    startTime: '08:00',
    endTime: '12:00',
    location: 'Maintenance Area',
    category: 'maintenance',
    priority: 'medium',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  }
]

// Mock planner tasks
export const mockTasks: PlannerTask[] = [
  {
    id: '1',
    name: 'Q1 Quality Review',
    description: 'Complete quarterly quality assessment',
    dueDate: new Date('2025-03-31'),
    assignedTo: 'Quality Manager',
    priority: 'high',
    status: 'pending',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: '2',
    name: 'Staff Training Program',
    description: 'Implement new staff training program',
    dueDate: new Date('2025-02-15'),
    assignedTo: 'HR Manager',
    priority: 'medium',
    status: 'in_progress',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: '3',
    name: 'Policy Update',
    description: 'Update safety policies and procedures',
    dueDate: new Date('2025-01-30'),
    assignedTo: 'Safety Officer',
    priority: 'urgent',
    status: 'completed',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  }
]
