'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderPlus, ArrowDownUp, Pencil, Info } from "lucide-react"
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
      { id: 'general', key: 'general', icon: GeneralIcon, url: '/dashboard/vca/general', number: null, image: '/images/landing/db_company.png' },
      { id: 'policy', key: 'policy', icon: PolicyIcon, url: '/dashboard/vca/policy', number: 1, image: '/images/landing/db_responsability.png' },
      { id: 'risks', key: 'risks', icon: RisksIcon, url: '/dashboard/vca/risks', number: 2, image: '/images/landing/risk.jpg' },
      { id: 'competence', key: 'competence', icon: CompetenceIcon, url: '/dashboard/vca/competence', number: 3, image: '/images/landing/employees.jpg' },
      { id: 'ohs_awareness', key: 'ohs_awareness', icon: OHSAwarenessIcon, url: '/dashboard/vca/ohs-awareness', number: 4, image: '/images/landing/exchange-of-ideas.jpg' },
      { id: 'ohs_project_plan', key: 'ohs_project_plan', icon: OHSProjectPlanIcon, url: '/dashboard/vca/ohs-project-plan', number: 5, image: '/images/landing/icoon-planning.jpg' },
      { id: 'emergency_situations', key: 'emergency_situations', icon: EmergencySituationsIcon, url: '/dashboard/vca/emergency-situations', number: 6, image: '/images/landing/ambulance.jpg' },
      { id: 'inspections', key: 'inspections', icon: InspectionsIcon, url: '/dashboard/vca/inspections', number: 7, image: '/images/landing/workin.jpg' },
      { id: 'health', key: 'health', icon: HealthIcon, url: '/dashboard/vca/health', number: 8, image: '/images/landing/bedrijfsarts.jpg' },
      { id: 'resources', key: 'resources', icon: ResourcesIcon, url: '/dashboard/vca/resources', number: 9, image: '/images/landing/verzamelplaats.jpg' },
      { id: 'procurement_services', key: 'procurement_services', icon: ProcurementServicesIcon, url: '/dashboard/vca/procurement-services', number: 10, image: '/images/landing/consulting3.png' },
      { id: 'ohs_incidents', key: 'ohs_incidents', icon: OHSIncidentsIcon, url: '/dashboard/vca/ohs-incidents', number: 11, image: '/images/landing/db_responsability.png' },
    ];

    // Module cards for right sidebar
    const moduleCards = [
      { id: 'workplace-inspections', name: 'WERKPLEK INSPECTIES', url: '/dashboard/vca/modules/workplace-inspections', image: '/images/landing/workin.jpg' },
      { id: 'notifications', name: 'MELDINGEN', url: '/dashboard/vca/modules/notifications', image: '/images/landing/exchange-of-ideas.jpg' },
      { id: 'personnel', name: 'PERSONEEL', url: '/dashboard/vca/modules/personnel', image: '/images/landing/employees.jpg' },
      { id: 'work-equipment', name: 'ARBEIDSMIDDELEN', url: '/dashboard/vca/modules/work-equipment', image: '/images/landing/verzamelplaats.jpg' },
      { id: 'work-plans', name: 'WERKPLAN GENERATOR', url: '/dashboard/vca/modules/work-plans', image: '/images/landing/icoon-planning.jpg' },
    ];

    return (
      <div className="flex flex-1 flex-col gap-6">
        {/* Welcome Header - Matching KAM-systeem.nl */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Welkom {certificationName}</h1>
        </div>

        {/* Navigation Container - Exact match to KAM-systeem.nl with dropdowns */}
        <VCANavigation />

        <div className="flex gap-6 items-start">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">

            {/* Grid of Icon Cards - Matching KAM-systeem.nl */}
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
              {vcaSections.map((section) => {
                const IconComponent = section.icon;
                const sectionTitle = section.number 
                  ? `${section.number}. ${t(section.key).toUpperCase()}`
                  : t(section.key).toUpperCase();
                
                return (
                  <Link
                    key={section.id}
                    href={section.url}
                    className="group inline-block w-fit h-fit"
                  >
                    <Card className="w-[120px] h-[120px] hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-[#0066CC] bg-gradient-to-br from-white to-[#E6F2FF] overflow-hidden">
                      <CardContent className="p-3 flex flex-col items-center justify-center text-center h-full">
                        <div className="mb-2 relative w-12 h-12">
                          {section.image ? (
                            <Image
                              src={section.image}
                              alt={sectionTitle}
                              fill
                              className="object-contain"
                            />
                          ) : (
                            <IconComponent className="w-12 h-12" />
                          )}
                        </div>
                        <h3 className="font-bold text-[10px] text-[#003366] group-hover:text-[#0066CC] transition-colors leading-tight">
                          {sectionTitle}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons - Matching KAM-systeem.nl */}
            <div className="mt-4 mb-4 flex gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white"
              >
                <FolderPlus className="h-4 w-4" />
                Nieuwe hoofdgroep
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white"
              >
                <ArrowDownUp className="h-4 w-4" />
                Hoofdgroepen sorteren
              </Button>
            </div>

            {/* Duurzaamheidsdashboard Section - Matching KAM-systeem.nl */}
            <div className="mt-6">
              <Card className="bg-gray-100 border-gray-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Duurzaamheidsdashboard</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white"
                    >
                      <Pencil className="h-4 w-4" />
                      Duurzaamheidsdashboard bewerken
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Info className="h-5 w-5 text-[#0066CC]" />
                    <p className="text-sm">
                      Er zijn geen gegevens voor het duurzaamheidsdashboard beschikbaar
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar - Module Cards */}
          <div className="w-64 flex-shrink-0">
            <div className="grid grid-cols-2 gap-4">
              {moduleCards.map((module) => (
                <Link
                  key={module.id}
                  href={module.url}
                  className="group inline-block w-fit h-fit"
                >
                  <Card className="w-[120px] h-[120px] hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-[#0066CC] bg-gradient-to-br from-white to-[#E6F2FF] overflow-hidden">
                    <CardContent className="p-3 flex flex-col items-center justify-center text-center h-full">
                      <div className="mb-2 relative w-12 h-12">
                        <Image
                          src={module.image}
                          alt={module.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-bold text-[10px] text-[#003366] group-hover:text-[#0066CC] transition-colors leading-tight">
                        {module.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
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


