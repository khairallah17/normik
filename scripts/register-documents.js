/**
 * Document Registry Generator
 * 
 * This script scans the public/documents folder and automatically
 * generates the document registry based on files found.
 * 
 * Usage: node scripts/register-documents.js
 */

const fs = require('fs').promises;
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/documents');
const REGISTRY_FILE = path.join(__dirname, '../src/lib/documents.ts');

// Path mapping from file system to URL paths
const PATH_MAPPING = {
  'iso-9001/preconditions/context-analysis': '/dashboard/handbook/iso-9001/preconditions/context-analysis',
  'iso-9001/preconditions/mission-vision': '/dashboard/handbook/iso-9001/preconditions/mission-vision',
  'iso-9001/preconditions/goals': '/dashboard/handbook/iso-9001/preconditions/goals',
  'iso-9001/preconditions/attitude-leadership': '/dashboard/handbook/iso-9001/preconditions/attitude-leadership',
  'iso-9001/preconditions/risk-analysis': '/dashboard/handbook/iso-9001/preconditions/risk-analysis',
  'iso-9001/preconditions/exclusion-criteria': '/dashboard/handbook/iso-9001/preconditions/exclusion-criteria',
  'iso-9001/preconditions/laws-regulations': '/dashboard/handbook/iso-9001/preconditions/laws-regulations',
  'iso-9001/execution-care/methods': '/dashboard/handbook/iso-9001/execution-care/methods',
  'iso-9001/execution-care/employees': '/dashboard/handbook/iso-9001/execution-care/employees',
  'iso-9001/execution-care/functioning-conversations': '/dashboard/handbook/iso-9001/execution-care/functioning-conversations',
  'iso-9001/execution-care/subcontractor-agreements': '/dashboard/handbook/iso-9001/execution-care/subcontractor-agreements',
  'iso-9001/execution-care/procurement': '/dashboard/handbook/iso-9001/execution-care/procurement',
  'iso-9001/execution-care/work-environment': '/dashboard/handbook/iso-9001/execution-care/work-environment',
  'iso-9001/execution-care/equipment-maintenance': '/dashboard/handbook/iso-9001/execution-care/equipment-maintenance',
  'iso-9001/the-client/information': '/dashboard/handbook/iso-9001/the-client/information',
  'iso-9001/the-client/individual-risk': '/dashboard/handbook/iso-9001/the-client/individual-risk',
  'iso-9001/the-client/care-plan': '/dashboard/handbook/iso-9001/the-client/care-plan',
  'iso-9001/learning-improving/client-experiences': '/dashboard/handbook/iso-9001/learning-improving/client-experiences',
  'iso-9001/learning-improving/participation': '/dashboard/handbook/iso-9001/learning-improving/participation',
  'iso-9001/learning-improving/signals': '/dashboard/handbook/iso-9001/learning-improving/signals',
  'iso-9001/learning-improving/employee-experiences': '/dashboard/handbook/iso-9001/learning-improving/employee-experiences',
  'iso-9001/learning-improving/incidents-complaints': '/dashboard/handbook/iso-9001/learning-improving/incidents-complaints',
  'iso-9001/learning-improving/organization-assessment': '/dashboard/handbook/iso-9001/learning-improving/organization-assessment',
  // ISO 45001 (same structure)
  'iso-45001/preconditions/context-analysis': '/dashboard/handbook/iso-45001/preconditions/context-analysis',
  'iso-45001/preconditions/mission-vision': '/dashboard/handbook/iso-45001/preconditions/mission-vision',
  'iso-45001/preconditions/goals': '/dashboard/handbook/iso-45001/preconditions/goals',
  'iso-45001/preconditions/attitude-leadership': '/dashboard/handbook/iso-45001/preconditions/attitude-leadership',
  'iso-45001/preconditions/risk-analysis': '/dashboard/handbook/iso-45001/preconditions/risk-analysis',
  'iso-45001/preconditions/exclusion-criteria': '/dashboard/handbook/iso-45001/preconditions/exclusion-criteria',
  'iso-45001/preconditions/laws-regulations': '/dashboard/handbook/iso-45001/preconditions/laws-regulations',
  'iso-45001/execution-care/methods': '/dashboard/handbook/iso-45001/execution-care/methods',
  'iso-45001/execution-care/employees': '/dashboard/handbook/iso-45001/execution-care/employees',
  'iso-45001/execution-care/functioning-conversations': '/dashboard/handbook/iso-45001/execution-care/functioning-conversations',
  'iso-45001/execution-care/subcontractor-agreements': '/dashboard/handbook/iso-45001/execution-care/subcontractor-agreements',
  'iso-45001/execution-care/procurement': '/dashboard/handbook/iso-45001/execution-care/procurement',
  'iso-45001/execution-care/work-environment': '/dashboard/handbook/iso-45001/execution-care/work-environment',
  'iso-45001/execution-care/equipment-maintenance': '/dashboard/handbook/iso-45001/execution-care/equipment-maintenance',
  'iso-45001/the-client/information': '/dashboard/handbook/iso-45001/the-client/information',
  'iso-45001/the-client/individual-risk': '/dashboard/handbook/iso-45001/the-client/individual-risk',
  'iso-45001/the-client/care-plan': '/dashboard/handbook/iso-45001/the-client/care-plan',
  'iso-45001/learning-improving/client-experiences': '/dashboard/handbook/iso-45001/learning-improving/client-experiences',
  'iso-45001/learning-improving/participation': '/dashboard/handbook/iso-45001/learning-improving/participation',
  'iso-45001/learning-improving/signals': '/dashboard/handbook/iso-45001/learning-improving/signals',
  'iso-45001/learning-improving/employee-experiences': '/dashboard/handbook/iso-45001/learning-improving/employee-experiences',
  'iso-45001/learning-improving/incidents-complaints': '/dashboard/handbook/iso-45001/learning-improving/incidents-complaints',
  'iso-45001/learning-improving/organization-assessment': '/dashboard/handbook/iso-45001/learning-improving/organization-assessment',
};

function getFileType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  if (ext === 'pdf') return 'pdf';
  if (ext === 'docx') return 'docx';
  if (ext === 'doc') return 'doc';
  if (ext === 'xlsx' || ext === 'xls') return 'xlsx';
  return 'other';
}

function getFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function scanDirectory(dirPath, relativePath = '') {
  const documents = [];
  
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;
      
      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        const subDocs = await scanDirectory(fullPath, relPath);
        documents.push(...subDocs);
      } else if (entry.isFile()) {
        // Check if it's a document file
        const ext = entry.name.split('.').pop().toLowerCase();
        if (['pdf', 'docx', 'doc', 'xlsx', 'xls'].includes(ext)) {
          const stats = await fs.stat(fullPath);
          documents.push({
            name: entry.name,
            path: relPath,
            type: getFileType(entry.name),
            size: getFileSize(stats.size),
            lastModified: stats.mtime.toISOString().split('T')[0]
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning ${dirPath}:`, error.message);
  }
  
  return documents;
}

async function generateRegistry() {
  console.log('📁 Scanning documents folder...\n');
  
  const allDocuments = await scanDirectory(OUTPUT_DIR);
  
  console.log(`✅ Found ${allDocuments.length} documents\n`);
  
  // Organize by section
  const registry = {};
  
  allDocuments.forEach((doc, index) => {
    // Find which section this document belongs to
    for (const [fsPath, urlPath] of Object.entries(PATH_MAPPING)) {
      if (doc.path.startsWith(fsPath)) {
        if (!registry[urlPath]) {
          registry[urlPath] = [];
        }
        
        const cleanName = doc.name.replace(/\.(docx|pdf|doc|xlsx|xls)$/i, '');
        const docId = `doc-${index + 1}-${cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        
        registry[urlPath].push({
          id: docId,
          name: cleanName,
          description: '',
          type: doc.type,
          path: `/documents/${doc.path}`,
          size: doc.size,
          lastModified: doc.lastModified
        });
        
        console.log(`  ✅ Registered: ${doc.name} → ${urlPath}`);
        break;
      }
    }
  });
  
  return registry;
}

async function writeRegistryFile(registry) {
  const content = `/**
 * Document Registry
 * 
 * Auto-generated by scripts/register-documents.js
 * Generated on: ${new Date().toISOString()}
 * Total documents: ${Object.values(registry).flat().length}
 */

export interface HandbookDocument {
  id: string
  name: string
  description?: string
  type: 'pdf' | 'docx' | 'doc' | 'xlsx' | 'other'
  path: string
  size?: string
  lastModified?: string
}

export const documentRegistry: Record<string, HandbookDocument[]> = ${JSON.stringify(registry, null, 2)};

export function getDocumentsForSection(path: string): HandbookDocument[] {
  return documentRegistry[path] || []
}

export function getAllDocuments(): HandbookDocument[] {
  return Object.values(documentRegistry).flat()
}

export function searchDocuments(query: string): HandbookDocument[] {
  const lowerQuery = query.toLowerCase()
  return getAllDocuments().filter(doc => 
    doc.name.toLowerCase().includes(lowerQuery) ||
    doc.description?.toLowerCase().includes(lowerQuery)
  )
}
`;
  
  await fs.writeFile(REGISTRY_FILE, content, 'utf-8');
  console.log(`\n✅ Registry file written to: src/lib/documents.ts`);
}

async function main() {
  console.log('🔍 Document Registry Generator');
  console.log('================================\n');
  
  try {
    const registry = await generateRegistry();
    await writeRegistryFile(registry);
    
    const totalDocs = Object.values(registry).flat().length;
    const totalSections = Object.keys(registry).length;
    
    console.log('\n✨ Summary:');
    console.log(`   📄 Total documents: ${totalDocs}`);
    console.log(`   📁 Total sections: ${totalSections}`);
    console.log('\n🎉 Document registry has been generated!');
    console.log('   You can now view all documents in your app.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();

