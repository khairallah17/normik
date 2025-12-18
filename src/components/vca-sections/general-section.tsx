/**
 * General Section Component
 * 
 * Renders the general VCA content with special formatting
 */

'use client'

import { useTranslations } from 'next-intl'
import { VcaSectionCard, VcaSectionHeading } from './utils'

interface GeneralSectionProps {
  route: any
}

export function GeneralSection({ route }: GeneralSectionProps) {
  const tVcaContent = useTranslations('vca_content')
  
  try {
    const generalContent = tVcaContent('general.content')
    const title = tVcaContent('general.title')
    
    if (!generalContent) return null
    
    // Parse content into paragraphs
    const paragraphs = generalContent.split('\n\n').filter(p => p.trim().length > 0)
    
    // Check if this is the "Toepassingsgebied" section
    const isToepassingsgebied = paragraphs.some(p => p.includes('1. Toepassingsgebied'))
    
    return (
      <VcaSectionCard>
        <VcaSectionHeading title={title} level={1} />
        <div style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
          {paragraphs.map((paragraph, idx) => {
            // Special handling for "1. Toepassingsgebied"
            if (paragraph.includes('1. Toepassingsgebied')) {
              const lines = paragraph.split('\n')
              const tableData: Array<{ label: string; value: string }> = []
              
              for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim()
                if (line.includes(':')) {
                  const [label, ...valueParts] = line.split(':')
                  tableData.push({
                    label: label.trim(),
                    value: valueParts.join(':').trim(),
                  })
                }
              }
              
              return (
                <div key={idx} className="mb-6">
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#333', fontSize: '16px', fontWeight: 600 }}>
                    1. Toepassingsgebied
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300" style={{ fontSize: '14px' }}>
                      <tbody>
                        {tableData.map((row, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 font-semibold bg-gray-100" style={{ width: '30%' }}>
                              {row.label}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {row.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            }
            
            // Regular paragraph
            return (
              <p key={idx} className="mb-4" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                {paragraph}
              </p>
            )
          })}
        </div>
      </VcaSectionCard>
    )
  } catch {
    return null
  }
}

