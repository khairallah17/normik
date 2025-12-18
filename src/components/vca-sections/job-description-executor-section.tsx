import { VcaSectionCard, VcaSectionHeading } from './utils'

interface JobDescriptionExecutorSectionProps {
  title: string;
  content: string;
}

export const JobDescriptionExecutorSection = ({ 
  title, 
  content 
}: JobDescriptionExecutorSectionProps) => {
  return (
    <VcaSectionCard>
      <VcaSectionHeading title={title} level={2} />
      <div style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
        {(() => {
          const lines = content.split('\n');
          const result = [];
          let currentParagraph = [];
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmedLine = line.trim();
            
            // Check if this is a section heading (ends with colon or is a standalone heading)
            if (trimmedLine && (trimmedLine.endsWith(':') || (i < lines.length - 1 && lines[i + 1]?.trim() && !lines[i + 1]?.trim().startsWith('-')))) {
              // If we have accumulated content, render it first
              if (currentParagraph.length > 0) {
                result.push(
                  <p key={`p-${i}`} className="mb-4" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
                    {currentParagraph.join(' ')}
                  </p>
                );
                currentParagraph = [];
              }
              
              // Render the heading as bold
              result.push(
                <p key={`h-${i}`} className="mb-2 font-semibold" style={{ color: '#333', fontSize: '14px', lineHeight: '1.6', fontWeight: 600 }}>
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
          
          return result;
        })()}
      </div>
    </VcaSectionCard>
  );
};

