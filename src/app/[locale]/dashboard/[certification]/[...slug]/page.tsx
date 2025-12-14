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
import { WpiSchedulerPage } from "@/components/handbook/wpi-scheduler-page"
import { WpiSettingsPage } from "@/components/handbook/wpi-settings-page"

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
  const getVcaContent = () => {
    if (certification !== 'vca') return null;
    
    const currentPath = pathname || '';
    const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}/, '');
    
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
            // These pages can have their own content or use parent content
            // For now, return a basic structure - can be extended with specific content later
            return {
              title: tStructure(nestedPageKey),
              description: '',
            };
          } catch (e) {
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
        } catch (e) {
          return null;
        }
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
    };
    
    const contentKey = contentMap[pathWithoutLocale];
    if (!contentKey) return null;
    
    try {
      return {
        title: tVcaContent(`${contentKey}.title`),
        description: tVcaContent(`${contentKey}.description`),
        // Get detailed content for policy section
        policyStatement: contentKey === 'policy' ? {
          title: tVcaContent('policy.policy_statement.title'),
          content: tVcaContent('policy.policy_statement.content'),
          references: ['policy_statement'] as const,
        } : null,
        ohsOfficer: contentKey === 'policy' ? {
          title: tVcaContent('policy.ohs_officer.title'),
          content: tVcaContent('policy.ohs_officer.content'),
          references: ['job_description_vgm_officer', 'qualification_vgm_officer'] as const,
        } : null,
        ohsStructure: contentKey === 'policy' ? {
          title: tVcaContent('policy.ohs_structure.title'),
          content: tVcaContent('policy.ohs_structure.content'),
          references: ['job_description_director', 'job_description_executor', 'job_description_vgm_officer'] as const,
        } : null,
        managementAssessment: contentKey === 'policy' ? {
          title: tVcaContent('policy.management_assessment.title'),
          content: tVcaContent('policy.management_assessment.content'),
          references: ['personnel_assessments'] as const,
        } : null,
        internalAudit: contentKey === 'policy' ? {
          title: tVcaContent('policy.internal_audit.title'),
          content: tVcaContent('policy.internal_audit.content'),
        } : null,
        managementReview: contentKey === 'policy' ? {
          title: tVcaContent('policy.management_review.title'),
          content: tVcaContent('policy.management_review.content'),
          references: ['internal_audit_reports', 'management_reviews'] as const,
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
      };
    } catch (e) {
      return null;
    }
  };

  const vcaContent = getVcaContent();

  // Get certification badge
  const getCertificationBadge = () => {
    if (pathname?.includes('/iso-9001')) return 'ISO 9001';
    if (pathname?.includes('/iso-45001')) return 'ISO 45001';
    if (pathname?.includes('/hkz-kleine-organisaties-2021')) return 'HKZ 2021';
    if (pathname?.includes('/hkz-vvt')) return 'HKZ VVT';
    if (pathname?.includes('/vca')) return 'VCA';
    return null;
  };

  const certificationBadge = getCertificationBadge();

  // Check if this is a module page
  const isModulePage = certification === 'vca' && slug.length >= 2 && slug[0] === 'modules';
  
  if (isModulePage) {
    const moduleSlug = slug[1]; // e.g., 'work-plans', 'workplace-inspections', etc.
    const subPageSlug = slug[2]; // e.g., 'reports', 'templates', 'scheduler', 'settings'
    
    // Handle sub-pages for workplace-inspections
    if (moduleSlug === 'workplace-inspections' && subPageSlug) {
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

  const { parent: currentParentSection, children: currentSectionChildren, current: currentSection } = getCurrentSectionInfo()
  
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
          {/* Policy Statement */}
          {vcaContent.policyStatement && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.policyStatement.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.policyStatement.content}
                </div>
                {vcaContent.policyStatement.references && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="font-semibold mb-2" style={{ color: '#333', fontSize: '14px', fontWeight: 600 }}>Referentie:</p>
                    <ul className="list-disc list-inside space-y-1" style={{ color: '#333', fontSize: '14px' }}>
                      {vcaContent.policyStatement.references.map((ref, idx) => (
                        <li key={idx}>{tStructure(ref)}</li>
                      ))}
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
            </div>
          )}

          {/* OHS Officer */}
          {vcaContent.ohsOfficer && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.ohsOfficer.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.ohsOfficer.content}
                </div>
                {vcaContent.ohsOfficer.references && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="font-semibold mb-2" style={{ color: '#333', fontSize: '14px', fontWeight: 600 }}>Referentie:</p>
                    <ul className="list-disc list-inside space-y-1" style={{ color: '#333', fontSize: '14px' }}>
                      {vcaContent.ohsOfficer.references.map((ref, idx) => (
                        <li key={idx}>{tStructure(ref)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* OHS Structure */}
          {vcaContent.ohsStructure && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.ohsStructure.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.ohsStructure.content}
                </div>
                {vcaContent.ohsStructure.references && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="font-semibold mb-2" style={{ color: '#333', fontSize: '14px', fontWeight: 600 }}>Referentie:</p>
                    <ul className="list-disc list-inside space-y-1" style={{ color: '#333', fontSize: '14px' }}>
                      {vcaContent.ohsStructure.references.map((ref, idx) => (
                        <li key={idx}>{tStructure(ref)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Management Assessment */}
          {vcaContent.managementAssessment && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.managementAssessment.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.managementAssessment.content}
                </div>
                {vcaContent.managementAssessment.references && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="font-semibold mb-2" style={{ color: '#333', fontSize: '14px', fontWeight: 600 }}>Referentie:</p>
                    <ul className="list-disc list-inside space-y-1" style={{ color: '#333', fontSize: '14px' }}>
                      {vcaContent.managementAssessment.references.map((ref, idx) => (
                        <li key={idx}>{tStructure(ref)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Internal Audit */}
          {vcaContent.internalAudit && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.internalAudit.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.internalAudit.content}
                </div>
              </div>
            </div>
          )}

          {/* Management Review */}
          {vcaContent.managementReview && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                  {vcaContent.managementReview.title}
                </h2>
                <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {vcaContent.managementReview.content}
                </div>
                {vcaContent.managementReview.references && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="font-semibold mb-2" style={{ color: '#333', fontSize: '14px', fontWeight: 600 }}>Referentie:</p>
                    <ul className="list-disc list-inside space-y-1" style={{ color: '#333', fontSize: '14px' }}>
                      {vcaContent.managementReview.references.map((ref, idx) => (
                        <li key={idx}>{tStructure(ref)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
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


