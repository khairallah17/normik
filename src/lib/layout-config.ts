/**
 * Layout Configuration
 * 
 * Centralized layout configuration for different certifications
 */

import layoutConfigJson from './layout-config.json'

export interface LayoutConfig {
  component: string
  navigation: string | null
  grid: {
    main: string
    sidebar: string
  }
  showNavigation: boolean
  showSidebar: boolean
}

export interface LayoutConfigs {
  layouts: Record<string, LayoutConfig>
}

const layoutConfigs = layoutConfigJson as LayoutConfigs

/**
 * Get layout configuration for a certification
 */
export function getLayoutConfig(certification: string): LayoutConfig {
  return layoutConfigs.layouts[certification] || layoutConfigs.layouts.default
}

/**
 * Get all available certifications with layouts
 */
export function getAvailableCertifications(): string[] {
  return Object.keys(layoutConfigs.layouts).filter(key => key !== 'default')
}

