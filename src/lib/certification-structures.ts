/**
 * Certification Structure Definitions
 * 
 * Contains the tree structure for each certification
 */

export interface TreeNode {
  id: string
  titleKey: string
  descriptionKey?: string
  url: string
  children?: TreeNode[]
}

// ISO 9001 Structure
export const iso9001Structure: TreeNode[] = [
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
];

// ISO 45001 Structure (same as ISO 9001 for now)
export const iso45001Structure: TreeNode[] = [
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
];

// HKZ Kleine Organisaties 2021 Structure
export const hkzKleineOrganisaties2021Structure: TreeNode[] = [
  {
    id: "1-6-1",
    titleKey: "preconditions",
    url: "/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions",
    children: [
      { id: "1-6-1-1", titleKey: "context_analysis", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/preconditions/context-analysis" },
    ],
  },
  {
    id: "1-6-2",
    titleKey: "execution_care",
    url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care",
    children: [
      { 
        id: "1-6-2-1", 
        titleKey: "methods", 
        url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/methods",
        children: [
          { id: "1-6-2-1-1", titleKey: "hygiene_infection_prevention", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/hygiene-infection-prevention" },
        ],
      },
      { 
        id: "1-6-2-2", 
        titleKey: "employees", 
        url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/employees",
        children: [
          { id: "1-6-2-2-1", titleKey: "job_descriptions", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/job-descriptions" },
          { id: "1-6-2-2-2", titleKey: "safe_care_relationship", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/execution-care/safe-care-relationship" },
        ],
      },
    ],
  },
  {
    id: "1-6-3",
    titleKey: "evaluation_end_care",
    url: "/dashboard/handbook/hkz-kleine-organisaties-2021/evaluation-end-care",
    children: [
      { id: "1-6-3-1", titleKey: "client_satisfaction", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/evaluation-end-care/client-satisfaction" },
    ],
  },
  {
    id: "1-6-4",
    titleKey: "organization_quality",
    url: "/dashboard/handbook/hkz-kleine-organisaties-2021/organization-quality",
    children: [
      { id: "1-6-4-1", titleKey: "audit", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/organization-quality/audit" },
      { id: "1-6-4-2", titleKey: "participation", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/organization-quality/participation" },
    ],
  },
  {
    id: "1-6-5",
    titleKey: "staff",
    url: "/dashboard/handbook/hkz-kleine-organisaties-2021/staff",
    children: [
      { id: "1-6-5-1", titleKey: "job_descriptions", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/staff/job-descriptions" },
      { id: "1-6-5-2", titleKey: "safe_care_relationship", url: "/dashboard/handbook/hkz-kleine-organisaties-2021/staff/safe-care-relationship" },
    ],
  },
];

// HKZ VVT Structure
export const hkzVvtStructure: TreeNode[] = [
  {
    id: "1-7-1",
    titleKey: "execution_care",
    url: "/dashboard/handbook/hkz-vvt/execution-care",
    children: [
      { 
        id: "1-7-1-1", 
        titleKey: "methods", 
        url: "/dashboard/handbook/hkz-vvt/execution-care/methods",
        children: [
          { id: "1-7-1-1-1", titleKey: "hygiene_infection_prevention", url: "/dashboard/handbook/hkz-vvt/execution-care/hygiene-infection-prevention" },
        ],
      },
    ],
  },
  {
    id: "1-7-2",
    titleKey: "evaluation_end_care",
    url: "/dashboard/handbook/hkz-vvt/evaluation-end-care",
    children: [
      { id: "1-7-2-1", titleKey: "client_satisfaction", url: "/dashboard/handbook/hkz-vvt/evaluation-end-care/client-satisfaction" },
    ],
  },
  {
    id: "1-7-3",
    titleKey: "organization_quality",
    url: "/dashboard/handbook/hkz-vvt/organization-quality",
    children: [
      { id: "1-7-3-1", titleKey: "audit", url: "/dashboard/handbook/hkz-vvt/organization-quality/audit" },
      { id: "1-7-3-2", titleKey: "participation", url: "/dashboard/handbook/hkz-vvt/organization-quality/participation" },
    ],
  },
  {
    id: "1-7-4",
    titleKey: "staff",
    url: "/dashboard/handbook/hkz-vvt/staff",
    children: [
      { id: "1-7-4-1", titleKey: "job_descriptions", url: "/dashboard/handbook/hkz-vvt/staff/job-descriptions" },
      { id: "1-7-4-2", titleKey: "safe_care_relationship", url: "/dashboard/handbook/hkz-vvt/staff/safe-care-relationship" },
    ],
  },
];

// VCA Structure
export const vcaStructure: TreeNode[] = [
  {
    id: "1-8-0",
    titleKey: "general",
    url: "/dashboard/vca/general",
    children: [
      { id: "1-8-0-1", titleKey: "relevant_laws_regulations", url: "/dashboard/vca/general/laws-regulations" },
    ],
  },
  {
    id: "1-8-1",
    titleKey: "policy",
    url: "/dashboard/vca/policy",
    children: [
      { id: "1-8-1-1", titleKey: "vca_certificate", url: "/dashboard/vca/policy/vca-certificate" },
      { id: "1-8-1-2", titleKey: "policy_statement", url: "/dashboard/vca/policy/policy-statement" },
      { id: "1-8-1-3", titleKey: "job_description_director", url: "/dashboard/vca/policy/job-description-director" },
      { id: "1-8-1-4", titleKey: "job_description_executor", url: "/dashboard/vca/policy/job-description-executor" },
      {
        id: "1-8-1-5",
        titleKey: "job_description_vgm_officer",
        url: "/dashboard/vca/policy/job-description-vgm-officer",
        children: [
          { id: "1-8-1-5-1", titleKey: "qualification_vgm_officer", url: "/dashboard/vca/policy/job-description-vgm-officer/qualification-vgm-officer" },
          { id: "1-8-1-5-2", titleKey: "qualification_external_vgm_expert", url: "/dashboard/vca/policy/job-description-vgm-officer/qualification-external-vgm-expert" },
        ],
      },
      { id: "1-8-1-6", titleKey: "personnel_assessments", url: "/dashboard/vca/policy/personnel-assessments" },
      { id: "1-8-1-7", titleKey: "internal_audit_reports", url: "/dashboard/vca/policy/internal-audit-reports" },
      { id: "1-8-1-8", titleKey: "external_audit_reports", url: "/dashboard/vca/policy/external-audit-reports" },
      { id: "1-8-1-9", titleKey: "management_reviews", url: "/dashboard/vca/policy/management-reviews" },
    ],
  },
  {
    id: "1-8-2",
    titleKey: "risks",
    url: "/dashboard/vca/risks",
    children: [
      { id: "1-8-2-1", titleKey: "frm_tra", url: "/dashboard/vca/risks/frm-tra" },
      { id: "1-8-2-2", titleKey: "risk_inventory_evaluation", url: "/dashboard/vca/risks/risk-inventory-evaluation" },
    ],
  },
  {
    id: "1-8-3",
    titleKey: "competence",
    url: "/dashboard/vca/competence",
    children: [
      { id: "1-8-3-1", titleKey: "frm_employee_introduction", url: "/dashboard/vca/competence/frm-employee-introduction" },
      { id: "1-8-3-2", titleKey: "function_table", url: "/dashboard/vca/competence/function-table" },
      { id: "1-8-3-3", titleKey: "safety_booklet", url: "/dashboard/vca/competence/safety-booklet" },
      { id: "1-8-3-4", titleKey: "communication_plan", url: "/dashboard/vca/competence/communication-plan" },
    ],
  },
  {
    id: "1-8-4",
    titleKey: "ohs_awareness",
    url: "/dashboard/vca/ohs-awareness",
    children: [
      {
        id: "1-8-4-1",
        titleKey: "improvement_program_ohs_awareness",
        url: "/dashboard/vca/ohs-awareness/improvement-program-ohs-awareness",
        children: [
          { id: "1-8-4-1-1", titleKey: "assessment_list_ohs_behavior", url: "/dashboard/vca/ohs-awareness/improvement-program-ohs-awareness/assessment-list-ohs-behavior" },
          { id: "1-8-4-1-2", titleKey: "toolbox_meeting_behavior_improvement", url: "/dashboard/vca/ohs-awareness/improvement-program-ohs-awareness/toolbox-meeting-behavior-improvement" },
          { id: "1-8-4-1-3", titleKey: "toolbox_meeting_safety_together", url: "/dashboard/vca/ohs-awareness/improvement-program-ohs-awareness/toolbox-meeting-safety-together" },
        ],
      },
      { id: "1-8-4-2", titleKey: "list_dates_topics_presentation", url: "/dashboard/vca/ohs-awareness/list-dates-topics-presentation" },
    ],
  },
  { id: "1-8-5", titleKey: "ohs_project_plan", url: "/dashboard/vca/ohs-project-plan" },
  {
    id: "1-8-6",
    titleKey: "emergency_situations",
    url: "/dashboard/vca/emergency-situations",
    children: [
      { id: "1-8-6-1", titleKey: "alarm_card", url: "/dashboard/vca/emergency-situations/alarm-card" },
    ],
  },
  {
    id: "1-8-7",
    titleKey: "inspections",
    url: "/dashboard/vca/inspections",
    children: [
      { id: "1-8-7-1", titleKey: "inspection_test", url: "/dashboard/vca/inspections/inspection-test" },
    ],
  },
  {
    id: "1-8-8",
    titleKey: "health",
    url: "/dashboard/vca/health",
    children: [
      { id: "1-8-8-1", titleKey: "proof_medical_expert_competence", url: "/dashboard/vca/health/proof-medical-expert-competence" },
    ],
  },
  {
    id: "1-8-9",
    titleKey: "resources",
    url: "/dashboard/vca/resources",
    children: [
      { id: "1-8-9-1", titleKey: "ohs_specification_work_resources", url: "/dashboard/vca/resources/ohs-specification-work-resources" },
      { id: "1-8-9-2", titleKey: "overview_management_work_resources", url: "/dashboard/vca/resources/overview-management-work-resources" },
    ],
  },
  { id: "1-8-10", titleKey: "procurement_services", url: "/dashboard/vca/procurement-services" },
  { id: "1-8-11", titleKey: "ohs_incidents", url: "/dashboard/vca/ohs-incidents" },
  {
    id: "1-8-12",
    titleKey: "modules",
    url: "/dashboard/vca/modules",
    children: [
      { id: "1-8-12-1", titleKey: "work_plans", url: "/dashboard/vca/modules/work-plans" },
      { id: "1-8-12-2", titleKey: "workplace_inspections", url: "/dashboard/vca/modules/workplace-inspections" },
      { id: "1-8-12-3", titleKey: "notifications", url: "/dashboard/vca/modules/notifications" },
      { id: "1-8-12-4", titleKey: "personnel", url: "/dashboard/vca/modules/personnel" },
      { id: "1-8-12-5", titleKey: "work_equipment", url: "/dashboard/vca/modules/work-equipment" },
    ],
  },
];

// Helper function to get structure by certification ID
export function getCertificationStructure(certificationId: string): TreeNode[] {
  switch (certificationId) {
    case 'iso-9001':
      return iso9001Structure;
    case 'iso-45001':
      return iso45001Structure;
    case 'hkz-kleine-organisaties-2021':
      return hkzKleineOrganisaties2021Structure;
    case 'hkz-vvt':
      return hkzVvtStructure;
    case 'vca':
      return vcaStructure;
    default:
      return [];
  }
}


