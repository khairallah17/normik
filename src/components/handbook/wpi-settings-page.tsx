'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VCANavigation } from "@/components/vca-navigation"
import { useTranslations } from 'next-intl'

export function WpiSettingsPage() {
  const t = useTranslations('handbook.structure');
  
  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* VCA Navigation */}
      <VCANavigation />
      
      <Card>
        <CardHeader>
          <CardTitle>INSTELLINGEN</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Instellingen pagina wordt geladen...</p>
        </CardContent>
      </Card>
    </div>
  )
}

