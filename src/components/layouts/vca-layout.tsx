/**
 * VCA Layout Component
 * 
 * Specialized layout for VCA certification pages
 */

'use client'

import React from 'react'
import { VCANavigation } from '@/components/vca-navigation'
import { VcaRightSidebar } from './vca-right-sidebar'
import { TreeNode } from '@/lib/certification-structures'

interface VcaLayoutProps {
  children: React.ReactNode
  certification: string
  structure: TreeNode[]
}

export function VcaLayout({ children, certification, structure }: VcaLayoutProps) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* VCA Navigation */}
      <VCANavigation />
      
      {/* Main Content Area */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Content - 9 columns */}
          <div className="md:col-span-9">
            {children}
          </div>
          
          {/* Right Sidebar - 3 columns */}
          <div className="md:col-span-3">
            <VcaRightSidebar
              certification={certification}
              structure={structure}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

