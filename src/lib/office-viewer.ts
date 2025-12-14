/**
 * Office Viewer Configuration
 * 
 * Supports both Office Online Viewer (free, no auth) and Office 365 API (requires setup)
 */

export interface OfficeViewerConfig {
  useOffice365API: boolean
  office365ClientId?: string
  office365TenantId?: string
  office365RedirectUri?: string
}

/**
 * Get Office Online Viewer URL (free, no authentication required)
 * Works for: .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf
 * 
 * Note: Requires publicly accessible HTTPS URL (won't work with localhost)
 */
export function getOfficeOnlineViewerUrl(documentUrl: string): string {
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(documentUrl)}`
}

/**
 * Check if Office Online Viewer can be used
 * (requires publicly accessible HTTPS URL)
 */
export function canUseOfficeOnlineViewer(): boolean {
  if (typeof window === 'undefined') return false
  
  // Office Online Viewer requires HTTPS and publicly accessible URLs
  // It won't work with localhost or private IPs
  const isLocalhost = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.hostname.startsWith('192.168.') ||
                     window.location.hostname.startsWith('10.') ||
                     window.location.hostname.startsWith('172.')
  
  const isHttps = window.location.protocol === 'https:'
  
  // Can use if HTTPS and not localhost
  return isHttps && !isLocalhost
}

/**
 * Get alternative viewer URL (Google Docs Viewer as fallback)
 */
export function getGoogleDocsViewerUrl(documentUrl: string): string {
  return `https://docs.google.com/viewer?url=${encodeURIComponent(documentUrl)}&embedded=true`
}

/**
 * Office 365 API Configuration (for future implementation)
 * 
 * To use Office 365 API:
 * 1. Register an app in Azure AD: https://portal.azure.com
 * 2. Get Client ID and Tenant ID
 * 3. Set redirect URI
 * 4. Configure API permissions (Files.Read, Files.ReadWrite)
 * 5. Add environment variables:
 *    - OFFICE_365_CLIENT_ID
 *    - OFFICE_365_TENANT_ID
 *    - OFFICE_365_REDIRECT_URI
 */
export function getOffice365Config(): OfficeViewerConfig {
  return {
    useOffice365API: process.env.NEXT_PUBLIC_USE_OFFICE_365_API === 'true',
    office365ClientId: process.env.NEXT_PUBLIC_OFFICE_365_CLIENT_ID,
    office365TenantId: process.env.NEXT_PUBLIC_OFFICE_365_TENANT_ID,
    office365RedirectUri: process.env.NEXT_PUBLIC_OFFICE_365_REDIRECT_URI,
  }
}

