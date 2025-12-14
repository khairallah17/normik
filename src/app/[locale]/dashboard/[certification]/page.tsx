'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DocumentViewer } from "@/components/handbook/document-viewer"
import { getDocumentsForSection } from "@/lib/documents"
import { useTranslations } from 'next-intl'
import { usePathname } from '@/i18n/routing'
import { CertificationSidebar } from "@/components/handbook/certification-sidebar"
import { getCertificationStructure } from "@/lib/certification-structures"

interface PageProps {
  params: Promise<{
    certification: string
  }>
}

export default function CertificationPage({ params }: PageProps) {
  const t = useTranslations('handbook.structure');
  const pathname = usePathname();
  
  // For Next.js 15, use React.use() pattern
  const resolvedParams = React.use(params);
  const certification = resolvedParams.certification;
  
  // Get certification structure
  const structure = getCertificationStructure(certification);
  
  // Get certification name
  const getCertificationName = () => {
    switch (certification) {
      case 'iso-9001':
        return t('iso_9001');
      case 'iso-45001':
        return t('iso_45001');
      case 'hkz-kleine-organisaties-2021':
        return t('hkz_small_organizations_2021');
      case 'hkz-vvt':
        return t('hkz_vvt');
      case 'vca':
        return t('vca');
      default:
        return certification;
    }
  };
  
  const certificationName = getCertificationName();
  
  // Get documents for this section
  const documents = getDocumentsForSection(pathname);

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{certificationName}</h1>
        <p className="text-muted-foreground mt-2">
          {t(`${certification}_description` as keyof typeof t) || 'Certification overview'}
        </p>
      </div>

      {/* Documents */}
      {documents && documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <DocumentViewer documents={documents} sectionTitle={certificationName} />
          </CardContent>
        </Card>
      )}

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select a section from the sidebar to view detailed information about this certification.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Export sidebar component for layout
export function CertificationPageSidebar({ certification }: { certification: string }) {
  const structure = getCertificationStructure(certification);
  return <CertificationSidebar certificationId={certification} structure={structure} />;
}


