'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X } from "lucide-react"
import { useTranslations } from 'next-intl'
import { useState, useCallback } from 'react'

/**
 * Document Upload Component
 * 
 * Allows uploading PDF and DOCX files to handbook sections
 */

interface DocumentUploadProps {
  sectionPath: string
  onUploadComplete?: () => void
}

export function DocumentUpload({ sectionPath, onUploadComplete }: DocumentUploadProps) {
  const t = useTranslations('handbook.document_upload');
  const tCommon = useTranslations('common');
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => 
      file.type.includes('pdf') || 
      file.type.includes('word') || 
      file.type.includes('document') ||
      file.name.endsWith('.docx') ||
      file.name.endsWith('.doc')
    )
    
    setFiles(prev => [...prev, ...droppedFiles])
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(prev => [...prev, ...selectedFiles])
    }
  }, [])

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleUpload = async () => {
    // TODO: Implement actual upload logic
    // For now, this is a placeholder
    console.log('Uploading files:', files)
    console.log('To section:', sectionPath)
    
    // Simulate upload
    alert(`Would upload ${files.length} file(s) to ${sectionPath}`)
    
    // Clear files after upload
    setFiles([])
    onUploadComplete?.()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          {t('title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors
            ${isDragging 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-accent'
            }
          `}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            multiple
            accept=".pdf,.doc,.docx,.xlsx,.xls"
            onChange={handleFileSelect}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm font-medium mb-2">
              {t('drop_zone_text')}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('supported_formats')}
            </p>
          </label>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">{t('selected_files')} ({files.length})</p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border bg-accent/50"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Upload Button */}
            <div className="flex justify-end pt-2">
              <Button onClick={handleUpload} className="gap-2">
                <Upload className="h-4 w-4" />
                {files.length === 1 ? t('upload_button_singular') : t('upload_button', { count: files.length })}
              </Button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
          <p className="font-medium">{t('instructions_title')}</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>{t('instruction_1')}</li>
            <li>{t('instruction_2')}</li>
            <li>{t('instruction_3')}</li>
            <li>{t('instruction_4')}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

