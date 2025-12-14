'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { FileText, Download, Eye, FileIcon } from "lucide-react"
import { useTranslations } from 'next-intl'

/**
 * Document Viewer Component
 * 
 * Displays a list of documents with download and view options
 */

interface Document {
  id: string
  name: string
  description?: string
  type: 'pdf' | 'docx' | 'doc' | 'xlsx' | 'other'
  path: string
  size?: string
  lastModified?: string
}

interface DocumentViewerProps {
  documents: Document[]
  sectionTitle: string
}

const getFileIcon = (type: Document['type']) => {
  const iconClass = "h-5 w-5"
  switch (type) {
    case 'pdf':
      return <FileText className={`${iconClass} text-red-500`} />
    case 'docx':
    case 'doc':
      return <FileText className={`${iconClass} text-blue-500`} />
    case 'xlsx':
      return <FileText className={`${iconClass} text-green-500`} />
    default:
      return <FileIcon className={`${iconClass} text-gray-500`} />
  }
}

const getFileExtension = (filename: string) => {
  return filename.split('.').pop()?.toLowerCase() || 'unknown'
}

export function DocumentViewer({ documents, sectionTitle }: DocumentViewerProps) {
  const t = useTranslations('handbook');
  const tCommon = useTranslations('common');

  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground py-8">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>{t('no_documents')}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {t('section_documents')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-start gap-4 p-4 rounded-lg border hover:border-blue-500 hover:bg-accent/50 transition-all group"
            >
              {/* File Icon */}
              <div className="mt-1">
                {getFileIcon(doc.type)}
              </div>

              {/* Document Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm mb-1 group-hover:text-blue-600 transition-colors">
                  {doc.name}
                </h3>
                {doc.description && (
                  <p className="text-xs text-muted-foreground mb-2">
                    {doc.description}
                  </p>
                )}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {doc.size && (
                    <span className="flex items-center gap-1">
                      <FileIcon className="h-3 w-3" />
                      {doc.size}
                    </span>
                  )}
                  {doc.lastModified && (
                    <span>{doc.lastModified}</span>
                  )}
                  <span className="uppercase font-mono bg-muted px-2 py-0.5 rounded">
                    {getFileExtension(doc.name)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {(doc.type === 'pdf' || doc.type === 'docx' || doc.type === 'doc') && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    asChild
                  >
                    <Link href={`/dashboard/handbook/view/${doc.id}`}>
                      <Eye className="h-4 w-4" />
                      {tCommon('view')}
                    </Link>
                  </Button>
                )}
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2"
                  asChild
                >
                  <a 
                    href={encodeURI(doc.path)} 
                    download={doc.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4" />
                    {tCommon('download')}
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

