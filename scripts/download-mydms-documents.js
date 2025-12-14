/**
 * MyDMS Document Downloader Script
 * 
 * This script logs into MyDMS, navigates through the Backup folder structure,
 * downloads all documents, and organizes them in the public/documents/ folder.
 * 
 * Usage: node scripts/download-mydms-documents.js
 */

const playwright = require('playwright');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  MYDMS_URL: 'https://topzorg.mydms.nl/out/out.Login.php',
  USERNAME: 'khairallah',
  PASSWORD: 'Souad12304@',
  BACKUP_FOLDER_ID: '1371499608',
  OUTPUT_DIR: path.join(__dirname, '../public/documents'),
  DOWNLOAD_DIR: path.join(__dirname, '../temp-downloads'),
};

// Folder structure mapping MyDMS paths to app paths
const FOLDER_MAPPING = {
  '1. Randvoorwaarden': {
    '1.1 Contextanalyse': 'iso-9001/preconditions/context-analysis',
    '1.2 Missie en visie': 'iso-9001/preconditions/mission-vision',
    '1.3 Doelen': 'iso-9001/preconditions/goals',
    '1.4 Houding, leiderschap en cultuur': 'iso-9001/preconditions/attitude-leadership',
    '1.5 Risicoanalyse en kansen': 'iso-9001/preconditions/risk-analysis',
    '1.6 Uitsluitingscriteria': 'iso-9001/preconditions/exclusion-criteria',
    '1.7 Wet- en regelgeving': 'iso-9001/preconditions/laws-regulations',
  },
  '2. Uitvoering van de zorg': {
    '2.1 Methoden': 'iso-9001/execution-care/methods',
    '2.2 Medewerkers': 'iso-9001/execution-care/employees',
    '2.3 Gesprekken rondom functioneren': 'iso-9001/execution-care/functioning-conversations',
    '2.4 Afspraken tussen opdrachtgever en onderaannemer': 'iso-9001/execution-care/subcontractor-agreements',
    '2.5 Inkoop': 'iso-9001/execution-care/procurement',
    '2.6 Werkomgeving': 'iso-9001/execution-care/work-environment',
    '2.7 Onderhoud van apparatuur en middelen': 'iso-9001/execution-care/equipment-maintenance',
  },
  '3. De cliënt': {
    '3.1 Informatievoorziening aan de cliënt': 'iso-9001/the-client/information',
    '3.2 Individuele risicoanalyse': 'iso-9001/the-client/individual-risk',
    '3.3 Zorgplan': 'iso-9001/the-client/care-plan',
  },
  '4. Leren en verbeteren': {
    '4.1 Cliëntervaringen': 'iso-9001/learning-improving/client-experiences',
    '4.2 Inspraak en medezeggenschap': 'iso-9001/learning-improving/participation',
    '4.3 Signalen': 'iso-9001/learning-improving/signals',
    '4.4 Ervaringen van medewerkers': 'iso-9001/learning-improving/employee-experiences',
    '4.5 Incidenten, calamiteiten en klachten': 'iso-9001/learning-improving/incidents-complaints',
    '4.6 Organisatiebeoordeling': 'iso-9001/learning-improving/organization-assessment',
  },
};

// Document registry to be generated
const documentRegistry = {};

// Utility functions
function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-z0-9.-]/gi, '-')
    .replace(/--+/g, '-')
    .toLowerCase();
}

function getFileType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  if (ext === 'pdf') return 'pdf';
  if (ext === 'docx') return 'docx';
  if (ext === 'doc') return 'doc';
  if (ext === 'xlsx' || ext === 'xls') return 'xlsx';
  return 'other';
}

async function ensureDirectory(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
}

async function login(page) {
  console.log('🔐 Logging into MyDMS...');
  await page.goto(CONFIG.MYDMS_URL);
  
  // Fill in credentials
  await page.getByRole('textbox', { name: 'Gebruikersnaam' }).fill(CONFIG.USERNAME);
  await page.getByRole('textbox', { name: 'Wachtwoord' }).fill(CONFIG.PASSWORD);
  
  // Click login button
  await page.getByRole('button', { name: 'MyDMSAanmelden' }).click();
  
  // Wait for navigation
  await page.waitForURL('**/out.Welcome.php');
  console.log('✅ Logged in successfully');
}

async function navigateToBackup(page) {
  console.log('📁 Navigating to Backup folder...');
  await page.goto(`https://topzorg.mydms.nl/out/out.ViewFolder.php?folderId=${CONFIG.BACKUP_FOLDER_ID}`);
  await page.waitForLoadState('networkidle');
  console.log('✅ In Backup folder');
}

async function downloadDocumentsFromFolder(page, browser, folderName, subfolderName, outputPath) {
  console.log(`\n📂 Processing: ${folderName} → ${subfolderName}`);
  
  try {
    // Click on the subfolder in the main content area
    const folderRow = page.getByRole('row', { name: subfolderName });
    await folderRow.click();
    await page.waitForLoadState('networkidle');
    
    // Wait a bit for the page to load
    await page.waitForTimeout(1000);
    
    // Get all document rows
    const documentRows = await page.locator('table').filter({ hasText: 'Documenten' }).locator('tbody tr').all();
    
    if (documentRows.length === 0) {
      console.log(`  ℹ️  No documents found in ${subfolderName}`);
      return [];
    }
    
    const downloaded = [];
    
    for (let i = 0; i < documentRows.length; i++) {
      try {
        const row = documentRows[i];
        const documentName = await row.locator('td').nth(1).textContent();
        
        if (!documentName || documentName.trim() === '') continue;
        
        console.log(`  📄 Downloading: ${documentName.trim()}`);
        
        // Click on the document
        await row.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
        
        // Create download promise before clicking
        const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
        
        // Click download button
        const downloadLink = page.getByRole('link', { name: ' Download' });
        if (await downloadLink.isVisible()) {
          await downloadLink.click();
          
          // Wait for download
          const download = await downloadPromise;
          const suggestedFilename = await download.suggestedFilename();
          const sanitized = sanitizeFilename(suggestedFilename);
          
          // Ensure output directory exists
          await ensureDirectory(path.join(CONFIG.OUTPUT_DIR, outputPath));
          
          // Save the file
          const targetPath = path.join(CONFIG.OUTPUT_DIR, outputPath, sanitized);
          await download.saveAs(targetPath);
          
          console.log(`  ✅ Saved: ${sanitized}`);
          
          // Add to registry
          downloaded.push({
            name: documentName.trim(),
            filename: sanitized,
            path: `/documents/${outputPath}/${sanitized}`,
            type: getFileType(sanitized),
            outputPath: outputPath
          });
        }
        
        // Go back to folder view
        await page.goBack();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
        
      } catch (error) {
        console.error(`  ❌ Error downloading document: ${error.message}`);
        // Try to go back if stuck
        try {
          await page.goBack();
          await page.waitForLoadState('networkidle');
        } catch (e) {
          // Ignore
        }
      }
    }
    
    return downloaded;
    
  } catch (error) {
    console.error(`❌ Error in folder ${subfolderName}: ${error.message}`);
    return [];
  }
}

async function processAllFolders(page, browser) {
  const allDownloaded = [];
  
  // Navigate to Backup folder first
  await navigateToBackup(page);
  
  // Process each main folder
  for (const [mainFolder, subfolders] of Object.entries(FOLDER_MAPPING)) {
    console.log(`\n📁 Processing Main Folder: ${mainFolder}`);
    
    // Click on main folder in sidebar
    try {
      await page.locator('#ft-id-1').getByTitle(mainFolder, { exact: true }).click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
    } catch (error) {
      console.log(`  ⚠️  Could not expand ${mainFolder}: ${error.message}`);
      continue;
    }
    
    // Process each subfolder
    for (const [subfolderName, outputPath] of Object.entries(subfolders)) {
      const docs = await downloadDocumentsFromFolder(page, browser, mainFolder, subfolderName, outputPath);
      allDownloaded.push(...docs);
      
      // Navigate back to main folder
      try {
        await page.locator('#ft-id-1').getByTitle(mainFolder, { exact: true }).click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
      } catch (error) {
        // Ignore
      }
    }
  }
  
  return allDownloaded;
}

function generateDocumentRegistry(downloaded) {
  const registry = {};
  
  downloaded.forEach((doc, index) => {
    const sectionPath = `/dashboard/handbook/${doc.outputPath}`;
    
    if (!registry[sectionPath]) {
      registry[sectionPath] = [];
    }
    
    const docId = `doc-${index + 1}-${sanitizeFilename(doc.name)}`;
    
    registry[sectionPath].push({
      id: docId,
      name: doc.name,
      description: '',
      type: doc.type,
      path: doc.path,
      size: '',
      lastModified: new Date().toISOString().split('T')[0]
    });
  });
  
  return registry;
}

async function copyToISO45001(downloaded) {
  console.log('\n📋 Copying documents to ISO 45001...');
  
  for (const doc of downloaded) {
    const iso9001Path = doc.outputPath;
    const iso45001Path = iso9001Path.replace('iso-9001', 'iso-45001');
    
    const sourcePath = path.join(CONFIG.OUTPUT_DIR, iso9001Path, doc.filename);
    const targetDir = path.join(CONFIG.OUTPUT_DIR, iso45001Path);
    const targetPath = path.join(targetDir, doc.filename);
    
    try {
      await ensureDirectory(targetDir);
      await fs.copyFile(sourcePath, targetPath);
      console.log(`  ✅ Copied to ISO 45001: ${doc.filename}`);
    } catch (error) {
      console.error(`  ❌ Error copying ${doc.filename}: ${error.message}`);
    }
  }
}

async function generateRegistryFile(downloaded) {
  console.log('\n📝 Generating document registry...');
  
  const registry = generateDocumentRegistry(downloaded);
  
  // Also add ISO 45001 entries
  const iso45001Registry = {};
  Object.entries(registry).forEach(([path, docs]) => {
    const iso45001Path = path.replace('iso-9001', 'iso-45001');
    iso45001Registry[iso45001Path] = docs.map(doc => ({
      ...doc,
      id: doc.id.replace('iso-9001', 'iso-45001'),
      path: doc.path.replace('iso-9001', 'iso-45001')
    }));
  });
  
  const fullRegistry = { ...registry, ...iso45001Registry };
  
  // Generate TypeScript file content
  const registryContent = `/**
 * Document Registry - Auto-generated
 * 
 * This file was generated by scripts/download-mydms-documents.js
 * Generated on: ${new Date().toISOString()}
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

export const documentRegistry: Record<string, HandbookDocument[]> = ${JSON.stringify(fullRegistry, null, 2)};

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
  
  const registryPath = path.join(__dirname, '../src/lib/documents.ts');
  await fs.writeFile(registryPath, registryContent, 'utf-8');
  
  console.log('✅ Document registry generated at: src/lib/documents.ts');
}

async function main() {
  console.log('🚀 MyDMS Document Downloader');
  console.log('================================\n');
  
  // Ensure directories exist
  await ensureDirectory(CONFIG.OUTPUT_DIR);
  await ensureDirectory(CONFIG.DOWNLOAD_DIR);
  
  // Launch browser
  console.log('🌐 Launching browser...');
  const browser = await playwright.chromium.launch({
    headless: false, // Set to true for production
    downloadsPath: CONFIG.DOWNLOAD_DIR
  });
  
  const context = await browser.newContext({
    acceptDownloads: true
  });
  
  const page = await context.newPage();
  
  try {
    // Login
    await login(page);
    
    // Process all folders and download documents
    const downloaded = await processAllFolders(page, browser);
    
    console.log(`\n✅ Downloaded ${downloaded.length} documents`);
    
    // Copy all documents to ISO 45001 folders
    await copyToISO45001(downloaded);
    
    // Generate document registry
    await generateRegistryFile(downloaded);
    
    console.log('\n✨ Complete! Summary:');
    console.log(`   📥 Documents downloaded: ${downloaded.length}`);
    console.log(`   📁 Organized in: ${CONFIG.OUTPUT_DIR}`);
    console.log(`   📋 Registry updated: src/lib/documents.ts`);
    console.log(`   🔄 ISO 45001 copies created`);
    console.log('\n🎉 All documents have been downloaded and organized!');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
}

// Run the script
main().catch(console.error);

