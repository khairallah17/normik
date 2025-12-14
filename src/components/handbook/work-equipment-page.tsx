'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslations } from 'next-intl'
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VCANavigation } from "@/components/vca-navigation"

export function WorkEquipmentPage() {
  const t = useTranslations('handbook.structure');
  
  const moduleTitle = t('work_equipment');

  // Mock data structure
  const equipment: Array<{
    id: string
    type: string
    description: string
    identification: string
    operatingCompany: string
    next: string
    d: string
  }> = []; // Empty for now

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* VCA Navigation */}
      <VCANavigation />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{moduleTitle}</CardTitle>
            <Button>
              Nieuw arbeidsmiddel
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search/Filter Section */}
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <Checkbox id="removed" />
              <label htmlFor="removed" className="text-sm cursor-pointer">
                Verwijderd
              </label>
            </div>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="-select soort-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle soorten</SelectItem>
                <SelectItem value="type1">Type 1</SelectItem>
                <SelectItem value="type2">Type 2</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 flex-1">
              <Input 
                placeholder="Zoek" 
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10">
                  <TableHead>Soort</TableHead>
                  <TableHead>Omschrijving</TableHead>
                  <TableHead>Identificatie</TableHead>
                  <TableHead>Werkmaatschappij</TableHead>
                  <TableHead>Volgende</TableHead>
                  <TableHead className="w-[40px]">D</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipment.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                      Geen data gevonden.
                    </TableCell>
                  </TableRow>
                ) : (
                  equipment.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.identification}</TableCell>
                      <TableCell>{item.operatingCompany}</TableCell>
                      <TableCell>{item.next}</TableCell>
                      <TableCell>{item.d}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground px-4">
                pagina <span className="font-semibold text-foreground">0</span> van 0
              </span>
              <Button variant="outline" size="icon" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" disabled>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Select defaultValue="30">
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">
              Geen data gevonden.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

