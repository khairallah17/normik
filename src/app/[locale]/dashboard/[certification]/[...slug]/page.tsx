'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DocumentViewer } from "@/components/handbook/document-viewer"
import { getDocumentsForSection } from "@/lib/documents"
import { useTranslations } from 'next-intl'
import { usePathname, Link } from '@/i18n/routing'
import { ChevronRight, Folder } from "lucide-react"
import { CertificationSidebar } from "@/components/handbook/certification-sidebar"
import { getCertificationStructure, TreeNode } from "@/lib/certification-structures"
import { WorkPlansPage } from "@/components/handbook/work-plans-page"
import { WorkplaceInspectionsPage } from "@/components/handbook/workplace-inspections-page"
import { NotificationsPage } from "@/components/handbook/notifications-page"
import { PersonnelPage } from "@/components/handbook/personnel-page"
import { WorkEquipmentPage } from "@/components/handbook/work-equipment-page"

interface Subsection {
  id: string
  titleKey: string
  descriptionKey?: string
  url: string
}

interface PageProps {
  params: Promise<{
    certification: string
    slug: string[]
  }>
}

export default function CertificationSectionPage({ params }: PageProps) {
  const t = useTranslations('handbook');
  const tStructure = useTranslations('handbook.structure');
  const tRequirements = useTranslations('requirements.vca');
  const pathname = usePathname();
  
  // For Next.js 15, use React.use() pattern
  const resolvedParams = React.use(params);
  const { certification, slug } = resolvedParams;
  
  // Get certification structure
  const structure = getCertificationStructure(certification);
  
  // Get certification name
  const getCertificationName = () => {
    switch (certification) {
      case 'iso-9001':
        return tStructure('iso_9001');
      case 'iso-45001':
        return tStructure('iso_45001');
      case 'hkz-kleine-organisaties-2021':
        return tStructure('hkz_small_organizations_2021');
      case 'hkz-vvt':
        return tStructure('hkz_vvt');
      case 'vca':
        return tStructure('vca');
      default:
        return certification;
    }
  };
  
  const certificationName = getCertificationName();
  
  // Convert slug to readable title
  const getSectionTitle = () => {
    if (slug.length === 0) {
      return certificationName;
    }
    
    // Try to find the title from the structure
    const findTitleInStructure = (nodes: TreeNode[], path: string[]): string | null => {
      if (path.length === 0) return null;
      
      const currentSlug = path[0];
      const node = nodes.find(n => {
        const nodeSlug = n.url.split('/').pop();
        return nodeSlug === currentSlug;
      });
      
      if (!node) return null;
      
      if (path.length === 1) {
        return tStructure(node.titleKey);
      }
      
      if (node.children) {
        return findTitleInStructure(node.children, path.slice(1));
      }
      
      return null;
    };
    
    const title = findTitleInStructure(structure, slug);
    if (title) return title;
    
    // Fallback: build title from slug
    return slug
      .join(' / ')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const sectionTitle = getSectionTitle();

  // Get documents for this section
  const documents = getDocumentsForSection(pathname);

  // Define subsections for parent sections
  const getSubsections = (): Subsection[] => {
    // Get subsections from the structure
    const findSubsections = (nodes: TreeNode[], path: string[]): Subsection[] => {
      if (path.length === 0) {
        return nodes.map((node, index) => ({
          id: `${index + 1}`,
          titleKey: node.titleKey,
          descriptionKey: node.descriptionKey,
          url: node.url.replace('/dashboard/handbook', `/dashboard/${certification}`),
        }));
      }
      
      const currentSlug = path[0];
      const node = nodes.find(n => {
        const nodeSlug = n.url.split('/').pop();
        return nodeSlug === currentSlug;
      });
      
      if (!node || !node.children) return [];
      
      return node.children.map((child: TreeNode, index: number) => ({
        id: `${index + 1}`,
        titleKey: child.titleKey,
        descriptionKey: child.descriptionKey,
        url: child.url.replace('/dashboard/handbook', `/dashboard/${certification}`),
      }));
    };
    
    return findSubsections(structure, slug);
  };

  const subsections = getSubsections();

  // Get requirements for VCA sections
  const getRequirements = (): string[] => {
    if (certification !== 'vca') return [];
    
    const currentPath = pathname || '';
    
    // Map paths to translation keys
    const pathToTranslationKey: Record<string, string> = {
      '/dashboard/vca/policy': 'policy',
      '/dashboard/vca/risks': 'risks',
      '/dashboard/vca/risks/frm-tra': 'risks_frm_tra',
      '/dashboard/vca/risks/risk-inventory-evaluation': 'risks_risk_inventory_evaluation',
      '/dashboard/vca/competence': 'competence',
      '/dashboard/vca/competence/frm-employee-introduction': 'competence_frm_employee_introduction',
      '/dashboard/vca/competence/function-table': 'competence_function_table',
      '/dashboard/vca/competence/safety-booklet': 'competence_safety_booklet',
      '/dashboard/vca/competence/communication-plan': 'competence_communication_plan',
      '/dashboard/vca/ohs-awareness': 'ohs_awareness',
      '/dashboard/vca/ohs-awareness/improvement-program-ohs-awareness': 'ohs_awareness_improvement_program',
      '/dashboard/vca/ohs-awareness/assessment-list-ohs-behavior': 'ohs_awareness_assessment_list',
      '/dashboard/vca/ohs-awareness/toolbox-meeting-behavior-improvement': 'ohs_awareness_toolbox_behavior',
      '/dashboard/vca/ohs-awareness/toolbox-meeting-safety-together': 'ohs_awareness_toolbox_safety',
      '/dashboard/vca/ohs-awareness/list-dates-topics-presentation': 'ohs_awareness_list_dates',
      '/dashboard/vca/ohs-project-plan': 'ohs_project_plan',
      '/dashboard/vca/emergency-situations': 'emergency_situations',
      '/dashboard/vca/emergency-situations/alarm-card': 'emergency_situations_alarm_card',
      '/dashboard/vca/inspections': 'inspections',
      '/dashboard/vca/inspections/inspection-test': 'inspections_test',
      '/dashboard/vca/health': 'health',
      '/dashboard/vca/health/proof-medical-expert-competence': 'health_proof_medical',
      '/dashboard/vca/resources': 'resources',
      '/dashboard/vca/resources/ohs-specification-work-resources': 'resources_ohs_specification',
      '/dashboard/vca/resources/overview-management-work-resources': 'resources_overview_management',
      '/dashboard/vca/procurement-services': 'procurement_services',
      '/dashboard/vca/policy/vca-certificate': 'policy_vca_certificate',
      '/dashboard/vca/policy/policy-statement': 'policy_policy_statement',
      '/dashboard/vca/policy/job-description-director': 'policy_job_description_director',
      '/dashboard/vca/policy/job-description-executor': 'policy_job_description_executor',
      '/dashboard/vca/policy/job-description-vgm-officer': 'policy_job_description_vgm_officer',
      '/dashboard/vca/policy/personnel-assessments': 'policy_personnel_assessments',
      '/dashboard/vca/policy/internal-audit-reports': 'policy_internal_audit_reports',
      '/dashboard/vca/policy/external-audit-reports': 'policy_external_audit_reports',
      '/dashboard/vca/policy/management-reviews': 'policy_management_reviews',
      '/dashboard/vca/ohs-incidents': 'ohs_incidents',
    };
    
    const translationKey = pathToTranslationKey[currentPath];
    if (!translationKey) return [];
    
    try {
      // Get the requirements array from translations
      const requirements = tRequirements.raw(translationKey) as string[];
      return Array.isArray(requirements) ? requirements : [];
    } catch {
      return [];
    }
  };

  const requirements = getRequirements();

  // Check if this is a module page
  const isModulePage = certification === 'vca' && slug.length >= 2 && slug[0] === 'modules';
  
  if (isModulePage) {
    const moduleSlug = slug[1]; // e.g., 'work-plans', 'workplace-inspections', etc.
    
    // Map module slugs to dedicated components
    const moduleComponents: Record<string, React.ComponentType> = {
      'work-plans': WorkPlansPage,
      'workplace-inspections': WorkplaceInspectionsPage,
      'notifications': NotificationsPage,
      'personnel': PersonnelPage,
      'work-equipment': WorkEquipmentPage,
    };

    const ModuleComponent = moduleComponents[moduleSlug];
    
    if (ModuleComponent) {
      return <ModuleComponent />;
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href={`/dashboard/${certification}`} className="hover:text-foreground">
          {certificationName}
        </Link>
        {slug.map((segment, index) => {
          const segmentPath = `/dashboard/${certification}/${slug.slice(0, index + 1).join('/')}`;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="h-4 w-4" />
              <Link href={segmentPath} className="hover:text-foreground">
                {segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Link>
            </React.Fragment>
          );
        })}
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{sectionTitle}</h1>
      </div>

      {/* Subsections */}
      {subsections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('subsections')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subsections.map((subsection) => (
                <Link
                  key={subsection.id}
                  href={subsection.url}
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <Folder className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <div className="font-medium">{tStructure(subsection.titleKey)}</div>
                    {subsection.descriptionKey && (
                      <div className="text-sm text-muted-foreground">
                        {tStructure(subsection.descriptionKey)}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle>{t('requirements')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Documents */}
      {documents && documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <DocumentViewer documents={documents} sectionTitle={sectionTitle} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Export sidebar component for layout
export function CertificationSectionPageSidebar({ certification }: { certification: string }) {
  const structure = getCertificationStructure(certification);
  return <CertificationSidebar certificationId={certification} structure={structure} />;
}


