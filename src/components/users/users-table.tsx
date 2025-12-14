'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { User, UserFilters } from '@/types/users'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  User as UserIcon,
  Mail,
  Phone,
  Calendar
} from 'lucide-react'

interface UsersTableProps {
  users: User[]
  onEditUser: (user: User) => void
  onDeleteUser: (user: User) => void
  onViewUser: (user: User) => void
  onBulkAction: (action: string, userIds: string[]) => void
}

/**
 * Users Table Component
 * 
 * Displays users in a table format with filtering, search, and bulk actions
 * Based on the MyDMS users page functionality
 */
export function UsersTable({ 
  users, 
  onEditUser, 
  onDeleteUser, 
  onViewUser, 
  onBulkAction 
}: UsersTableProps) {
  const t = useTranslations('users')
  const [filters, setFilters] = useState<UserFilters>({})
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  // Filter users based on current filters
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      if (filters.name && !user.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false
      }
      if (filters.username && !user.username.toLowerCase().includes(filters.username.toLowerCase())) {
        return false
      }
      if (filters.employeeNumber && !user.employeeNumber?.includes(filters.employeeNumber)) {
        return false
      }
      if (filters.status && user.status !== filters.status) {
        return false
      }
      return true
    })
  }, [users, filters])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map(user => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, userId])
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId))
    }
  }

  const isAllSelected = selectedUsers.length === filteredUsers.length && filteredUsers.length > 0
  const isIndeterminate = selectedUsers.length > 0 && selectedUsers.length < filteredUsers.length

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('nl-NL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder={t('filter_name')}
            value={filters.name || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
            className="max-w-xs"
          />
        </div>
        <div className="flex-1">
          <Input
            placeholder={t('filter_username')}
            value={filters.username || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, username: e.target.value }))}
            className="max-w-xs"
          />
        </div>
        <div className="flex-1">
          <Input
            placeholder={t('filter_employee')}
            value={filters.employeeNumber || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, employeeNumber: e.target.value }))}
            className="max-w-xs"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  ref={(el) => {
                    if (el && el instanceof HTMLInputElement) el.indeterminate = isIndeterminate
                  }}
                />
              </TableHead>
              <TableHead className="w-12"></TableHead>
              <TableHead className="w-12"></TableHead>
              <TableHead>{t('name')}</TableHead>
              <TableHead>{t('username')}</TableHead>
              <TableHead>{t('employee_number')}</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                    {user.status === 'active' ? t('active') : t('inactive')}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.employeeNumber || '-'}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewUser(user)}>
                        <Eye className="mr-2 h-4 w-4" />
                        {t('view')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditUser(user)}>
                        <Edit className="mr-2 h-4 w-4" />
                        {t('edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDeleteUser(user)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {t('delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* User Count */}
      <div className="text-sm text-muted-foreground">
        {t('user_count', { count: filteredUsers.length })}
      </div>
    </div>
  )
}
