/**
 * VCA Content Section Component
 * 
 * Generic component for rendering VCA content sections
 */

'use client'

import { useTranslations } from 'next-intl'
import { usePathname } from '@/i18n/routing'
import { VcaSectionCard, VcaSectionHeading, ReferencesList } from './utils'
import { DocumentViewer } from '@/components/handbook/document-viewer'
import { getDocumentsForSection } from '@/lib/documents'
import { MatchedRoute } from '@/lib/route-resolver'

interface VcaContentSectionProps {
  route: MatchedRoute
}

export function VcaContentSection({ route }: VcaContentSectionProps) {
  const tVcaContent = useTranslations('vca_content')
  const tStructure = useTranslations('handbook.structure')
  const pathname = usePathname()
  
  const section = route.params?.section
  
  if (!section) return null
  
  try {
    // Try to get content for this section
    const contentKey = `vca_content.${section}`
    const title = tVcaContent(`${section}.title`) || tStructure(section)
    const description = tVcaContent(`${section}.description`) || ''
    const content = tVcaContent(`${section}.content`) || ''
    
    // Get documents for this section
    const documents = getDocumentsForSection(pathname || '')
    
    return (
      <div className="space-y-6">
        <VcaSectionCard>
          <VcaSectionHeading title={title} level={1} />
          {description && (
            <p className="mb-4 text-muted-foreground">{description}</p>
          )}
          {content && (
            <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
              {content}
            </div>
          )}
        </VcaSectionCard>
        
        {documents.length > 0 && (
          <DocumentViewer documents={documents} />
        )}
      </div>
    )
  } catch {
    return (
      <VcaSectionCard>
        <VcaSectionHeading title={tStructure(section)} level={1} />
        <p className="text-muted-foreground">Content not available</p>
      </VcaSectionCard>
    )
  }
}

