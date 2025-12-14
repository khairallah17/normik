'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlannerTask, TaskFormData } from '@/types/calendar'
import { mockTasks } from '@/lib/mock-calendar'
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  User,
  AlertCircle,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Circle,
  PlayCircle,
  XCircle
} from 'lucide-react'

export default function AnnualPlannerPage() {
  const t = useTranslations('planner')
  const [tasks, setTasks] = useState<PlannerTask[]>(mockTasks)
  const [showAddForm, setShowAddForm] = useState(false)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())

  const handleAddTask = (taskData: TaskFormData) => {
    const newTask: PlannerTask = {
      id: (tasks.length + 1).toString(),
      ...taskData,
      dueDate: new Date(taskData.dueDate),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setTasks(prev => [...prev, newTask])
    setShowAddForm(false)
  }

  const handleEditTask = (task: PlannerTask) => {
    console.log('Edit task:', task)
    // TODO: Implement edit functionality
  }

  const handleDeleteTask = (task: PlannerTask) => {
    setTasks(prev => prev.filter(t => t.id !== task.id))
  }

  const handleViewTask = (task: PlannerTask) => {
    console.log('View task:', task)
    // TODO: Implement view functionality
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in_progress': return <PlayCircle className="h-4 w-4 text-blue-500" />
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-500" />
      default: return <Circle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const months = [
    t('months.january'), t('months.february'), t('months.march'),
    t('months.april'), t('months.may'), t('months.june'),
    t('months.july'), t('months.august'), t('months.september'),
    t('months.october'), t('months.november'), t('months.december')
  ]

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(prev => prev - 1)
      } else {
        setCurrentMonth(prev => prev - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(prev => prev + 1)
      } else {
        setCurrentMonth(prev => prev + 1)
      }
    }
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentYear(today.getFullYear())
    setCurrentMonth(today.getMonth())
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <CalendarIcon className="h-8 w-8 text-primary" />
            {t('title')}
          </h1>
          <p className="text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {t('add_task')}
          </Button>
          <Button variant="outline" onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {t('add_action')}
          </Button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-2xl font-semibold">
                {months[currentMonth]} {currentYear}
              </h2>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" onClick={goToToday}>
              {t('navigation.today')}
            </Button>
          </div>

          {/* Monthly Grid */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="text-center font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
            {/* Calendar days would go here - simplified for now */}
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
              <div key={day} className="border border-gray-200 h-20 p-2 text-sm">
                <div className="font-medium">{day}</div>
                {/* Tasks for this day would be displayed here */}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Tasks & Actions</h3>
        {tasks.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CalendarIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No tasks planned</h3>
              <p className="text-muted-foreground text-center mb-4">
                Start by adding your first task or action to the planner
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {t('add_task')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(task.status)}
                      <h3 className="text-lg font-semibold">{task.name}</h3>
                      <Badge className={getStatusColor(task.status)}>
                        {t(`statuses.${task.status}`)}
                      </Badge>
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
                    </div>
                    
                    {task.description && (
                      <p className="text-muted-foreground mb-3">{task.description}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {task.dueDate.toLocaleDateString()}
                      </div>
                      
                      {task.assignedTo && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {task.assignedTo}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewTask(task)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditTask(task)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteTask(task)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add Task Form Modal */}
      {showAddForm && (
        <TaskFormModal
          onSave={handleAddTask}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  )
}

// Task Form Modal Component
interface TaskFormModalProps {
  onSave: (taskData: TaskFormData) => void
  onCancel: () => void
}

function TaskFormModal({ onSave, onCancel }: TaskFormModalProps) {
  const t = useTranslations('planner')
  const [formData, setFormData] = useState<TaskFormData>({
    name: '',
    description: '',
    dueDate: '',
    assignedTo: '',
    priority: 'medium',
    status: 'pending'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4">
        <CardHeader>
          <CardTitle>{t('task_form.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">{t('task_form.name')} *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">{t('task_form.description')}</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">{t('task_form.due_date')} *</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t('task_form.assigned_to')}</label>
                <input
                  type="text"
                  value={formData.assignedTo}
                  onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">{t('task_form.priority')}</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">{t('task_form.status')}</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="pending">{t('statuses.pending')}</option>
                  <option value="in_progress">{t('statuses.in_progress')}</option>
                  <option value="completed">{t('statuses.completed')}</option>
                  <option value="cancelled">{t('statuses.cancelled')}</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                {t('task_form.cancel')}
              </Button>
              <Button type="submit">
                {t('task_form.save')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
