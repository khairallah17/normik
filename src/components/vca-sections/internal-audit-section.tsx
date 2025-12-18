import { VcaSectionCard, VcaSectionHeading, ReferencesList } from './utils'

interface InternalAuditSectionProps {
  title: string;
  content: string;
  references?: readonly string[];
}

export const InternalAuditSection = ({ 
  title, 
  content, 
  references 
}: InternalAuditSectionProps) => {
  return (
    <VcaSectionCard>
      <VcaSectionHeading title={title} level={2} />
      <div className="whitespace-pre-line" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
        {content}
      </div>
      {references && <ReferencesList references={references} />}
    </VcaSectionCard>
  );
};

