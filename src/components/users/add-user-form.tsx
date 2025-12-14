'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserFormData, User } from '@/types/users'
import { User as UserIcon, Mail, Phone, UserCheck, Building, Shield } from 'lucide-react'

interface AddUserFormProps {
  onSave: (userData: UserFormData) => Promise<void>
  onCancel: () => void
  loading: boolean
  existingUsers: User[]
}

/**
 * Add User Form Component
 * 
 * Full-page form for creating new users
 * Based on the MyDMS add user dialog structure
 */
export function AddUserForm({ onSave, onCancel, loading, existingUsers }: AddUserFormProps) {
  const t = useTranslations('add_user')
  const [activeTab, setActiveTab] = useState('user_details')
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    username: '',
    email: '',
    employeeNumber: '',
    role: '',
    department: '',
    phone: '',
    status: 'active'
  })

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Required fields validation
    if (!formData.name.trim()) {
      newErrors.name = t('form.required_field')
    }
    if (!formData.username.trim()) {
      newErrors.username = t('form.required_field')
    }
    if (!formData.email.trim()) {
      newErrors.email = t('form.required_field')
    }

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('form.invalid_email')
    }

    // Check for existing username/email
    if (existingUsers.some(user => user.username === formData.username)) {
      newErrors.username = t('form.username_taken')
    }
    if (existingUsers.some(user => user.email === formData.email)) {
      newErrors.email = t('form.email_taken')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return
    await onSave(formData)
  }

  const updateFormData = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="user_details" className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            {t('tabs.user_details')}
          </TabsTrigger>
          <TabsTrigger value="application" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {t('tabs.application')}
          </TabsTrigger>
          <TabsTrigger value="options" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            {t('tabs.options')}
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            {t('tabs.groups')}
          </TabsTrigger>
        </TabsList>

        {/* User Details Tab */}
        <TabsContent value="user_details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t('form.first_name')} *</Label>
              <Input
                id="firstName"
                value={formData.name.split(' ')[0] || ''}
                onChange={(e) => {
                  const firstName = e.target.value
                  const lastName = formData.name.split(' ').slice(1).join(' ')
                  updateFormData('name', lastName ? `${firstName} ${lastName}` : firstName)
                }}
                placeholder="Enter first name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">{t('form.last_name')} *</Label>
              <Input
                id="lastName"
                value={formData.name.split(' ').slice(1).join(' ') || ''}
                onChange={(e) => {
                  const lastName = e.target.value
                  const firstName = formData.name.split(' ')[0] || ''
                  updateFormData('name', firstName ? `${firstName} ${lastName}` : lastName)
                }}
                placeholder="Enter last name"
                className={errors.name ? 'border-red-500' : ''}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="employeeNumber">{t('form.employee_number')}</Label>
              <Input
                id="employeeNumber"
                value={formData.employeeNumber || ''}
                onChange={(e) => updateFormData('employeeNumber', e.target.value)}
                placeholder="Enter employee number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">{t('form.position')}</Label>
              <Input
                id="position"
                value={formData.role || ''}
                onChange={(e) => updateFormData('role', e.target.value)}
                placeholder="Enter position/function"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('form.email')} *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => updateFormData('email', e.target.value)}
              placeholder="Enter email address"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">{t('form.phone')}</Label>
              <Input
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">{t('form.mobile')}</Label>
              <Input
                id="mobile"
                placeholder="Enter mobile number"
              />
            </div>
          </div>
        </TabsContent>

        {/* Application Tab */}
        <TabsContent value="application" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">{t('form.username')} *</Label>
            <Input
              id="username"
              value={formData.username || ''}
              onChange={(e) => updateFormData('username', e.target.value)}
              placeholder="Enter username"
              className={errors.username ? 'border-red-500' : ''}
            />
            {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="password">{t('form.password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t('form.confirm_password')}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">{t('form.status')}</Label>
            <Select value={formData.status} onValueChange={(value) => updateFormData('status', value as 'active' | 'inactive')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        {/* Options Tab */}
        <TabsContent value="options" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="role">{t('form.role')}</Label>
            <Select value={formData.role || ''} onValueChange={(value) => updateFormData('role', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Administrator">Administrator</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
                <SelectItem value="Developer">Developer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">{t('form.department')}</Label>
            <Select value={formData.department || ''} onValueChange={(value) => updateFormData('department', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Care">Care</SelectItem>
                <SelectItem value="Management">Management</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        {/* Groups Tab */}
        <TabsContent value="groups" className="space-y-6">
          <div className="text-center py-12 text-muted-foreground">
            <Building className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Group Management</h3>
            <p>Group management functionality will be implemented here</p>
            <p className="text-sm">This feature allows assigning users to specific groups and roles</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button variant="outline" onClick={onCancel} disabled={loading}>
          {t('actions.cancel')}
        </Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : t('actions.save')}
        </Button>
      </div>
    </div>
  )
}
