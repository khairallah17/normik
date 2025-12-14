'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslations } from 'next-intl'
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, BarChart3, ClipboardList, Calendar, Settings } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function WorkplaceInspectionsPage() {
  const t = useTranslations('handbook.structure');
  
  const moduleTitle = t('workplace_inspections');

  // Mock data structure
  const inspections: Array<{
    id: string
    date: string
    title: string
    number: string
    type: string
    inspector: string
    location: string
    deviations: string
    direct: string
  }> = []; // Empty for now

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{moduleTitle}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{moduleTitle}</CardTitle>
                <Button>
                  Nieuwe werkplekinspectie checklist
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search/Filter Section */}
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Checkbox id="last3years" />
                  <label htmlFor="last3years" className="text-sm cursor-pointer">
                    laatste 3 jaar
                  </label>
                </div>
                <Input 
                  placeholder="Zoek" 
                  className="flex-1"
                />
              </div>

              {/* Table */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/10">
                      <TableHead>
                        <div className="flex items-center gap-2">
                          Datum
                          <button className="hover:text-primary">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                        </div>
                      </TableHead>
                      <TableHead>Titel</TableHead>
                      <TableHead className="w-[80px]">Nr</TableHead>
                      <TableHead>Soort</TableHead>
                      <TableHead>Inspecteur</TableHead>
                      <TableHead>Locatie</TableHead>
                      <TableHead>Afwijkin</TableHead>
                      <TableHead>Direct</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inspections.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                          Geen data gevonden.
                        </TableCell>
                      </TableRow>
                    ) : (
                      inspections.map((inspection) => (
                        <TableRow key={inspection.id}>
                          <TableCell>{inspection.date}</TableCell>
                          <TableCell>{inspection.title}</TableCell>
                          <TableCell>{inspection.number}</TableCell>
                          <TableCell>{inspection.type}</TableCell>
                          <TableCell>{inspection.inspector}</TableCell>
                          <TableCell>{inspection.location}</TableCell>
                          <TableCell>{inspection.deviations}</TableCell>
                          <TableCell>{inspection.direct}</TableCell>
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

        {/* Right Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center gap-2 cursor-pointer hover:bg-accent p-4 rounded-lg transition-colors">
                <BarChart3 className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium text-center">RAPPORTEN</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center gap-2 cursor-pointer hover:bg-accent p-4 rounded-lg transition-colors">
                <ClipboardList className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium text-center">CHECKLIST TEMPLATES</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center gap-2 cursor-pointer hover:bg-accent p-4 rounded-lg transition-colors">
                <Calendar className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium text-center">WERKPLEKINSPECTIE PLANNER</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center gap-2 cursor-pointer hover:bg-accent p-4 rounded-lg transition-colors">
                <Settings className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium text-center">INSTELLINGEN</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

