/**
 * Route Configuration
 * 
 * Centralized route configuration for dynamic page rendering
 * Uses TypeScript with component references for type safety
 */

import { lazy } from 'react'
import { RouteConfig } from './route-resolver'

// Module Components (lazy loaded)
const WorkPlansPage = lazy(() => import('@/components/handbook/work-plans-page').then(m => ({ default: m.WorkPlansPage })))
const WorkplaceInspectionsPage = lazy(() => import('@/components/handbook/workplace-inspections-page').then(m => ({ default: m.WorkplaceInspectionsPage })))
const WpiReportsPage = lazy(() => import('@/components/handbook/wpi-reports-page').then(m => ({ default: m.WpiReportsPage })))
const WpiTemplatesPage = lazy(() => import('@/components/handbook/wpi-templates-page').then(m => ({ default: m.WpiTemplatesPage })))
const WpiTemplateEditPage = lazy(() => import('@/components/handbook/wpi-template-edit-page').then(m => ({ default: m.WpiTemplateEditPage })))
const WpiSchedulerPage = lazy(() => import('@/components/handbook/wpi-scheduler-page').then(m => ({ default: m.WpiSchedulerPage })))
const WpiSettingsPage = lazy(() => import('@/components/handbook/wpi-settings-page').then(m => ({ default: m.WpiSettingsPage })))
const NotificationsPage = lazy(() => import('@/components/handbook/notifications-page').then(m => ({ default: m.NotificationsPage })))
const PersonnelPage = lazy(() => import('@/components/handbook/personnel-page').then(m => ({ default: m.PersonnelPage })))
const WorkEquipmentPage = lazy(() => import('@/components/handbook/work-equipment-page').then(m => ({ default: m.WorkEquipmentPage })))

// VCA Section Components (can be imported directly or lazy loaded if needed)
// These are handled by VcaContentWrapper, so we keep them as string references
// but include them here for documentation
import { VcaContentWrapper } from '@/components/vca-sections/vca-content-wrapper'
import { GeneralSection } from '@/components/vca-sections/general-section'
import { VcaContentSection } from '@/components/vca-sections/vca-content-section'
import { PolicyStatementSection } from '@/components/vca-sections/policy-statement-section'
import { JobDescriptionDirectorSection } from '@/components/vca-sections/job-description-director-section'
import { JobDescriptionExecutorSection } from '@/components/vca-sections/job-description-executor-section'
import { JobDescriptionVgmOfficerSection } from '@/components/vca-sections/job-description-vgm-officer-section'
import { QualificationExternalVgmExpertSection } from '@/components/vca-sections/qualification-external-vgm-expert-section'
import { HandbookSectionPage } from '@/components/handbook/handbook-section-page'

// Route configuration array
export const routeConfig: RouteConfig[] = [
  // Module sub-routes with params (most specific first)
  {
    pattern: "/dashboard/vca/modules/workplace-inspections/templates/:templateId",
    component: WpiTemplateEditPage,
    certification: "vca",
    type: "module-sub",
    params: ["templateId"]
  },
  // Module sub-routes (exact matches)
  {
    pattern: "/dashboard/vca/modules/workplace-inspections/reports",
    component: WpiReportsPage,
    certification: "vca",
    type: "module-sub"
  },
  {
    pattern: "/dashboard/vca/modules/workplace-inspections/templates",
    component: WpiTemplatesPage,
    certification: "vca",
    type: "module-sub"
  },
  {
    pattern: "/dashboard/vca/modules/workplace-inspections/scheduler",
    component: WpiSchedulerPage,
    certification: "vca",
    type: "module-sub"
  },
  {
    pattern: "/dashboard/vca/modules/workplace-inspections/settings",
    component: WpiSettingsPage,
    certification: "vca",
    type: "module-sub"
  },
  // Module routes
  {
    pattern: "/dashboard/vca/modules/workplace-inspections",
    component: WorkplaceInspectionsPage,
    certification: "vca",
    type: "module"
  },
  {
    pattern: "/dashboard/vca/modules/work-plans",
    component: WorkPlansPage,
    certification: "vca",
    type: "module"
  },
  {
    pattern: "/dashboard/vca/modules/notifications",
    component: NotificationsPage,
    certification: "vca",
    type: "module"
  },
  {
    pattern: "/dashboard/vca/modules/personnel",
    component: PersonnelPage,
    certification: "vca",
    type: "module"
  },
  {
    pattern: "/dashboard/vca/modules/work-equipment",
    component: WorkEquipmentPage,
    certification: "vca",
    type: "module"
  },
  // VCA section routes (specific routes first)
  {
    pattern: "/dashboard/vca/policy/job-description-vgm-officer/qualification-external-vgm-expert",
    component: QualificationExternalVgmExpertSection,
    certification: "vca",
    type: "vca-section",
    contentKey: "policy.qualification_external_vgm_expert"
  },
  {
    pattern: "/dashboard/vca/policy/job-description-vgm-officer/qualification-vgm-officer",
    component: VcaContentWrapper,
    certification: "vca",
    type: "vca-section",
    contentKey: "policy.qualification_vgm_officer"
  },
  {
    pattern: "/dashboard/vca/policy/policy-statement",
    component: PolicyStatementSection,
    certification: "vca",
    type: "vca-section",
    contentKey: "policy.policy_statement"
  },
  {
    pattern: "/dashboard/vca/policy/job-description-director",
    component: JobDescriptionDirectorSection,
    certification: "vca",
    type: "vca-section",
    contentKey: "policy.job_description_director"
  },
  {
    pattern: "/dashboard/vca/policy/job-description-executor",
    component: JobDescriptionExecutorSection,
    certification: "vca",
    type: "vca-section",
    contentKey: "policy.job_description_executor"
  },
  {
    pattern: "/dashboard/vca/policy/job-description-vgm-officer",
    component: JobDescriptionVgmOfficerSection,
    certification: "vca",
    type: "vca-section",
    contentKey: "policy.job_description_vgm_officer"
  },
  {
    pattern: "/dashboard/vca/policy/vca-certificate",
    component: VcaContentWrapper,
    certification: "vca",
    type: "vca-section",
    contentKey: "policy.vca_certificate"
  },
  {
    pattern: "/dashboard/vca/policy/personnel-assessments",
    component: VcaContentWrapper,
    certification: "vca",
    type: "vca-section",
    contentKey: "policy.personnel_assessments"
  },
  {
    pattern: "/dashboard/vca/policy/internal-audit-reports",
    component: VcaContentWrapper,
    certification: "vca",
    type: "vca-section",
    contentKey: "policy.internal_audit_reports"
  },
  {
    pattern: "/dashboard/vca/policy/external-audit-reports",
    component: VcaContentWrapper,
    certification: "vca",
    type: "vca-section",
    contentKey: "policy.external_audit_reports"
  },
  {
    pattern: "/dashboard/vca/policy/management-reviews",
    component: VcaContentWrapper,
    certification: "vca",
    type: "vca-section",
    contentKey: "policy.management_reviews"
  },
  {
    pattern: "/dashboard/vca/policy",
    component: VcaContentWrapper,
    certification: "vca",
    type: "vca-section-overview",
    contentKeys: [
      "policy.policy_statement",
      "policy.ohs_officer",
      "policy.ohs_structure",
      "policy.management_assessment",
      "policy.internal_audit",
      "policy.management_review"
    ]
  },
  {
    pattern: "/dashboard/vca/general",
    component: GeneralSection,
    certification: "vca",
    type: "vca-content",
    contentKey: "general"
  },
  // Catch-all route (least specific)
  {
    pattern: "/dashboard/vca/:section",
    component: VcaContentSection,
    certification: "vca",
    type: "vca-content",
    params: ["section"]
  },
  // Handbook routes - catch-all for all handbook paths
  {
    pattern: "/dashboard/handbook/:slug*",
    component: HandbookSectionPage,
    certification: "handbook",
    type: "handbook-section",
    params: ["slug"]
  }
]

/**
 * Get routes for a specific certification
 */
export function getRoutesForCertification(certification: string): RouteConfig[] {
  return routeConfig.filter((route) => route.certification === certification)
}

/**
 * Get routes by type
 */
export function getRoutesByType(type: string): RouteConfig[] {
  return routeConfig.filter((route) => route.type === type)
}

