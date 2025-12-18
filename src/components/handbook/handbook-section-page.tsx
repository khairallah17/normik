/**
 * Handbook Section Page Component
 * 
 * Generic component for rendering handbook section pages
 * Handles subsections, requirements, and documents display
 */

'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DocumentViewer } from "@/components/handbook/document-viewer"
import { getDocumentsForSection } from "@/lib/documents"
import { useTranslations } from 'next-intl'
import { usePathname, Link } from '@/i18n/routing'
import { FolderOpen, ChevronRight, Folder, FileText } from "lucide-react"
import { MatchedRoute } from '@/lib/route-resolver'

interface Subsection {
  id: string
  titleKey: string
  descriptionKey?: string
  url: string
}

interface HandbookSectionPageProps {
  route: MatchedRoute
}

// Subsections data - could be moved to a separate data file if it gets too large
const getSubsectionsForPath = (path: string): Subsection[] => {
  const subsectionMap: Record<string, Subsection[]> = {
    '/dashboard/handbook/iso-9001': [
      { id: '1', titleKey: 'preconditions', descriptionKey: 'preconditions_description', url: '/dashboard/handbook/iso-9001/preconditions' },
      { id: '2', titleKey: 'execution_care', descriptionKey: 'execution_care_description', url: '/dashboard/handbook/iso-9001/execution-care' },
      { id: '3', titleKey: 'the_client', descriptionKey: 'the_client_description', url: '/dashboard/handbook/iso-9001/the-client' },
      { id: '4', titleKey: 'learning_improving', descriptionKey: 'learning_improving_description', url: '/dashboard/handbook/iso-9001/learning-improving' },
    ],
    '/dashboard/handbook/iso-45001': [
      { id: '1', titleKey: 'preconditions', descriptionKey: 'preconditions_description', url: '/dashboard/handbook/iso-45001/preconditions' },
      { id: '2', titleKey: 'execution_care', descriptionKey: 'execution_care_description', url: '/dashboard/handbook/iso-45001/execution-care' },
      { id: '3', titleKey: 'the_client', descriptionKey: 'the_client_description', url: '/dashboard/handbook/iso-45001/the-client' },
      { id: '4', titleKey: 'learning_improving', descriptionKey: 'learning_improving_description', url: '/dashboard/handbook/iso-45001/learning-improving' },
    ],
    // Add more mappings as needed - keeping it simple for now
    // The full list can remain in a separate data file if preferred
  }
  
  return subsectionMap[path] || []
}

// Requirements data - could be moved to a separate data file
const getRequirementsForPath = (path: string): string[] => {
  const requirementsMap: Record<string, string[]> = {
    // Add requirements mappings as needed
    // Keeping minimal for now - can expand or move to separate file
  }
  
  // Check direct match
  if (requirementsMap[path]) {
    return requirementsMap[path]
  }
  
  // If ISO 45001, use the same requirements as ISO 9001
  if (path.includes('/iso-45001/')) {
    const iso9001Path = path.replace('/iso-45001/', '/iso-9001/')
    return requirementsMap[iso9001Path] || []
  }
  
  return []
}

export function HandbookSectionPage({ route }: HandbookSectionPageProps) {
  const t = useTranslations('handbook')
  const tViewer = useTranslations('handbook.document_viewer')
  const tStructure = useTranslations('handbook.structure')
  const pathname = usePathname()

  // Extract slug from pathname
  const slug = pathname?.replace(/^\/[a-z]{2}\/dashboard\/handbook\//, '').split('/').filter(Boolean) || []
  
  // Determine certification name from path
  const getCertificationName = (): string | null => {
    if (pathname?.includes('/iso-9001')) return tStructure('iso_9001')
    if (pathname?.includes('/iso-45001')) return tStructure('iso_45001')
    if (pathname?.includes('/hkz-kleine-organisaties-2021')) return tStructure('hkz_small_organizations_2021')
    if (pathname?.includes('/hkz-vvt')) return tStructure('hkz_vvt')
    if (pathname?.includes('/vca')) return tStructure('vca')
    return null
  }

  const certificationName = getCertificationName()

  // Get section title
  const sectionTitle = certificationName && slug.length === 1
    ? certificationName
    : slug
        .join(' / ')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

  // Get documents, subsections, and requirements
  const documents = getDocumentsForSection(pathname || '')
  const subsections = getSubsectionsForPath(pathname || '')
  const requirements = getRequirementsForPath(pathname || '')

  // Get certification badge
  const getCertificationBadge = (): string | null => {
    if (pathname?.includes('/iso-9001')) return 'ISO 9001'
    if (pathname?.includes('/iso-45001')) return 'ISO 45001'
    if (pathname?.includes('/hkz-kleine-organisaties-2021')) return 'HKZ 2021'
    if (pathname?.includes('/hkz-vvt')) return 'HKZ VVT'
    if (pathname?.includes('/vca')) return 'VCA'
    return null
  }

  const certificationBadge = getCertificationBadge()

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Section Header */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-blue-500" />
              {sectionTitle}
            </CardTitle>
            {certificationBadge && (
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                {certificationBadge}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {t('section_path')} <code className="text-xs bg-muted px-2 py-1 rounded">{slug.join('/')}</code>
            </p>
            {documents.length > 0 && (
              <p className="text-sm font-medium text-blue-600">
                {documents.length === 1 ? t('document_count_singular') : t('document_count', { count: documents.length })}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Subsections */}
      {subsections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              {t('subsections')}
            </CardTitle>
            <CardDescription>
              {t('subsections_description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subsections.map((subsection) => (
                <Link
                  key={subsection.id}
                  href={subsection.url}
                  className="group"
                >
                  <Card className="transition-all hover:shadow-md hover:border-blue-500 cursor-pointer h-full">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <FolderOpen className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <h3 className="font-medium text-sm group-hover:text-blue-600 transition-colors truncate">
                              {tStructure(subsection.titleKey)}
                            </h3>
                          </div>
                          {subsection.descriptionKey && (
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {tStructure(subsection.descriptionKey)}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Requirements */}
      {requirements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('requirements')}
            </CardTitle>
            <CardDescription>
              {t('requirements_description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-semibold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed flex-1">{requirement}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Document Viewer */}
      {documents.length > 0 && (
        <DocumentViewer documents={documents} sectionTitle={sectionTitle} />
      )}

      {/* Empty State */}
      {documents.length === 0 && subsections.length === 0 && requirements.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{tViewer('section_information')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground">
                {tViewer('qms_description')}
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="border-l-2 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-sm">{tViewer('overview')}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {tViewer('overview_description', { section: sectionTitle })}
                  </p>
                </div>
                
                <div className="border-l-2 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-sm">{tViewer('documents_procedures')}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {tViewer('documents_procedures_description')}
                  </p>
                </div>
                
                <div className="border-l-2 border-amber-500 pl-4 py-2">
                  <h3 className="font-semibold text-sm">{tViewer('related_sections')}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {tViewer('related_sections_description')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

