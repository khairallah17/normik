const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://kam-systeem.nl';
const DOWNLOAD_DIR = path.join(__dirname, '../public/vca');

// Ensure download directory exists
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// VCA pages to check for files
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

async function downloadFiles() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Login (you'll need to provide credentials)
  console.log('Navigating to login page...');
  await page.goto(`${BASE_URL}/login`);
  await page.waitForTimeout(2000);

  // Fill in login form (adjust selectors based on actual form)
  // You may need to inspect the login page to get correct selectors
  console.log('Please log in manually, then press Enter in the terminal...');
  await page.waitForTimeout(10000); // Give time for manual login

  const downloadedFiles = [];

  for (const pageInfo of vcaPages) {
    try {
      console.log(`\nChecking page: ${pageInfo.id} (${pageInfo.url})`);
      await page.goto(`${BASE_URL}${pageInfo.url}`);
      await page.waitForTimeout(2000);

      // Create subdirectory
      const subdir = path.join(DOWNLOAD_DIR, pageInfo.subdir);
      if (!fs.existsSync(subdir)) {
        fs.mkdirSync(subdir, { recursive: true });
      }

      // Find all file links (PDF, DOCX, DOC, XLSX, XLS)
      const fileLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href]'));
        return links
          .map(link => {
            const href = link.getAttribute('href');
            const text = link.textContent.trim();
            // Check if it's a file link
            if (href && (href.includes('.pdf') || href.includes('.docx') || href.includes('.doc') || 
                         href.includes('.xlsx') || href.includes('.xls') || 
                         text.match(/\.(pdf|docx|doc|xlsx|xls)$/i))) {
              return { href, text };
            }
            return null;
          })
          .filter(Boolean);
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

          console.log(`  Downloading: ${sanitizedFileName}`);

          // Construct full URL
          let fileUrl = fileLink.href;
          if (!fileUrl.startsWith('http')) {
            fileUrl = `${BASE_URL}${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`;
          }

          // Download file
          const response = await page.goto(fileUrl, { waitUntil: 'networkidle' });
          if (response && response.ok()) {
            const buffer = await response.body();
            fs.writeFileSync(filePath, buffer);
            console.log(`  ✓ Downloaded: ${sanitizedFileName}`);
            downloadedFiles.push({
              page: pageInfo.id,
              file: sanitizedFileName,
              path: filePath,
              url: `/vca/${pageInfo.subdir}/${sanitizedFileName}`
            });
          } else {
            console.log(`  ✗ Failed to download: ${sanitizedFileName}`);
          }
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

