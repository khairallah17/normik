const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const BASE_URL = 'https://kam-systeem.nl';
const DOWNLOAD_DIR = path.join(__dirname, '../public/vca');

// Ensure download directory exists
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// VCA pages with their subdirectories
const vcaPages = [
  { id: 'risks', url: '/client/page/181520', subdir: 'risks' },
  { id: 'frm-tra', url: '/client/page/181521', subdir: 'risks/frm-tra' },
  { id: 'rie', url: '/client/page/181542', subdir: 'risks/risk-inventory-evaluation' },
  { id: 'competence', url: '/client/page/181522', subdir: 'competence' },
  { id: 'ohs-awareness', url: '/client/page/181528', subdir: 'ohs-awareness' },
  { id: 'ohs-project-plan', url: '/client/page/181552', subdir: 'ohs-project-plan' },
  { id: 'emergency-situations', url: '/client/page/181525', subdir: 'emergency-situations' },
  { id: 'inspections', url: '/client/page/181550', subdir: 'inspections' },
  { id: 'health', url: '/client/page/181526', subdir: 'health' },
  { id: 'resources', url: '/client/page/181527', subdir: 'resources' },
  { id: 'procurement-services', url: '/client/page/181553', subdir: 'procurement-services' },
  { id: 'ohs-incidents', url: '/client/page/181551', subdir: 'ohs-incidents' },
  // Policy pages
  { id: 'policy-statement', url: '/client/page/181537', subdir: 'policy/policy-statement' },
  { id: 'internal-audit-reports', url: '/client/page/181517', subdir: 'policy/internal-audit-reports' },
  { id: 'management-reviews', url: '/client/page/181518', subdir: 'policy/management-reviews' },
];

function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    const protocol = fullUrl.startsWith('https') ? https : http;
    
    const file = fs.createWriteStream(filePath);
    
    protocol.get(fullUrl, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        file.close();
        fs.unlinkSync(filePath);
        return downloadFile(response.headers.location, filePath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filePath);
        return reject(new Error(`Failed to download: ${response.statusCode}`));
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      reject(err);
    });
  });
}

async function downloadFiles() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Please log in manually if needed, then press Enter in the terminal...');
  await page.waitForTimeout(5000);

  const downloadedFiles = [];

  for (const pageInfo of vcaPages) {
    try {
      console.log(`\nChecking page: ${pageInfo.id} (${pageInfo.url})`);
      await page.goto(`${BASE_URL}${pageInfo.url}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      // Create subdirectory
      const subdir = path.join(DOWNLOAD_DIR, pageInfo.subdir);
      if (!fs.existsSync(subdir)) {
        fs.mkdirSync(subdir, { recursive: true });
      }

      // Find all file links - look for /documents/ links specifically
      const fileLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*="/documents/"]'));
        const files = [];
        
        links.forEach(link => {
          const href = link.getAttribute('href');
          const text = link.textContent.trim();
          
          // Skip if it's in footer or header
          const parent = link.closest('footer, header, .footer, .header');
          if (parent) return;
          
          // Only include actual document links
          if (href && href.includes('/documents/bins/')) {
            files.push({
              href: href,
              text: text || href.split('/').pop(),
            });
          }
        });
        
        return files;
      });

      console.log(`Found ${fileLinks.length} file(s) on this page`);

      for (const fileLink of fileLinks) {
        try {
          const fileName = fileLink.text || path.basename(fileLink.href);
          const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
          const filePath = path.join(subdir, sanitizedFileName);

          // Skip if file already exists
          if (fs.existsSync(filePath)) {
            console.log(`  Skipping ${sanitizedFileName} (already exists)`);
            continue;
          }

          console.log(`  Downloading: ${sanitizedFileName} from ${fileLink.href}`);

          // Download file
          await downloadFile(fileLink.href, filePath);
          
          console.log(`  ✓ Downloaded: ${sanitizedFileName}`);
          downloadedFiles.push({
            page: pageInfo.id,
            file: sanitizedFileName,
            path: filePath,
            url: `/vca/${pageInfo.subdir}/${sanitizedFileName}`
          });
        } catch (error) {
          console.log(`  ✗ Error downloading file: ${error.message}`);
        }
      }
    } catch (error) {
      console.log(`Error processing page ${pageInfo.id}: ${error.message}`);
    }
  }

  await browser.close();

  console.log(`\n\nDownload complete! Downloaded ${downloadedFiles.length} files.`);
  console.log('\nDownloaded files:');
  downloadedFiles.forEach(f => {
    console.log(`  - ${f.page}: ${f.file} -> ${f.path}`);
  });

  return downloadedFiles;
}

downloadFiles().catch(console.error);

