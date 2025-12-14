# Office Viewer Setup Guide

This project supports viewing Office documents (.doc, .docx, .xls, .xlsx, .ppt, .pptx) directly in the browser using Microsoft's Office Online Viewer.

## Current Implementation

### Office Online Viewer (Free, No Authentication)

The application currently uses **Office Online Viewer**, which is free and requires no authentication. It works automatically when:

- ✅ Your site is deployed to production with HTTPS
- ✅ Documents are publicly accessible via HTTPS URL
- ❌ **Does NOT work with localhost** (development environment)

### How It Works

1. **First Attempt**: Tries to render with `docx-preview` library (works for some .docx files)
2. **Second Attempt**: If that fails, uses Office Online Viewer via iframe
3. **Fallback**: If Office viewer fails, tries Google Docs Viewer
4. **Final Fallback**: Shows download option if all viewers fail

## Office 365 API Setup (Optional)

If you want to use Office 365 API instead (for better control, authentication, etc.), follow these steps:

### Prerequisites

- Azure AD account
- Office 365 subscription (optional, for advanced features)

### Step 1: Register App in Azure AD

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Fill in:
   - **Name**: Your app name (e.g., "Normik Document Viewer")
   - **Supported account types**: Choose based on your needs
   - **Redirect URI**: 
     - Type: Web
     - URI: `http://localhost:3000/api/auth/callback` (for development)
     - Add production URL when deploying
5. Click **Register**

### Step 2: Configure API Permissions

1. In your app registration, go to **API permissions**
2. Click **Add a permission**
3. Select **Microsoft Graph**
4. Choose **Delegated permissions**
5. Add these permissions:
   - `Files.Read`
   - `Files.ReadWrite` (if you need editing)
   - `User.Read` (for user info)
6. Click **Add permissions**
7. Click **Grant admin consent** (if you have admin rights)

### Step 3: Get Client Credentials

1. In your app registration, go to **Overview**
2. Copy:
   - **Application (client) ID** → This is your `OFFICE_365_CLIENT_ID`
   - **Directory (tenant) ID** → This is your `OFFICE_365_TENANT_ID`

### Step 4: Configure Redirect URI

1. Go to **Authentication**
2. Add redirect URIs:
   - `http://localhost:3000/api/auth/callback` (development)
   - `https://yourdomain.com/api/auth/callback` (production)

### Step 5: Set Environment Variables

Create or update your `.env.local` file:

```env
# Office 365 API Configuration
NEXT_PUBLIC_USE_OFFICE_365_API=true
NEXT_PUBLIC_OFFICE_365_CLIENT_ID=your-client-id-here
NEXT_PUBLIC_OFFICE_365_TENANT_ID=your-tenant-id-here
NEXT_PUBLIC_OFFICE_365_REDIRECT_URI=http://localhost:3000/api/auth/callback
```

### Step 6: Implement Authentication (Future)

The current implementation uses Office Online Viewer (free). To use Office 365 API, you would need to:

1. Install Microsoft Authentication Library (MSAL):
   ```bash
   npm install @azure/msal-browser @azure/msal-react
   ```

2. Create authentication provider
3. Update `src/lib/office-viewer.ts` to use Office 365 API endpoints
4. Implement token management

## Troubleshooting

### "We're sorry, but for some reason we can't open this for you"

This error occurs when:
- The document URL is not publicly accessible
- The site is running on localhost (Office Online Viewer requires public HTTPS)
- CORS restrictions prevent access
- The file format is not supported

**Solutions:**
- Deploy to production with HTTPS
- Ensure documents are in the `public` folder
- Check file permissions
- Use the download option as fallback

### Documents not loading in production

1. **Check HTTPS**: Office Online Viewer requires HTTPS
2. **Verify URLs**: Ensure document URLs are publicly accessible
3. **Check CORS**: Ensure your server allows cross-origin requests
4. **File size**: Very large files may timeout

### Localhost Development

Office Online Viewer **does not work** with localhost. During development:
- Documents will show a download option
- Preview will work once deployed to production
- You can test with a tunnel service (ngrok, etc.) if needed

## File Format Support

| Format | docx-preview | Office Online Viewer | Google Docs Viewer |
|--------|--------------|---------------------|-------------------|
| .docx  | ✅ Partial   | ✅ Full             | ✅ Full           |
| .doc   | ❌ No        | ✅ Full             | ✅ Full           |
| .xlsx  | ❌ No        | ✅ Full             | ✅ Full           |
| .xls   | ❌ No        | ✅ Full             | ✅ Full           |
| .pptx  | ❌ No        | ✅ Full             | ✅ Full           |
| .ppt   | ❌ No        | ✅ Full             | ✅ Full           |
| .pdf   | ❌ No        | ✅ Full             | ✅ Full           |

## Next Steps

1. **For Production**: Deploy your site with HTTPS to enable Office Online Viewer
2. **For Office 365 API**: Follow the setup steps above if you need advanced features
3. **For Better .doc Support**: Consider converting .doc files to .docx format

## References

- [Office Online Viewer](https://view.officeapps.live.com/)
- [Microsoft Graph API](https://docs.microsoft.com/en-us/graph/overview)
- [Azure AD App Registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)

