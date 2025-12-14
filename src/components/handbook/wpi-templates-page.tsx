'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VCANavigation } from "@/components/vca-navigation"
import { useTranslations } from 'next-intl'

export function WpiTemplatesPage() {
  const t = useTranslations('handbook.structure');
  
  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* VCA Navigation */}
      <VCANavigation />
      
      <Card>
        <CardHeader>
          <CardTitle>CHECKLIST TEMPLATES</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Checklist templates pagina wordt geladen...</p>
        </CardContent>
      </Card>
    </div>
  )
}

