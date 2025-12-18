/**
 * Layout Loader
 * 
 * Dynamically loads and renders the appropriate layout based on certification
 */

'use client'

import React, { lazy, Suspense, ComponentType } from 'react'
import { LayoutConfig } from '@/lib/layout-config'
import { TreeNode } from '@/lib/certification-structures'

// Lazy load layout components
const VcaLayout = lazy(() => import('./vca-layout').then(m => ({ default: m.VcaLayout })))
const DefaultLayout = lazy(() => import('./default-layout').then(m => ({ default: m.DefaultLayout })))
const FullWidthLayout = lazy(() => import('./full-width-layout').then(m => ({ default: m.FullWidthLayout })))

// Layout component map
const layoutMap: Record<string, ComponentType<any>> = {
  VcaLayout,
  DefaultLayout,
  FullWidthLayout,
}

interface LayoutLoaderProps {
  config: LayoutConfig
  certification: string
  structure: TreeNode[]
  children: React.ReactNode
}

/**
 * Loads and renders the appropriate layout component
 */
export function LayoutLoader({ config, certification, structure, children }: LayoutLoaderProps) {
  const LayoutComponent = layoutMap[config.component]
  
  if (!LayoutComponent) {
    console.error(`Layout component "${config.component}" not found`)
    // Fallback to default layout
    const DefaultLayoutComponent = layoutMap['DefaultLayout']
    return (
      <Suspense fallback={<div className="p-8">Loading layout...</div>}>
        <DefaultLayoutComponent
          certification={certification}
          structure={structure}
          gridMain={config.grid.main}
          gridSidebar={config.grid.sidebar}
          showSidebar={config.showSidebar}
        >
          {children}
        </DefaultLayoutComponent>
      </Suspense>
    )
  }
  
  // Prepare props based on layout component type
  const getLayoutProps = () => {
    const baseProps = {
      certification,
      structure,
      children,
    }
    
    // VcaLayout has fixed grid, no need for grid props
    if (config.component === 'VcaLayout') {
      return baseProps
    }
    
    // DefaultLayout accepts grid props
    if (config.component === 'DefaultLayout') {
      return {
        ...baseProps,
        gridMain: config.grid.main,
        gridSidebar: config.grid.sidebar,
        showSidebar: config.showSidebar,
      }
    }
    
    // FullWidthLayout doesn't need grid props
    if (config.component === 'FullWidthLayout') {
      return baseProps
    }
    
    // Default: pass all props
    return {
      ...baseProps,
      gridMain: config.grid.main,
      gridSidebar: config.grid.sidebar,
      showSidebar: config.showSidebar,
    }
  }
  
  return (
    <Suspense fallback={<div className="p-8">Loading layout...</div>}>
      <LayoutComponent {...getLayoutProps()} />
    </Suspense>
  )
}

