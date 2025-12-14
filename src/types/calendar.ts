export interface CalendarEvent {
  id: string
  name: string
  description?: string
  startDate: Date
  endDate: Date
  startTime?: string
  endTime?: string
  location?: string
  category: EventCategory
  priority: EventPriority
  createdAt: Date
  updatedAt: Date
}

export interface PlannerTask {
  id: string
  name: string
  description?: string
  dueDate: Date
  assignedTo?: string
  priority: TaskPriority
  status: TaskStatus
  createdAt: Date
  updatedAt: Date
}

export type EventCategory = 'meeting' | 'training' | 'maintenance' | 'inspection' | 'other'
export type EventPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'

export interface EventFormData {
  name: string
  description?: string
  startDate: string
  endDate: string
  startTime?: string
  endTime?: string
  location?: string
  category: EventCategory
  priority: EventPriority
}

export interface TaskFormData {
  name: string
  description?: string
  dueDate: string
  assignedTo?: string
  priority: TaskPriority
  status: TaskStatus
}
