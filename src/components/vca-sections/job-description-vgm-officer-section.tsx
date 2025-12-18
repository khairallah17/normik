import { VcaSectionCard, VcaSectionHeading } from './utils'
import Image from 'next/image'

interface JobDescriptionVgmOfficerSectionProps {
  title: string;
  content: string;
}

export const JobDescriptionVgmOfficerSection = ({ 
  title, 
  content 
}: JobDescriptionVgmOfficerSectionProps) => {
  return (
    <VcaSectionCard>
      <VcaSectionHeading title={title} level={1} />
      <div style={{ minHeight: '400px', color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
        {(() => {
          const lines = content.split('\n');
          const result = [];
          let currentParagraph = [];
          
          // Known section headings
          const sectionHeadings = [
            'Plaats in de organisatie', 
            'Verantwoordelijkheid', 
            'Taken/verantwoordelijkheden',
            'Bevoegdheden',
            'Opleidings- en ervaringseisen',
            'Vervanging'
          ];
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmedLine = line.trim();
            
            // Check if this is a section heading (exact match or starts with heading)
            const isHeading = sectionHeadings.some(heading => trimmedLine === heading || trimmedLine.startsWith(heading));
            
            // Also check for "Noot:" which should be treated as a special note
            const isNote = trimmedLine.startsWith('Noot:');
            
            if (isHeading) {
              // If we have accumulated content, render it first
              if (currentParagraph.length > 0) {
                result.push(
                  <p key={`p-${i}`} className="mb-4" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                    {currentParagraph.join(' ')}
                  </p>
                );
                currentParagraph = [];
              }
              
              // Render the heading as h2 (matching HTML structure)
              result.push(
                <h2 key={`h-${i}`} className="mb-2 font-semibold" style={{ color: '#333', fontSize: '16px', lineHeight: '1.6', fontWeight: 600, marginTop: '16px', marginBottom: '8px' }}>
                  {trimmedLine}
                </h2>
              );
            } else if (isNote) {
              // Render note in italic
              if (currentParagraph.length > 0) {
                result.push(
                  <p key={`p-${i}`} className="mb-2" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                    {currentParagraph.join(' ')}
                  </p>
                );
                currentParagraph = [];
              }
              result.push(
                <p key={`note-${i}`} className="mb-4 italic" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6', fontStyle: 'italic' }}>
                  {trimmedLine}
                </p>
              );
            } else if (trimmedLine.startsWith('-')) {
              // Bullet point
              if (currentParagraph.length > 0) {
                result.push(
                  <p key={`p-${i}`} className="mb-2" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                    {currentParagraph.join(' ')}
                  </p>
                );
                currentParagraph = [];
              }
              result.push(
                <p key={`bullet-${i}`} className="mb-1 ml-4" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {trimmedLine}
                </p>
              );
            } else if (trimmedLine) {
              // Regular content line
              currentParagraph.push(trimmedLine);
            } else if (currentParagraph.length > 0) {
              // Empty line - end current paragraph
              result.push(
                <p key={`p-${i}`} className="mb-4" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                  {currentParagraph.join(' ')}
                </p>
              );
              currentParagraph = [];
            }
          }
          
          // Render any remaining content
          if (currentParagraph.length > 0) {
            result.push(
              <p key="p-final" className="mb-4" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                {currentParagraph.join(' ')}
              </p>
            );
          }
          
          // Add the HVK diploma image after the content
          result.push(
            <div key="image-container" className="mt-6 mb-4">
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
          );
          
          return result;
        })()}
      </div>
    </VcaSectionCard>
  );
};

