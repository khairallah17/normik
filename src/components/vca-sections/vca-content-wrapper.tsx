/**
 * VCA Content Wrapper
 * 
 * Wraps VCA section components with content loading logic
 * Loads content directly from translation files using route.contentKey
 */

'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { MatchedRoute } from '@/lib/route-resolver'
import { PolicyStatementSection } from './policy-statement-section'
import { OhsOfficerSection } from './ohs-officer-section'
import { OhsStructureSection } from './ohs-structure-section'
import { ManagementAssessmentSection } from './management-assessment-section'
import { InternalAuditSection } from './internal-audit-section'
import { ManagementReviewSection } from './management-review-section'
import { JobDescriptionDirectorSection } from './job-description-director-section'
import { JobDescriptionExecutorSection } from './job-description-executor-section'
import { JobDescriptionVgmOfficerSection } from './job-description-vgm-officer-section'
import { QualificationExternalVgmExpertSection } from './qualification-external-vgm-expert-section'
import { getReferenceUrl } from './utils'

interface VcaContentWrapperProps {
  route: MatchedRoute
}

/**
 * Loads content from translation files using a content key path
 * Example: "policy.policy_statement" -> vca_content.policy.policy_statement
 */
function loadContentFromKey(
  contentKey: string,
  tVcaContent: any
): { title: string; content: string; references?: string[] } | null {
  try {
    const parts = contentKey.split('.')
    let content: any = tVcaContent.raw(parts[0])
    
    for (let i = 1; i < parts.length; i++) {
      content = content?.[parts[i]]
    }
    
    if (!content) return null
    
    // Allow empty content strings, but require at least a title
    if (!content.title) return null
    
    return {
      title: content.title,
      content: content.content || '',
      references: Array.isArray(content.references) ? content.references : [],
    }
  } catch (error) {
    console.error(`Error loading content from key "${contentKey}":`, error)
    return null
  }
}

/**
 * Renders a generic content section
 */
function renderGenericContent(
  title: string,
  content: string,
  references: string[] = [],
  tStructure: any
) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
          {title}
        </h2>
        <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
          {content}
        </div>
        {references && references.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="font-semibold mb-2" style={{ color: '#333', fontSize: '14px', fontWeight: 600 }}>Referentie:</p>
            <ul className="list-disc list-inside space-y-1" style={{ color: '#333', fontSize: '14px' }}>
              {references.map((ref: string, refIdx: number) => {
                const refUrl = getReferenceUrl(ref)
                return (
                  <li key={refIdx}>
                    {refUrl ? (
                      <Link href={refUrl} className="text-blue-600 hover:text-blue-800 underline" style={{ color: '#0066CC' }}>
                        {tStructure(ref)}
                      </Link>
                    ) : (
                      tStructure(ref)
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export function VcaContentWrapper({ route }: VcaContentWrapperProps) {
  const tStructure = useTranslations('handbook.structure')
  const tVcaContent = useTranslations('vca_content')
  
  // Handle policy overview (multiple sections in one card)
  if (route.type === 'vca-section-overview' && route.contentKeys) {
    const sections = route.contentKeys
      .map((key) => {
        const content = loadContentFromKey(key, tVcaContent)
        return content ? { key, ...content } : null
      })
      .filter(Boolean) as Array<{ key: string; title: string; content: string; references?: string[] }>
    
    if (sections.length === 0) {
      return (
        <div className="p-6 text-red-600">
          No content found for policy overview
        </div>
      )
    }
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
          {sections.map((section, idx) => (
            <div key={section.key} className={idx < sections.length - 1 ? 'mb-8' : ''}>
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                {section.title}
              </h2>
              <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                {section.content}
              </div>
              {section.references && section.references.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="font-semibold mb-2" style={{ color: '#333', fontSize: '14px', fontWeight: 600 }}>Referentie:</p>
                  <ul className="list-disc list-inside space-y-1" style={{ color: '#333', fontSize: '14px' }}>
                    {section.references.map((ref: string, refIdx: number) => {
                      const refUrl = getReferenceUrl(ref)
                      return (
                        <li key={refIdx}>
                          {refUrl ? (
                            <Link href={refUrl} className="text-blue-600 hover:text-blue-800 underline" style={{ color: '#0066CC' }}>
                              {tStructure(ref)}
                            </Link>
                          ) : (
                            tStructure(ref)
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  // Handle individual VCA sections
  if (route.type === 'vca-section' && route.contentKey) {
    const content = loadContentFromKey(route.contentKey, tVcaContent)
    
    if (!content) {
      return (
        <div className="p-6 text-red-600">
          Content not found for key: {route.contentKey}
        </div>
      )
    }
    
    // Get the component from the route (it's now a ComponentType, not a string)
    const Component = route.component
    
    // Special handling for QualificationExternalVgmExpertSection
    if (Component === QualificationExternalVgmExpertSection) {
      return (
        <QualificationExternalVgmExpertSection
          title={content.title}
          hasImage={true}
        />
      )
    }
    
    // Use the component directly if it's one of the known section components
    // Check if it's one of our specific section components by comparing references
    const isKnownSectionComponent = 
      Component === PolicyStatementSection ||
      Component === JobDescriptionDirectorSection ||
      Component === JobDescriptionExecutorSection ||
      Component === JobDescriptionVgmOfficerSection ||
      Component === QualificationExternalVgmExpertSection
    
    if (isKnownSectionComponent) {
      return (
        <Component
          title={content.title}
          content={content.content}
          references={content.references || []}
        />
      )
    }
    
    // Fallback to generic rendering
    return renderGenericContent(content.title, content.content, content.references, tStructure)
  }
  
  // No matching route type
  return (
    <div className="p-6 text-red-600">
      No content handler for route type: {route.type}
    </div>
  )
}
