'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useTranslations } from 'next-intl'
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ModulePageProps {
  moduleKey: string
  kamUrl: string
  description?: string
}

export function ModulePage({ moduleKey, kamUrl, description }: ModulePageProps) {
  const t = useTranslations('handbook.structure');
  
  const moduleTitle = t(moduleKey);
  const moduleDescription = description || `${moduleTitle} module from KAM system`;

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{moduleTitle}</h1>
        <p className="text-muted-foreground mt-2">
          {moduleDescription}
        </p>
      </div>

      {/* Module Content Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{moduleTitle}</CardTitle>
              <CardDescription>
                Access the {moduleTitle} module from the KAM system
              </CardDescription>
            </div>
            <Button asChild variant="outline">
              <a 
                href={kamUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open in KAM System
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden" style={{ minHeight: '600px' }}>
            <iframe
              src={kamUrl}
              className="w-full h-full"
              style={{ minHeight: '600px', border: 'none' }}
              title={moduleTitle}
              allow="fullscreen"
            />
          </div>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>About this Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This module is integrated from the KAM system. Use the interface above to manage {moduleTitle.toLowerCase()}.
            If the content does not load, click the &quot;Open in KAM System&quot; button to access it directly.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

