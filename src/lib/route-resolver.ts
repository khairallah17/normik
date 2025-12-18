/**
 * Route Resolver
 * 
 * Matches URL patterns to route configurations and extracts parameters
 */

import { ComponentType } from 'react'

export interface RouteConfig {
  pattern: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>
  certification: string
  type: string
  params?: string[]
  contentKey?: string
  contentKeys?: string[]
}

export interface MatchedRoute extends Omit<RouteConfig, 'params'> {
  params: Record<string, string>
  path: string
  // params in RouteConfig is string[] (parameter names), 
  // params in MatchedRoute is Record<string, string> (extracted values)
}

/**
 * Converts a route pattern to a regex
 * Example: "/dashboard/vca/policy/:id" -> /^\/dashboard\/vca\/policy\/([^/]+)$/
 * Example: "/dashboard/handbook/:slug*" -> /^\/dashboard\/handbook\/(.+)$/
 */
function patternToRegex(pattern: string): RegExp {
  // Handle catch-all patterns (ending with :param*)
  if (pattern.includes('*')) {
    const regexPattern = pattern
      .replace(/\//g, '\\/')
      .replace(/:(\w+)\*/g, '(.+)') // Catch-all: matches one or more path segments
      .replace(/:(\w+)/g, '([^/]+)') // Regular params: match single segment
    return new RegExp(`^${regexPattern}$`)
  }
  
  // Regular pattern matching
  const regexPattern = pattern
    .replace(/\//g, '\\/')
    .replace(/:(\w+)/g, '([^/]+)')
  return new RegExp(`^${regexPattern}$`)
}

/**
 * Extracts parameter names from a pattern
 * Example: "/dashboard/vca/policy/:id" -> ["id"]
 * Example: "/dashboard/handbook/:slug*" -> ["slug"]
 */
function extractParamNames(pattern: string): string[] {
  const matches = pattern.matchAll(/:(\w+)\*?/g)
  return Array.from(matches, (m) => m[1])
}

/**
 * Matches a path against a route pattern and extracts parameters
 */
function matchRoute(pattern: string, path: string): { matched: boolean; params: Record<string, string> } {
  const regex = patternToRegex(pattern)
  const match = path.match(regex)
  
  if (!match) {
    return { matched: false, params: {} }
  }
  
  const paramNames = extractParamNames(pattern)
  const params: Record<string, string> = {}
  
  paramNames.forEach((name, index) => {
    params[name] = match[index + 1] || ''
  })
  
  return { matched: true, params }
}

/**
 * Resolves a path to a route configuration
 * 
 * Routes are matched in order of specificity:
 * 1. Exact matches (no parameters) - most specific
 * 2. Patterns with fewer parameters
 * 3. Longer patterns (more path segments)
 * 4. Patterns with more parameters - least specific
 */
export function resolveRoute(
  path: string,
  routes: RouteConfig[]
): MatchedRoute | null {
  // Remove locale prefix if present
  const pathWithoutLocale = path.replace(/^\/[a-z]{2}/, '')
  
  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[RouteResolver] Resolving path:', pathWithoutLocale)
  }
  
  // Sort routes by specificity (more specific patterns first)
  // Priority: 
  // 1. Exact matches (no params) > patterns with params
  // 2. Catch-all patterns (*) come last (least specific)
  // 3. Fewer params > more params
  // 4. Longer patterns > shorter patterns (more path segments)
  // 5. Patterns earlier in config > patterns later (for same specificity)
  const sortedRoutes = [...routes].sort((a, b) => {
    // 1. Catch-all patterns (with *) are least specific - always go last
    const aIsCatchAll = a.pattern.includes('*')
    const bIsCatchAll = b.pattern.includes('*')
    if (aIsCatchAll && !bIsCatchAll) return 1  // a is less specific, goes after b
    if (!aIsCatchAll && bIsCatchAll) return -1 // b is less specific, goes after a
    
    // 2. Exact matches (no params) come before patterns with params
    const aHasParams = a.pattern.includes(':')
    const bHasParams = b.pattern.includes(':')
    if (aHasParams && !bHasParams) return 1  // b is more specific
    if (!aHasParams && bHasParams) return -1 // a is more specific
    
    // 3. If both have params or neither has params, sort by number of params
    const aParamCount = (a.pattern.match(/:/g) || []).length
    const bParamCount = (b.pattern.match(/:/g) || []).length
    if (aParamCount !== bParamCount) {
      return aParamCount - bParamCount // Fewer params = more specific
    }
    
    // 4. If same number of params, longer pattern = more specific
    // Count path segments (parts separated by /)
    const aSegments = a.pattern.split('/').filter(Boolean).length
    const bSegments = b.pattern.split('/').filter(Boolean).length
    if (aSegments !== bSegments) {
      return bSegments - aSegments // More segments = more specific
    }
    
    // 5. If same specificity, maintain original order (no change)
    return 0
  })
  
  // Try to match routes in order of specificity
  for (const route of sortedRoutes) {
    const { matched, params } = matchRoute(route.pattern, pathWithoutLocale)
    
    if (matched) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[RouteResolver] Matched:', {
          pattern: route.pattern,
          path: pathWithoutLocale,
          type: route.type,
          params
        })
      }
      return {
        ...route,
        params,
        path: pathWithoutLocale,
      }
    }
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[RouteResolver] No match found for:', pathWithoutLocale)
    console.log('[RouteResolver] Tried', sortedRoutes.length, 'routes')
  }
  
  return null
}

/**
 * Builds a path from a pattern and parameters
 */
export function buildPath(pattern: string, params: Record<string, string>): string {
  let path = pattern
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value)
  })
  return path
}

