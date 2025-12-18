import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

// Helper function to get URL for a reference key
export const getReferenceUrl = (refKey: string): string | null => {
  const referenceUrlMap: Record<string, string> = {
    'policy_statement': '/dashboard/vca/policy/policy-statement',
    'organogram': '/dashboard/vca/general',
    'job_description_vgm_officer': '/dashboard/vca/policy/job-description-vgm-officer',
    'diplomas_certificates_vgm_officer': '/dashboard/vca/policy/job-description-vgm-officer/qualification-vgm-officer',
    'appointment_letter_vgm_officer': '/dashboard/vca/policy/job-description-vgm-officer/qualification-vgm-officer',
    'job_description_director': '/dashboard/vca/policy/job-description-director',
    'job_description_executor': '/dashboard/vca/policy/job-description-executor',
    'personnel_assessments': '/dashboard/vca/policy/personnel-assessments',
    'internal_audit_reports': '/dashboard/vca/policy/internal-audit-reports',
    'internal_audit_report': '/dashboard/vca/policy/internal-audit-reports',
    'management_reviews': '/dashboard/vca/policy/management-reviews',
    'management_review_year_plan': '/dashboard/vca/policy/management-reviews',
  };
  return referenceUrlMap[refKey] || null;
};

// Component for rendering references
export const ReferencesList = ({ references }: { references: readonly string[] }) => {
  const tStructure = useTranslations('handbook.structure');
  
  if (!references || references.length === 0) return null;
  
  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <p className="font-semibold mb-2" style={{ color: '#333', fontSize: '14px', fontWeight: 600 }}>Referentie:</p>
      <ul className="list-disc list-inside space-y-1" style={{ color: '#333', fontSize: '14px' }}>
        {references.map((ref, idx) => {
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
  );
};

// Shared card wrapper component
export const VcaSectionCard = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      <div className="card-body p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
        {children}
      </div>
    </div>
  );
};

// Shared heading component
export const VcaSectionHeading = ({ 
  title, 
  level = 2 
}: { 
  title: string;
  level?: 1 | 2;
}) => {
  const HeadingTag = level === 1 ? 'h1' : 'h2';
  const fontSize = level === 1 ? '24px' : '18px';
  const marginBottom = level === 1 ? '16px' : undefined;
  
  return (
    <HeadingTag 
      className="font-semibold mb-4" 
      style={{ 
        color: '#333', 
        fontSize, 
        fontWeight: 600, 
        marginBottom 
      }}
    >
      {title}
    </HeadingTag>
  );
};

