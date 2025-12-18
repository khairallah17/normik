/**
 * Simplified Certification Section Page
 * 
 * Uses route configuration for dynamic component loading
 * Uses layout configuration for different certification layouts
 * Removes complex conditional rendering for better performance
 */

'use client'

import React from 'react'
import { usePathname } from '@/i18n/routing'
import { getCertificationStructure } from "@/lib/certification-structures"
import { resolveRoute, MatchedRoute } from '@/lib/route-resolver'
import { routeConfig } from '@/lib/route-config'
import { getLayoutConfig } from '@/lib/layout-config'
import { ComponentLoader } from '@/lib/component-loader-internal'
import { LayoutLoader } from '@/components/layouts/layout-loader'
import { VcaContentWrapper } from '@/components/vca-sections/vca-content-wrapper'

interface PageProps {
  params: Promise<{
    certification: string
    slug: string[]
  }>
}

export default function CertificationSectionPage({ params }: PageProps) {
  const pathname = usePathname()
  
  // For Next.js 15, use React.use() pattern
  const resolvedParams = React.use(params)
  const { certification } = resolvedParams
  
  // Get certification structure
  const structure = getCertificationStructure(certification)
  
  // Get layout configuration for this certification
  const layoutConfig = getLayoutConfig(certification)
  
  // Filter routes for this certification (exclude handbook routes)
  const certificationRoutes = routeConfig.filter(
    route => route.certification === certification
  )
  
  // Resolve route
  const matchedRoute = pathname ? resolveRoute(pathname, certificationRoutes) : null
  
  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development' && pathname?.includes('workplace-inspections')) {
    console.log('Route Resolution Debug:', {
      pathname,
      matchedRoute,
      routeConfig: routeConfig.filter(r => r.pattern.includes('workplace-inspections'))
    })
  }
  
  // Render component based on route
  const renderContent = () => {
    if (!matchedRoute) {
      // Fallback for VCA: try to render content using VcaContentWrapper
      if (certification === 'vca' && pathname) {
        // Only use fallback for non-module paths
        const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '')
        if (!pathWithoutLocale.includes('/modules/')) {
          const fallbackRoute: MatchedRoute = {
            type: 'vca-section',
            contentKey: '',
            component: VcaContentWrapper,
            certification: 'vca',
            pattern: pathname,
            params: {},
            path: pathWithoutLocale,
          }
          return <VcaContentWrapper route={fallbackRoute} />
        }
      }
      
      // Fallback: render default certification content
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Certification: {certification}</h1>
          <p className="text-muted-foreground">No route configuration found for this path: {pathname}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Debug: Path without locale: {pathname?.replace(/^\/[a-z]{2}/, '')}
          </p>
        </div>
      )
    }
    
    // Handle module pages FIRST (most specific)
    if (matchedRoute.type === 'module' || matchedRoute.type === 'module-sub') {
      const props: Record<string, unknown> = { route: matchedRoute }
      if (matchedRoute.params?.templateId) {
        props.templateId = matchedRoute.params.templateId
      }
      return <ComponentLoader route={matchedRoute} {...props} />
    }
    
    // Handle VCA content wrappers
    if (matchedRoute.type === 'vca-section' || matchedRoute.type === 'vca-section-overview') {
      return <VcaContentWrapper route={matchedRoute} />
    }
    
    // Handle VCA content sections - render component directly
    if (matchedRoute.type === 'vca-content') {
      const Component = matchedRoute.component
      return <Component route={matchedRoute} />
    }
    
    // Handle all other component types with ComponentLoader
    if (matchedRoute.component) {
      return <ComponentLoader route={matchedRoute} />
    }
    
    // Last resort: show error with debug info
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Route Configuration Error</h1>
        <p className="text-muted-foreground">
          Route type: {matchedRoute.type}, Component not found
        </p>
        <p className="text-muted-foreground">Path: {pathname}</p>
        <p className="text-muted-foreground">Pattern: {matchedRoute.pattern}</p>
      </div>
    )
  }
  
  return (
    <LayoutLoader
      config={layoutConfig}
      certification={certification}
      structure={structure}
    >
      {renderContent()}
    </LayoutLoader>
  )
}

