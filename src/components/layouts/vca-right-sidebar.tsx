/**
 * VCA Right Sidebar Component
 * 
 * Shows the active parent page with all its children and sub-children
 * Includes action buttons: Bewerken, Nieuw, Pdf
 */

'use client'

import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { usePathname, Link, useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { TreeNode } from '@/lib/certification-structures'
import { Button } from '@/components/ui/button'
import { Edit, Plus, FileText, Phone, Mail } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addPageToStructure, saveStructureChanges } from '@/lib/structure-manager'

interface VcaRightSidebarProps {
  structure: TreeNode[]
  certification: string
}

/**
 * Find the active page and its parent in the structure tree
 */
function findActivePageAndParent(
  nodes: TreeNode[],
  currentPath: string,
  parent: TreeNode | null = null
): { activePage: TreeNode | null; parentPage: TreeNode | null } {
  for (const node of nodes) {
    const nodeUrl = node.url.replace('/dashboard/handbook', `/dashboard/${parent ? 'vca' : 'vca'}`)
    
    // Check if this is the active page
    if (currentPath === nodeUrl || currentPath?.startsWith(`${nodeUrl}/`)) {
      // If this node has children, it's the parent
      if (node.children && node.children.length > 0) {
        return { activePage: node, parentPage: node }
      }
      // Otherwise, return the parent
      return { activePage: node, parentPage: parent }
    }
    
    // Check children recursively
    if (node.children) {
      const result = findActivePageAndParent(node.children, currentPath, node)
      if (result.activePage || result.parentPage) {
        return result
      }
    }
  }
  
  return { activePage: null, parentPage: null }
}

export function VcaRightSidebar({ structure, certification }: VcaRightSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('handbook.structure')
  const basePath = `/dashboard/${certification}`
  const [isNewPageDialogOpen, setIsNewPageDialogOpen] = useState(false)
  const [newPageTitle, setNewPageTitle] = useState('')
  const [newPageTitleKey, setNewPageTitleKey] = useState('')
  const [localStructure, setLocalStructure] = useState(structure)
  
  // Helper to update URLs recursively
  const updateUrls = useCallback((nodes: TreeNode[], base: string): TreeNode[] => {
    return nodes.map((node: TreeNode) => ({
      ...node,
      url: node.url.replace('/dashboard/handbook', base),
      children: node.children ? updateUrls(node.children, base) : undefined
    }))
  }, [])
  
  // Find active page and its parent
  const { activePage, parentPage } = useMemo(() => {
    const updatedStructure = localStructure.map((node: TreeNode) => ({
      ...node,
      url: node.url.replace('/dashboard/handbook', basePath),
      children: node.children ? updateUrls(node.children, basePath) : undefined
    }))
    return findActivePageAndParent(updatedStructure, pathname || '')
  }, [localStructure, pathname, basePath, updateUrls])
  
  // Update local structure when prop changes
  useEffect(() => {
    setLocalStructure(structure)
  }, [structure])
  
  // Determine which page to show (parent if active page has children, otherwise show parent's children)
  const displayPage = parentPage || activePage
  
  if (!displayPage || !displayPage.children || displayPage.children.length === 0) {
    return null
  }
  
  const isActive = (url: string) => {
    const normalizedUrl = url.replace('/dashboard/handbook', basePath)
    return pathname === normalizedUrl || pathname?.startsWith(`${normalizedUrl}/`)
  }
  
  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit page:', pathname)
  }
  
  const handleNew = () => {
    setIsNewPageDialogOpen(true)
    // Pre-fill title key based on parent
    if (displayPage) {
      const suggestedKey = `${displayPage.titleKey}_new_${Date.now()}`
      setNewPageTitleKey(suggestedKey)
    }
  }
  
  const handleSaveNewPage = () => {
    if (!displayPage || !newPageTitle.trim() || !newPageTitleKey.trim()) {
      return
    }
    
    // Create new page entry
    const newPage: Omit<TreeNode, 'id'> = {
      titleKey: newPageTitleKey,
      url: `${displayPage.url}/${newPageTitleKey.toLowerCase().replace(/_/g, '-')}`,
    }
    
    // Add to structure
    const updatedStructure = addPageToStructure(localStructure, displayPage.id, newPage)
    setLocalStructure(updatedStructure)
    
    // Save changes (temporary - should be API call)
    saveStructureChanges(certification, updatedStructure)
    
    // Reset form and close dialog
    setNewPageTitle('')
    setNewPageTitleKey('')
    setIsNewPageDialogOpen(false)
    
    // Navigate to new page
    const newUrl = newPage.url.replace('/dashboard/handbook', basePath)
    router.push(newUrl)
  }
  
  const handleCancelNewPage = () => {
    setNewPageTitle('')
    setNewPageTitleKey('')
    setIsNewPageDialogOpen(false)
  }
  
  const handleDownloadPdf = () => {
    // Use browser's print functionality to generate PDF
    window.print()
  }
  
  const renderChildren = (children: TreeNode[], level: number = 0) => {
    return (
      <ul className={level > 0 ? 'ml-4 space-y-1' : 'space-y-1'}>
        {children.map((child) => {
          const childUrl = child.url.replace('/dashboard/handbook', basePath)
          const childIsActive = isActive(childUrl)
          
          return (
            <li key={child.id}>
              <Link
                href={childUrl}
                className={`block py-1 px-2 rounded text-sm transition-colors ${
                  childIsActive
                    ? 'bg-[#0066CC]/80 text-white font-semibold'
                    : 'bg-white text-[#003366] hover:bg-[#E6F2FF]'
                }`}
              >
                {t(child.titleKey)}
              </Link>
              {child.children && child.children.length > 0 && (
                <div className="mt-1">
                  {renderChildren(child.children, level + 1)}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    )
  }
  
  return (
    <div className="w-64 flex-shrink-0 space-y-4">
      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={handleEdit}
          className="w-full justify-start"
        >
          <Edit className="mr-2 h-4 w-4" />
          Bewerken
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={handleNew}
          className="w-full justify-start bg-green-600 hover:bg-green-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nieuw
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadPdf}
          className="w-full justify-start"
        >
          <FileText className="mr-2 h-4 w-4" />
          Pdf
        </Button>
      </div>
      
      {/* Contact Information */}
      <div className="text-xs text-muted-foreground space-y-1">
        <div className="flex items-center gap-2">
          <Phone className="h-3 w-3" />
          <span>Mobiel: 0614543714</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-3 w-3" />
          <span>E-mail: info@opticinfra.nl</span>
        </div>
      </div>
      
      {/* Active Parent Page Title */}
      <div>
        <h3 className={`font-semibold text-lg mb-3 px-2 py-1 rounded ${
          pathname === displayPage.url.replace('/dashboard/handbook', basePath) || 
          pathname?.startsWith(`${displayPage.url.replace('/dashboard/handbook', basePath)}/`)
            ? 'bg-[#0066CC]/80 text-white'
            : 'bg-white text-[#003366]'
        }`}>
          {t(displayPage.titleKey)}
        </h3>
        
        {/* Children List */}
        {displayPage.children && displayPage.children.length > 0 && (
          <div className="space-y-1">
            {renderChildren(displayPage.children)}
          </div>
        )}
      </div>
      
      {/* New Page Dialog */}
      <Dialog open={isNewPageDialogOpen} onOpenChange={setIsNewPageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nieuwe pagina toevoegen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="page-title">Pagina titel</Label>
              <Input
                id="page-title"
                value={newPageTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPageTitle(e.target.value)}
                placeholder="Bijv. Nieuwe sectie"
              />
            </div>
            <div>
              <Label htmlFor="page-title-key">Titel key (voor vertalingen)</Label>
              <Input
                id="page-title-key"
                value={newPageTitleKey}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPageTitleKey(e.target.value)}
                placeholder="Bijv. new_section"
              />
            </div>
            {displayPage && (
              <p className="text-sm text-muted-foreground">
                Wordt toegevoegd onder: <strong>{t(displayPage.titleKey)}</strong>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelNewPage}>
              Annuleren
            </Button>
            <Button onClick={handleSaveNewPage} disabled={!newPageTitle.trim() || !newPageTitleKey.trim()}>
              Opslaan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

