/**
 * Simplified Certification Section Page
 * 
 * Uses route configuration for dynamic component loading
 * Removes complex conditional rendering for better performance
 */

'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from '@/i18n/routing'
import { CertificationSidebar } from "@/components/handbook/certification-sidebar"
import { getCertificationStructure, TreeNode } from "@/lib/certification-structures"
import { VCANavigation } from "@/components/vca-navigation"
import { resolveRoute } from '@/lib/route-resolver'
import { routeConfig } from '@/lib/route-config'
import { ComponentLoader } from '@/lib/component-loader-internal'
import { VcaContentWrapper } from '@/components/vca-sections/vca-content-wrapper'
import { GeneralSection } from '@/components/vca-sections/general-section'
import { VcaContentSection } from '@/components/vca-sections/vca-content-section'

interface PageProps {
  params: Promise<{
    certification: string
    slug: string[]
  }>
}

export default function CertificationSectionPage({ params }: PageProps) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  
  // For Next.js 15, use React.use() pattern
  const resolvedParams = React.use(params)
  const { certification, slug } = resolvedParams
  
  // Get certification structure
  const structure = getCertificationStructure(certification)
  
  // Auto-expand sections that have active children
  useEffect(() => {
    if (certification === 'vca' && structure) {
      const findActiveSection = (nodes: TreeNode[]): string | null => {
        for (const node of nodes) {
          const nodeUrl = node.url.replace('/dashboard/handbook', `/dashboard/${certification}`)
          if (pathname === nodeUrl || pathname?.startsWith(`${nodeUrl}/`)) {
            return node.id
          }
          if (node.children) {
            const activeChild = findActiveSection(node.children)
            if (activeChild) {
              setExpandedSections(prev => ({ ...prev, [node.id]: true }))
              return node.id
            }
          }
        }
        return null
      }
      findActiveSection(structure)
    }
  }, [pathname, certification, structure])
  
  // Resolve route
  const matchedRoute = pathname ? resolveRoute(pathname, routeConfig) : null
  
  // Render component based on route
  const renderContent = () => {
    if (!matchedRoute) {
      // Fallback: render default certification content
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Certification: {certification}</h1>
          <p className="text-muted-foreground">No route configuration found for this path.</p>
        </div>
      )
    }
    
    // Handle VCA content wrappers
    if (matchedRoute.type === 'vca-section' || matchedRoute.type === 'vca-section-overview') {
      return <VcaContentWrapper route={matchedRoute} />
    }
    
    if (matchedRoute.type === 'vca-content' && matchedRoute.component === 'GeneralSection') {
      return <GeneralSection route={matchedRoute} />
    }
    
    if (matchedRoute.type === 'vca-content' && matchedRoute.component === 'VcaContentSection') {
      return <VcaContentSection route={matchedRoute} />
    }
    
    // Handle module pages and other components
    if (matchedRoute.type === 'module' || matchedRoute.type === 'module-sub') {
      // Pass templateId if it's a template edit page
      const props: any = { route: matchedRoute }
      if (matchedRoute.params?.templateId) {
        props.templateId = matchedRoute.params.templateId
      }
      return <ComponentLoader route={matchedRoute} {...props} />
    }
    
    // Default component loader
    return <ComponentLoader route={matchedRoute} />
  }
  
  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Navigation Container - VCA only */}
      {certification === 'vca' && <VCANavigation />}
      
      {/* Main Content Area */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="md:col-span-8">
            {renderContent()}
          </div>
          
          {/* Sidebar */}
          <div className="md:col-span-4">
            <CertificationSidebar
              certification={certification}
              structure={structure}
              expandedSections={expandedSections}
              onToggleSection={(id) => {
                setExpandedSections(prev => ({
                  ...prev,
                  [id]: !prev[id]
                }))
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

