import { VcaSectionCard, VcaSectionHeading } from './utils'
import Image from 'next/image'

interface QualificationExternalVgmExpertSectionProps {
  title: string;
  hasImage?: boolean;
}

export const QualificationExternalVgmExpertSection = ({ 
  title, 
  hasImage = true 
}: QualificationExternalVgmExpertSectionProps) => {
  return (
    <VcaSectionCard>
      <VcaSectionHeading title={title} level={1} />
      <div style={{ minHeight: '400px', color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
        {hasImage && (
          <div className="mt-6 mb-4">
            <Image
              src="/documents/hvk-diploma-optic.jpg"
              alt="hvk-diploma-optic"
              width={800}
              height={600}
              className="max-w-full h-auto rounded"
              style={{ maxWidth: '100%', height: 'auto' }}
              unoptimized
            />
          </div>
        )}
      </div>
    </VcaSectionCard>
  );
};

