'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DocumentViewer } from "@/components/handbook/document-viewer"
import { ContentEditorDialog } from "@/components/handbook/content-editor-dialog"
import { getDocumentsForSection } from "@/lib/documents"
import { useTranslations } from 'next-intl'
import { usePathname, Link } from '@/i18n/routing'
import { ChevronRight, Folder, Edit, Plus, FileText, ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CertificationSidebar } from "@/components/handbook/certification-sidebar"
import { getCertificationStructure, TreeNode } from "@/lib/certification-structures"
import { VCANavigation } from "@/components/vca-navigation"
import { WorkPlansPage } from "@/components/handbook/work-plans-page"
import { WorkplaceInspectionsPage } from "@/components/handbook/workplace-inspections-page"
import { NotificationsPage } from "@/components/handbook/notifications-page"
import { PersonnelPage } from "@/components/handbook/personnel-page"
import { WorkEquipmentPage } from "@/components/handbook/work-equipment-page"
import { WpiReportsPage } from "@/components/handbook/wpi-reports-page"
import { WpiTemplatesPage } from "@/components/handbook/wpi-templates-page"
import { WpiTemplateEditPage } from "@/components/handbook/wpi-template-edit-page"
import { WpiSchedulerPage } from "@/components/handbook/wpi-scheduler-page"
import { WpiSettingsPage } from "@/components/handbook/wpi-settings-page"
import { PolicyStatementSection } from "@/components/vca-sections/policy-statement-section"
import { OhsOfficerSection } from "@/components/vca-sections/ohs-officer-section"
import { OhsStructureSection } from "@/components/vca-sections/ohs-structure-section"
import { ManagementAssessmentSection } from "@/components/vca-sections/management-assessment-section"
import { InternalAuditSection } from "@/components/vca-sections/internal-audit-section"
import { ManagementReviewSection } from "@/components/vca-sections/management-review-section"
import { JobDescriptionDirectorSection } from "@/components/vca-sections/job-description-director-section"
import { JobDescriptionExecutorSection } from "@/components/vca-sections/job-description-executor-section"
import { JobDescriptionVgmOfficerSection } from "@/components/vca-sections/job-description-vgm-officer-section"
import { QualificationExternalVgmExpertSection } from "@/components/vca-sections/qualification-external-vgm-expert-section"
import { getReferenceUrl } from "@/components/vca-sections/utils"

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
  const tVcaContent = useTranslations('vca_content');
  const pathname = usePathname();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [editingItem, setEditingItem] = useState<{ id: string; title: string; content: string } | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  // For Next.js 15, use React.use() pattern
  const resolvedParams = React.use(params);
  const { certification, slug } = resolvedParams;
  
  // Get certification structure
  const structure = getCertificationStructure(certification);
  
  // Auto-expand sections that have active children
  useEffect(() => {
    if (certification === 'vca' && structure) {
      const findActiveSection = (nodes: TreeNode[]): string | null => {
        for (const node of nodes) {
          const nodeUrl = node.url.replace('/dashboard/handbook', `/dashboard/${certification}`)
          if (pathname === nodeUrl || pathname?.startsWith(`${nodeUrl}/`)) {
            return node.id
          }
          if (node.children) {
            const activeChild = findActiveSection(node.children)
            if (activeChild) {
              setExpandedSections(prev => ({ ...prev, [node.id]: true }))
              return node.id
            }
          }
        }
        return null
      }
      findActiveSection(structure)
    }
  }, [pathname, certification, structure])
  
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
      '/dashboard/vca/ohs-awareness/improvement-program-ohs-awareness/assessment-list-ohs-behavior': 'ohs_awareness_assessment_list',
      '/dashboard/vca/ohs-awareness/improvement-program-ohs-awareness/toolbox-meeting-behavior-improvement': 'ohs_awareness_toolbox_behavior',
      '/dashboard/vca/ohs-awareness/improvement-program-ohs-awareness/toolbox-meeting-safety-together': 'ohs_awareness_toolbox_safety',
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
      '/dashboard/vca/policy/job-description-vgm-officer/qualification-vgm-officer': 'policy_qualification_vgm_officer',
      '/dashboard/vca/policy/job-description-vgm-officer/qualification-external-vgm-expert': 'policy_qualification_external_vgm_expert',
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

  // Get VCA detailed content
  // Note: getReferenceUrl is now imported from utils

  const getVcaContent = () => {
    if (certification !== 'vca') return null;
    
    const currentPath = pathname || '';
    const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}/, '');
    
    // Debug logging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('VCA Content Debug:', {
        currentPath,
        pathWithoutLocale,
        slug,
        certification
      });
    }
    
    // Direct path check for job-description-vgm-officer
    const isJobDescriptionVgmOfficer = 
      pathWithoutLocale === '/dashboard/vca/policy/job-description-vgm-officer' || 
      pathWithoutLocale.endsWith('/policy/job-description-vgm-officer') ||
      (slug.length === 2 && slug[0] === 'policy' && slug[1] === 'job-description-vgm-officer') ||
      (slug.length >= 2 && slug[slug.length - 1] === 'job-description-vgm-officer');
    
    if (isJobDescriptionVgmOfficer) {
      try {
        const title = tVcaContent('policy.job_description_vgm_officer.title');
        const content = tVcaContent('policy.job_description_vgm_officer.content');
        if (process.env.NODE_ENV === 'development') {
          console.log('Loading job_description_vgm_officer:', { 
            title, 
            contentLength: content?.length,
            pathWithoutLocale,
            slug 
          });
        }
        return {
          title,
          description: '',
          jobDescriptionVgmOfficer: {
            title,
            content,
          },
        };
      } catch (error) {
        console.error('Error loading job_description_vgm_officer:', error);
        return null;
      }
    }
    
    // Check for specific sub-pages first
    const lastSlug = slug[slug.length - 1];
    
    // Map sub-pages to specific content
    if (slug.length >= 2 && slug[0] === 'policy') {
      // Handle nested pages (e.g., job-description-vgm-officer/qualification-vgm-officer)
      if (slug.length >= 3 && slug[1] === 'job-description-vgm-officer') {
        const nestedPageMap: Record<string, string> = {
          'qualification-vgm-officer': 'qualification_vgm_officer',
          'qualification-external-vgm-expert': 'qualification_external_vgm_expert',
        };
        
        const nestedPageKey = nestedPageMap[slug[2]];
        if (nestedPageKey) {
          try {
            // Handle qualification-external-vgm-expert page with image
            if (nestedPageKey === 'qualification_external_vgm_expert') {
              return {
                title: tStructure(nestedPageKey),
                description: '',
                qualificationExternalVgmExpert: {
                  title: tStructure(nestedPageKey),
                  hasImage: true,
                },
              };
            }
            // Other nested pages
            return {
              title: tStructure(nestedPageKey),
              description: '',
            };
          } catch {
            return null;
          }
        }
      }
      
      const subPageMap: Record<string, string> = {
        'policy-statement': 'policy_statement',
        'job-description-director': 'ohs_structure',
        'job-description-executor': 'ohs_structure',
        'job-description-vgm-officer': 'ohs_officer',
        'personnel-assessments': 'management_assessment',
        'internal-audit-reports': 'internal_audit',
        'management-reviews': 'management_review',
      };
      
      const subPageKey = subPageMap[lastSlug];
      if (subPageKey) {
        try {
          if (subPageKey === 'policy_statement') {
            return {
              title: tVcaContent('policy.policy_statement.title'),
              description: '',
              policyStatement: {
                title: tVcaContent('policy.policy_statement.title'),
                content: tVcaContent('policy.policy_statement.content'),
                references: ['policy_statement'] as const,
              },
            };
          }
          if (subPageKey === 'ohs_officer') {
            // Check if this is specifically the job-description-vgm-officer page
            if (lastSlug === 'job-description-vgm-officer') {
              try {
                const title = tVcaContent('policy.job_description_vgm_officer.title');
                const content = tVcaContent('policy.job_description_vgm_officer.content');
                return {
                  title,
                  description: '',
                  jobDescriptionVgmOfficer: {
                    title,
                    content,
                  },
                };
              } catch (error) {
                console.error('Error loading job_description_vgm_officer:', error);
                // Fallback to general OHS officer content
              }
            }
            // Otherwise return the general OHS officer content
            return {
              title: tVcaContent('policy.ohs_officer.title'),
              description: '',
              ohsOfficer: {
                title: tVcaContent('policy.ohs_officer.title'),
                content: tVcaContent('policy.ohs_officer.content'),
                references: ['job_description_vgm_officer', 'qualification_vgm_officer'] as const,
              },
            };
          }
          if (subPageKey === 'ohs_structure') {
            // Check if this is specifically the job-description-director page
            if (lastSlug === 'job-description-director') {
              return {
                title: tVcaContent('policy.job_description_director.title'),
                description: '',
                jobDescriptionDirector: {
                  title: tVcaContent('policy.job_description_director.title'),
                  content: tVcaContent('policy.job_description_director.content'),
                },
              };
            }
            // Check if this is specifically the job-description-executor page
            if (lastSlug === 'job-description-executor') {
              return {
                title: tVcaContent('policy.job_description_executor.title'),
                description: '',
                jobDescriptionExecutor: {
                  title: tVcaContent('policy.job_description_executor.title'),
                  content: tVcaContent('policy.job_description_executor.content'),
                },
              };
            }
            // Otherwise return the general OHS structure content
            return {
              title: tVcaContent('policy.ohs_structure.title'),
              description: '',
              ohsStructure: {
                title: tVcaContent('policy.ohs_structure.title'),
                content: tVcaContent('policy.ohs_structure.content'),
                references: ['job_description_director', 'job_description_executor', 'job_description_vgm_officer'] as const,
              },
            };
          }
          if (subPageKey === 'management_assessment') {
            return {
              title: tVcaContent('policy.management_assessment.title'),
              description: '',
              managementAssessment: {
                title: tVcaContent('policy.management_assessment.title'),
                content: tVcaContent('policy.management_assessment.content'),
                references: ['personnel_assessments'] as const,
              },
            };
          }
          if (subPageKey === 'internal_audit') {
            return {
              title: tVcaContent('policy.internal_audit.title'),
              description: '',
              internalAudit: {
                title: tVcaContent('policy.internal_audit.title'),
                content: tVcaContent('policy.internal_audit.content'),
              },
            };
          }
          if (subPageKey === 'management_review') {
            return {
              title: tVcaContent('policy.management_review.title'),
              description: '',
              managementReview: {
                title: tVcaContent('policy.management_review.title'),
                content: tVcaContent('policy.management_review.content'),
                references: ['internal_audit_reports', 'management_reviews'] as const,
              },
            };
          }
        } catch {
          return null;
        }
      }
    }
    
    // Check for laws-regulations sub-page first
    if (slug.length === 2 && slug[0] === 'general' && slug[1] === 'laws-regulations') {
      try {
        const regulations = tVcaContent.raw('general.laws_regulations.regulations') as Array<{
          name: string;
          url: string;
          administrator: string;
        }>;
        return {
          title: tVcaContent('general.laws_regulations.title'),
          description: '',
          lawsRegulations: {
            title: tVcaContent('general.laws_regulations.title'),
            regulations: Array.isArray(regulations) ? regulations : [],
          },
        };
      } catch {
        return null;
      }
    }
    
    // Map paths to content keys for main sections
    const contentMap: Record<string, string> = {
      '/dashboard/vca/policy': 'policy',
      '/dashboard/vca/risks': 'risks',
      '/dashboard/vca/competence': 'competence',
      '/dashboard/vca/ohs-awareness': 'ohs_awareness',
      '/dashboard/vca/ohs-project-plan': 'ohs_project_plan',
      '/dashboard/vca/emergency-situations': 'emergency_situations',
      '/dashboard/vca/inspections': 'inspections',
      '/dashboard/vca/health': 'health',
      '/dashboard/vca/resources': 'resources',
      '/dashboard/vca/procurement-services': 'procurement_services',
      '/dashboard/vca/ohs-incidents': 'ohs_incidents',
      '/dashboard/vca/general': 'general',
      '/dashboard/vca/general/laws-regulations': 'general',
    };
    
    // Also check if slug matches directly (for cases where pathname might not match exactly)
    let contentKey = contentMap[pathWithoutLocale];
    if (!contentKey && slug.length === 1) {
      // Check if slug matches a content key directly
      if (slug[0] === 'general') {
        contentKey = 'general';
      } else if (slug[0] === 'policy') {
        contentKey = 'policy';
      } else if (slug[0] === 'risks') {
        contentKey = 'risks';
      } else if (slug[0] === 'competence') {
        contentKey = 'competence';
      } else if (slug[0] === 'ohs-awareness') {
        contentKey = 'ohs_awareness';
      } else if (slug[0] === 'ohs-project-plan') {
        contentKey = 'ohs_project_plan';
      } else if (slug[0] === 'emergency-situations') {
        contentKey = 'emergency_situations';
      } else if (slug[0] === 'inspections') {
        contentKey = 'inspections';
      } else if (slug[0] === 'health') {
        contentKey = 'health';
      } else if (slug[0] === 'resources') {
        contentKey = 'resources';
      } else if (slug[0] === 'procurement-services') {
        contentKey = 'procurement_services';
      } else if (slug[0] === 'ohs-incidents') {
        contentKey = 'ohs_incidents';
      }
    }
    if (!contentKey && slug.length === 2 && slug[0] === 'general' && slug[1] === 'laws-regulations') {
      contentKey = 'general';
    }
    
    if (!contentKey) return null;
    
    try {
      // Helper function to safely get references
      const getReferences = (key: string): string[] => {
        try {
          const refs = tVcaContent.raw(key) as string[] | undefined;
          return Array.isArray(refs) ? refs : [];
        } catch {
          return [];
        }
      };

      return {
        title: tVcaContent(`${contentKey}.title`),
        description: tVcaContent(`${contentKey}.description`),
        // Get detailed content for policy section
        policyStatement: contentKey === 'policy' ? {
          title: tVcaContent('policy.policy_statement.title'),
          content: tVcaContent('policy.policy_statement.content'),
          references: getReferences('policy.policy_statement.references'),
        } : null,
        ohsOfficer: contentKey === 'policy' ? {
          title: tVcaContent('policy.ohs_officer.title'),
          content: tVcaContent('policy.ohs_officer.content'),
          references: getReferences('policy.ohs_officer.references'),
        } : null,
        ohsStructure: contentKey === 'policy' ? {
          title: tVcaContent('policy.ohs_structure.title'),
          content: tVcaContent('policy.ohs_structure.content'),
          references: getReferences('policy.ohs_structure.references'),
        } : null,
        managementAssessment: contentKey === 'policy' ? {
          title: tVcaContent('policy.management_assessment.title'),
          content: tVcaContent('policy.management_assessment.content'),
          references: getReferences('policy.management_assessment.references'),
        } : null,
        internalAudit: contentKey === 'policy' ? {
          title: tVcaContent('policy.internal_audit.title'),
          content: tVcaContent('policy.internal_audit.content'),
          references: getReferences('policy.internal_audit.references'),
        } : null,
        managementReview: contentKey === 'policy' ? {
          title: tVcaContent('policy.management_review.title'),
          content: tVcaContent('policy.management_review.content'),
          references: getReferences('policy.management_review.references'),
        } : null,
        // Get detailed content for risks section
        rie: contentKey === 'risks' ? {
          title: tVcaContent('risks.rie.title'),
          content: tVcaContent('risks.rie.content'),
        } : null,
        tra: contentKey === 'risks' ? {
          title: tVcaContent('risks.tra.title'),
          content: tVcaContent('risks.tra.content'),
        } : null,
        lmra: contentKey === 'risks' ? {
          title: tVcaContent('risks.lmra.title'),
          content: tVcaContent('risks.lmra.content'),
        } : null,
        // General content for all sections
        generalContent: contentKey === 'general' ? (() => {
          try {
            return tVcaContent('general.content');
          } catch (e) {
            console.error('Error loading general content:', e);
            return null;
          }
        })() : null,
        competenceContent: contentKey === 'competence' ? tVcaContent('competence.content') : null,
        ohsAwarenessContent: contentKey === 'ohs_awareness' ? tVcaContent('ohs_awareness.content') : null,
        ohsProjectPlanContent: contentKey === 'ohs_project_plan' ? tVcaContent('ohs_project_plan.content') : null,
        emergencySituationsContent: contentKey === 'emergency_situations' ? tVcaContent('emergency_situations.content') : null,
        inspectionsContent: contentKey === 'inspections' ? tVcaContent('inspections.content') : null,
        healthContent: contentKey === 'health' ? tVcaContent('health.content') : null,
        resourcesContent: contentKey === 'resources' ? tVcaContent('resources.content') : null,
        procurementServicesContent: contentKey === 'procurement_services' ? tVcaContent('procurement_services.content') : null,
        ohsIncidentsContent: contentKey === 'ohs_incidents' ? tVcaContent('ohs_incidents.content') : null,
      };
    } catch {
      return null;
    }
  };

  const vcaContent = getVcaContent();

  // Get certification badge - Reserved for future use
  // const getCertificationBadge = () => {
  //   if (pathname?.includes('/iso-9001')) return 'ISO 9001';
  //   if (pathname?.includes('/iso-45001')) return 'ISO 45001';
  //   if (pathname?.includes('/hkz-kleine-organisaties-2021')) return 'HKZ 2021';
  //   if (pathname?.includes('/hkz-vvt')) return 'HKZ VVT';
  //   if (pathname?.includes('/vca')) return 'VCA';
  //   return null;
  // };

  // Check if this is a module page
  const isModulePage = certification === 'vca' && slug.length >= 2 && slug[0] === 'modules';
  
  if (isModulePage) {
    const moduleSlug = slug[1]; // e.g., 'work-plans', 'workplace-inspections', etc.
    const subPageSlug = slug[2]; // e.g., 'reports', 'templates', 'scheduler', 'settings'
    
    // Handle sub-pages for workplace-inspections
    if (moduleSlug === 'workplace-inspections' && subPageSlug) {
      // Check if this is a template edit page (templates/[id])
      if (subPageSlug === 'templates' && slug.length >= 4) {
        const templateId = slug[3];
        return <WpiTemplateEditPage templateId={templateId} />;
      }
      
      const subPageComponents: Record<string, React.ComponentType> = {
        'reports': WpiReportsPage,
        'templates': WpiTemplatesPage,
        'scheduler': WpiSchedulerPage,
        'settings': WpiSettingsPage,
      };
      
      const SubPageComponent = subPageComponents[subPageSlug];
      if (SubPageComponent) {
        return <SubPageComponent />;
      }
    }
    
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

  // Get current section and its parent for right sidebar navigation
  const getCurrentSectionInfo = () => {
    if (certification !== 'vca' || !structure) return { parent: null, children: [], current: null }
    
    // Find the parent section and current section
    const findSection = (nodes: TreeNode[], path: string[], parent: TreeNode | null = null): { parent: TreeNode | null, current: TreeNode | null } => {
      if (path.length === 0) return { parent, current: null }
      
      const currentSlug = path[0]
      const node = nodes.find(n => {
        const nodeSlug = n.url.split('/').pop()
        return nodeSlug === currentSlug
      })
      
      if (!node) return { parent, current: null }
      
      if (path.length === 1) {
        return { parent, current: node }
      }
      
      if (node.children) {
        return findSection(node.children, path.slice(1), node)
      }
      
      return { parent, current: node }
    }
    
    const { parent, current } = findSection(structure, slug)
    
    // If we're on a child page, return parent and its children
    // If we're on a parent page, return that page and its children
    if (current && parent) {
      // We're on a child page - show parent section with all its children
      return { parent, children: parent.children || [], current }
    } else if (current) {
      // We're on a parent page - show this page and its children
      return { parent: current, children: current.children || [], current }
    }
    
    // Fallback: try to find parent from first slug
    if (slug.length > 0) {
      const firstSlug = slug[0]
      const topLevelNode = structure.find(n => {
        const nodeSlug = n.url.split('/').pop()
        return nodeSlug === firstSlug
      })
      if (topLevelNode) {
        return { parent: topLevelNode, children: topLevelNode.children || [], current: null }
      }
    }
    
    return { parent: null, children: [], current: null }
  }

  const { parent: currentParentSection, children: currentSectionChildren } = getCurrentSectionInfo()
  
  // Determine if parent section should be expanded and if it has active children
  const parentSectionId = currentParentSection?.id || ''
  const hasActiveChild = currentSectionChildren.some(child => {
    const childUrl = child.url.replace('/dashboard/handbook', `/dashboard/${certification}`)
    return pathname === childUrl || pathname?.startsWith(`${childUrl}/`)
  })
  const isParentActive = currentParentSection && (
    pathname === currentParentSection.url.replace('/dashboard/handbook', `/dashboard/${certification}`) ||
    hasActiveChild
  )
  const isParentExpanded = expandedSections[parentSectionId] !== undefined 
    ? expandedSections[parentSectionId] 
    : currentSectionChildren.length > 0 && (pathname?.includes(`/dashboard/vca/${slug[0]}`) || hasActiveChild)
  
  const toggleParentSection = () => {
    setExpandedSections(prev => ({
      ...prev,
      [parentSectionId]: !prev[parentSectionId]
    }))
  }

  // Handle Edit button click
  const handleEdit = () => {
    // Get current page content for editing
    const currentContent = vcaContent?.policyStatement || 
                          vcaContent?.ohsOfficer || 
                          vcaContent?.ohsStructure ||
                          vcaContent?.managementAssessment ||
                          vcaContent?.internalAudit ||
                          vcaContent?.managementReview ||
                          vcaContent?.rie ||
                          vcaContent?.tra ||
                          vcaContent?.lmra;
    
    if (currentContent) {
      setEditingItem({
        id: pathname || '',
        title: currentContent.title,
        content: currentContent.content || ''
      });
      setEditorMode('edit');
      setEditorOpen(true);
    } else {
      // If no specific content, edit the main title/description
      setEditingItem({
        id: pathname || '',
        title: vcaContent?.title || sectionTitle,
        content: vcaContent?.description || ''
      });
      setEditorMode('edit');
      setEditorOpen(true);
    }
  }

  // Handle New button click
  const handleNew = () => {
    setEditingItem(null);
    setEditorMode('create');
    setEditorOpen(true);
  }

  // Handle save from editor
  const handleSaveContent = (item: { title: string; content: string }) => {
    // TODO: Implement actual save to backend/database
    // For now, just log it
    console.log('Saving content:', item);
    console.log('Mode:', editorMode);
    console.log('Path:', pathname);
    
    // In a real implementation, you would:
    // 1. Call an API to save the content
    // 2. Update local state
    // 3. Refresh the page or update the content display
    
    alert(`Content ${editorMode === 'edit' ? 'updated' : 'created'} successfully!`);
  }

  // Handle PDF download - opens browser print dialog
  const handleDownloadPdf = () => {
    // Use browser's print functionality to generate PDF
    // This matches the behavior of many CMS systems
    window.print()
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Navigation Container - Exact match to KAM-systeem.nl for VCA with dropdowns */}
      {certification === 'vca' && <VCANavigation />}

      {/* Grid Layout - Matching KAM-systeem.nl structure */}
      {certification === 'vca' ? (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Content - col-sm-8 equivalent */}
            <div className="md:col-span-8">

              {/* VCA Detailed Content Sections - Matching KAM-systeem.nl card-body styling */}
              {vcaContent && (
                <div className="space-y-6">
          {/* Laws and Regulations Table */}
          {vcaContent.lawsRegulations && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#0066CC', fontSize: '20px', fontWeight: 600 }}>
                  {vcaContent.lawsRegulations.title}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse" style={{ fontSize: '14px' }}>
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left p-3 font-semibold" style={{ color: '#333', backgroundColor: '#f5f5f5' }}>
                          Omschrijving
                        </th>
                        <th className="text-left p-3 font-semibold" style={{ color: '#333', backgroundColor: '#f5f5f5' }}>
                          Beheerder
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {vcaContent.lawsRegulations.regulations.map((regulation, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-3" style={{ color: '#333' }}>
                            <a
                              href={regulation.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                              style={{ color: '#0066CC' }}
                            >
                              {regulation.name}
                            </a>
                          </td>
                          <td className="p-3" style={{ color: '#333' }}>
                            {regulation.administrator}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* General Content */}
          {vcaContent.generalContent && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#0066CC', fontSize: '20px', fontWeight: 600 }}>
                  {vcaContent.title}
                </h2>
                <div className="space-y-6" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {(() => {
                    const paragraphs = vcaContent.generalContent.split('\n\n').filter(p => p.trim().length > 0);
                    const result = [];
                    
                    for (let i = 0; i < paragraphs.length; i++) {
                      const paragraph = paragraphs[i].trim();
                      
                      // Check if paragraph starts with a number (section header)
                      if (/^\d+\.\s/.test(paragraph)) {
                        const header = paragraph.split('\n')[0].trim();
                        // Get content from current paragraph or next paragraph
                        let contentText = '';
                        if (paragraph.includes('\n') && paragraph.split('\n').length > 1) {
                          // Content is in the same paragraph
                          contentText = paragraph.split('\n').slice(1).join('\n');
                        } else if (i + 1 < paragraphs.length && !/^\d+\.\s/.test(paragraphs[i + 1].trim())) {
                          // Content is in the next paragraph
                          contentText = paragraphs[i + 1].trim();
                          i++; // Skip next paragraph as we've processed it
                        }
                        
                        const contentLines = contentText.split('\n').filter(line => line.trim().length > 0);
                        
                        // Check if this is section 1 with company details (table format)
                        if (header === '1. Toepassingsgebied' && contentLines.length > 0) {
                          const tableRows = contentLines
                            .filter(line => line.includes(':'))
                            .map(line => {
                              const [label, ...valueParts] = line.split(':');
                              return {
                                label: label.trim(),
                                value: valueParts.join(':').trim() || '',
                              };
                            });
                          
                          if (tableRows.length > 0) {
                            result.push(
                              <div key={i} className="mb-6">
                                <h3 className="font-semibold mb-3" style={{ color: '#333', fontSize: '16px', fontWeight: 600 }}>
                                  {header}
                                </h3>
                                <div className="overflow-x-auto">
                                  <table className="w-full border-collapse" style={{ fontSize: '14px' }}>
                                    <tbody>
                                      {tableRows.map((row, rowIdx) => (
                                        <tr key={rowIdx} className="border-b border-gray-200 hover:bg-gray-50">
                                          <td className="p-3 font-semibold align-top" style={{ color: '#333', width: '40%', backgroundColor: '#f9f9f9' }}>
                                            {row.label}:
                                          </td>
                                          <td className="p-3 align-top" style={{ color: '#333', width: '60%' }}>
                                            {row.value || <span className="text-gray-400 italic">(leeg)</span>}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            );
                            continue;
                          }
                        }
                        
                        // Regular section with header and content
                        result.push(
                          <div key={i} className="mb-6">
                            <h3 className="font-semibold mb-3" style={{ color: '#333', fontSize: '16px', fontWeight: 600 }}>
                              {header}
                            </h3>
                            {contentLines.length > 0 && (
                              <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                                {contentLines.join('\n')}
                              </div>
                            )}
                          </div>
                        );
                      } else {
                        // Regular paragraph
                        result.push(
                          <p key={i} className="mb-4" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                            {paragraph}
                          </p>
                        );
                      }
                    }
                    
                    return result;
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* Policy Sections - All in one card when viewing main policy page */}
          {certification === 'vca' && slug.length === 1 && slug[0] === 'policy' && (vcaContent.policyStatement || vcaContent.ohsOfficer || vcaContent.ohsStructure || vcaContent.managementAssessment || vcaContent.internalAudit || vcaContent.managementReview) && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                {/* Policy Statement */}
                {vcaContent.policyStatement && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                      {vcaContent.policyStatement.title}
                    </h2>
                    <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                      {vcaContent.policyStatement.content}
                    </div>
                    {vcaContent.policyStatement.references && vcaContent.policyStatement.references.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="font-semibold mb-2" style={{ color: '#333', fontSize: '14px', fontWeight: 600 }}>Referentie:</p>
                        <ul className="list-disc list-inside space-y-1" style={{ color: '#333', fontSize: '14px' }}>
                          {vcaContent.policyStatement.references.map((ref, idx) => {
                            const refUrl = getReferenceUrl(ref);
                            return (
                              <li key={idx}>
                                {refUrl ? (
                                  <Link href={refUrl} className="text-blue-600 hover:text-blue-800 underline" style={{ color: '#0066CC' }}>
                                    {tStructure(ref)}
        </Link>
                                ) : (
                                  tStructure(ref)
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                    {/* Date and Signatures - Only for policy-statement page */}
                    {pathname?.includes('/policy/policy-statement') && (
                      <div className="mt-6 text-xs" style={{ color: '#666', fontSize: '12px' }}>
                        <p className="mb-2">Den Haag 15 maart 2023</p>
                        <div className="flex justify-between">
                          <div>
                            <p>I. Bakkali</p>
                            <p>Bestuur</p>
                          </div>
                          <div>
                            <p>A. Yurdakul</p>
                            <p>Bestuur</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* OHS Officer */}
                {vcaContent.ohsOfficer && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                      {vcaContent.ohsOfficer.title}
                    </h2>
                    <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                      {vcaContent.ohsOfficer.content}
                    </div>
                    {vcaContent.ohsOfficer.references && vcaContent.ohsOfficer.references.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="font-semibold mb-2" style={{ color: '#333', fontSize: '14px', fontWeight: 600 }}>Referentie:</p>
                        <ul className="list-disc list-inside space-y-1" style={{ color: '#333', fontSize: '14px' }}>
                          {vcaContent.ohsOfficer.references.map((ref, idx) => {
                            const refUrl = getReferenceUrl(ref);
          return (
                              <li key={idx}>
                                {refUrl ? (
                                  <Link href={refUrl} className="text-blue-600 hover:text-blue-800 underline" style={{ color: '#0066CC' }}>
                                    {tStructure(ref)}
              </Link>
                                ) : (
                                  tStructure(ref)
                                )}
                              </li>
          );
        })}
                        </ul>
      </div>
                    )}
                  </div>
                )}

                {/* OHS Structure */}
                {vcaContent.ohsStructure && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                      {vcaContent.ohsStructure.title}
                    </h2>
                    <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                      {vcaContent.ohsStructure.content}
                    </div>
                    {vcaContent.ohsStructure.references && vcaContent.ohsStructure.references.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="font-semibold mb-2" style={{ color: '#333', fontSize: '14px', fontWeight: 600 }}>Referentie:</p>
                        <ul className="list-disc list-inside space-y-1" style={{ color: '#333', fontSize: '14px' }}>
                          {vcaContent.ohsStructure.references.map((ref, idx) => {
                            const refUrl = getReferenceUrl(ref);
                            return (
                              <li key={idx}>
                                {refUrl ? (
                                  <Link href={refUrl} className="text-blue-600 hover:text-blue-800 underline" style={{ color: '#0066CC' }}>
                                    {tStructure(ref)}
                                  </Link>
                                ) : (
                                  tStructure(ref)
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Management Assessment */}
                {vcaContent.managementAssessment && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                      {vcaContent.managementAssessment.title}
                    </h2>
                    <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                      {vcaContent.managementAssessment.content}
                    </div>
                    {vcaContent.managementAssessment.references && vcaContent.managementAssessment.references.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="font-semibold mb-2" style={{ color: '#333', fontSize: '14px', fontWeight: 600 }}>Referentie:</p>
                        <ul className="list-disc list-inside space-y-1" style={{ color: '#333', fontSize: '14px' }}>
                          {vcaContent.managementAssessment.references.map((ref, idx) => {
                            const refUrl = getReferenceUrl(ref);
                            return (
                              <li key={idx}>
                                {refUrl ? (
                                  <Link href={refUrl} className="text-blue-600 hover:text-blue-800 underline" style={{ color: '#0066CC' }}>
                                    {tStructure(ref)}
                                  </Link>
                                ) : (
                                  tStructure(ref)
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Internal Audit */}
                {vcaContent.internalAudit && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                      {vcaContent.internalAudit.title}
                    </h2>
                    <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                      {vcaContent.internalAudit.content}
                    </div>
                    {vcaContent.internalAudit.references && vcaContent.internalAudit.references.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="font-semibold mb-2" style={{ color: '#333', fontSize: '14px', fontWeight: 600 }}>Referentie:</p>
                        <ul className="list-disc list-inside space-y-1" style={{ color: '#333', fontSize: '14px' }}>
                          {vcaContent.internalAudit.references.map((ref, idx) => (
                            <li key={idx}>{tStructure(ref)}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Management Review */}
                {vcaContent.managementReview && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                      {vcaContent.managementReview.title}
                    </h2>
                    <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                      {vcaContent.managementReview.content}
                    </div>
                    {vcaContent.managementReview.references && vcaContent.managementReview.references.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="font-semibold mb-2" style={{ color: '#333', fontSize: '14px', fontWeight: 600 }}>Referentie:</p>
                        <ul className="list-disc list-inside space-y-1" style={{ color: '#333', fontSize: '14px' }}>
                          {vcaContent.managementReview.references.map((ref, idx) => {
                            const refUrl = getReferenceUrl(ref);
                            return (
                              <li key={idx}>
                                {refUrl ? (
                                  <Link href={refUrl} className="text-blue-600 hover:text-blue-800 underline" style={{ color: '#0066CC' }}>
                                    {tStructure(ref)}
                                  </Link>
                                ) : (
                                  tStructure(ref)
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Individual Policy Sub-Pages (e.g., /policy/policy-statement) */}
          {certification === 'vca' && slug.length === 2 && slug[0] === 'policy' && (
            <>
              {vcaContent?.policyStatement && (
                <PolicyStatementSection
                  title={vcaContent.policyStatement.title}
                  content={vcaContent.policyStatement.content}
                  references={vcaContent.policyStatement.references}
                />
              )}

              {vcaContent?.ohsOfficer && (
                <OhsOfficerSection
                  title={vcaContent.ohsOfficer.title}
                  content={vcaContent.ohsOfficer.content}
                  references={vcaContent.ohsOfficer.references}
                />
              )}

              {vcaContent?.ohsStructure && (
                <OhsStructureSection
                  title={vcaContent.ohsStructure.title}
                  content={vcaContent.ohsStructure.content}
                  references={vcaContent.ohsStructure.references}
                />
              )}

              {vcaContent?.managementAssessment && (
                <ManagementAssessmentSection
                  title={vcaContent.managementAssessment.title}
                  content={vcaContent.managementAssessment.content}
                  references={vcaContent.managementAssessment.references}
                />
              )}

              {vcaContent?.internalAudit && (
                <InternalAuditSection
                  title={vcaContent.internalAudit.title}
                  content={vcaContent.internalAudit.content}
                  references={vcaContent.internalAudit.references}
                />
              )}

              {vcaContent?.managementReview && (
                <ManagementReviewSection
                  title={vcaContent.managementReview.title}
                  content={vcaContent.managementReview.content}
                  references={vcaContent.managementReview.references}
                />
              )}

              {vcaContent?.jobDescriptionDirector && (
                <JobDescriptionDirectorSection
                  title={vcaContent.jobDescriptionDirector.title}
                  content={vcaContent.jobDescriptionDirector.content}
                />
              )}

              {vcaContent?.jobDescriptionExecutor && (
                <JobDescriptionExecutorSection
                  title={vcaContent.jobDescriptionExecutor.title}
                  content={vcaContent.jobDescriptionExecutor.content}
                />
              )}

              {vcaContent?.jobDescriptionVgmOfficer && (
                <JobDescriptionVgmOfficerSection
                  title={vcaContent.jobDescriptionVgmOfficer.title}
                  content={vcaContent.jobDescriptionVgmOfficer.content}
                />
              )}

              {vcaContent?.qualificationExternalVgmExpert && (
                <QualificationExternalVgmExpertSection
                  title={vcaContent.qualificationExternalVgmExpert.title}
                  hasImage={vcaContent.qualificationExternalVgmExpert.hasImage}
                />
              )}
            </>
          )}

          {/* Nested Policy Pages (e.g., /policy/job-description-vgm-officer/qualification-external-vgm-expert) */}
          {certification === 'vca' && slug.length === 3 && slug[0] === 'policy' && slug[1] === 'job-description-vgm-officer' && (
            <>
              {vcaContent?.qualificationExternalVgmExpert && (
                <QualificationExternalVgmExpertSection
                  title={vcaContent.qualificationExternalVgmExpert.title}
                  hasImage={vcaContent.qualificationExternalVgmExpert.hasImage}
                />
              )}
            </>
          )}

          {/* RIE */}
          {vcaContent.rie && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.rie.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.rie.content}
                </div>
              </div>
            </div>
          )}

          {/* TRA */}
          {vcaContent.tra && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.tra.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.tra.content}
                </div>
              </div>
            </div>
          )}

          {/* LMRA */}
          {vcaContent.lmra && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.lmra.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.lmra.content}
                </div>
              </div>
            </div>
          )}

          {/* Competence Content */}
          {vcaContent.competenceContent && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.competenceContent}
                </div>
              </div>
            </div>
          )}

          {/* OHS Awareness Content */}
          {vcaContent.ohsAwarenessContent && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.ohsAwarenessContent}
                </div>
              </div>
            </div>
          )}

          {/* OHS Project Plan Content */}
          {vcaContent.ohsProjectPlanContent && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.ohsProjectPlanContent}
                </div>
              </div>
            </div>
          )}

          {/* Emergency Situations Content */}
          {vcaContent.emergencySituationsContent && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.emergencySituationsContent}
                </div>
              </div>
            </div>
          )}

          {/* Inspections Content */}
          {vcaContent.inspectionsContent && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.inspectionsContent}
                </div>
              </div>
            </div>
          )}

          {/* Health Content */}
          {vcaContent.healthContent && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.healthContent}
                </div>
              </div>
            </div>
          )}

          {/* Resources Content */}
          {vcaContent.resourcesContent && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.resourcesContent}
                </div>
              </div>
            </div>
          )}

          {/* Procurement Services Content */}
          {vcaContent.procurementServicesContent && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.procurementServicesContent}
                </div>
              </div>
            </div>
          )}

          {/* OHS Incidents Content */}
          {vcaContent.ohsIncidentsContent && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.ohsIncidentsContent}
                </div>
              </div>
            </div>
          )}

                </div>
              )}

              {/* Documents Section */}
              {documents && documents.length > 0 && (
                <div className="mt-6">
                  <DocumentViewer documents={documents} sectionTitle={sectionTitle} />
                </div>
              )}
            </div>

            {/* Right Sidebar - col-sm-4 equivalent */}
            <div className="md:col-span-4">
              <div className="rightside sticky top-20" data-cursor-ref="ref-t715bese1ar">
                {/* Action Buttons - Matching KAM-systeem.nl */}
                <div className="mb-4 flex gap-2">
                  <Button
                    onClick={handleEdit}
                    className="btn btn-primary btn-sm flex-1 text-sm text-white bg-[#0066CC] hover:bg-[#004499] border-0"
                    title="Pagina bewerken"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Bewerken
                  </Button>
                  <Button
                    onClick={handleNew}
                    className="btn btn-success btn-sm flex-1 text-sm text-white bg-[#22C55E] hover:bg-[#16A34A] border-0"
                    title="Pagina toevoegen"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Nieuw
                  </Button>
                  <Button
                    onClick={handleDownloadPdf}
                    className="btn btn-info btn-sm flex-1 text-sm text-white bg-[#3B82F6] hover:bg-[#2563EB] border-0"
                    title="Download Pdf"
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Pdf
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg" style={{ fontSize: '14px', color: '#333', fontFamily: 'Arial, sans-serif' }}>
                  <p className="mb-2">
                    <strong>Mobiel:</strong> 0614543714
                  </p>
                  <p>
                    <strong>E-mail:</strong> info@opticinfra.nl
                  </p>
                </div>

                {/* Section Navigation - Matching KAM-systeem.nl card-body style */}
                {/* Always show sidebar for VCA pages */}
                {currentParentSection ? (
                  <div className="card-body bg-white border border-gray-200 rounded-lg p-4" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333' }}>
                    <Collapsible 
                      open={isParentExpanded} 
                      onOpenChange={() => toggleParentSection()}
                    >
                      <CollapsibleTrigger asChild>
                        <h3 
                          className={`font-semibold mb-3 cursor-pointer flex items-center gap-2 transition-colors rounded px-2 py-1 ${
                            isParentActive
                              ? 'bg-[#E6F2FF] text-[#0066CC]'
                              : 'hover:text-[#0066CC]'
                          }`}
                          style={{ fontSize: '16px', fontWeight: 600 }}
                        >
                          <span>
                            {(() => {
                              // Get section number for VCA (matching VCANavigation logic)
                              const vcaNumberMap: Record<string, number> = {
                                'general': 0,
                                'policy': 1,
                                'risks': 2,
                                'competence': 3,
                                'ohs_awareness': 4,
                                'ohs_project_plan': 5,
                                'emergency_situations': 6,
                                'inspections': 7,
                                'health': 8,
                                'resources': 9,
                                'procurement_services': 10,
                                'ohs_incidents': 11,
                              }
                              const sectionNumber = vcaNumberMap[currentParentSection.titleKey] ?? null
                              const title = tStructure(currentParentSection.titleKey)
                              return sectionNumber !== null && sectionNumber > 0
                                ? `${sectionNumber}. ${title}`
                                : title
                            })()}
                          </span>
                          {isParentExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </h3>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <ul className="space-y-1 mt-2" style={{ fontSize: '14px', color: '#333' }}>
                          {currentSectionChildren.map((child) => {
                            const childUrl = child.url.replace('/dashboard/handbook', `/dashboard/${certification}`)
                            const isChildActive = pathname === childUrl || pathname?.startsWith(`${childUrl}/`)
                            
                            return (
                              <li key={child.id} className={isChildActive ? 'closed last' : 'closed'}>
                                <Link
                                  href={childUrl}
                                  className={`niveau3 block py-1 px-2 rounded transition-colors ${
                                    isChildActive
                                      ? 'bg-[#E6F2FF] text-[#0066CC] font-medium hover'
                                      : 'text-[#333] hover:bg-[#E6F2FF] hover:text-[#0066CC]'
                                  }`}
                                >
                                  {tStructure(child.titleKey)}
        </Link>
                                {/* Show grandchildren if active */}
                                {isChildActive && child.children && child.children.length > 0 && (
                                  <ul className="ml-4 mt-1 space-y-1">
                                    {child.children.map((grandchild) => {
                                      const grandchildUrl = grandchild.url.replace('/dashboard/handbook', `/dashboard/${certification}`)
                                      const isGrandchildActive = pathname === grandchildUrl
                                      
          return (
                                        <li key={grandchild.id} className="closed">
                                          <Link
                                            href={grandchildUrl}
                                            className={`block py-1 px-2 rounded text-sm transition-colors ${
                                              isGrandchildActive
                                                ? 'bg-[#E6F2FF] text-[#0066CC] font-medium'
                                                : 'text-[#666] hover:bg-[#E6F2FF] hover:text-[#0066CC]'
                                            }`}
                                          >
                                            {tStructure(grandchild.titleKey)}
              </Link>
                                        </li>
                                      )
                                    })}
                                  </ul>
                                )}
                              </li>
                            )
                          })}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
      </div>
                ) : (
                  // Fallback: Show a placeholder if no parent section found
                  <div className="card-body bg-white border border-gray-200 rounded-lg p-4" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333' }}>
                    <h3 className="font-semibold mb-3" style={{ color: '#333', fontSize: '16px', fontWeight: 600 }}>
                      {sectionTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground">Navigatie wordt geladen...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
      </div>
      ) : (
        <>
          {/* Default layout for non-VCA pages */}
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
        </>
      )}

      {/* Content Editor Dialog */}
      <ContentEditorDialog
        open={editorOpen}
        onOpenChange={setEditorOpen}
        onSave={handleSaveContent}
        editingItem={editingItem}
        mode={editorMode}
      />
    </div>
  )
}

// Export sidebar component for layout
export function CertificationSectionPageSidebar({ certification }: { certification: string }) {
  const structure = getCertificationStructure(certification);
  return <CertificationSidebar certificationId={certification} structure={structure} />;
}


