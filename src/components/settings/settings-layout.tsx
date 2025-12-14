'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LanguageSwitcher } from '@/components/language-switcher'
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { 
  ChevronDown, 
  ChevronRight, 
  RefreshCw, 
  Minimize2,
  Users,
  FileText,
  Globe,
  CheckSquare,
  Puzzle,
  Settings,
  FileBarChart
} from 'lucide-react'

interface SettingsLayoutProps {
  children: React.ReactNode
}

/**
 * Settings Layout Component
 * 
 * Layout component for settings pages with MyDMS-style navigation
 * Based on the MyDMS admin interface structure
 */
export function SettingsLayout({ children }: SettingsLayoutProps) {
  const t = useTranslations('settings')
  const pathname = usePathname()
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    user_management: true,
    content: false,
    intranet_blog: false,
    actions_tasks: false,
    extensions: false,
    system: false,
    logs: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const navigationItems = [
    {
      id: 'user_management',
      label: t('navigation.user_management'),
      icon: Users,
      items: [
        { id: 'users', label: t('user_management.users'), href: '/settings/users' },
        { id: 'groups', label: t('user_management.groups'), href: '/settings/groups' },
        { id: 'misc', label: t('user_management.misc'), href: '/settings/misc' },
      ]
    },
    {
      id: 'content',
      label: t('navigation.content'),
      icon: FileText,
      items: [
        { id: 'documents', label: 'Documents', href: '/settings/content' },
      ]
    },
    {
      id: 'intranet_blog',
      label: t('navigation.intranet_blog'),
      icon: Globe,
      items: [
        { id: 'blog', label: 'Blog', href: '/settings/blog' },
      ]
    },
    {
      id: 'actions_tasks',
      label: t('navigation.actions_tasks'),
      icon: CheckSquare,
      items: [
        { id: 'tasks', label: 'Tasks', href: '/settings/tasks' },
      ]
    },
    {
      id: 'extensions',
      label: t('navigation.extensions'),
      icon: Puzzle,
      items: [
        { id: 'plugins', label: 'Plugins', href: '/settings/extensions' },
      ]
    },
    {
      id: 'system',
      label: t('navigation.system'),
      icon: Settings,
      items: [
        { id: 'config', label: 'Configuration', href: '/settings/system' },
      ]
    },
    {
      id: 'logs',
      label: t('navigation.logs'),
      icon: FileBarChart,
      items: [
        { id: 'audit', label: 'Audit Logs', href: '/settings/logs' },
      ]
    },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-80 border-r bg-muted/50 p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-primary">{t('title')}</h1>
            <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
          </div>


          {/* Navigation */}
          <div className="space-y-2">
            {navigationItems.map((section) => {
              const Icon = section.icon
              const isExpanded = expandedSections[section.id]
              
              return (
                <Collapsible
                  key={section.id}
                  open={isExpanded}
                  onOpenChange={() => toggleSection(section.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto p-2"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Icon className="h-4 w-4" />
                        <span className="flex-1 text-left">{section.label}</span>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-6 space-y-1">
                      {section.items.map((item) => (
                        <Button
                          key={item.id}
                          variant={pathname === item.href ? "secondary" : "ghost"}
                          className="w-full justify-start h-auto p-2 text-sm"
                          asChild
                        >
                          <a href={item.href}>{item.label}</a>
                        </Button>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>
        {children}
      </div>
    </div>
  )
}
