'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BulkAction } from '@/types/users'
import { Trash2, UserCheck, UserX, Key, Shield } from 'lucide-react'

interface BulkActionsProps {
  selectedUsers: string[]
  onBulkAction: (action: string, userIds: string[]) => void
  disabled?: boolean
}

/**
 * Bulk Actions Component
 * 
 * Provides bulk operations for selected users
 * Based on the MyDMS users page bulk actions functionality
 */
export function BulkActions({ selectedUsers, onBulkAction, disabled }: BulkActionsProps) {
  const t = useTranslations('users')
  const [selectedAction, setSelectedAction] = useState<string>('')

  const bulkActions: BulkAction[] = [
    {
      id: 'delete',
      label: t('delete_users'),
      action: 'delete',
      destructive: true,
    },
    {
      id: 'activate',
      label: t('activate_users'),
      action: 'activate',
    },
    {
      id: 'deactivate',
      label: t('deactivate_users'),
      action: 'deactivate',
    },
    {
      id: 'force_password_change',
      label: t('force_password_change'),
      action: 'force_password_change',
    },
    {
      id: 'require_2fa',
      label: t('require_2fa'),
      action: 'require_2fa',
    },
  ]

  const handleApplyAction = () => {
    if (selectedAction && selectedUsers.length > 0) {
      onBulkAction(selectedAction, selectedUsers)
      setSelectedAction('')
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'delete':
        return <Trash2 className="h-4 w-4" />
      case 'activate':
        return <UserCheck className="h-4 w-4" />
      case 'deactivate':
        return <UserX className="h-4 w-4" />
      case 'force_password_change':
        return <Key className="h-4 w-4" />
      case 'require_2fa':
        return <Shield className="h-4 w-4" />
      default:
        return null
    }
  }

  if (selectedUsers.length === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
      <span className="text-sm text-muted-foreground">
        {selectedUsers.length} {selectedUsers.length === 1 ? 'user' : 'users'} selected
      </span>
      
      <Select value={selectedAction} onValueChange={setSelectedAction}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder={t('select_action')} />
        </SelectTrigger>
        <SelectContent>
          {bulkActions.map((action) => (
            <SelectItem key={action.id} value={action.action}>
              <div className="flex items-center gap-2">
                {getActionIcon(action.action)}
                {action.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button 
        onClick={handleApplyAction}
        disabled={!selectedAction || disabled}
        variant={selectedAction === 'delete' ? 'destructive' : 'default'}
        size="sm"
      >
        {t('apply')}
      </Button>
    </div>
  )
}
