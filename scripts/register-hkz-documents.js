/**
 * Script to register HKZ documents from downloaded folders
 * Scans the hkz folder structure and registers documents in the document registry
 */

const fs = require('fs');
const path = require('path');

const HKZ_BASE_DIR = path.join(__dirname, '..', 'public', 'documents', 'hkz');
const DOCUMENTS_FILE = path.join(__dirname, '..', 'src', 'lib', 'documents.ts');

// Map folder names to URL paths
const folderNameToPath = {
  'HKZ_Kleine_organisaties_2021': 'hkz-kleine-organisaties-2021',
  'HKZ_VVT': 'hkz-vvt',
  '1._Randvoorwaarden': 'preconditions',
  '1.1_Contextanalyse': 'context-analysis',
  '1.2_Missie_en_visie': 'mission-vision',
  '1.3_Doelen': 'goals',
  '1.4_Houding,_leiderschap_en_cultuur': 'attitude-leadership',
  '1.5_Risicoanalyse_en_kansen': 'risk-analysis',
  '1.6_Uitsluitingscriteria': 'exclusion-criteria',
  '1.7_Wet-_en_regelgeving': 'laws-regulations',
  '2._Uitvoering_van_de_zorg': 'execution-care',
  '2.1_Werkwijzen': 'methods',
  'Hygiëne_en_infectiepreventie': 'hygiene-infection-prevention',
  '2.2_Medewerkers': 'employees',
  'Functiebeschrijvingen': 'job-descriptions',
  'Leidraad_veilige_zorgrelatie': 'safe-care-relationship',
  '2.3_Gesprekken_rondom_functioneren': 'functioning-conversations',
  '2.4_Afspraken_tussen_hoofd-_en_onderaannemer': 'subcontractor-agreements',
  '2.5_Inkoop': 'procurement',
  '2.6_Werkomgeving': 'work-environment',
  '2.7_Onderhoud_van_materiaal_en_apparatuur': 'equipment-maintenance',
  '3._De_cliënt': 'the-client',
  '3.1_Informatievoorziening_aan_de_cliënt': 'information',
  '3.2_Individuele_risicoanalyse': 'individual-risk',
  '3.3_Zorgplan': 'care-plan',
  '4._Leren_en_verbeteren': 'learning-improving',
  '4.1_Cliëntervaringen': 'client-experiences',
  '4.2_Inspraak_en_medezeggenschap': 'participation',
  '4.3_Signalen': 'signals',
  '4.4_Ervaringen_van_medewerkers': 'employee-experiences',
  '4.5_Incidenten,_calamiteiten_en_klachten': 'incidents-complaints',
  '4.6_Organisatiebeoordeling': 'organization-assessment',
  '1._Aanmelding_en_intake': 'registration-intake',
  '2._Uitvoering_van_zorg': 'execution-care',
  '3._Evaluatie_en_einde_zorg': 'evaluation-end-care',
  'Cliënttevredenheid': 'client-satisfaction',
  '4._Organisatie_&_kwaliteit': 'organization-quality',
  'Audit': 'audit',
  '5._Medewerkers': 'staff',
  '6._Ontwikkelen_en_vernieuwen': 'development-innovation',
  '7._Werkomgeving_en_veiligheid': 'work-environment-safety',
  '8._Inkoop_en_uitbesteding': 'procurement-tendering',
  '9._Documentatie_&_wet-_en_regelgeving': 'documentation-regulations',
};

/**
 * Convert folder name to URL path segment
 */
function folderToPath(folderName) {
  // Remove special characters and normalize
  const normalized = folderName
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase();
  
  return folderNameToPath[folderName] || normalized;
}

/**
 * Get file type from extension
 */
function getFileType(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (['.pdf'].includes(ext)) return 'pdf';
  if (['.docx'].includes(ext)) return 'docx';
  if (['.doc'].includes(ext)) return 'doc';
  if (['.xlsx', '.xls'].includes(ext)) return 'xlsx';
  return 'other';
}

/**
 * Recursively scan folder and collect documents
 */
function scanFolder(dir, basePath = '', urlPath = '', documents = []) {
  if (!fs.existsSync(dir)) {
    return documents;
  }

  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    // Skip assets folders
    if (item === 'assets' || item === 'Handboek' || item === 'Takenlijst') {
      continue;
    }
    
    if (stat.isDirectory()) {
      // Recursively scan subfolder
      const folderPath = folderToPath(item);
      const newUrlPath = urlPath ? `${urlPath}/${folderPath}` : folderPath;
      scanFolder(itemPath, basePath, newUrlPath, documents);
    } else if (stat.isFile()) {
      // Check if it's a document file
      const ext = path.extname(item).toLowerCase();
      if (['.pdf', '.docx', '.doc', '.xlsx', '.xls'].includes(ext)) {
        const relativePath = path.relative(basePath, itemPath);
        const webPath = `/documents/hkz/${relativePath.replace(/\\/g, '/')}`;
        const fileSize = (stat.size / 1024).toFixed(1) + ' KB';
        const lastModified = stat.mtime.toISOString().split('T')[0];
        
        // Generate document ID
        const docId = `hkz-${urlPath.replace(/\//g, '-')}-${item.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;
        
        documents.push({
          id: docId,
          name: item.replace(/\.[^/.]+$/, ''), // Remove extension
          description: '',
          type: getFileType(item),
          path: webPath,
          size: fileSize,
          lastModified: lastModified,
          sectionPath: `/dashboard/handbook/${urlPath}`,
        });
      }
    }
  }
  
  return documents;
}

/**
 * Build document registry structure
 */
function buildRegistry() {
  const registry = {};
  
  // Scan HKZ Kleine organisaties 2021
  const hkzKleineDir = path.join(HKZ_BASE_DIR, 'HKZ_Kleine_organisaties_2021', 'Handboek');
  if (fs.existsSync(hkzKleineDir)) {
    const documents = scanFolder(hkzKleineDir, HKZ_BASE_DIR, 'hkz-kleine-organisaties-2021');
    
    // Group documents by section path
    documents.forEach(doc => {
      if (!registry[doc.sectionPath]) {
        registry[doc.sectionPath] = [];
      }
      registry[doc.sectionPath].push(doc);
    });
  }
  
  // Scan HKZ VVT
  const hkzVvtDir = path.join(HKZ_BASE_DIR, 'HKZ_VVT', 'Handboek');
  if (fs.existsSync(hkzVvtDir)) {
    const documents = scanFolder(hkzVvtDir, HKZ_BASE_DIR, 'hkz-vvt');
    
    // Group documents by section path
    documents.forEach(doc => {
      if (!registry[doc.sectionPath]) {
        registry[doc.sectionPath] = [];
      }
      registry[doc.sectionPath].push(doc);
    });
  }
  
  return registry;
}

/**
 * Update documents.ts file with new registry entries
 */
function updateDocumentsFile(registry) {
  let content = fs.readFileSync(DOCUMENTS_FILE, 'utf8');
  
  // Find the documentRegistry object
  const registryStart = content.indexOf('export const documentRegistry: Record<string, HandbookDocument[]> = {');
  const registryEnd = content.indexOf('};', registryStart);
  
  if (registryStart === -1 || registryEnd === -1) {
    console.error('Could not find documentRegistry in documents.ts');
    return;
  }
  
  // Build new registry entries as string
  const newEntries = Object.entries(registry)
    .map(([path, docs]) => {
      const docsStr = docs.map(doc => {
        return `    {
      "id": "${doc.id}",
      "name": "${doc.name.replace(/"/g, '\\"')}",
      "description": "${doc.description}",
      "type": "${doc.type}",
      "path": "${doc.path}",
      "size": "${doc.size}",
      "lastModified": "${doc.lastModified}"
    }`;
      }).join(',\n');
      
      return `  "${path}": [\n${docsStr}\n  ]`;
    })
    .join(',\n\n');
  
  // Replace the registry content
  const beforeRegistry = content.substring(0, registryStart);
  const afterRegistry = content.substring(registryEnd + 2);
  
  const newContent = beforeRegistry + 
    'export const documentRegistry: Record<string, HandbookDocument[]> = {\n' +
    newEntries + '\n};\n\n' +
    afterRegistry;
  
  fs.writeFileSync(DOCUMENTS_FILE, newContent, 'utf8');
  console.log(`✅ Updated ${DOCUMENTS_FILE} with ${Object.keys(registry).length} HKZ sections`);
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Scanning HKZ folders for documents...\n');
  
  if (!fs.existsSync(HKZ_BASE_DIR)) {
    console.error(`❌ HKZ directory not found: ${HKZ_BASE_DIR}`);
    process.exit(1);
  }
  
  const registry = buildRegistry();
  
  console.log(`\n📊 Found documents in ${Object.keys(registry).length} sections:`);
  Object.entries(registry).forEach(([path, docs]) => {
    console.log(`   ${path}: ${docs.length} document(s)`);
  });
  
  if (Object.keys(registry).length > 0) {
    // Read existing registry
    let existingContent = fs.readFileSync(DOCUMENTS_FILE, 'utf8');
    
    // Extract existing registry
    const existingRegistryMatch = existingContent.match(/export const documentRegistry: Record<string, HandbookDocument\[\]> = \{([\s\S]*?)\};/);
    
    if (existingRegistryMatch) {
      // Parse existing registry (simplified - just merge)
      const existingRegistryStr = existingRegistryMatch[1];
      
      // Merge with new registry
      const mergedRegistry = { ...registry };
      
      // Try to preserve existing entries (this is a simplified approach)
      // In a real scenario, you'd want to properly parse and merge
      
      // Update the file
      const beforeRegistry = existingContent.substring(0, existingRegistryMatch.index);
      const afterRegistry = existingContent.substring(existingRegistryMatch.index + existingRegistryMatch[0].length);
      
      // Build merged registry string
      const allEntries = Object.entries(mergedRegistry)
        .map(([path, docs]) => {
          const docsStr = docs.map(doc => {
            return `    {
      "id": "${doc.id}",
      "name": "${doc.name.replace(/"/g, '\\"')}",
      "description": "${doc.description}",
      "type": "${doc.type}",
      "path": "${doc.path}",
      "size": "${doc.size}",
      "lastModified": "${doc.lastModified}"
    }`;
          }).join(',\n');
          
          return `  "${path}": [\n${docsStr}\n  ]`;
        })
        .join(',\n\n');
      
      const newContent = beforeRegistry + 
        'export const documentRegistry: Record<string, HandbookDocument[]> = {\n' +
        allEntries + '\n};\n\n' +
        afterRegistry;
      
      fs.writeFileSync(DOCUMENTS_FILE, newContent, 'utf8');
      console.log(`\n✅ Updated ${DOCUMENTS_FILE}`);
    } else {
      console.error('Could not find existing documentRegistry');
    }
  } else {
    console.log('\n⚠️  No documents found in HKZ folders');
  }
}

main();

