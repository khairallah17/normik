/**
 * Component Loader (Internal)
 * 
 * Dynamically loads components based on route configuration
 */

'use client'

import { Suspense } from 'react'
import { MatchedRoute } from './route-resolver'

interface ComponentLoaderProps {
  route: MatchedRoute
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

/**
 * Loads and renders the appropriate component based on route configuration
 */
export function ComponentLoader({ route, ...props }: ComponentLoaderProps) {
  const Component = route.component
  
  if (!Component) {
    console.error(`Component not found in route: ${route.pattern}`)
    return (
      <div className="p-4 text-red-600">
        Component not found for route: {route.pattern}
      </div>
    )
  }
  
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    }>
      <Component {...props} route={route} />
    </Suspense>
  )
}

