'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DocumentViewer } from "@/components/handbook/document-viewer"
import { getDocumentsForSection } from "@/lib/documents"
import { useTranslations } from 'next-intl'
import { usePathname, Link } from '@/i18n/routing'
import { FolderOpen, ChevronRight, Folder, FileText } from "lucide-react"

/**
 * Dynamic Handbook Section Page
 * 
 * This page handles all handbook section routes dynamically.
 * Content is determined by the slug parameter.
 */

interface Subsection {
  id: string
  titleKey: string
  descriptionKey?: string
  url: string
}


interface PageProps {
  params: Promise<{
    slug: string[]
  }>
}

export default function HandbookSectionPage({ params }: PageProps) {
  const t = useTranslations('handbook');
  const tViewer = useTranslations('handbook.document_viewer');
  const tStructure = useTranslations('handbook.structure');
  const pathname = usePathname();
  
  // For Next.js 15, use React.use() pattern
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  
  // Get certification name if on a certification page
  const getCertificationName = () => {
    if (pathname?.includes('/iso-9001')) return tStructure('iso_9001');
    if (pathname?.includes('/iso-45001')) return tStructure('iso_45001');
    if (pathname?.includes('/hkz-kleine-organisaties-2021')) return tStructure('hkz_small_organizations_2021');
    if (pathname?.includes('/hkz-vvt')) return tStructure('hkz_vvt');
    if (pathname?.includes('/vca')) return tStructure('vca');
    return null;
  };
  
  const certificationName = getCertificationName();
  
  // Convert slug to readable title
  const getSectionTitle = () => {
    // If we're on a certification root page, show certification name
    if (certificationName && slug.length === 1) {
      return certificationName;
    }
    
    // Otherwise, build title from slug
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
  const getSubsections = (path: string): Subsection[] => {
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
      '/dashboard/handbook/iso-9001/preconditions': [
        { id: '1', titleKey: 'context_analysis', url: '/dashboard/handbook/iso-9001/preconditions/context-analysis' },
        { id: '2', titleKey: 'mission_vision', url: '/dashboard/handbook/iso-9001/preconditions/mission-vision' },
        { id: '3', titleKey: 'goals', url: '/dashboard/handbook/iso-9001/preconditions/goals' },
        { id: '4', titleKey: 'attitude_leadership', url: '/dashboard/handbook/iso-9001/preconditions/attitude-leadership' },
        { id: '5', titleKey: 'risk_analysis', url: '/dashboard/handbook/iso-9001/preconditions/risk-analysis' },
        { id: '6', titleKey: 'exclusion_criteria', url: '/dashboard/handbook/iso-9001/preconditions/exclusion-criteria' },
        { id: '7', titleKey: 'laws_regulations', url: '/dashboard/handbook/iso-9001/preconditions/laws-regulations' },
      ],
      '/dashboard/handbook/iso-9001/execution-care': [
        { id: '1', titleKey: 'methods', url: '/dashboard/handbook/iso-9001/execution-care/methods' },
        { id: '1-1', titleKey: 'hygiene_infection_prevention', url: '/dashboard/handbook/iso-9001/execution-care/hygiene-infection-prevention' },
        { id: '2', titleKey: 'employees', url: '/dashboard/handbook/iso-9001/execution-care/employees' },
        { id: '2-1', titleKey: 'job_descriptions', url: '/dashboard/handbook/iso-9001/execution-care/job-descriptions' },
        { id: '2-2', titleKey: 'safe_care_relationship', url: '/dashboard/handbook/iso-9001/execution-care/safe-care-relationship' },
        { id: '3', titleKey: 'functioning_conversations', url: '/dashboard/handbook/iso-9001/execution-care/functioning-conversations' },
        { id: '4', titleKey: 'subcontractor_agreements', url: '/dashboard/handbook/iso-9001/execution-care/subcontractor-agreements' },
        { id: '5', titleKey: 'procurement', url: '/dashboard/handbook/iso-9001/execution-care/procurement' },
        { id: '6', titleKey: 'work_environment', url: '/dashboard/handbook/iso-9001/execution-care/work-environment' },
        { id: '7', titleKey: 'equipment_maintenance', url: '/dashboard/handbook/iso-9001/execution-care/equipment-maintenance' },
      ],
      '/dashboard/handbook/iso-9001/the-client': [
        { id: '1', titleKey: 'client_information', url: '/dashboard/handbook/iso-9001/the-client/information' },
        { id: '2', titleKey: 'individual_risk', url: '/dashboard/handbook/iso-9001/the-client/individual-risk' },
        { id: '3', titleKey: 'care_plan', url: '/dashboard/handbook/iso-9001/the-client/care-plan' },
      ],
      '/dashboard/handbook/iso-9001/learning-improving': [
        { id: '1', titleKey: 'client_experiences', url: '/dashboard/handbook/iso-9001/learning-improving/client-experiences' },
        { id: '2', titleKey: 'participation', url: '/dashboard/handbook/iso-9001/learning-improving/participation' },
        { id: '3', titleKey: 'signals', url: '/dashboard/handbook/iso-9001/learning-improving/signals' },
        { id: '4', titleKey: 'employee_experiences', url: '/dashboard/handbook/iso-9001/learning-improving/employee-experiences' },
        { id: '5', titleKey: 'incidents_complaints', url: '/dashboard/handbook/iso-9001/learning-improving/incidents-complaints' },
        { id: '6', titleKey: 'organization_assessment', url: '/dashboard/handbook/iso-9001/learning-improving/organization-assessment' },
      ],
      '/dashboard/handbook/iso-45001/preconditions': [
        { id: '1', titleKey: 'context_analysis', url: '/dashboard/handbook/iso-45001/preconditions/context-analysis' },
        { id: '2', titleKey: 'mission_vision', url: '/dashboard/handbook/iso-45001/preconditions/mission-vision' },
        { id: '3', titleKey: 'goals', url: '/dashboard/handbook/iso-45001/preconditions/goals' },
        { id: '4', titleKey: 'attitude_leadership', url: '/dashboard/handbook/iso-45001/preconditions/attitude-leadership' },
        { id: '5', titleKey: 'risk_analysis', url: '/dashboard/handbook/iso-45001/preconditions/risk-analysis' },
        { id: '6', titleKey: 'exclusion_criteria', url: '/dashboard/handbook/iso-45001/preconditions/exclusion-criteria' },
        { id: '7', titleKey: 'laws_regulations', url: '/dashboard/handbook/iso-45001/preconditions/laws-regulations' },
      ],
      '/dashboard/handbook/iso-45001/execution-care': [
        { id: '1', titleKey: 'methods', url: '/dashboard/handbook/iso-45001/execution-care/methods' },
        { id: '2', titleKey: 'employees', url: '/dashboard/handbook/iso-45001/execution-care/employees' },
        { id: '3', titleKey: 'functioning_conversations', url: '/dashboard/handbook/iso-45001/execution-care/functioning-conversations' },
        { id: '4', titleKey: 'subcontractor_agreements', url: '/dashboard/handbook/iso-45001/execution-care/subcontractor-agreements' },
        { id: '5', titleKey: 'procurement', url: '/dashboard/handbook/iso-45001/execution-care/procurement' },
        { id: '6', titleKey: 'work_environment', url: '/dashboard/handbook/iso-45001/execution-care/work-environment' },
        { id: '7', titleKey: 'equipment_maintenance', url: '/dashboard/handbook/iso-45001/execution-care/equipment-maintenance' },
      ],
      '/dashboard/handbook/iso-45001/the-client': [
        { id: '1', titleKey: 'client_information', url: '/dashboard/handbook/iso-45001/the-client/information' },
        { id: '2', titleKey: 'individual_risk', url: '/dashboard/handbook/iso-45001/the-client/individual-risk' },
        { id: '3', titleKey: 'care_plan', url: '/dashboard/handbook/iso-45001/the-client/care-plan' },
      ],
      '/dashboard/handbook/iso-45001/learning-improving': [
        { id: '1', titleKey: 'client_experiences', url: '/dashboard/handbook/iso-45001/learning-improving/client-experiences' },
        { id: '2', titleKey: 'participation', url: '/dashboard/handbook/iso-45001/learning-improving/participation' },
        { id: '3', titleKey: 'signals', url: '/dashboard/handbook/iso-45001/learning-improving/signals' },
        { id: '4', titleKey: 'employee_experiences', url: '/dashboard/handbook/iso-45001/learning-improving/employee-experiences' },
        { id: '5', titleKey: 'incidents_complaints', url: '/dashboard/handbook/iso-45001/learning-improving/incidents-complaints' },
        { id: '6', titleKey: 'organization_assessment', url: '/dashboard/handbook/iso-45001/learning-improving/organization-assessment' },
      ],
      // HKZ Kleine organisaties 2021
      '/dashboard/handbook/hkz-kleine-organisaties-2021': [
        { id: '1', titleKey: 'preconditions', descriptionKey: 'preconditions_description', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions' },
        { id: '2', titleKey: 'execution_care', descriptionKey: 'execution_care_description', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care' },
        { id: '3', titleKey: 'the_client', descriptionKey: 'the_client_description', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/the-client' },
        { id: '4', titleKey: 'learning_improving', descriptionKey: 'learning_improving_description', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/learning-improving' },
      ],
      '/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions': [
        { id: '1', titleKey: 'context_analysis', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions/context-analysis' },
        { id: '2', titleKey: 'mission_vision', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions/mission-vision' },
        { id: '3', titleKey: 'goals', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions/goals' },
        { id: '4', titleKey: 'attitude_leadership', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions/attitude-leadership' },
        { id: '5', titleKey: 'risk_analysis', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions/risk-analysis' },
        { id: '6', titleKey: 'exclusion_criteria', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions/exclusion-criteria' },
        { id: '7', titleKey: 'laws_regulations', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions/laws-regulations' },
      ],
      '/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care': [
        { id: '1', titleKey: 'methods', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/methods' },
        { id: '1-1', titleKey: 'hygiene_infection_prevention', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/hygiene-infection-prevention' },
        { id: '2', titleKey: 'employees', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/employees' },
        { id: '2-1', titleKey: 'job_descriptions', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/job-descriptions' },
        { id: '2-2', titleKey: 'safe_care_relationship', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/safe-care-relationship' },
        { id: '3', titleKey: 'functioning_conversations', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/functioning-conversations' },
        { id: '4', titleKey: 'subcontractor_agreements', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/subcontractor-agreements' },
        { id: '5', titleKey: 'procurement', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/procurement' },
        { id: '6', titleKey: 'work_environment', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/work-environment' },
        { id: '7', titleKey: 'equipment_maintenance', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/equipment-maintenance' },
      ],
      '/dashboard/handbook/hkz-kleine-organisaties-2021/the-client': [
        { id: '1', titleKey: 'client_information', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/the-client/information' },
        { id: '2', titleKey: 'individual_risk', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/the-client/individual-risk' },
        { id: '3', titleKey: 'care_plan', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/the-client/care-plan' },
      ],
      '/dashboard/handbook/hkz-kleine-organisaties-2021/learning-improving': [
        { id: '1', titleKey: 'client_experiences', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/learning-improving/client-experiences' },
        { id: '2', titleKey: 'participation', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/learning-improving/participation' },
        { id: '3', titleKey: 'signals', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/learning-improving/signals' },
        { id: '4', titleKey: 'employee_experiences', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/learning-improving/employee-experiences' },
        { id: '5', titleKey: 'incidents_complaints', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/learning-improving/incidents-complaints' },
        { id: '6', titleKey: 'organization_assessment', url: '/dashboard/handbook/hkz-kleine-organisaties-2021/learning-improving/organization-assessment' },
      ],
      // HKZ VVT
      '/dashboard/handbook/hkz-vvt': [
        { id: '1', titleKey: 'registration_intake', url: '/dashboard/handbook/hkz-vvt/registration-intake' },
        { id: '2', titleKey: 'care_execution_vvt', url: '/dashboard/handbook/hkz-vvt/execution-care' },
        { id: '3', titleKey: 'evaluation_end_care', url: '/dashboard/handbook/hkz-vvt/evaluation-end-care' },
        { id: '4', titleKey: 'organization_quality', url: '/dashboard/handbook/hkz-vvt/organization-quality' },
        { id: '5', titleKey: 'staff_vvt', url: '/dashboard/handbook/hkz-vvt/staff' },
        { id: '6', titleKey: 'development_innovation', url: '/dashboard/handbook/hkz-vvt/development-innovation' },
        { id: '7', titleKey: 'work_environment_safety', url: '/dashboard/handbook/hkz-vvt/work-environment-safety' },
        { id: '8', titleKey: 'procurement_tendering', url: '/dashboard/handbook/hkz-vvt/procurement-tendering' },
        { id: '9', titleKey: 'documentation_regulations', url: '/dashboard/handbook/hkz-vvt/documentation-regulations' },
      ],
      '/dashboard/handbook/hkz-vvt/execution-care': [
        { id: '1', titleKey: 'hygiene_infection_prevention', url: '/dashboard/handbook/hkz-vvt/execution-care/hygiene-infection-prevention' },
      ],
      '/dashboard/handbook/hkz-vvt/evaluation-end-care': [
        { id: '1', titleKey: 'client_satisfaction', url: '/dashboard/handbook/hkz-vvt/evaluation-end-care/client-satisfaction' },
      ],
      '/dashboard/handbook/hkz-vvt/organization-quality': [
        { id: '1', titleKey: 'audit', url: '/dashboard/handbook/hkz-vvt/organization-quality/audit' },
        { id: '2', titleKey: 'participation', url: '/dashboard/handbook/hkz-vvt/organization-quality/participation' },
      ],
      '/dashboard/handbook/hkz-vvt/staff': [
        { id: '1', titleKey: 'job_descriptions', url: '/dashboard/handbook/hkz-vvt/staff/job-descriptions' },
        { id: '2', titleKey: 'safe_care_relationship', url: '/dashboard/handbook/hkz-vvt/staff/safe-care-relationship' },
      ],
      // VCA
      '/dashboard/handbook/vca': [
        { id: '1', titleKey: 'policy', url: '/dashboard/handbook/vca/policy' },
        { id: '2', titleKey: 'risks', url: '/dashboard/handbook/vca/risks' },
        { id: '3', titleKey: 'competence', url: '/dashboard/handbook/vca/competence' },
        { id: '4', titleKey: 'ohs_awareness', url: '/dashboard/handbook/vca/ohs-awareness' },
        { id: '5', titleKey: 'ohs_project_plan', url: '/dashboard/handbook/vca/ohs-project-plan' },
        { id: '6', titleKey: 'emergency_situations', url: '/dashboard/handbook/vca/emergency-situations' },
        { id: '7', titleKey: 'inspections', url: '/dashboard/handbook/vca/inspections' },
        { id: '8', titleKey: 'health', url: '/dashboard/handbook/vca/health' },
        { id: '9', titleKey: 'resources', url: '/dashboard/handbook/vca/resources' },
        { id: '10', titleKey: 'procurement_services', url: '/dashboard/handbook/vca/procurement-services' },
        { id: '11', titleKey: 'ohs_incidents', url: '/dashboard/handbook/vca/ohs-incidents' },
      ],
      '/dashboard/handbook/vca/policy': [
        { id: '1', titleKey: 'vca_certificate', url: '/dashboard/handbook/vca/policy/vca-certificate' },
        { id: '2', titleKey: 'policy_statement', url: '/dashboard/handbook/vca/policy/policy-statement' },
        { id: '3', titleKey: 'job_description_director', url: '/dashboard/handbook/vca/policy/job-description-director' },
        { id: '4', titleKey: 'job_description_executor', url: '/dashboard/handbook/vca/policy/job-description-executor' },
        { id: '5', titleKey: 'job_description_vgm_officer', url: '/dashboard/handbook/vca/policy/job-description-vgm-officer' },
        { id: '6', titleKey: 'personnel_assessments', url: '/dashboard/handbook/vca/policy/personnel-assessments' },
        { id: '7', titleKey: 'internal_audit_reports', url: '/dashboard/handbook/vca/policy/internal-audit-reports' },
        { id: '8', titleKey: 'external_audit_reports', url: '/dashboard/handbook/vca/policy/external-audit-reports' },
        { id: '9', titleKey: 'management_reviews', url: '/dashboard/handbook/vca/policy/management-reviews' },
      ],
      '/dashboard/handbook/vca/policy/job-description-vgm-officer': [
        { id: '1', titleKey: 'qualification_vgm_officer', url: '/dashboard/handbook/vca/policy/qualification-vgm-officer' },
        { id: '2', titleKey: 'qualification_external_vgm_expert', url: '/dashboard/handbook/vca/policy/qualification-external-vgm-expert' },
      ],
      '/dashboard/handbook/vca/risks': [
        { id: '1', titleKey: 'frm_tra', url: '/dashboard/handbook/vca/risks/frm-tra' },
        { id: '2', titleKey: 'risk_inventory_evaluation', url: '/dashboard/handbook/vca/risks/risk-inventory-evaluation' },
      ],
      '/dashboard/handbook/vca/competence': [
        { id: '1', titleKey: 'frm_employee_introduction', url: '/dashboard/handbook/vca/competence/frm-employee-introduction' },
        { id: '2', titleKey: 'function_table', url: '/dashboard/handbook/vca/competence/function-table' },
        { id: '3', titleKey: 'safety_booklet', url: '/dashboard/handbook/vca/competence/safety-booklet' },
        { id: '4', titleKey: 'communication_plan', url: '/dashboard/handbook/vca/competence/communication-plan' },
      ],
      '/dashboard/handbook/vca/ohs-awareness': [
        {
          id: '1',
          titleKey: 'improvement_program_ohs_awareness',
          url: '/dashboard/handbook/vca/ohs-awareness/improvement-program-ohs-awareness',
        },
        { id: '2', titleKey: 'list_dates_topics_presentation', url: '/dashboard/handbook/vca/ohs-awareness/list-dates-topics-presentation' },
      ],
      '/dashboard/handbook/vca/ohs-awareness/improvement-program-ohs-awareness': [
        { id: '1', titleKey: 'assessment_list_ohs_behavior', url: '/dashboard/handbook/vca/ohs-awareness/assessment-list-ohs-behavior' },
        { id: '2', titleKey: 'toolbox_meeting_behavior_improvement', url: '/dashboard/handbook/vca/ohs-awareness/toolbox-meeting-behavior-improvement' },
        { id: '3', titleKey: 'toolbox_meeting_safety_together', url: '/dashboard/handbook/vca/ohs-awareness/toolbox-meeting-safety-together' },
      ],
      '/dashboard/handbook/vca/emergency-situations': [
        { id: '1', titleKey: 'alarm_card', url: '/dashboard/handbook/vca/emergency-situations/alarm-card' },
      ],
      '/dashboard/handbook/vca/inspections': [
        { id: '1', titleKey: 'inspection_test', url: '/dashboard/handbook/vca/inspections/inspection-test' },
      ],
      '/dashboard/handbook/vca/health': [
        { id: '1', titleKey: 'proof_medical_expert_competence', url: '/dashboard/handbook/vca/health/proof-medical-expert-competence' },
      ],
      '/dashboard/handbook/vca/resources': [
        { id: '1', titleKey: 'ohs_specification_work_resources', url: '/dashboard/handbook/vca/resources/ohs-specification-work-resources' },
        { id: '2', titleKey: 'overview_management_work_resources', url: '/dashboard/handbook/vca/resources/overview-management-work-resources' },
      ],
    };
    
    return subsectionMap[path] || [];
  };

  const subsections = getSubsections(pathname);

  // Define requirements for leaf sections (to be populated later)
  const getRequirements = (path: string): string[] => {
    const requirementsMap: Record<string, string[]> = {
      '/dashboard/handbook/iso-9001/preconditions/context-analysis': [
        'The organization has determined its context.',
        'The organization has identified stakeholders and their requirements.',
        'The organization regularly reviews and updates the context analysis.',
      ],
      '/dashboard/handbook/iso-9001/preconditions/mission-vision': [
        'The organization has defined its mission and vision.',
        'The mission and vision are communicated to all stakeholders.',
      ],
      '/dashboard/handbook/iso-9001/preconditions/goals': [
        'The organization has determined what goals it wants to achieve. These goals are SMART.',
        'The organization analyses whether the existing goals need to be adjusted or whether new goals need to be set.',
        'The organization has determined how often, by whom and in what way these analyses are done.',
        'Following the results of the analyses, the organization will take improvement measures if necessary.',
      ],
      '/dashboard/handbook/iso-9001/preconditions/attitude-leadership': [
        'Leadership demonstrates commitment to quality management.',
        'The organization promotes a culture of continuous improvement.',
      ],
      '/dashboard/handbook/iso-9001/preconditions/risk-analysis': [
        'The organization has identified risks and opportunities.',
        'Risk mitigation strategies are implemented and monitored.',
        'Regular risk assessments are conducted.',
      ],
      '/dashboard/handbook/iso-9001/preconditions/exclusion-criteria': [
        'Clear exclusion criteria are defined and documented.',
        'Criteria are communicated to relevant stakeholders.',
      ],
      '/dashboard/handbook/iso-9001/preconditions/laws-regulations': [
        'The organization maintains an inventory of applicable laws and regulations.',
        'Compliance with legal requirements is regularly monitored.',
        'Changes in legislation are tracked and implemented.',
      ],
      // Execution of Care
      '/dashboard/handbook/iso-9001/execution-care/methods': [
        'Work methods and procedures are documented.',
        'Methods are regularly evaluated and updated.',
      ],
      '/dashboard/handbook/iso-9001/execution-care/hygiene-infection-prevention': [
        'Hygiene and infection prevention protocols are established.',
        'Staff are trained on hygiene and infection prevention measures.',
        'Hygiene practices are regularly monitored and evaluated.',
      ],
      '/dashboard/handbook/iso-9001/execution-care/employees': [
        'Staff competencies are defined and maintained.',
        'Regular training and development programs are provided.',
      ],
      '/dashboard/handbook/iso-9001/execution-care/job-descriptions': [
        'Job descriptions are documented and up to date.',
        'Job descriptions reflect current roles and responsibilities.',
        'Job descriptions are reviewed regularly.',
      ],
      '/dashboard/handbook/iso-9001/execution-care/safe-care-relationship': [
        'Guidelines for safe care relationships are established.',
        'Staff are trained on maintaining safe care relationships.',
        'Safe care relationship practices are monitored.',
      ],
      '/dashboard/handbook/iso-9001/execution-care/functioning-conversations': [
        'Performance discussions are held regularly.',
        'Feedback mechanisms are in place.',
      ],
      '/dashboard/handbook/iso-9001/execution-care/subcontractor-agreements': [
        'Agreements with subcontractors are documented.',
        'Subcontractor performance is monitored.',
      ],
      '/dashboard/handbook/iso-9001/execution-care/procurement': [
        'Procurement processes are defined.',
        'Supplier evaluation criteria are established.',
      ],
      '/dashboard/handbook/iso-9001/execution-care/work-environment': [
        'Work environment requirements are defined.',
        'Safety and hygiene standards are maintained.',
      ],
      '/dashboard/handbook/iso-9001/execution-care/equipment-maintenance': [
        'Equipment maintenance schedules are established.',
        'Maintenance records are kept up to date.',
      ],
      // The Client
      '/dashboard/handbook/iso-9001/the-client/information': [
        'Client information is provided in an accessible manner.',
        'Information is regularly updated and verified.',
      ],
      '/dashboard/handbook/iso-9001/the-client/individual-risk': [
        'Individual risk assessments are conducted for each client.',
        'Risk management plans are developed and implemented.',
      ],
      '/dashboard/handbook/iso-9001/the-client/care-plan': [
        'Care plans are developed in consultation with clients.',
        'Plans are regularly reviewed and updated.',
      ],
      // Learning and Improving
      '/dashboard/handbook/iso-9001/learning-improving/client-experiences': [
        'Client feedback is systematically collected.',
        'Client experiences are analyzed and acted upon.',
      ],
      '/dashboard/handbook/iso-9001/learning-improving/participation': [
        'Client participation mechanisms are in place.',
        'Stakeholder input is actively sought and considered.',
      ],
      '/dashboard/handbook/iso-9001/learning-improving/signals': [
        'Signal reporting systems are established.',
        'Signals are investigated and addressed.',
      ],
      '/dashboard/handbook/iso-9001/learning-improving/employee-experiences': [
        'Employee feedback is regularly collected.',
        'Work satisfaction is monitored and improved.',
      ],
      '/dashboard/handbook/iso-9001/learning-improving/incidents-complaints': [
        'Incident reporting procedures are in place.',
        'Complaints are handled according to established procedures.',
        'Lessons learned are documented and shared.',
      ],
      '/dashboard/handbook/iso-9001/learning-improving/organization-assessment': [
        'Regular organizational assessments are conducted.',
        'Improvement opportunities are identified and implemented.',
      ],
      // VCA Requirements
      '/dashboard/handbook/vca/policy': [
        'VCA-beleid is vastgesteld en gedocumenteerd.',
        'Het beleid is gecommuniceerd naar alle medewerkers.',
        'Het beleid wordt regelmatig geëvalueerd en bijgewerkt.',
        '',
        'Het VCA-beleid omvat de volgende onderdelen:',
        '- Beleidsverklaring (VCA 1.1): De directie heeft het VGM-beleid vastgelegd en bekrachtigd in een beleidsverklaring. Deze verklaring wordt driejaarlijks geëvalueerd en zo nodig geactualiseerd.',
        '- VGM-functionaris (VCA 1.2): Binnen het bedrijf is een VGM-functionaris aangesteld, die verantwoordelijk is voor het coördineren van de VGM-aspecten binnen het bedrijf bij de dagelijkse gang van zaken.',
        '- VGM-structuur (VCA 1.3): De VGM-structuur is schematisch weergegeven in het organogram. Voor alle leidinggevende functies en voor de VGM-functionaris zijn functieomschrijvingen beschikbaar.',
        '- Beoordeling leidinggevenden (VCA 1.4): De directeur beoordeelt alle leidinggevenden jaarlijks aan de hand van het beoordelingsformulier. VGM is een nadrukkelijk onderwerp van gesprek.',
        '- Interne audit (VCA 1.5): De VGM-functionaris voert de interne audits jaarlijks uit volgens een vaste planning in het jaarplan. Evenwichtig verdeeld over een periode van drie jaar worden alle van toepassing zijnde vragen uit de VCA-checklist beoordeeld.',
        '- Directiebeoordeling (VCA 1.6): Jaarlijks beoordeelt de directie of het VCA**-systeem en de organisatie voldoen aan de VCA*-eisen. De output wordt vastgelegd in document directiebeoordeling/jaarplan.',
      ],
      // VCA Risks Section
      '/dashboard/handbook/vca/risks': [
        'VGM-risico-inventarisatie en -evaluatie (RIE) is opgesteld conform wettelijke voorschriften.',
        'In de RIE is expliciet aandacht besteed aan de inventarisatie van de operationele activiteiten, de daaraan verbonden gevaren en de risicobeoordeling.',
        'In het plan van aanpak zijn van doeltreffende maatregelen ten aanzien van de risico\'s vastgesteld, waarbij bronaanpak de voorkeur verdient.',
        'De RIE en het PvA worden periodiek (minimaal driejaarlijks) geëvalueerd en indien nodig aangepast.',
        'Voor elk werk wordt een Taakrisicoanalyse (TRA) opgesteld indien nodig.',
        'Laatste Minuut Risico Analyse (LMRA) wordt uitgevoerd voor de start van werkzaamheden.',
      ],
      '/dashboard/handbook/vca/risks/frm-tra': [
        'Formulier TRA is beschikbaar voor het opstellen van taakrisicoanalyses.',
        'Uitgevoerde TRA\'s worden gedocumenteerd en bewaard.',
      ],
      '/dashboard/handbook/vca/risks/risk-inventory-evaluation': [
        'RIE is opgesteld in samenwerking met de externe veiligheidskundige.',
        'Plan van aanpak (PvA) is opgesteld met actiepunten, verantwoordelijken en termijnen.',
        'Overzicht van risico\'s en maatregelen is beschikbaar.',
        'Actielijst wordt bijgehouden en geëvalueerd.',
      ],
      // VCA Competence Section
      '/dashboard/handbook/vca/competence': [
        'Bekwaamheidseisen zijn vastgesteld voor alle functies.',
        'Medewerkers ontvangen passende introductie en training.',
        'Functietabel is beschikbaar met vereiste bekwaamheden.',
        'Veiligheid boekje is beschikbaar voor alle medewerkers.',
        'Communicatieplan is opgesteld en geïmplementeerd.',
      ],
      '/dashboard/handbook/vca/competence/frm-employee-introduction': [
        'Introductieprogramma voor nieuwe medewerkers is beschikbaar.',
        'Introductie wordt uitgevoerd volgens vastgesteld programma.',
      ],
      '/dashboard/handbook/vca/competence/function-table': [
        'Functietabel bevat alle functies met bijbehorende bekwaamheidseisen.',
        'Functietabel wordt regelmatig geëvalueerd en bijgewerkt.',
      ],
      '/dashboard/handbook/vca/competence/safety-booklet': [
        'Veiligheid boekje is beschikbaar voor alle medewerkers.',
        'Veiligheid boekje bevat instructies voor veilig werken.',
        'LMRA-instructie is opgenomen in het veiligheid boekje.',
      ],
      '/dashboard/handbook/vca/competence/communication-plan': [
        'Communicatieplan is opgesteld voor VGM-communicatie.',
        'Communicatieplan wordt geïmplementeerd en geëvalueerd.',
      ],
      // VCA OHS Awareness Section
      '/dashboard/handbook/vca/ohs-awareness': [
        'VGM-bewustzijn wordt bevorderd binnen de organisatie.',
        'Verbetering programma VGM-bewustzijn en gedrag is geïmplementeerd.',
        'Toolboxmeetings worden regelmatig gehouden.',
        'Lijst met data, besproken onderwerpen en presentie wordt bijgehouden.',
      ],
      '/dashboard/handbook/vca/ohs-awareness/improvement-program-ohs-awareness': [
        'Verbetering programma is opgesteld en geïmplementeerd.',
        'Beoordeling lijst VGM-gedrag en -bewustzijn wordt gebruikt.',
        'Toolboxmeetings worden gehouden over gedrag en veiligheid.',
      ],
      '/dashboard/handbook/vca/ohs-awareness/assessment-list-ohs-behavior': [
        'Beoordeling lijst is beschikbaar voor het beoordelen van VGM-gedrag.',
        'Beoordelingen worden regelmatig uitgevoerd.',
      ],
      '/dashboard/handbook/vca/ohs-awareness/toolbox-meeting-behavior-improvement': [
        'Toolboxmeetings over gedrag verbetering worden gehouden.',
        'Onderwerpen worden gedocumenteerd.',
      ],
      '/dashboard/handbook/vca/ohs-awareness/toolbox-meeting-safety-together': [
        'Toolboxmeetings "Samen zorgen voor veiligheid" worden gehouden.',
        'Onderwerpen worden gedocumenteerd.',
      ],
      '/dashboard/handbook/vca/ohs-awareness/list-dates-topics-presentation': [
        'Lijst met data, besproken onderwerpen en presentie wordt bijgehouden.',
        'Lijst wordt regelmatig geëvalueerd.',
      ],
      // VCA OHS Project Plan
      '/dashboard/handbook/vca/ohs-project-plan': [
        'VGM-projectplan is opgesteld voor projecten.',
        'Projectplan bevat VGM-vereisten en maatregelen.',
        'Projectplan wordt geëvalueerd en bijgewerkt.',
      ],
      // VCA Emergency Situations
      '/dashboard/handbook/vca/emergency-situations': [
        'Noodprocedures zijn vastgesteld en gedocumenteerd.',
        'Alarmkaart is beschikbaar op alle werkplekken.',
        'Noodoefeningen worden regelmatig uitgevoerd.',
        'Nooduitrusting is beschikbaar en gecontroleerd.',
      ],
      '/dashboard/handbook/vca/emergency-situations/alarm-card': [
        'Alarmkaart is beschikbaar op alle werkplekken.',
        'Alarmkaart bevat noodnummers en procedures.',
        'Alarmkaart wordt regelmatig gecontroleerd en bijgewerkt.',
      ],
      // VCA Inspections
      '/dashboard/handbook/vca/inspections': [
        'Inspecties worden regelmatig uitgevoerd.',
        'Inspectieresultaten worden gedocumenteerd.',
        'Correctieve maatregelen worden genomen waar nodig.',
        'Inspecties worden geëvalueerd en gevolgd.',
      ],
      '/dashboard/handbook/vca/inspections/inspection-test': [
        'Test inspecties worden uitgevoerd volgens planning.',
        'Test resultaten worden gedocumenteerd.',
      ],
      // VCA Health
      '/dashboard/handbook/vca/health': [
        'Gezondheidsprogramma\'s zijn geïmplementeerd.',
        'Gezondheidsmonitoring wordt uitgevoerd.',
        'Bewijs van kundigheid medisch deskundige of overeenkomst met arbodienst is beschikbaar.',
        'Gezondheidsrisico\'s worden beheerd.',
      ],
      '/dashboard/handbook/vca/health/proof-medical-expert-competence': [
        'Bewijs van kundigheid medisch deskundige is beschikbaar.',
        'Overeenkomst met arbodienst is beschikbaar indien van toepassing.',
        'Documenten worden regelmatig gecontroleerd en bijgewerkt.',
      ],
      // VCA Resources
      '/dashboard/handbook/vca/resources': [
        'Voldoende middelen zijn beschikbaar voor VCA.',
        'VGM specificatie arbeid middelen is beschikbaar.',
        'Overzicht beheer arbeid middelen wordt bijgehouden.',
        'Middelen worden effectief beheerd en geëvalueerd.',
      ],
      '/dashboard/handbook/vca/resources/ohs-specification-work-resources': [
        'VGM specificatie arbeid middelen is opgesteld.',
        'Specificatie wordt gebruikt bij inkoop en beheer.',
      ],
      '/dashboard/handbook/vca/resources/overview-management-work-resources': [
        'Overzicht beheer arbeid middelen wordt bijgehouden.',
        'Overzicht wordt regelmatig geëvalueerd en bijgewerkt.',
      ],
      // VCA Procurement Services
      '/dashboard/handbook/vca/procurement-services': [
        'Inkoopprocedures voor diensten zijn vastgesteld.',
        'Binnen het bedrijf werken we bij voorkeur met VCA-gecertificeerde onderaannemers.',
        'Indien een onderaannemer niet gecertificeerd is, wordt beoordeeld of deze voldoet aan de eisen van bijlage A.',
        'De beoordeling vindt jaarlijks plaats.',
        'Kopieën van certificaten en/of beoordelingen worden gearchiveerd in het leveranciersdossier.',
        'Regelmatig ingezette onderaannemers worden opgenomen in het leveranciersdossier.',
        'Minimaal jaarlijks worden de VGM-prestaties van regelmatig ingezette onderaannemers beoordeeld.',
        'Binnen het bedrijf worden geen uitzendkrachten ingezet.',
      ],
      // VCA Policy Subpages
      '/dashboard/handbook/vca/policy/vca-certificate': [
        'VCA-certificaat is beschikbaar en geldig.',
        'Certificaat wordt regelmatig vernieuwd.',
        'Certificaat is toegankelijk voor alle medewerkers.',
      ],
      '/dashboard/handbook/vca/policy/policy-statement': [
        'De directie heeft het VGM-beleid vastgelegd en bekrachtigd (d.m.v. ondertekening) in een beleidsverklaring.',
        'Deze verklaring wordt driejaarlijks geëvalueerd en zo nodig geactualiseerd.',
        'De beleidsverklaring wordt binnen het gehele bedrijf gecommuniceerd d.m.v. het introductie-/ voorlichting programma (nieuwe) eigen en tijdelijke medewerkers.',
        'Ook wordt het beleid gecommuniceerd met medewerkers.',
      ],
      '/dashboard/handbook/vca/policy/job-description-director': [
        'Als directeur eindverantwoordelijk voor het hele bedrijf. Legt verantwoording af aan de aandeelhouders.',
        'Is eindverantwoordelijk en draagt zorg voor de uitvoering van: het ondernemingsbeleid, het VGM-beleid, het personeelsbeleid.',
        'Waarborgt de continuïteit van de onderneming.',
        'Onderhoudt contacten met opdrachtgevers, onderaannemers en overige stakeholders.',
        'Voert periodiek (minimaal 4 maal per jaar) een werkplekinspectie uit.',
        'Organiseert overleg (waaronder de toolboxmeetings).',
        'Begeleidt de medewerkers.',
        'Voert dagelijks het personeels-, VGM- en scholingsbeleid uit.',
        'Behandelt klachten, tekortkomingen, ongevallen en incidenten en rapporteert.',
      ],
      '/dashboard/handbook/vca/policy/job-description-executor': [
        'Als operationeel leidinggevende verantwoording verschuldigd aan de directeur.',
        'Dagelijkse uitvoering van het project en de daarmee verbonden borging van VGM.',
        'Zorgdraagt voor een efficiënte werkvolgorde en indeling.',
        'Materiaal- en materieelbeheer op de werklocatie.',
        'Handhaving en coördinatie van regels met betrekking tot veiligheid, gezondheid en milieu op de werkplek (VGM-projectcoördinator).',
        'Het namens het bedrijf onderhouden van contacten met: opzichters van/ namens de opdrachtgevers, omwonenden, in voorkomende gevallen met opdrachtgevers, zonodig samen met de uitvoerder, overige betrokkenen.',
        'Inwerken van nieuwe medewerkers.',
        'Stilleggen van de werkzaamheden bij dreigend gevaar voor veiligheid, gezondheid of milieu.',
        'Geven van aanwijzingen en opdrachten aan de medewerkers.',
      ],
      '/dashboard/handbook/vca/policy/job-description-vgm-officer': [
        'De VGM-functionaris is verantwoording verschuldigd aan de bestuurder. Hij heeft geen leidinggevende taken.',
        'De VGM-functionaris vervult tevens de rol van van preventiemedewerker binnen het bedrijf.',
        'De VGM-functionaris is mede-verantwoordelijk voor het coördineren van de VGM-aspecten binnen het bedrijf bij de dagelijkse gang van zaken en het waarborgen van de inbreng van expertise daarbij.',
        'Hij draagt onder andere zorg voor het invoeren en het in stand houden van het managementsysteem in overeenstemming met de wettelijke en normatieve eisen.',
        'Opstellen en onderhouden het managementsysteem.',
        'Uitvoeren interne audits.',
        'Ondersteunen uitvoeren risico inventarisatie en evaluatie en taakrisicoanalyses.',
        'Verwerken VGM-registraties, rapporteren bevindingen aan de directie.',
        'Toezien op de naleving van het managementsysteem en zo nodig ingrijpen om bij te sturen.',
        'Behandelen ongevallen en tekortkomingen: onderzoek/ oorzaakanalyse, corrigerende maatregelen, implementatie, registratie.',
      ],
      '/dashboard/handbook/vca/policy/personnel-assessments': [
        'De directeur beoordeelt alle leidinggevenden jaarlijks aan de hand van het beoordelingsformulier.',
        'Deze beoordeling is gebaseerd op de functieomschrijving. VGM is een nadrukkelijk onderwerp van gesprek.',
        'Van de beoordeling wordt een verslag gemaakt in het beoordelingsformulier.',
        'Eventuele acties worden met verantwoordelijke en planning opgenomen in het verslag.',
      ],
      '/dashboard/handbook/vca/policy/internal-audit-reports': [
        'Een interne audit is een interne beoordeling op het voldoen aan gestelde normen of eisen.',
        'De VGM-functionaris voert de interne audits jaarlijks uit volgens een vaste planning in het jaarplan.',
        'Hij wordt hierbij ondersteund door het formulier interne audit.',
        'Evenwichtig verdeeld over een periode van drie jaar worden alle van toepassing zijnde vragen uit de VCA-checklist beoordeeld.',
        'De resultaten van deze interne audits worden vastgelegd in een rapportage.',
      ],
      '/dashboard/handbook/vca/policy/external-audit-reports': [
        'Externe audits worden uitgevoerd door onafhankelijke auditors.',
        'Externe auditverslagen worden gedocumenteerd en beoordeeld.',
        'Actiepunten uit externe audits worden opgevolgd.',
      ],
      '/dashboard/handbook/vca/policy/management-reviews': [
        'Jaarlijks beoordeelt de directie of het VCA**-systeem en de organisatie voldoen aan de VCA*-eisen.',
        'Als input voor deze beoordeling worden onder andere de volgende gegevens gebruikt:',
        '- Resultaten en effectiviteit van de voorgaande directiebeoordeling.',
        '- Rapportage en actieplan interne audit(s) (acties, termijnen, verantwoordelijken, vaststelling en evaluatie actiepunten voorgaande interne audit).',
        '- Rapportage externe audit(s).',
        '- Ongevallen met werkverlet, ongevallen met aangepast werk, ongevallen zonder verzuim/werkverlet (vanaf EHBO), bijna-ongevallen, onveilige situaties en handelingen en overige VGM-incidenten.',
        '- Doelstellingen en acties m.b.t. IF.',
        '- Risico Inventarisatie en Evaluatie (RIE), Milieu-RIE en Plan van Aanpak n.a.v. RIE (PvA).',
        '- Taak Risico Analyse (TRA\'s).',
        '- VGM-inspecties en actiepunten.',
        '- VGM-verantwoorde materialen, middelen en PBM.',
        '- Melding en onderzoek van ongevallen en incidenten.',
        'De output van de beoordeling wordt vastgelegd in document directiebeoordeling/jaarplan, waarin concrete verbeteracties worden vastgesteld.',
        'De directie verzorgt de opvolging van het KAM-jaarplan inclusief de acties.',
      ],
    };
    
    // Check direct match
    if (requirementsMap[path]) {
      return requirementsMap[path];
    }
    
    // If ISO 45001, use the same requirements as ISO 9001
    if (path.includes('/iso-45001/')) {
      const iso9001Path = path.replace('/iso-45001/', '/iso-9001/');
      return requirementsMap[iso9001Path] || [];
    }
    
    return [];
  };

  const requirements = getRequirements(pathname);

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

      {/* Subsections - Show if parent section */}
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

      {/* Requirements - Show if leaf section has requirements */}
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

      {/* Empty State - Show only if no documents, no subsections, and no requirements */}
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
              
              {/* Example content structure */}
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

