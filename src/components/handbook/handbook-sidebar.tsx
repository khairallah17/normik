'use client'

import { useState, useEffect } from "react"
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen,
  FileText,
  ArrowLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from 'next-intl'
import { Link, usePathname } from "@/i18n/routing"

/**
 * Handbook Sidebar Component
 * 
 * Displays the table of contents as a collapsible tree structure with routing
 */

interface TreeNode {
  id: string
  titleKey: string
  descriptionKey?: string
  url: string
  children?: TreeNode[]
}

interface TreeItemProps {
  item: TreeNode
  level?: number
}

function TreeItem({ item, level = 0, isRelevant = true }: TreeItemProps & { isRelevant?: boolean }) {
  const t = useTranslations('handbook.structure');
  const pathname = usePathname();
  
  // Auto-expand if this item or any child is active, or if it's a top-level item
  const isActive = pathname === item.url;
  const hasActiveChild = item.children?.some(child => 
    pathname?.startsWith(child.url) || child.children?.some(grandchild => pathname?.startsWith(grandchild.url))
  );
  const shouldExpand = level === 0 || level === 1 || isActive || hasActiveChild;
  const [isExpanded, setIsExpanded] = useState(shouldExpand);
  
  const hasChildren = item.children && item.children.length > 0
  
  // Update expanded state when pathname changes
  useEffect(() => {
    if (shouldExpand) {
      setIsExpanded(true);
    }
  }, [pathname, shouldExpand]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const content = (
    <>
      {hasChildren && (
        <button 
          className="p-0 h-4 w-4 flex items-center justify-center"
          onClick={handleToggle}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      )}
      {!hasChildren && <div className="w-4" />}
      
      {hasChildren ? (
        isExpanded ? (
          <FolderOpen className="h-4 w-4 text-blue-500" />
        ) : (
          <Folder className="h-4 w-4 text-blue-500" />
        )
      ) : (
        <FileText className="h-4 w-4 text-muted-foreground" />
      )}
      
      <div className="flex-1 min-w-0">
        <span className={cn(
          "text-sm block truncate",
          level === 0 && "font-semibold",
          isActive && "text-blue-600 font-medium"
        )}>
          {t(item.titleKey)}
        </span>
        {item.descriptionKey && (
          <p className="text-xs text-muted-foreground mt-1 truncate">{t(item.descriptionKey)}</p>
        )}
      </div>
    </>
  );

  return (
    <div className="select-none">
      <Link
        href={item.url}
        className={cn(
          "flex items-center gap-2 py-2 px-2 rounded-md hover:bg-accent cursor-pointer transition-colors",
          isActive && "bg-accent"
        )}
        style={{ marginLeft: `${level * 16}px` }}
      >
        {content}
      </Link>

      {hasChildren && isExpanded && item.children && (
        <div className="space-y-1">
          {item.children.map((child: TreeNode) => (
            <TreeItem key={child.id} item={child} level={level + 1} isRelevant={isRelevant} />
          ))}
        </div>
      )}
    </div>
  )
}

export function HandbookSidebar() {
  const pathname = usePathname();
  
  // Determine which certification is active (if any)
  const getActiveCertification = () => {
    if (!pathname) return null;
    if (pathname.includes('/iso-9001')) return 'iso-9001';
    if (pathname.includes('/iso-45001')) return 'iso-45001';
    if (pathname.includes('/hkz-kleine-organisaties-2021')) return 'hkz-kleine-organisaties-2021';
    if (pathname.includes('/hkz-vvt')) return 'hkz-vvt';
    if (pathname.includes('/vca')) return 'vca';
    return null;
  };
  
  const activeCertification = getActiveCertification();
  const isOnCertificationPage = activeCertification !== null;
  
  // Define the handbook structure with translation keys and URLs
  const fullHandbookStructure: TreeNode[] = [
    {
      id: "1",
      titleKey: "quality_handbook",
      url: "/dashboard/handbook",
      children: [
        { id: "1-1", titleKey: "year_planner", url: "/dashboard/handbook/year-planner" },
        { id: "1-2", titleKey: "activities_calendar", url: "/dashboard/handbook/activities-calendar" },
        {
          id: "1-3",
          titleKey: "iso_9001",
          url: "/dashboard/handbook/iso-9001",
          descriptionKey: "iso_9001_description",
          children: [
            {
              id: "1-3-1",
              titleKey: "preconditions",
              url: "/dashboard/handbook/iso-9001/preconditions",
              children: [
                { id: "1-3-1-1", titleKey: "context_analysis", url: "/dashboard/handbook/iso-9001/preconditions/context-analysis" },
                { id: "1-3-1-2", titleKey: "mission_vision", url: "/dashboard/handbook/iso-9001/preconditions/mission-vision" },
                { id: "1-3-1-3", titleKey: "goals", url: "/dashboard/handbook/iso-9001/preconditions/goals" },
                { id: "1-3-1-4", titleKey: "attitude_leadership", url: "/dashboard/handbook/iso-9001/preconditions/attitude-leadership" },
                { id: "1-3-1-5", titleKey: "risk_analysis", url: "/dashboard/handbook/iso-9001/preconditions/risk-analysis" },
                { id: "1-3-1-6", titleKey: "exclusion_criteria", url: "/dashboard/handbook/iso-9001/preconditions/exclusion-criteria" },
                { id: "1-3-1-7", titleKey: "laws_regulations", url: "/dashboard/handbook/iso-9001/preconditions/laws-regulations" },
              ],
            },
            {
              id: "1-3-2",
              titleKey: "execution_care",
              url: "/dashboard/handbook/iso-9001/execution-care",
              children: [
                { 
                  id: "1-3-2-1", 
                  titleKey: "methods", 
                  url: "/dashboard/handbook/iso-9001/execution-care/methods",
                  children: [
                    { id: "1-3-2-1-1", titleKey: "hygiene_infection_prevention", url: "/dashboard/handbook/iso-9001/execution-care/hygiene-infection-prevention" },
                  ],
                },
                { 
                  id: "1-3-2-2", 
                  titleKey: "employees", 
                  url: "/dashboard/handbook/iso-9001/execution-care/employees",
                  children: [
                    { id: "1-3-2-2-1", titleKey: "job_descriptions", url: "/dashboard/handbook/iso-9001/execution-care/job-descriptions" },
                    { id: "1-3-2-2-2", titleKey: "safe_care_relationship", url: "/dashboard/handbook/iso-9001/execution-care/safe-care-relationship" },
                  ],
                },
                { id: "1-3-2-3", titleKey: "functioning_conversations", url: "/dashboard/handbook/iso-9001/execution-care/functioning-conversations" },
                { id: "1-3-2-4", titleKey: "subcontractor_agreements", url: "/dashboard/handbook/iso-9001/execution-care/subcontractor-agreements" },
                { id: "1-3-2-5", titleKey: "procurement", url: "/dashboard/handbook/iso-9001/execution-care/procurement" },
                { id: "1-3-2-6", titleKey: "work_environment", url: "/dashboard/handbook/iso-9001/execution-care/work-environment" },
                { id: "1-3-2-7", titleKey: "equipment_maintenance", url: "/dashboard/handbook/iso-9001/execution-care/equipment-maintenance" },
              ],
            },
            {
              id: "1-3-3",
              titleKey: "the_client",
              url: "/dashboard/handbook/iso-9001/the-client",
              children: [
                { id: "1-3-3-1", titleKey: "client_information", url: "/dashboard/handbook/iso-9001/the-client/information" },
                { id: "1-3-3-2", titleKey: "individual_risk", url: "/dashboard/handbook/iso-9001/the-client/individual-risk" },
                { id: "1-3-3-3", titleKey: "care_plan", url: "/dashboard/handbook/iso-9001/the-client/care-plan" },
              ],
            },
            {
              id: "1-3-4",
              titleKey: "learning_improving",
              url: "/dashboard/handbook/iso-9001/learning-improving",
              children: [
                { id: "1-3-4-1", titleKey: "client_experiences", url: "/dashboard/handbook/iso-9001/learning-improving/client-experiences" },
                { id: "1-3-4-2", titleKey: "participation", url: "/dashboard/handbook/iso-9001/learning-improving/participation" },
                { id: "1-3-4-3", titleKey: "signals", url: "/dashboard/handbook/iso-9001/learning-improving/signals" },
                { id: "1-3-4-4", titleKey: "employee_experiences", url: "/dashboard/handbook/iso-9001/learning-improving/employee-experiences" },
                { id: "1-3-4-5", titleKey: "incidents_complaints", url: "/dashboard/handbook/iso-9001/learning-improving/incidents-complaints" },
                { id: "1-3-4-6", titleKey: "organization_assessment", url: "/dashboard/handbook/iso-9001/learning-improving/organization-assessment" },
              ],
            },
          ],
        },
        {
          id: "1-4",
          titleKey: "iso_45001",
          url: "/dashboard/handbook/iso-45001",
          descriptionKey: "iso_45001_description",
          children: [
            {
              id: "1-4-1",
              titleKey: "preconditions",
              url: "/dashboard/handbook/iso-45001/preconditions",
              children: [
                { id: "1-4-1-1", titleKey: "context_analysis", url: "/dashboard/handbook/iso-45001/preconditions/context-analysis" },
                { id: "1-4-1-2", titleKey: "mission_vision", url: "/dashboard/handbook/iso-45001/preconditions/mission-vision" },
                { id: "1-4-1-3", titleKey: "goals", url: "/dashboard/handbook/iso-45001/preconditions/goals" },
                { id: "1-4-1-4", titleKey: "attitude_leadership", url: "/dashboard/handbook/iso-45001/preconditions/attitude-leadership" },
                { id: "1-4-1-5", titleKey: "risk_analysis", url: "/dashboard/handbook/iso-45001/preconditions/risk-analysis" },
                { id: "1-4-1-6", titleKey: "exclusion_criteria", url: "/dashboard/handbook/iso-45001/preconditions/exclusion-criteria" },
                { id: "1-4-1-7", titleKey: "laws_regulations", url: "/dashboard/handbook/iso-45001/preconditions/laws-regulations" },
              ],
            },
            {
              id: "1-4-2",
              titleKey: "execution_care",
              url: "/dashboard/handbook/iso-45001/execution-care",
              children: [
                { id: "1-4-2-1", titleKey: "methods", url: "/dashboard/handbook/iso-45001/execution-care/methods" },
                { id: "1-4-2-2", titleKey: "employees", url: "/dashboard/handbook/iso-45001/execution-care/employees" },
                { id: "1-4-2-3", titleKey: "functioning_conversations", url: "/dashboard/handbook/iso-45001/execution-care/functioning-conversations" },
                { id: "1-4-2-4", titleKey: "subcontractor_agreements", url: "/dashboard/handbook/iso-45001/execution-care/subcontractor-agreements" },
                { id: "1-4-2-5", titleKey: "procurement", url: "/dashboard/handbook/iso-45001/execution-care/procurement" },
                { id: "1-4-2-6", titleKey: "work_environment", url: "/dashboard/handbook/iso-45001/execution-care/work-environment" },
                { id: "1-4-2-7", titleKey: "equipment_maintenance", url: "/dashboard/handbook/iso-45001/execution-care/equipment-maintenance" },
              ],
            },
            {
              id: "1-4-3",
              titleKey: "the_client",
              url: "/dashboard/handbook/iso-45001/the-client",
              children: [
                { id: "1-4-3-1", titleKey: "client_information", url: "/dashboard/handbook/iso-45001/the-client/information" },
                { id: "1-4-3-2", titleKey: "individual_risk", url: "/dashboard/handbook/iso-45001/the-client/individual-risk" },
                { id: "1-4-3-3", titleKey: "care_plan", url: "/dashboard/handbook/iso-45001/the-client/care-plan" },
              ],
            },
            {
              id: "1-4-4",
              titleKey: "learning_improving",
              url: "/dashboard/handbook/iso-45001/learning-improving",
              children: [
                { id: "1-4-4-1", titleKey: "client_experiences", url: "/dashboard/handbook/iso-45001/learning-improving/client-experiences" },
                { id: "1-4-4-2", titleKey: "participation", url: "/dashboard/handbook/iso-45001/learning-improving/participation" },
                { id: "1-4-4-3", titleKey: "signals", url: "/dashboard/handbook/iso-45001/learning-improving/signals" },
                { id: "1-4-4-4", titleKey: "employee_experiences", url: "/dashboard/handbook/iso-45001/learning-improving/employee-experiences" },
                { id: "1-4-4-5", titleKey: "incidents_complaints", url: "/dashboard/handbook/iso-45001/learning-improving/incidents-complaints" },
                { id: "1-4-4-6", titleKey: "organization_assessment", url: "/dashboard/handbook/iso-45001/learning-improving/organization-assessment" },
              ],
            },
          ],
        },
        { id: "1-5", titleKey: "backup", url: "/dashboard/handbook/backup" },
        {
          id: "1-6",
          titleKey: "hkz_small_organizations_2021",
          url: "/dashboard/handbook/hkz-kleine-organisaties-2021",
          descriptionKey: "hkz_small_organizations_2021_description",
          children: [
            {
              id: "1-6-1",
              titleKey: "preconditions",
              url: "/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions",
              children: [
                { id: "1-6-1-1", titleKey: "context_analysis", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions/context-analysis" },
                { id: "1-6-1-2", titleKey: "mission_vision", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions/mission-vision" },
                { id: "1-6-1-3", titleKey: "goals", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions/goals" },
                { id: "1-6-1-4", titleKey: "attitude_leadership", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions/attitude-leadership" },
                { id: "1-6-1-5", titleKey: "risk_analysis", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions/risk-analysis" },
                { id: "1-6-1-6", titleKey: "exclusion_criteria", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions/exclusion-criteria" },
                { id: "1-6-1-7", titleKey: "laws_regulations", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions/laws-regulations" },
              ],
            },
            {
              id: "1-6-2",
              titleKey: "execution_care",
              url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care",
              children: [
                { id: "1-6-2-1", titleKey: "methods", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/methods" },
                { id: "1-6-2-1-1", titleKey: "hygiene_infection_prevention", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/hygiene-infection-prevention" },
                { id: "1-6-2-2", titleKey: "employees", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/employees" },
                { id: "1-6-2-2-1", titleKey: "job_descriptions", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/job-descriptions" },
                { id: "1-6-2-2-2", titleKey: "safe_care_relationship", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/safe-care-relationship" },
                { id: "1-6-2-3", titleKey: "functioning_conversations", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/functioning-conversations" },
                { id: "1-6-2-4", titleKey: "subcontractor_agreements", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/subcontractor-agreements" },
                { id: "1-6-2-5", titleKey: "procurement", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/procurement" },
                { id: "1-6-2-6", titleKey: "work_environment", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/work-environment" },
                { id: "1-6-2-7", titleKey: "equipment_maintenance", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/equipment-maintenance" },
              ],
            },
            {
              id: "1-6-3",
              titleKey: "the_client",
              url: "/dashboard/handbook/hkz-kleine-organisaties-2021/the-client",
              children: [
                { id: "1-6-3-1", titleKey: "client_information", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/the-client/information" },
                { id: "1-6-3-2", titleKey: "individual_risk", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/the-client/individual-risk" },
                { id: "1-6-3-3", titleKey: "care_plan", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/the-client/care-plan" },
              ],
            },
            {
              id: "1-6-4",
              titleKey: "learning_improving",
              url: "/dashboard/handbook/hkz-kleine-organisaties-2021/learning-improving",
              children: [
                { id: "1-6-4-1", titleKey: "client_experiences", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/learning-improving/client-experiences" },
                { id: "1-6-4-2", titleKey: "participation", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/learning-improving/participation" },
                { id: "1-6-4-3", titleKey: "signals", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/learning-improving/signals" },
                { id: "1-6-4-4", titleKey: "employee_experiences", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/learning-improving/employee-experiences" },
                { id: "1-6-4-5", titleKey: "incidents_complaints", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/learning-improving/incidents-complaints" },
                { id: "1-6-4-6", titleKey: "organization_assessment", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/learning-improving/organization-assessment" },
              ],
            },
          ],
        },
        {
          id: "1-7",
          titleKey: "hkz_vvt",
          url: "/dashboard/handbook/hkz-vvt",
          descriptionKey: "hkz_vvt_description",
          children: [
            { id: "1-7-1", titleKey: "registration_intake", url: "/dashboard/handbook/hkz-vvt/registration-intake" },
            {
              id: "1-7-2",
              titleKey: "care_execution_vvt",
              url: "/dashboard/handbook/hkz-vvt/execution-care",
              children: [
                { id: "1-7-2-1", titleKey: "hygiene_infection_prevention", url: "/dashboard/handbook/hkz-vvt/execution-care/hygiene-infection-prevention" },
              ],
            },
            {
              id: "1-7-3",
              titleKey: "evaluation_end_care",
              url: "/dashboard/handbook/hkz-vvt/evaluation-end-care",
              children: [
                { id: "1-7-3-1", titleKey: "client_satisfaction", url: "/dashboard/handbook/hkz-vvt/evaluation-end-care/client-satisfaction" },
              ],
            },
            {
              id: "1-7-4",
              titleKey: "organization_quality",
              url: "/dashboard/handbook/hkz-vvt/organization-quality",
              children: [
                { id: "1-7-4-1", titleKey: "audit", url: "/dashboard/handbook/hkz-vvt/organization-quality/audit" },
                { id: "1-7-4-2", titleKey: "participation", url: "/dashboard/handbook/hkz-vvt/organization-quality/participation" },
              ],
            },
            {
              id: "1-7-5",
              titleKey: "staff_vvt",
              url: "/dashboard/handbook/hkz-vvt/staff",
              children: [
                { id: "1-7-5-1", titleKey: "job_descriptions", url: "/dashboard/handbook/hkz-vvt/staff/job-descriptions" },
                { id: "1-7-5-2", titleKey: "safe_care_relationship", url: "/dashboard/handbook/hkz-vvt/staff/safe-care-relationship" },
              ],
            },
            { id: "1-7-6", titleKey: "development_innovation", url: "/dashboard/handbook/hkz-vvt/development-innovation" },
            { id: "1-7-7", titleKey: "work_environment_safety", url: "/dashboard/handbook/hkz-vvt/work-environment-safety" },
            { id: "1-7-8", titleKey: "procurement_tendering", url: "/dashboard/handbook/hkz-vvt/procurement-tendering" },
            { id: "1-7-9", titleKey: "documentation_regulations", url: "/dashboard/handbook/hkz-vvt/documentation-regulations" },
          ],
        },
        {
          id: "1-8",
          titleKey: "vca",
          url: "/dashboard/handbook/vca",
          descriptionKey: "vca_description",
          children: [
            {
              id: "1-8-1",
              titleKey: "policy",
              url: "/dashboard/handbook/vca/policy",
              children: [
                { id: "1-8-1-1", titleKey: "vca_certificate", url: "/dashboard/handbook/vca/policy/vca-certificate" },
                { id: "1-8-1-2", titleKey: "policy_statement", url: "/dashboard/handbook/vca/policy/policy-statement" },
                { id: "1-8-1-3", titleKey: "job_description_director", url: "/dashboard/handbook/vca/policy/job-description-director" },
                { id: "1-8-1-4", titleKey: "job_description_executor", url: "/dashboard/handbook/vca/policy/job-description-executor" },
                {
                  id: "1-8-1-5",
                  titleKey: "job_description_vgm_officer",
                  url: "/dashboard/handbook/vca/policy/job-description-vgm-officer",
                  children: [
                    { id: "1-8-1-5-1", titleKey: "qualification_vgm_officer", url: "/dashboard/handbook/vca/policy/job-description-vgm-officer/qualification-vgm-officer" },
                    { id: "1-8-1-5-2", titleKey: "qualification_external_vgm_expert", url: "/dashboard/handbook/vca/policy/job-description-vgm-officer/qualification-external-vgm-expert" },
                  ],
                },
                { id: "1-8-1-6", titleKey: "personnel_assessments", url: "/dashboard/handbook/vca/policy/personnel-assessments" },
                { id: "1-8-1-7", titleKey: "internal_audit_reports", url: "/dashboard/handbook/vca/policy/internal-audit-reports" },
                { id: "1-8-1-8", titleKey: "external_audit_reports", url: "/dashboard/handbook/vca/policy/external-audit-reports" },
                { id: "1-8-1-9", titleKey: "management_reviews", url: "/dashboard/handbook/vca/policy/management-reviews" },
              ],
            },
            {
              id: "1-8-2",
              titleKey: "risks",
              url: "/dashboard/handbook/vca/risks",
              children: [
                { id: "1-8-2-1", titleKey: "frm_tra", url: "/dashboard/handbook/vca/risks/frm-tra" },
                { id: "1-8-2-2", titleKey: "risk_inventory_evaluation", url: "/dashboard/handbook/vca/risks/risk-inventory-evaluation" },
              ],
            },
            {
              id: "1-8-3",
              titleKey: "competence",
              url: "/dashboard/handbook/vca/competence",
              children: [
                { id: "1-8-3-1", titleKey: "frm_employee_introduction", url: "/dashboard/handbook/vca/competence/frm-employee-introduction" },
                { id: "1-8-3-2", titleKey: "function_table", url: "/dashboard/handbook/vca/competence/function-table" },
                { id: "1-8-3-3", titleKey: "safety_booklet", url: "/dashboard/handbook/vca/competence/safety-booklet" },
                { id: "1-8-3-4", titleKey: "communication_plan", url: "/dashboard/handbook/vca/competence/communication-plan" },
              ],
            },
            {
              id: "1-8-4",
              titleKey: "ohs_awareness",
              url: "/dashboard/handbook/vca/ohs-awareness",
              children: [
                {
                  id: "1-8-4-1",
                  titleKey: "improvement_program_ohs_awareness",
                  url: "/dashboard/handbook/vca/ohs-awareness/improvement-program-ohs-awareness",
                  children: [
                    { id: "1-8-4-1-1", titleKey: "assessment_list_ohs_behavior", url: "/dashboard/handbook/vca/ohs-awareness/improvement-program-ohs-awareness/assessment-list-ohs-behavior" },
                    { id: "1-8-4-1-2", titleKey: "toolbox_meeting_behavior_improvement", url: "/dashboard/handbook/vca/ohs-awareness/improvement-program-ohs-awareness/toolbox-meeting-behavior-improvement" },
                    { id: "1-8-4-1-3", titleKey: "toolbox_meeting_safety_together", url: "/dashboard/handbook/vca/ohs-awareness/improvement-program-ohs-awareness/toolbox-meeting-safety-together" },
                  ],
                },
                { id: "1-8-4-2", titleKey: "list_dates_topics_presentation", url: "/dashboard/handbook/vca/ohs-awareness/list-dates-topics-presentation" },
              ],
            },
            { id: "1-8-5", titleKey: "ohs_project_plan", url: "/dashboard/handbook/vca/ohs-project-plan" },
            {
              id: "1-8-6",
              titleKey: "emergency_situations",
              url: "/dashboard/handbook/vca/emergency-situations",
              children: [
                { id: "1-8-6-1", titleKey: "alarm_card", url: "/dashboard/handbook/vca/emergency-situations/alarm-card" },
              ],
            },
            {
              id: "1-8-7",
              titleKey: "inspections",
              url: "/dashboard/handbook/vca/inspections",
              children: [
                { id: "1-8-7-1", titleKey: "inspection_test", url: "/dashboard/handbook/vca/inspections/inspection-test" },
              ],
            },
            {
              id: "1-8-8",
              titleKey: "health",
              url: "/dashboard/handbook/vca/health",
              children: [
                { id: "1-8-8-1", titleKey: "proof_medical_expert_competence", url: "/dashboard/handbook/vca/health/proof-medical-expert-competence" },
              ],
            },
            {
              id: "1-8-9",
              titleKey: "resources",
              url: "/dashboard/handbook/vca/resources",
              children: [
                { id: "1-8-9-1", titleKey: "ohs_specification_work_resources", url: "/dashboard/handbook/vca/resources/ohs-specification-work-resources" },
                { id: "1-8-9-2", titleKey: "overview_management_work_resources", url: "/dashboard/handbook/vca/resources/overview-management-work-resources" },
              ],
            },
            { id: "1-8-10", titleKey: "procurement_services", url: "/dashboard/handbook/vca/procurement-services" },
            { id: "1-8-11", titleKey: "ohs_incidents", url: "/dashboard/handbook/vca/ohs-incidents" },
          ],
        },
      ],
    },
  ];

  // Filter structure based on active certification
  const getFilteredStructure = (): TreeNode[] => {
    if (!isOnCertificationPage) {
      // On main handbook page, show all top-level items
      return fullHandbookStructure;
    }
    
    // When on a certification page, only show that certification's tree
    const qualityHandbook = fullHandbookStructure[0];
    if (!qualityHandbook || !qualityHandbook.children) {
      return fullHandbookStructure;
    }
    
    // Find the active certification in the children
    const activeCert = qualityHandbook.children.find(child => {
      if (activeCertification === 'iso-9001') return child.id === '1-3';
      if (activeCertification === 'iso-45001') return child.id === '1-4';
      if (activeCertification === 'hkz-kleine-organisaties-2021') return child.id === '1-6';
      if (activeCertification === 'hkz-vvt') return child.id === '1-7';
      if (activeCertification === 'vca') return child.id === '1-8';
      return false;
    });
    
    if (activeCert) {
      // Return only the active certification (without the parent wrapper)
      // This gives a cleaner, focused view of just that certification
      return [activeCert];
    }
    
    return fullHandbookStructure;
  };

  const handbookStructure = getFilteredStructure();

  return (
    <div className="space-y-2">
      {/* Back to Handbook link when on a certification page */}
      {isOnCertificationPage && (
        <Link
          href="/dashboard/handbook"
          className="flex items-center gap-2 py-2 px-2 rounded-md hover:bg-accent transition-colors text-sm text-muted-foreground hover:text-foreground mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Handbook</span>
        </Link>
      )}
      
      {handbookStructure.map((item) => (
        <TreeItem key={item.id} item={item} />
      ))}
    </div>
  )
}

