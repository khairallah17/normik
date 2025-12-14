'use client'

import React, { useState } from 'react'
import { Link, usePathname } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { getCertificationStructure } from '@/lib/certification-structures'
import { cn } from '@/lib/utils'

interface TreeNode {
  id: string
  titleKey: string
  descriptionKey?: string
  url: string
  children?: TreeNode[]
}

interface VCANavigationItemProps {
  node: TreeNode
  level?: number
  basePath: string
}

function VCANavigationItem({ node, level = 0, basePath }: VCANavigationItemProps) {
  const t = useTranslations('handbook.structure')
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState(false)
  
  const hasChildren = node.children && node.children.length > 0
  const itemUrl = node.url.replace('/dashboard/handbook', basePath)
  const isActive = pathname === itemUrl || pathname?.startsWith(`${itemUrl}/`)
  
  // Get section number for VCA
  const getSectionNumber = (titleKey: string): number | null => {
    const vcaNumberMap: Record<string, number> = {
      'general': 0,
      'policy': 1,
      'risks': 2,
      'competence': 3,
      'ohs_awareness': 4,
      'ohs_project_plan': 5,
      'emergency_situations': 6,
      'inspections': 7,
      'health': 8,
      'resources': 9,
      'procurement_services': 10,
      'ohs_incidents': 11,
    }
    return vcaNumberMap[titleKey] ?? null
  }
  
  const sectionNumber = getSectionNumber(node.titleKey)
  const title = t(node.titleKey)
  const displayTitle = sectionNumber !== null && sectionNumber > 0 
    ? `${sectionNumber}. ${title}`
    : title

  // Only show dropdown on hover (not based on active state for now)
  const shouldShowDropdown = isHovered

  if (level === 0) {
    // Top-level items in navigation bar
    return (
      <div 
        className="relative inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={cn(
          "flex items-center rounded transition-colors border",
          isActive || isHovered
            ? "bg-white text-[#0066CC] border-[#0066CC]"
            : "bg-[#0066CC] text-white border-[#0066CC]"
        )}>
          <Link
            href={itemUrl}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors",
              isActive || isHovered
                ? "text-[#0066CC]"
                : "text-white"
            )}
          >
            {displayTitle}
          </Link>
          {hasChildren && (
            <div className={cn(
              "ml-1 p-1 rounded transition-colors pointer-events-none",
              isActive || isHovered ? "text-[#0066CC]" : "text-white"
            )}>
              {shouldShowDropdown ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          )}
        </div>
        
        {/* Dropdown menu - shown on hover */}
        {hasChildren && shouldShowDropdown && (
          <div 
            className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[250px] max-h-[400px] overflow-y-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="py-1">
              {node.children?.map((child) => (
                <VCANavigationItem
                  key={child.id}
                  node={child}
                  level={level + 1}
                  basePath={basePath}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Nested items in dropdown
  const childUrl = node.url.replace('/dashboard/handbook', basePath)
  const isChildActive = pathname === childUrl || pathname?.startsWith(`${childUrl}/`)
  const hasGrandchildren = node.children && node.children.length > 0
  
  // Show grandchildren dropdown on hover
  const shouldShowGrandchildren = isHovered && hasGrandchildren

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "flex items-center rounded transition-colors",
        isChildActive || isHovered
          ? "bg-[#E6F2FF]"
          : ""
      )}>
        <Link
          href={childUrl}
          className={cn(
            "flex-1 px-4 py-2 text-sm rounded transition-colors",
            isChildActive || isHovered
              ? "text-[#0066CC] font-medium"
              : "text-[#003366] hover:text-[#0066CC]"
          )}
        >
          {t(node.titleKey)}
        </Link>
        {hasGrandchildren && (
          <div className={cn(
            "p-1 rounded transition-colors pointer-events-none",
            isChildActive || isHovered ? "text-[#0066CC]" : "text-[#003366]"
          )}>
            {shouldShowGrandchildren ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        )}
      </div>
      
      {/* Nested dropdown for grandchildren - shown on hover */}
      {hasGrandchildren && shouldShowGrandchildren && (
        <div 
          className="absolute left-full top-0 ml-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[200px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="py-1">
            {node.children?.map((grandchild) => (
              <VCANavigationItem
                key={grandchild.id}
                node={grandchild}
                level={level + 1}
                basePath={basePath}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function VCANavigation() {
  const structure = getCertificationStructure('vca')
  const basePath = '/dashboard/vca'
  
  // Filter out modules from navigation
  const filteredStructure = structure.filter(node => node.titleKey !== 'modules')

  return (
    <div className="container mb-6" data-cursor-ref="ref-hnsomnntk2d">
      <nav className="flex flex-wrap gap-2 items-center">
        {filteredStructure.map((node) => (
          <VCANavigationItem
            key={node.id}
            node={node}
            basePath={basePath}
          />
        ))}
      </nav>
    </div>
  )
}

