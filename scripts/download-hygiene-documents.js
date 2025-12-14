/**
 * Script to download documents from the "Hygiëne en infectiepreventie" folder
 * Folder ID: 1371499684
 * Target path: /dashboard/handbook/hkz-vvt/execution-care/hygiene-infection-prevention
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://topzorg.mydms.nl';
const LOGIN_URL = `${BASE_URL}/out/out.Login.php?redirectPage=%2Fout%2Fout.ViewFolder.php%3FfolderId%3D1`;
const USERNAME = 'khairallah';
const PASSWORD = 'Souad12304@';

// Target folder
const TARGET_FOLDER_ID = '1371499684';
const FOLDER_URL = `${BASE_URL}/out/out.ViewFolder.php?folderId=${TARGET_FOLDER_ID}`;

// Output directory - maps to hkz-vvt/execution-care/hygiene-infection-prevention
// Using a structure that matches the URL path
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'documents', 'hkz', 'hkz-vvt', 'execution-care', 'hygiene-infection-prevention');

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
async function downloadFile(page, url, filePath, docName) {
  try {
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Use Playwright's download API which handles cookies/session automatically
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 30000 }).catch(() => null),
      page.goto(url, { waitUntil: 'networkidle' }).catch(() => null)
    ]);
    
    if (download) {
      // Save the downloaded file
      await download.saveAs(filePath);
      console.log(`  ✅ Downloaded: ${path.basename(filePath)}`);
      return true;
    } else {
      // Fallback: try direct response download
      try {
        const response = await page.goto(url, { waitUntil: 'networkidle' });
        if (response && response.ok()) {
          const buffer = await response.body();
          fs.writeFileSync(filePath, buffer);
          console.log(`  ✅ Downloaded: ${path.basename(filePath)}`);
          return true;
        }
      } catch (e) {
        // If that fails, try clicking the download link if we can find it
        console.log(`  ⚠️  Trying alternative download method for: ${docName}`);
        return false;
      }
    }
    return false;
  } catch (error) {
    console.error(`  ❌ Error downloading ${docName}:`, error.message);
    return false;
  }
}

/**
 * Extract documents from the folder page
 */
async function extractDocuments(page) {
  const documents = [];

  try {
    // Wait for page to load - try multiple selectors
    try {
      await page.waitForSelector('table, [role="table"], tbody, a[href*="DownloadDocument"]', { timeout: 15000 });
    } catch (e) {
      console.log('Waiting for page elements...');
      await page.waitForTimeout(3000);
    }

    // Debug: Save page HTML to see structure
    const pageContent = await page.content();
    fs.writeFileSync('debug-page.html', pageContent);
    console.log('📄 Saved page HTML to debug-page.html for inspection');
    
    // Extract document links using a more comprehensive approach
    const docData = await page.evaluate((baseUrl) => {
      const docs = [];
      const seen = new Set();
      
      console.log('Starting document extraction...');
      
      // Method 1: Extract from onClickOpenDoc handlers (MyDMS uses JavaScript for downloads)
      const rows = Array.from(document.querySelectorAll('tr'));
      rows.forEach((row) => {
        // Find onclick handlers with onClickOpenDoc
        const onclickAttr = row.getAttribute('onclick') || '';
        const cells = row.querySelectorAll('td');
        
        // Look for onClickOpenDoc in the row or its cells
        let docId = null;
        let docName = '';
        
        // Check row onclick
        const rowOnclickMatch = onclickAttr.match(/onClickOpenDoc\([^,]+,\s*(\d+)/);
        if (rowOnclickMatch) {
          docId = rowOnclickMatch[1];
        }
        
        // Check all cells for onclick or document name
        cells.forEach((cell, index) => {
          const cellOnclick = cell.getAttribute('onclick') || '';
          const onclickMatch = cellOnclick.match(/onClickOpenDoc\([^,]+,\s*(\d+)/);
          if (onclickMatch) {
            docId = onclickMatch[1];
          }
          
          // Get document name from second cell (index 1)
          if (index === 1 && !docName) {
            docName = cell.textContent?.trim() || '';
          }
        });
        
        // Also check for onClickOpenDoc in any link within the row
        const links = row.querySelectorAll('a[onclick*="onClickOpenDoc"]');
        links.forEach(link => {
          const onclick = link.getAttribute('onclick') || '';
          const match = onclick.match(/onClickOpenDoc\([^,]+,\s*(\d+)/);
          if (match) {
            docId = match[1];
          }
        });
        
        if (docId && !seen.has(docId)) {
          seen.add(docId);
          
          // Clean document name
          if (!docName || docName.length < 3) {
            // Try to get from row text
            docName = row.textContent
              ?.replace(/Open document|Downloaden|Eigen chappen document|Toevoegen aan favorieten/gi, '')
              .trim()
              .split(/\n|\t/)[0]
              .trim() || `Document_${docId}`;
          }
          
          docName = docName.replace(/\s+/g, ' ').trim();
          
          // Determine file type from image or name
          let fileType = 'pdf';
          const nameLower = docName.toLowerCase();
          const img = row.querySelector('img[src*="pdf"], img[src*="doc"], img[src*="xls"], img[src*="word"]');
          if (img) {
            const imgSrc = img.getAttribute('src') || '';
            if (imgSrc.includes('pdf')) fileType = 'pdf';
            else if (imgSrc.includes('word') || imgSrc.includes('docx')) fileType = 'docx';
            else if (imgSrc.includes('doc')) fileType = 'doc';
            else if (imgSrc.includes('xls') || imgSrc.includes('excel')) fileType = 'xlsx';
          } else {
            if (nameLower.includes('.docx')) fileType = 'docx';
            else if (nameLower.includes('.doc') && !nameLower.includes('.docx')) fileType = 'doc';
            else if (nameLower.includes('.xlsx')) fileType = 'xlsx';
            else if (nameLower.includes('.xls') && !nameLower.includes('.xlsx')) fileType = 'xls';
            else if (nameLower.includes('.pdf')) fileType = 'pdf';
          }
          
          // Construct download URL
          const downloadUrl = `${baseUrl}/out/out.DownloadDocument.php?documentId=${docId}`;
          
          docs.push({
            name: docName,
            url: downloadUrl,
            type: fileType
          });
        }
      });
      
      // Method 2: Find all links with "Downloaden" text or download-related hrefs
      const allLinks = Array.from(document.querySelectorAll('a'));
      
      allLinks.forEach((link) => {
        const href = link.getAttribute('href');
        const text = link.textContent?.trim() || '';
        const linkText = text.toLowerCase();
        
        // Check if this is a download link
        if (href && (
          href.includes('DownloadDocument') || 
          href.includes('download') ||
          linkText.includes('downloaden') ||
          linkText.includes('download')
        )) {
          // Skip if we've seen this URL
          if (seen.has(href)) return;
          seen.add(href);
          
          // Try to find the document name from the row
          let docName = '';
          let row = link.closest('tr') || link.closest('[role="row"]');
          
          if (row) {
            // Try to get name from second cell
            const cells = row.querySelectorAll('td, [role="cell"]');
            if (cells.length >= 2) {
              docName = cells[1].textContent?.trim() || '';
            }
            // If not found, try to get from row text
            if (!docName) {
              const rowText = row.textContent?.trim();
              // Remove action buttons text
              docName = rowText.replace(/Open document|Downloaden|Eigen chappen document|Toevoegen aan favorieten/gi, '').trim();
            }
          }
          
          // If still no name, use link text or generate one
          if (!docName) {
            docName = text || `Document_${Date.now()}`;
          }
          
          // Clean up the name
          docName = docName.replace(/\s+/g, ' ').trim();
          
          // Determine file type
          let fileType = 'pdf';
          const hrefLower = href.toLowerCase();
          const nameLower = docName.toLowerCase();
          
          if (hrefLower.includes('.docx') || nameLower.includes('.docx')) {
            fileType = 'docx';
          } else if (hrefLower.includes('.doc') || nameLower.includes('.doc') && !nameLower.includes('.docx')) {
            fileType = 'doc';
          } else if (hrefLower.includes('.xlsx') || nameLower.includes('.xlsx')) {
            fileType = 'xlsx';
          } else if (hrefLower.includes('.xls') || nameLower.includes('.xls') && !nameLower.includes('.xlsx')) {
            fileType = 'xls';
          } else if (hrefLower.includes('.pdf') || nameLower.includes('.pdf')) {
            fileType = 'pdf';
          }
          
          // Construct full URL
          let fullUrl = href;
          if (href.startsWith('/')) {
            fullUrl = new URL(href, baseUrl).href;
          } else if (!href.startsWith('http')) {
            fullUrl = `${baseUrl}${href.startsWith('/') ? '' : '/'}${href}`;
          }
          
          docs.push({
            name: docName,
            url: fullUrl,
            type: fileType
          });
        }
      });
      
      // Method 2: Look for rows with document-like content - more comprehensive (using existing rows)
      rows.forEach((row) => {
        const rowText = row.textContent || '';
        // Check if row contains document-like content (has download link or document name pattern)
        const hasDownloadLink = row.querySelector('a[href*="Download"], a[href*="download"], a[href*="Document"]');
        const hasDocumentName = rowText.match(/\d+\.\d+[a-z]?\.?\s+[A-Z]/); // Pattern like "1.7.d Some Document"
        
        if ((hasDownloadLink || hasDocumentName) && rowText.length > 10) {
          // Find all download links in this row
          const downloadLinks = row.querySelectorAll('a[href*="Download"], a[href*="download"], a[href*="Document"]');
          
          downloadLinks.forEach((downloadLink) => {
            const href = downloadLink.getAttribute('href');
            if (!href || seen.has(href)) return;
            
            // Only process if it's actually a download link
            const linkText = downloadLink.textContent?.toLowerCase() || '';
            if (!href.includes('Download') && !linkText.includes('download')) {
              return;
            }
            
            seen.add(href);
            
            // Extract document name from row - try multiple methods
            let docName = '';
            
            // Method 1: Get from second cell
            const cells = row.querySelectorAll('td, [role="cell"]');
            if (cells.length >= 2) {
              docName = cells[1].textContent?.trim() || '';
            }
            
            // Method 2: Extract from row text, removing action buttons
            if (!docName || docName.length < 3) {
              docName = rowText
                .replace(/Open document|Downloaden|Eigen chappen document|Toevoegen aan favorieten|Open|Download/gi, '')
                .trim()
                .split(/\n|\t/)[0]
                .trim();
            }
            
            // Method 3: Try to get from nearby elements
            if (!docName || docName.length < 3) {
              const nameElement = row.querySelector('td:nth-child(2), [role="cell"]:nth-child(2), .document-name, [class*="name"]');
              if (nameElement) {
                docName = nameElement.textContent?.trim() || '';
              }
            }
            
            if (docName && docName.length > 3) {
              // Clean up the name
              docName = docName.replace(/\s+/g, ' ').trim();
              
              // Determine file type
              let fileType = 'pdf';
              const nameLower = docName.toLowerCase();
              const hrefLower = href.toLowerCase();
              
              if (hrefLower.includes('.docx') || nameLower.includes('.docx')) fileType = 'docx';
              else if (hrefLower.includes('.doc') || (nameLower.includes('.doc') && !nameLower.includes('.docx'))) fileType = 'doc';
              else if (hrefLower.includes('.xlsx') || nameLower.includes('.xlsx')) fileType = 'xlsx';
              else if (hrefLower.includes('.xls') || (nameLower.includes('.xls') && !nameLower.includes('.xlsx'))) fileType = 'xls';
              else if (hrefLower.includes('.pdf') || nameLower.includes('.pdf')) fileType = 'pdf';
              
              // Construct full URL
              let fullUrl = href;
              if (href.startsWith('/')) {
                fullUrl = new URL(href, baseUrl).href;
              } else if (!href.startsWith('http')) {
                fullUrl = `${baseUrl}${href.startsWith('/') ? '' : '/'}${href}`;
              }
              
              docs.push({
                name: docName,
                url: fullUrl,
                type: fileType
              });
            }
          });
        }
      });
      
      console.log(`Found ${docs.length} documents in evaluation`);
      return docs;
    }, BASE_URL);

    documents.push(...docData);

    console.log(`Found ${documents.length} documents`);
    return documents;
  } catch (error) {
    console.error('Error extracting documents:', error);
    return documents;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting download of hygiene and infection prevention documents...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to login page
    console.log('📝 Logging in...');
    await page.goto(LOGIN_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Fill in login form
    await page.fill('input[name="username"], input[type="text"]', USERNAME);
    await page.fill('input[name="password"], input[type="password"]', PASSWORD);
    
    // Click login button
    await page.click('input[type="submit"], button[type="submit"], button:has-text("Inloggen")');
    
    // Wait for navigation after login
    await page.waitForURL('**/out.ViewFolder.php**', { timeout: 30000 });
    await page.waitForTimeout(2000);
    console.log('✅ Logged in successfully\n');

    // Navigate to target folder
    console.log(`📁 Navigating to folder: ${FOLDER_URL}`);
    await page.goto(FOLDER_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(5000); // Wait longer for page to fully load
    console.log('✅ Loaded folder page\n');
    
    // Scroll to load all content
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(2000);

    // Extract documents
    console.log('🔍 Extracting documents...');
    const documents = await extractDocuments(page);
    
    if (documents.length === 0) {
      console.log('⚠️  No documents found. Taking screenshot for debugging...');
      await page.screenshot({ path: 'debug-hygiene-folder.png', fullPage: true });
      console.log('📸 Screenshot saved to debug-hygiene-folder.png');
    }

    // Download each document by clicking download links
    console.log(`\n📥 Downloading ${documents.length} documents...\n`);
    let successCount = 0;
    
    // Set up download listener
    page.on('download', async (download) => {
      const sanitizedName = sanitizeFileName(download.suggestedFilename() || `document_${Date.now()}`);
      const filePath = path.join(OUTPUT_DIR, sanitizedName);
      await download.saveAs(filePath);
      console.log(`  ✅ Downloaded: ${path.basename(filePath)}`);
      successCount++;
    });
    
    // Navigate back to folder page to click download links
    await page.goto(FOLDER_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Extract document IDs and click their download links
    for (const doc of documents) {
      try {
        // Extract document ID from URL
        const docIdMatch = doc.url.match(/documentId=(\d+)/);
        if (!docIdMatch) {
          console.log(`  ⚠️  Could not extract document ID from: ${doc.name}`);
          continue;
        }
        
        const docId = docIdMatch[1];
        console.log(`Downloading: ${doc.name} (ID: ${docId})`);
        
        // Find and click the download link for this document
        const downloadClicked = await page.evaluate((docId) => {
          // Find all links with onClickOpenDoc that contain this document ID and download action (parameter 2)
          const allLinks = Array.from(document.querySelectorAll('a[onclick*="onClickOpenDoc"]'));
          for (const link of allLinks) {
            const onclick = link.getAttribute('onclick') || '';
            // Check if this link has the document ID and download action (ends with ,2))
            if (onclick.includes(docId) && onclick.includes(',2)')) {
              link.click();
              return true;
            }
          }
          
          // Alternative: Find row with document ID and then find download link in that row
          const rows = Array.from(document.querySelectorAll('tr'));
          for (const row of rows) {
            const rowOnclick = row.getAttribute('onclick') || '';
            const cells = row.querySelectorAll('td');
            for (const cell of cells) {
              const cellOnclick = cell.getAttribute('onclick') || '';
              if ((rowOnclick.includes(docId) || cellOnclick.includes(docId))) {
                // Find download link in this row
                const downloadLink = row.querySelector('a[onclick*=",2)"]');
                if (downloadLink) {
                  downloadLink.click();
                  return true;
                }
              }
            }
          }
          return false;
        }, docId);
        
        if (downloadClicked) {
          // Wait for download to start
          await page.waitForTimeout(2000);
        } else {
          console.log(`  ⚠️  Could not find download link for: ${doc.name}`);
        }
      } catch (error) {
        console.error(`  ❌ Error downloading ${doc.name}:`, error.message);
      }
    }
    
    // Wait for all downloads to complete
    await page.waitForTimeout(5000);

    console.log(`\n✅ Download complete!`);
    console.log(`   Successfully downloaded: ${successCount}/${documents.length} documents`);
    console.log(`   Output directory: ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('❌ Error:', error);
    await page.screenshot({ path: 'error-screenshot.png', fullPage: true });
  } finally {
    await browser.close();
  }
}

// Run the script
main().catch(console.error);

