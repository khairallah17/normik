'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, FileText, Loader2, Table } from "lucide-react"
import { useRouter } from "@/i18n/routing"
import { useTranslations } from 'next-intl'
import { getAllDocuments } from "@/lib/documents"
import { renderAsync } from 'docx-preview'
import * as XLSX from 'xlsx'
import { getOfficeOnlineViewerUrl, canUseOfficeOnlineViewer, getGoogleDocsViewerUrl } from '@/lib/office-viewer'

/**
 * Document View Page
 * 
 * Full page view for documents supporting:
 * - PDF: Native browser iframe viewer
 * - DOCX: Client-side rendering with docx-preview
 * - DOC: Client-side rendering with docx-preview (if supported) or download fallback
 * - XLSX: Client-side parsing and table display
 * - Other: Download only
 */

interface PageProps {
  params: Promise<{
    documentId: string
  }>
}

export default function DocumentViewPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const documentId = resolvedParams.documentId;
  const router = useRouter();
  const t = useTranslations('handbook.document_viewer');
  const tCommon = useTranslations('common');
  const docxContainerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [excelData, setExcelData] = useState<{ sheetName: string; data: any[][] }[]>([])
  const [activeSheet, setActiveSheet] = useState(0)
  const [isRendered, setIsRendered] = useState(false)
  
  // Find the document by ID
  const handbookDoc = getAllDocuments().find(doc => doc.id === documentId)

  // Cleanup function
  const cleanup = useCallback(() => {
    if (docxContainerRef.current) {
      docxContainerRef.current.innerHTML = ''
    }
    setIsRendered(false)
    setError(null)
  }, [])

  // Render DOCX/DOC files
  useEffect(() => {
    if (!handbookDoc) {
      setIsLoading(false)
      return
    }
    
    // Reset state when document changes
    cleanup()
      setIsLoading(true)
      setError(null)
      
    // Handle DOCX and DOC files
    if (handbookDoc.type === 'docx' || handbookDoc.type === 'doc') {
      // Note: .doc files (older format) may not be fully supported by docx-preview
      // We'll try to render them but provide a fallback
      if (handbookDoc.type === 'doc') {
        console.warn('Rendering .doc file - docx-preview may have limited support for this format')
      }
      
      // Use requestAnimationFrame to ensure DOM is ready
      const renderDoc = () => {
        // Wait for next frame to ensure DOM is ready
        requestAnimationFrame(() => {
          // Double check with another frame
          requestAnimationFrame(() => {
              if (!docxContainerRef.current) {
                // If still not available, try one more time
                setTimeout(() => {
                  if (!docxContainerRef.current) {
                    setError('Unable to initialize document viewer. Please refresh the page.')
                    setIsLoading(false)
                    return
                  }
                  loadAndRenderDoc()
                }, 300)
                return
              }
              loadAndRenderDoc()
            })
        })
      }

      const loadAndRenderDoc = async () => {
        let wrapper: HTMLDivElement | null = null
        
        try {
          // Wait a bit more to ensure DOM is fully ready
          await new Promise(resolve => setTimeout(resolve, 100))
          
          if (!docxContainerRef.current) {
            throw new Error('Container not available')
          }

          const container = docxContainerRef.current
          
          // Clear previous content and create a fresh wrapper
          container.innerHTML = ''
          
          // Create a wrapper div inside the container for docx-preview
          wrapper = document.createElement('div')
          wrapper.className = 'docx-wrapper-inner'
          // Add a placeholder to ensure the element has content
          wrapper.innerHTML = '<div></div>'
          container.appendChild(wrapper)
          
          // Wait for the wrapper to be in the DOM - use multiple frames to ensure it's ready
          await new Promise(resolve => requestAnimationFrame(resolve))
          await new Promise(resolve => requestAnimationFrame(resolve))
          
          // Verify wrapper is actually in the DOM and has the expected structure
          if (!container.contains(wrapper) || !wrapper.parentNode) {
            throw new Error('Failed to create document container')
          }
          
          // Verify the wrapper has the childNodes property accessible
          if (!wrapper.childNodes || wrapper.childNodes.length === undefined) {
            throw new Error('Container element is not properly initialized')
          }
          
          // Fetch the document
          const response = await fetch(encodeURI(handbookDoc.path))
          if (!response.ok) {
            throw new Error(`Failed to fetch document: ${response.status} ${response.statusText}`)
          }

          const blob = await response.blob()
          
          // Verify blob is valid
          if (!blob || blob.size === 0) {
            throw new Error('Document file is empty or corrupted')
          }

          // Final check - ensure wrapper still exists
          if (!container.contains(wrapper) || !wrapper.parentNode) {
            throw new Error('Container element was removed during fetch')
          }

          // Render the document into the wrapper
          // Use a try-catch around renderAsync to catch any internal errors
          try {
            await renderAsync(blob, wrapper, undefined, {
              className: 'docx-preview',
              inWrapper: true,
              ignoreWidth: false,
              ignoreHeight: false,
              renderHeaders: true,
              renderFooters: true,
              useBase64URL: true
            })
          } catch (renderError: any) {
            // If renderAsync fails (especially for .doc files), try Office Online Viewer
            console.warn('docx-preview failed, trying Office Online Viewer:', renderError)
            
            // Clear the wrapper
            wrapper.innerHTML = ''
            
            // Get the full document URL (must be publicly accessible via HTTPS)
            const documentUrl = window.location.origin + handbookDoc.path
            
            // Check if we can use Office Online Viewer
            const canUseOfficeViewer = canUseOfficeOnlineViewer()
            
            // Office Online Viewer URL (free, no authentication required)
            // Works for: .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf
            // Note: Requires publicly accessible HTTPS URL (won't work with localhost)
            const officeViewerUrl = canUseOfficeViewer 
              ? getOfficeOnlineViewerUrl(documentUrl)
              : null
            
            // If Office Online Viewer can't be used (localhost), show download option directly
            if (!canUseOfficeViewer || !officeViewerUrl) {
              const blobUrl = URL.createObjectURL(blob)
              
              const infoDiv = document.createElement('div')
              infoDiv.className = 'flex flex-col items-center justify-center p-12 text-center min-h-[400px]'
              infoDiv.innerHTML = `
                <div class="mb-6">
                  <svg class="w-20 h-20 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold mb-3 text-foreground">Document Preview Not Available</h3>
                <p class="text-sm text-muted-foreground mb-2 max-w-md">
                  Office Online Viewer requires a publicly accessible HTTPS URL. 
                  ${window.location.hostname === 'localhost' ? 'When deployed to production, documents will be viewable online.' : 'Please ensure the file is accessible via HTTPS.'}
                </p>
                <p class="text-sm text-muted-foreground mb-6 max-w-md">
                  Please download the file to view it in Microsoft Word or another compatible application.
                </p>
                <a href="${blobUrl}" download="${handbookDoc.name.replace(/[<>:"/\\|?*]/g, '_')}" 
                   class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Download Document
                </a>
              `
              
              wrapper.appendChild(infoDiv)
              
              // Clean up blob URL after reasonable time
              setTimeout(() => {
                try {
                  URL.revokeObjectURL(blobUrl)
                } catch (e) {
                  // Ignore cleanup errors
                }
              }, 60000)
              
              setIsRendered(true)
              setIsLoading(false)
              return // Exit early
            }
            
            // Create iframe for Office Online Viewer
            const iframe = document.createElement('iframe')
            iframe.src = officeViewerUrl
            iframe.style.width = '100%'
            iframe.style.height = '100%'
            iframe.style.border = 'none'
            iframe.style.minHeight = '600px'
            iframe.title = handbookDoc.name
            iframe.allow = 'fullscreen'
            iframe.className = 'office-viewer-iframe'
            iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms')
            
            // Handle iframe load errors
            let loadError = false
            let fallbackAttempted = false
            
            const handleError = () => {
              // If Office viewer fails, try Google Docs Viewer as fallback first
              if (!fallbackAttempted) {
                fallbackAttempted = true
                const googleViewerUrl = getGoogleDocsViewerUrl(documentUrl)
                iframe.src = googleViewerUrl
                return // Try Google viewer
              }
              
              // If both viewers fail, show download option
              if (loadError) return // Already handled
              loadError = true
              
              wrapper.innerHTML = ''
              const blobUrl = URL.createObjectURL(blob)
              
              const infoDiv = document.createElement('div')
              infoDiv.className = 'flex flex-col items-center justify-center p-12 text-center min-h-[400px]'
              infoDiv.innerHTML = `
                <div class="mb-6">
                  <svg class="w-20 h-20 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold mb-3 text-foreground">Document Preview Not Available</h3>
                <p class="text-sm text-muted-foreground mb-2 max-w-md">
                  Unable to load document preview. This may be due to:
                </p>
                <ul class="text-sm text-muted-foreground mb-6 max-w-md text-left list-disc list-inside space-y-1">
                  <li>File access restrictions</li>
                  <li>Network connectivity issues</li>
                  <li>File format limitations</li>
                </ul>
                <p class="text-sm text-muted-foreground mb-6 max-w-md">
                  Please download the file to view it in Microsoft Word or another compatible application.
                </p>
                <a href="${blobUrl}" download="${handbookDoc.name.replace(/[<>:"/\\|?*]/g, '_')}" 
                   class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Download Document
                </a>
              `
              
              wrapper.appendChild(infoDiv)
              
              // Clean up blob URL after reasonable time
              setTimeout(() => {
                try {
                  URL.revokeObjectURL(blobUrl)
                } catch (e) {
                  // Ignore cleanup errors
                }
              }, 60000)
              
              setIsRendered(true)
              setIsLoading(false)
            }
            
            // Set timeout to detect if iframe fails to load
            const loadTimeout = setTimeout(() => {
              // If still loading after timeout, try fallback
              if (!loadError) {
                handleError()
              }
            }, 15000) // 15 second timeout
            
            // Clear timeout if iframe loads successfully
            iframe.onload = () => {
              clearTimeout(loadTimeout)
              if (!loadError) {
                setIsRendered(true)
                setIsLoading(false)
              }
            }
            
            // Handle iframe errors
            iframe.onerror = handleError
            
            wrapper.appendChild(iframe)
            
            // Set loading to false after a short delay to show iframe
            setTimeout(() => {
              if (!loadError) {
                setIsRendered(true)
                setIsLoading(false)
              }
            }, 2000)
            
            return // Exit early since we handled it
          }

          setIsRendered(true)
          setIsLoading(false)
        } catch (err: any) {
          console.error('Error rendering document:', err)
          
          // If we get here, there was an error that wasn't handled by the renderError catch
          // Show download option with helpful message
          setError('Unable to display this document. Please download it to view.')
          setIsLoading(false)
          
          // Clean up on error
          if (docxContainerRef.current) {
            docxContainerRef.current.innerHTML = ''
          }
        }
      }

      renderDoc()
    } else if (handbookDoc.type === 'pdf') {
      // PDF files don't need special loading
      setIsLoading(false)
    } else if (handbookDoc.type === 'xlsx') {
      // Excel files will be handled by the Excel useEffect
      setIsLoading(true)
    } else {
      // Other file types
          setIsLoading(false)
    }

    // Cleanup on unmount or document change
    return () => {
      cleanup()
    }
  }, [handbookDoc, cleanup])

  // Load and parse Excel files
  useEffect(() => {
    if (!handbookDoc || handbookDoc.type !== 'xlsx') return
    
    setIsLoading(true)
    setError(null)
    
    fetch(encodeURI(handbookDoc.path))
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch Excel file: ${response.status}`)
        }
        return response.arrayBuffer()
      })
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: 'array' })
        const sheets = workbook.SheetNames.map(sheetName => {
          const worksheet = workbook.Sheets[sheetName]
          const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]
          return { sheetName, data }
        })
        setExcelData(sheets)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error loading Excel file:', err)
        setError(`Failed to load Excel file: ${err.message}`)
        setIsLoading(false)
      })
  }, [handbookDoc])

  if (!handbookDoc) {
    return (
      <div className="flex flex-1 flex-col gap-6">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-red-500" />
              {t('not_found')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {t('not_found_description')}
            </p>
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('go_back')}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Document Header */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-blue-500" />
                {handbookDoc.name}
              </CardTitle>
              {handbookDoc.description && (
                <p className="text-sm text-muted-foreground">
                  {handbookDoc.description}
                </p>
              )}
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                {handbookDoc.size && <span>{t('size')} {handbookDoc.size}</span>}
                {handbookDoc.lastModified && <span>{t('last_modified')} {handbookDoc.lastModified}</span>}
                <span className="uppercase font-mono bg-muted px-2 py-1 rounded">
                  {handbookDoc.type}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {tCommon('back')}
              </Button>
              <Button variant="default" size="sm" asChild>
                <a href={encodeURI(handbookDoc.path)} download={handbookDoc.name} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  {tCommon('download')}
                </a>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Document Content */}
      <Card>
        <CardContent className="p-0">
          {/* PDF Viewer - Native Browser */}
          {handbookDoc.type === 'pdf' && (
            <div className="w-full" style={{ height: 'calc(100vh - 300px)', minHeight: '600px' }}>
              <iframe
                src={encodeURI(handbookDoc.path)}
                className="w-full h-full rounded-lg border"
                title={handbookDoc.name}
                allow="fullscreen"
              />
            </div>
          )}

          {/* DOCX/DOC Viewer - Client Side */}
          {(handbookDoc.type === 'docx' || handbookDoc.type === 'doc') && (
            <div className="w-full p-6">
              {isLoading && (
                <div className="flex items-center justify-center py-24">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                  <span className="ml-4 text-lg text-muted-foreground">{t('loading_document')}</span>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-red-400" />
                  <p className="text-red-600 dark:text-red-400 font-medium text-lg mb-2">{t('error_loading')}</p>
                  <p className="text-sm text-red-500 dark:text-red-400 mb-4">{error}</p>
                  {handbookDoc.type === 'doc' && (
                    <p className="text-xs text-muted-foreground mb-4">
                      Note: .doc files (older Word format) may not be fully supported. Please download to view in Microsoft Word.
                    </p>
                  )}
                  <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm" asChild>
                      <a href={encodeURI(handbookDoc.path)} download={handbookDoc.name} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      {t('download_instead')}
                    </a>
                  </Button>
                    {handbookDoc.type === 'docx' && (
                      <Button variant="outline" size="sm" onClick={() => {
                        setError(null)
                        setIsLoading(true)
                        setIsRendered(false)
                        // Clear container and re-trigger render
                        if (docxContainerRef.current) {
                          docxContainerRef.current.innerHTML = ''
                        }
                        // Force re-render
                        setTimeout(() => {
                          setIsLoading(true)
                          setError(null)
                        }, 100)
                      }}>
                        Retry
                      </Button>
                    )}
                  </div>
                </div>
              )}
              
              {/* Document container - always rendered and visible */}
              {!error && (
                <div 
                  ref={docxContainerRef}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm docx-wrapper"
                  style={{ 
                    minHeight: 'calc(100vh - 400px)',
                    padding: '2rem',
                    display: isLoading ? 'none' : 'block'
                  }}
                />
              )}
            </div>
          )}

          {/* XLSX Viewer - Excel Spreadsheets */}
          {handbookDoc.type === 'xlsx' && (
            <div className="w-full p-6">
              {isLoading && (
                <div className="flex items-center justify-center py-24">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                  <span className="ml-4 text-lg text-muted-foreground">{t('loading_document')}</span>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center">
                  <Table className="h-16 w-16 mx-auto mb-4 text-red-400" />
                  <p className="text-red-600 dark:text-red-400 font-medium text-lg mb-2">{t('error_loading')}</p>
                  <p className="text-sm text-red-500 dark:text-red-400 mb-4">{error}</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href={encodeURI(handbookDoc.path)} download={handbookDoc.name} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      {t('download_instead')}
                    </a>
                  </Button>
                </div>
              )}
              
              {!isLoading && !error && excelData.length > 0 && (
                <div className="space-y-4">
                  {/* Sheet Tabs */}
                  {excelData.length > 1 && (
                    <div className="flex gap-2 border-b pb-2 overflow-x-auto">
                      {excelData.map((sheet, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveSheet(index)}
                          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                            activeSheet === index
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {sheet.sheetName}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Excel Table */}
                  <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {excelData[activeSheet]?.data.map((row: any[], rowIndex: number) => (
                          <tr key={rowIndex} className={rowIndex === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''}>
                            {row.map((cell: any, cellIndex: number) => (
                              <td
                                key={cellIndex}
                                className={`px-4 py-2 text-sm whitespace-nowrap ${
                                  rowIndex === 0
                                    ? 'font-semibold text-gray-900 dark:text-gray-100'
                                    : 'text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                {cell !== null && cell !== undefined ? String(cell) : ''}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Other file types - Download only */}
          {handbookDoc.type !== 'pdf' && handbookDoc.type !== 'docx' && handbookDoc.type !== 'doc' && handbookDoc.type !== 'xlsx' && (
            <div className="text-center py-24 px-6">
              <FileText className="h-20 w-20 mx-auto mb-6 text-muted-foreground" />
              <p className="text-lg text-muted-foreground mb-6">
                {t('preview_not_available')}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                This file type ({handbookDoc.type}) cannot be previewed in the browser. Please download it to view.
              </p>
              <Button variant="default" asChild>
                <a href={encodeURI(handbookDoc.path)} download={handbookDoc.name} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  {t('download_to_view')}
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
