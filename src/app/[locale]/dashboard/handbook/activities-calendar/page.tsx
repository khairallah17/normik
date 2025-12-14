'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarEvent, EventFormData } from '@/types/calendar'
import { mockEvents } from '@/lib/mock-calendar'
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Tag,
  AlertCircle,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'

export default function ActivitiesCalendarPage() {
  const t = useTranslations('calendar')
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents)
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddEvent = (eventData: EventFormData) => {
    const newEvent: CalendarEvent = {
      id: (events.length + 1).toString(),
      ...eventData,
      startDate: new Date(eventData.startDate),
      endDate: new Date(eventData.endDate),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setEvents(prev => [...prev, newEvent])
    setShowAddForm(false)
  }

  const handleEditEvent = (event: CalendarEvent) => {
    console.log('Edit event:', event)
    // TODO: Implement edit functionality
  }

  const handleDeleteEvent = (event: CalendarEvent) => {
    setEvents(prev => prev.filter(e => e.id !== event.id))
  }

  const handleViewEvent = (event: CalendarEvent) => {
    console.log('View event:', event)
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meeting': return 'bg-blue-100 text-blue-800'
      case 'training': return 'bg-purple-100 text-purple-800'
      case 'maintenance': return 'bg-orange-100 text-orange-800'
      case 'inspection': return 'bg-red-100 text-red-800'
      case 'other': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t('add_event')}
        </Button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CalendarIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('no_events')}</h3>
              <p className="text-muted-foreground text-center mb-4">
                Start by adding your first event to the calendar
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {t('add_event')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          events.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{event.name}</h3>
                      <Badge className={getCategoryColor(event.category)}>
                        {t(`categories.${event.category}`)}
                      </Badge>
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(event.priority)}`} />
                    </div>
                    
                    {event.description && (
                      <p className="text-muted-foreground mb-3">{event.description}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {event.startDate.toLocaleDateString()}
                      </div>
                      
                      {event.startTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.startTime} - {event.endTime}
                        </div>
                      )}
                      
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewEvent(event)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteEvent(event)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add Event Form Modal */}
      {showAddForm && (
        <EventFormModal
          onSave={handleAddEvent}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  )
}

// Event Form Modal Component
interface EventFormModalProps {
  onSave: (eventData: EventFormData) => void
  onCancel: () => void
}

function EventFormModal({ onSave, onCancel }: EventFormModalProps) {
  const t = useTranslations('calendar')
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    location: '',
    category: 'meeting',
    priority: 'medium'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4">
        <CardHeader>
          <CardTitle>{t('event_form.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">{t('event_form.name')} *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">{t('event_form.description')}</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">{t('event_form.start_date')} *</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t('event_form.end_date')} *</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">{t('event_form.start_time')}</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t('event_form.end_time')}</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">{t('event_form.location')}</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">{t('event_form.category')}</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="meeting">{t('categories.meeting')}</option>
                  <option value="training">{t('categories.training')}</option>
                  <option value="maintenance">{t('categories.maintenance')}</option>
                  <option value="inspection">{t('categories.inspection')}</option>
                  <option value="other">{t('categories.other')}</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">{t('event_form.priority')}</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="low">{t('priorities.low')}</option>
                  <option value="medium">{t('priorities.medium')}</option>
                  <option value="high">{t('priorities.high')}</option>
                  <option value="urgent">{t('priorities.urgent')}</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                {t('event_form.cancel')}
              </Button>
              <Button type="submit">
                {t('event_form.save')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
