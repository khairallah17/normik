/**
 * Structure Manager
 * 
 * Manages dynamic updates to certification structure (adding new pages)
 */

import { TreeNode } from './certification-structures'

/**
 * Add a new child page to a parent node in the structure
 */
export function addPageToStructure(
  structure: TreeNode[],
  parentId: string,
  newPage: Omit<TreeNode, 'id'>
): TreeNode[] {
  const findAndAdd = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.map(node => {
      if (node.id === parentId) {
        // Found the parent, add the new page
        const newId = `${parentId}-${(node.children?.length || 0) + 1}`
        const newChild: TreeNode = {
          ...newPage,
          id: newId,
        }
        return {
          ...node,
          children: [...(node.children || []), newChild],
        }
      }
      
      // Recursively search children
      if (node.children) {
        return {
          ...node,
          children: findAndAdd(node.children),
        }
      }
      
      return node
    })
  }
  
  return findAndAdd(structure)
}

/**
 * Get the structure with updated URLs for a certification
 */
export function getStructureWithUrls(structure: TreeNode[], certification: string): TreeNode[] {
  const basePath = `/dashboard/${certification}`
  
  const updateUrls = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.map(node => ({
      ...node,
      url: node.url.replace('/dashboard/handbook', basePath),
      children: node.children ? updateUrls(node.children) : undefined,
    }))
  }
  
  return updateUrls(structure)
}

/**
 * Save structure changes (for future persistence)
 */
export function saveStructureChanges(certification: string, structure: TreeNode[]) {
  // TODO: Implement API call to save structure changes
  // For now, we can use localStorage or sessionStorage as a temporary solution
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(`structure-${certification}`, JSON.stringify(structure))
  }
}

/**
 * Load structure changes (for future persistence)
 */
export function loadStructureChanges(certification: string): TreeNode[] | null {
  // TODO: Implement API call to load structure changes
  // For now, we can use localStorage or sessionStorage as a temporary solution
  if (typeof window !== 'undefined') {
    const saved = sessionStorage.getItem(`structure-${certification}`)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return null
      }
    }
  }
  return null
}

