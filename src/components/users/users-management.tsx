'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UsersTable } from './users-table'
import { BulkActions } from './bulk-actions'
import { User } from '@/types/users'
import { mockUsers } from '@/lib/mock-users'
import { 
  Plus, 
  Download, 
  Upload, 
  Users as UsersIcon,
  AlertCircle
} from 'lucide-react'

/**
 * Users Management Component
 * 
 * Main component for user management functionality
 * Based on the MyDMS users page structure
 */
export function UsersManagement() {
  const t = useTranslations('users')
  const router = useRouter()
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const handleEditUser = (user: User) => {
    console.log('Edit user:', user)
    // TODO: Implement edit user functionality
  }

  const handleDeleteUser = (user: User) => {
    console.log('Delete user:', user)
    // TODO: Implement delete user functionality
  }

  const handleViewUser = (user: User) => {
    console.log('View user:', user)
    // TODO: Implement view user functionality
  }

  const handleBulkAction = (action: string, userIds: string[]) => {
    console.log('Bulk action:', action, 'on users:', userIds)
    // TODO: Implement bulk actions
    setSelectedUsers([])
  }

  const handleAddUser = () => {
    router.push('/settings/users/add')
  }

  const handleExportUsers = () => {
    console.log('Export users')
    // TODO: Implement export functionality
  }

  const handleImportUsers = () => {
    console.log('Import users')
    // TODO: Implement import functionality
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportUsers}>
            <Download className="mr-2 h-4 w-4" />
            {t('export_users')}
          </Button>
          <Button variant="outline" onClick={handleImportUsers}>
            <Upload className="mr-2 h-4 w-4" />
            {t('import_users')}
          </Button>
          <Button onClick={handleAddUser}>
            <Plus className="mr-2 h-4 w-4" />
            {t('add_user')}
          </Button>
        </div>
      </div>

      {/* Stats Card */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              {users.filter(u => u.status === 'active').length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.status === 'inactive').length}</div>
            <p className="text-xs text-muted-foreground">
              Currently inactive
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(users.map(u => u.department).filter(Boolean)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Unique departments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions */}
      <BulkActions 
        selectedUsers={selectedUsers}
        onBulkAction={handleBulkAction}
      />

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage your organization's users and their permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsersTable
            users={users}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
            onViewUser={handleViewUser}
            onBulkAction={handleBulkAction}
          />
        </CardContent>
      </Card>
    </div>
  )
}
