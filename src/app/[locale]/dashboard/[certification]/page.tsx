'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DocumentViewer } from "@/components/handbook/document-viewer"
import { getDocumentsForSection } from "@/lib/documents"
import { useTranslations } from 'next-intl'
import { usePathname, Link } from '@/i18n/routing'
import { CertificationSidebar } from "@/components/handbook/certification-sidebar"
import { getCertificationStructure } from "@/lib/certification-structures"
import {
  GeneralIcon,
  PolicyIcon,
  RisksIcon,
  CompetenceIcon,
  OHSAwarenessIcon,
  OHSProjectPlanIcon,
  EmergencySituationsIcon,
  InspectionsIcon,
  HealthIcon,
  ResourcesIcon,
  ProcurementServicesIcon,
  OHSIncidentsIcon,
} from "@/components/handbook/vca-section-icons"
import { VCANavigation } from "@/components/vca-navigation"

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

  // VCA-specific dashboard layout matching KAM-systeem.nl
  if (certification === 'vca') {
    const vcaSections = [
      { id: 'general', key: 'general', icon: GeneralIcon, url: '/dashboard/vca/general', number: null },
      { id: 'policy', key: 'policy', icon: PolicyIcon, url: '/dashboard/vca/policy', number: 1 },
      { id: 'risks', key: 'risks', icon: RisksIcon, url: '/dashboard/vca/risks', number: 2 },
      { id: 'competence', key: 'competence', icon: CompetenceIcon, url: '/dashboard/vca/competence', number: 3 },
      { id: 'ohs_awareness', key: 'ohs_awareness', icon: OHSAwarenessIcon, url: '/dashboard/vca/ohs-awareness', number: 4 },
      { id: 'ohs_project_plan', key: 'ohs_project_plan', icon: OHSProjectPlanIcon, url: '/dashboard/vca/ohs-project-plan', number: 5 },
      { id: 'emergency_situations', key: 'emergency_situations', icon: EmergencySituationsIcon, url: '/dashboard/vca/emergency-situations', number: 6 },
      { id: 'inspections', key: 'inspections', icon: InspectionsIcon, url: '/dashboard/vca/inspections', number: 7 },
      { id: 'health', key: 'health', icon: HealthIcon, url: '/dashboard/vca/health', number: 8 },
      { id: 'resources', key: 'resources', icon: ResourcesIcon, url: '/dashboard/vca/resources', number: 9 },
      { id: 'procurement_services', key: 'procurement_services', icon: ProcurementServicesIcon, url: '/dashboard/vca/procurement-services', number: 10 },
      { id: 'ohs_incidents', key: 'ohs_incidents', icon: OHSIncidentsIcon, url: '/dashboard/vca/ohs-incidents', number: 11 },
    ];

    return (
      <div className="flex flex-1 flex-col">
        {/* Welcome Header - Matching KAM-systeem.nl */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Welkom {certificationName}</h1>
        </div>

        {/* Navigation Container - Exact match to KAM-systeem.nl with dropdowns */}
        <VCANavigation />

        {/* Grid of Icon Cards - Matching KAM-systeem.nl */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {vcaSections.map((section) => {
            const IconComponent = section.icon;
            const sectionTitle = section.number 
              ? `${section.number}. ${t(section.key).toUpperCase()}`
              : t(section.key).toUpperCase();
            
            return (
              <Link
                key={section.id}
                href={section.url}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-[#0066CC] bg-gradient-to-br from-white to-[#E6F2FF]">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center min-h-[180px]">
                    <div className="mb-4">
                      <IconComponent className="w-20 h-20" />
                    </div>
                    <h3 className="font-bold text-sm text-[#003366] group-hover:text-[#0066CC] transition-colors">
                      {sectionTitle}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // Default layout for other certifications
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


