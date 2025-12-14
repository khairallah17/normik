/**
 * Script to download HKZ folders and their contents recursively from MyDMS
 * Downloads: HKZ Kleine organisaties 2021 and HKZ VVT
 * Uses Playwright for browser automation
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://topzorg.mydms.nl';
const LOGIN_URL = `${BASE_URL}/out/out.Login.php?redirectPage=%2Fout%2Fout.ViewFolder.php%3FfolderId%3D1`;
const USERNAME = 'khairallah';
const PASSWORD = 'Souad12304@';

// Target folders to download
const TARGET_FOLDERS = [
  { name: 'HKZ Kleine organisaties 2021', folderId: '1011556537' },
  { name: 'HKZ VVT', folderId: '1371499681' }
];

// Output directory
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'documents', 'hkz');

/**
 * Sanitize file name for filesystem
 */
function sanitizeFileName(fileName) {
  return fileName
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .trim();
}

/**
 * Download file using Playwright
 */
async function downloadFile(page, url, filePath) {
  try {
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const response = await page.goto(url, { waitUntil: 'networkidle' });
    
    if (response && response.ok()) {
      const buffer = await response.body();
      fs.writeFileSync(filePath, buffer);
      console.log(`  ✅ Downloaded: ${path.basename(filePath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`  ❌ Error downloading ${url}:`, error.message);
    return false;
  }
}

/**
 * Extract folder structure and documents from page
 */
async function extractFolderContent(page) {
  const content = {
    folders: [],
    documents: [],
    images: []
  };

  try {
    // Wait for page to load - try multiple selectors
    try {
      await page.waitForSelector('table, .folder-list, [role="table"]', { timeout: 10000 });
    } catch (e) {
      // Page might not have a table, continue anyway
      await page.waitForTimeout(2000);
    }

    // Extract folder links - look in multiple places
    const folderLinks = await page.evaluate((baseUrl) => {
      const links = Array.from(document.querySelectorAll('a[href*="ViewFolder"], a[href*="folderId"]'));
      return links.map(link => {
        const href = link.getAttribute('href');
        if (!href) return null;
        try {
          const url = new URL(href, baseUrl);
          const folderId = url.searchParams.get('folderId');
          if (!folderId) return null;
          
          // Try to get folder name from various places
          let name = link.textContent?.trim() || 
                    link.querySelector('img')?.alt ||
                    link.closest('tr')?.querySelector('td:nth-child(2)')?.textContent?.trim() ||
                    `Folder_${folderId}`;
          
          return { href, name, folderId };
        } catch (e) {
          return null;
        }
      }).filter(item => item && item.folderId && item.name);
    }, BASE_URL);

    // Extract document links - look for download links and document links
    const docLinks = await page.evaluate((baseUrl) => {
      const links = Array.from(document.querySelectorAll('a[href*="ViewDocument"], a[href*="DownloadDocument"], a[href*="documentid"]'));
      const rows = Array.from(document.querySelectorAll('tr'));
      
      const docs = [];
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        try {
          const url = new URL(href, baseUrl);
          const docId = url.searchParams.get('documentid');
          if (!docId) return;
          
          // Find the row containing this link to get document name
          const row = link.closest('tr');
          const nameCell = row?.querySelector('td:nth-child(2)');
          const name = nameCell?.textContent?.trim() || 
                      link.textContent?.trim() ||
                      `Document_${docId}`;
          
          docs.push({ href, name, docId });
        } catch (e) {
          // Skip invalid URLs
        }
      });
      
      return docs;
    }, BASE_URL);

    // Extract image sources (logos, icons) - specifically HKZ logos
    const imageLinks = await page.evaluate((baseUrl) => {
      const imgs = Array.from(document.querySelectorAll('img[src*="hkz"], img[src*="logo"], img[alt*="HKZ"]'));
      return imgs.map(img => {
        const src = img.getAttribute('src');
        if (!src) return null;
        return src.startsWith('http') ? src : `${baseUrl}${src.startsWith('/') ? '' : '/'}${src}`;
      }).filter(Boolean);
    }, BASE_URL);

    content.folders = folderLinks;
    content.documents = docLinks;
    content.images = imageLinks;

  } catch (error) {
    console.error('Error extracting folder content:', error.message);
  }

  return content;
}

/**
 * Recursively download folder contents
 */
async function downloadFolder(page, folderId, folderName, basePath, visited = new Set(), depth = 0) {
  if (visited.has(folderId)) {
    console.log(`${'  '.repeat(depth)}⏭️  Skipping already visited: ${folderName}`);
    return;
  }
  visited.add(folderId);

  const folderPath = path.join(basePath, sanitizeFileName(folderName));
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  console.log(`${'  '.repeat(depth)}📁 ${folderName}`);
  console.log(`${'  '.repeat(depth)}   Path: ${folderPath}`);

  try {
    const folderUrl = `${BASE_URL}/out/out.ViewFolder.php?folderId=${folderId}`;
    await page.goto(folderUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000); // Wait for dynamic content

    const { folders, documents, images } = await extractFolderContent(page);

    // Download documents
    if (documents.length > 0) {
      console.log(`${'  '.repeat(depth)}   📄 Found ${documents.length} document(s)`);
      for (const doc of documents) {
        try {
          // Try to get download URL
          let downloadUrl = doc.href;
          if (!downloadUrl.includes('DownloadDocument')) {
            downloadUrl = `${BASE_URL}/out/out.DownloadDocument.php?documentid=${doc.docId}`;
          } else if (!downloadUrl.startsWith('http')) {
            downloadUrl = `${BASE_URL}${downloadUrl.startsWith('/') ? '' : '/'}${downloadUrl}`;
          }

          const extension = doc.name.match(/\.(pdf|docx?|xlsx?|txt)$/i)?.[1] || 'pdf';
          const docPath = path.join(folderPath, `${sanitizeFileName(doc.name)}.${extension}`);
          
          await downloadFile(page, downloadUrl, docPath);
        } catch (error) {
          console.error(`${'  '.repeat(depth)}   ❌ Error downloading ${doc.name}:`, error.message);
        }
      }
    }

    // Download images (logos, icons)
    if (images.length > 0) {
      const assetsDir = path.join(folderPath, 'assets');
      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }

      for (const imgUrl of images) {
        try {
          const imgName = path.basename(new URL(imgUrl).pathname) || 'image.png';
          const imgPath = path.join(assetsDir, imgName);
          await downloadFile(page, imgUrl, imgPath);
        } catch (error) {
          console.error(`${'  '.repeat(depth)}   ❌ Error downloading image:`, error.message);
        }
      }
    }

    // Recursively process subfolders
    if (folders.length > 0) {
      console.log(`${'  '.repeat(depth)}   📂 Found ${folders.length} subfolder(s)`);
      for (const subfolder of folders) {
        if (subfolder.folderId && subfolder.folderId !== folderId) {
          await downloadFolder(page, subfolder.folderId, subfolder.name, folderPath, visited, depth + 1);
        }
      }
    }

  } catch (error) {
    console.error(`${'  '.repeat(depth)}❌ Error processing folder ${folderName}:`, error.message);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting HKZ folders download...\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: false }); // Set to true for headless
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Login
    console.log('🔐 Logging in...');
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    
    // Fill login form - try multiple selectors
    const usernameInput = await page.$('input[type="text"], input[name*="user"], input[placeholder*="Gebruikersnaam"]');
    const passwordInput = await page.$('input[type="password"], input[name*="pass"]');
    
    if (usernameInput) {
      await usernameInput.fill(USERNAME);
    } else {
      await page.fill('input[type="text"]', USERNAME);
    }
    
    if (passwordInput) {
      await passwordInput.fill(PASSWORD);
    } else {
      await page.fill('input[type="password"]', PASSWORD);
    }
    
    await page.waitForTimeout(500);
    
    // Click login button - try multiple selectors
    const loginButton = await page.$('button:has-text("Aanmelden"), button[type="submit"], button:has(img[alt*="MyDMS"])');
    if (loginButton) {
      await loginButton.click();
    } else {
      await page.click('button');
    }
    
    // Wait for navigation or check if we're logged in
    try {
      await page.waitForURL(url => !url.includes('Login'), { timeout: 10000 });
    } catch (e) {
      // Check if we're already on a different page
      const currentUrl = page.url();
      if (currentUrl.includes('Login')) {
        throw new Error('Login failed - still on login page');
      }
    }
    
    await page.waitForTimeout(2000);
    console.log('✅ Logged in successfully\n');

    // Download each target folder
    for (const folder of TARGET_FOLDERS) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`📂 Downloading: ${folder.name}`);
      console.log(`${'='.repeat(60)}`);
      
      await downloadFolder(page, folder.folderId, folder.name, OUTPUT_DIR);
    }

    console.log('\n✅ Download complete!');
    console.log(`📁 Files saved to: ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    await browser.close();
  }
}

// Run the script
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
