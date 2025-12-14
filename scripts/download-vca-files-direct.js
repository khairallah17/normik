const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'kam-systeem.nl';
const DOWNLOAD_DIR = path.join(__dirname, '../public/vca');

// Ensure download directory exists
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// Document URLs extracted from pages
const documents = [
  // Risks page (181520)
  { url: '/documents/bins/512510/veiligheidsboekje-optic-infra-2023.pdf', file: 'risks/Veiligheid_boekje_Optic_Infra_2023.pdf' },
  { url: '/documents/bins/512556/lmra-jul-23-1.0.pdf', file: 'risks/LMRA_jul_23_1.0.pdf' },
  { url: '/documents/bins/512557/vgm-en-lmra-integraal-jul-23.pdf', file: 'risks/VGM_en_LMRA_Integraal_jul_23.pdf' },
  
  // RIE page (181542) - correct URLs from network requests
  { url: '/documents/bins/512511/rie-optic-infra-bv.docx', file: 'risks/risk-inventory-evaluation/RIE_Optic_Infra_BV.docx' },
  { url: '/documents/bins/512512/plan-van-aanpak-rie-optic-infra.docx', file: 'risks/risk-inventory-evaluation/Plan_van_aanpak_RIE_Optic_Infra.docx' },
  { url: '/documents/bins/512513/overzicht-van-de-risicos---optic-infra-bv.pdf', file: 'risks/risk-inventory-evaluation/Overzicht_van_de_risicos_Optic_Infra_BV.pdf' },
  { url: '/documents/bins/512514/overzicht-van-maatregelen---optic-infra-bv.pdf', file: 'risks/risk-inventory-evaluation/Overzicht_van_maatregelen_Optic_Infra_BV.pdf' },
  { url: '/documents/bins/512515/actielijst-optic-infra-bv.xlsx', file: 'risks/risk-inventory-evaluation/Actielijst_Optic_Infra_BV.xlsx' },
  
  // FRM TRA page (181521) - from earlier snapshot
  { url: '/documents/bins/512510/taak-risico-analyse-aanleg-glasvezelkabel-grondwerkzaamheden-11-juli-23.pdf', file: 'risks/frm-tra/Taak_Risico_Analyse_aanleg_gla vezelkabel_grondwerkzaamheden_11_juli_23.pdf' },
  
  // OHS Awareness page (181528)
  { url: '/documents/bins/512510/gedrag-code.pdf', file: 'ohs-awareness/Gedrag_code.pdf' },
  
  // Policy Statement page (181537)
  { url: '/documents/bins/512510/beleidsverklaring-maart-2023.pdf', file: 'policy/policy-statement/Beleidsverklaring_maart_2023.pdf' },
  
  // Internal Audit Reports page (181517)
  { url: '/documents/bins/512510/interne-audit-otic-infra-11-07-2023.pdf', file: 'policy/internal-audit-reports/Interne_audit_Otic_Infra_11-07-2023.pdf' },
  { url: '/documents/bins/512510/interne-werklocatie-audit-optic-infra-korenmolen-80-64.pdf', file: 'policy/internal-audit-reports/Interne_werklocatie_audit_Optic_Infra_Korenmolen_80-64.pdf' },
  
  // Management Reviews page (181518)
  { url: '/documents/bins/512510/directiebeoordeling_jaarplan-2023-vca2.pdf', file: 'policy/management-reviews/Directiebeoordeling_jaarplan_2023_VCA2.pdf' },
  
  // Personnel Assessments page (181519)
  { url: '/documents/bins/512510/frm_personeel-beoordeling-1.doc', file: 'policy/personnel-assessments/frm_personeel_beoordeling_1.doc' },
  
  // Competence pages
  { url: '/documents/bins/512510/frm_introductieverklaring_medewerker.docx', file: 'competence/frm_introductieverklaring_medewerker.docx' },
  { url: '/documents/bins/512510/functietabel.docx', file: 'competence/Functietabel.docx' },
  
  // Emergency Situations page (181545)
  { url: '/documents/bins/512510/kam-f-007-alarmkaart.pdf', file: 'emergency-situations/KAM-F-007_alarmkaart.pdf' },
];

function downloadFile(doc) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(DOWNLOAD_DIR, doc.file);
    const dir = path.dirname(filePath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`  Skipping ${doc.file} (already exists)`);
      return resolve();
    }
    
    const options = {
      hostname: BASE_URL,
      path: doc.url,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    };
    
    const file = fs.createWriteStream(filePath);
    
    https.get(options, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        file.close();
        fs.unlinkSync(filePath);
        return downloadFile({ ...doc, url: response.headers.location }).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
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

async function downloadAll() {
  console.log(`Downloading ${documents.length} files...\n`);
  
  const results = [];
  
  for (const doc of documents) {
    try {
      console.log(`Downloading: ${doc.file}`);
      await downloadFile(doc);
      console.log(`  ✓ Downloaded: ${doc.file}`);
      results.push({ success: true, file: doc.file });
    } catch (error) {
      console.log(`  ✗ Error: ${error.message}`);
      results.push({ success: false, file: doc.file, error: error.message });
    }
  }
  
  const successful = results.filter(r => r.success).length;
  console.log(`\n\nDownload complete! ${successful}/${documents.length} files downloaded successfully.`);
  
  return results;
}

downloadAll().catch(console.error);

