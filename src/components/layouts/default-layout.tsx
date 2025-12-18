/**
 * Default Layout Component
 * 
 * Standard layout for most certifications
 */

'use client'

import React from 'react'
import { CertificationSidebar } from '@/components/handbook/certification-sidebar'
import { TreeNode } from '@/lib/certification-structures'

interface DefaultLayoutProps {
  children: React.ReactNode
  certification: string
  structure: TreeNode[]
  gridMain?: string
  gridSidebar?: string
  showSidebar?: boolean
}

export function DefaultLayout({ 
  children, 
  certification, 
  structure,
  gridMain = 'md:col-span-9',
  gridSidebar = 'md:col-span-3',
  showSidebar = true
}: DefaultLayoutProps) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Main Content Area */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className={gridMain}>
            {children}
          </div>
          
          {/* Sidebar */}
          {showSidebar && (
            <div className={gridSidebar}>
              <CertificationSidebar
                certificationId={certification}
                structure={structure}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

