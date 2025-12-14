'use client'

import { useState } from 'react'
import { useRouter } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AddUserForm } from '@/components/users/add-user-form'
import { UserFormData } from '@/types/users'
import { mockUsers } from '@/lib/mock-users'
import { ArrowLeft, User } from 'lucide-react'

export default function AddUserPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSaveUser = async (userData: UserFormData) => {
    setLoading(true)
    try {
      // Here you would typically make an API call to save the user
      console.log('Saving user:', userData)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect back to users list
      router.push('/settings/users')
    } catch (error) {
      console.error('Error saving user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/settings/users')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <User className="h-8 w-8" />
            Add New User
          </h1>
          <p className="text-muted-foreground">
            Create a new user account with the required information
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>
            Fill in the details for the new user account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddUserForm
            onSave={handleSaveUser}
            onCancel={handleCancel}
            loading={loading}
            existingUsers={mockUsers}
          />
        </CardContent>
      </Card>
    </div>
  )
}
