import { VcaSectionCard, VcaSectionHeading, ReferencesList } from './utils'
import { usePathname } from '@/i18n/routing'

interface PolicyStatementSectionProps {
  title: string;
  content: string;
  references?: readonly string[];
}

export const PolicyStatementSection = ({ 
  title, 
  content, 
  references 
}: PolicyStatementSectionProps) => {
  const pathname = usePathname();
  
  return (
    <VcaSectionCard>
      <VcaSectionHeading title={title} level={2} />
      <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
        {content}
      </div>
      {references && <ReferencesList references={references} />}
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
    </VcaSectionCard>
  );
};

