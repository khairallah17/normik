/**
 * Handbook Section Page
 * 
 * Uses route configuration for dynamic component loading
 */

'use client'

import React from 'react'
import { usePathname } from '@/i18n/routing'
import { resolveRoute, MatchedRoute } from '@/lib/route-resolver'
import { routeConfig } from '@/lib/route-config'
import { ComponentLoader } from '@/lib/component-loader-internal'
import { HandbookSectionPage } from '@/components/handbook/handbook-section-page'

interface PageProps {
  params: Promise<{
    slug: string[]
  }>
}

export default function HandbookPage(_props: PageProps) {
  const pathname = usePathname()
  
  // Filter routes for handbook only
  const handbookRoutes = routeConfig.filter(route => route.certification === 'handbook')
  
  // Resolve route
  const matchedRoute = pathname ? resolveRoute(pathname, handbookRoutes) : null
  
  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development' && pathname?.includes('/handbook')) {
    console.log('Handbook Route Resolution:', {
      pathname,
      matchedRoute,
      pathWithoutLocale: pathname?.replace(/^\/[a-z]{2}/, ''),
      handbookRoutes: routeConfig.filter(r => r.pattern.includes('handbook'))
    })
  }
  
  // Render component based on route
  const renderContent = () => {
    // Handle handbook sections - either matched route or fallback
    if (!matchedRoute || matchedRoute.type === 'handbook-section') {
      const pathWithoutLocale = pathname?.replace(/^\/[a-z]{2}/, '') || ''
      const route = matchedRoute || {
        type: 'handbook-section',
        component: HandbookSectionPage,
        certification: 'handbook',
        pattern: '/dashboard/handbook/:slug*',
        params: { slug: pathWithoutLocale.replace('/dashboard/handbook/', '') },
        path: pathWithoutLocale,
      } as MatchedRoute
      
      return <HandbookSectionPage route={route} />
    }
    
    // Handle all other component types with ComponentLoader
    if (matchedRoute.component) {
      return <ComponentLoader route={matchedRoute} />
    }
    
    // Last resort: show error
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
  
  return renderContent()
}
