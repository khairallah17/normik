'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from 'next-intl'
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileSpreadsheet } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VCANavigation } from "@/components/vca-navigation"

export function PersonnelPage() {
  const t = useTranslations('handbook.structure');
  
  const moduleTitle = t('personnel');

  // Mock data structure
  const personnel: Array<{
    id: string
    firstName: string
    lastName: string
    mobile: string
    function: string
    endOfContract: string
    k: number
    b: string
    next: string
  }> = []; // Empty for now

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* VCA Navigation */}
      <VCANavigation />

      <Card>
        <CardHeader>
          <CardTitle>{moduleTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tabs */}
          <Tabs defaultValue="personnel">
            <TabsList>
              <TabsTrigger value="personnel">Personeel</TabsTrigger>
              <TabsTrigger value="qualification">Kwalificatieverloop</TabsTrigger>
            </TabsList>

            <TabsContent value="personnel" className="space-y-4 mt-4">
              {/* Controls and Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                <Button>
                  Nieuwe medewerker
                </Button>
                <div className="flex items-center gap-2">
                  <Checkbox id="outOfService" />
                  <label htmlFor="outOfService" className="text-sm cursor-pointer">
                    Uit dienst
                  </label>
                </div>
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="-filter kwalificatie verloop-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle</SelectItem>
                    <SelectItem value="active">Actief</SelectItem>
                    <SelectItem value="inactive">Inactief</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2 flex-1 justify-end">
                  <Input 
                    placeholder="Zoek" 
                    className="w-48"
                  />
                  <Button variant="outline" size="icon">
                    <FileSpreadsheet className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <FileSpreadsheet className="h-4 w-4 text-green-600" />
                  </Button>
                </div>
              </div>

              {/* Table */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/10">
                      <TableHead>
                        <div className="flex items-center gap-2">
                          Voornaam
                          <button className="hover:text-primary">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                        </div>
                      </TableHead>
                      <TableHead>Achternaam</TableHead>
                      <TableHead>Mobiel</TableHead>
                      <TableHead>Functie</TableHead>
                      <TableHead>Einde_contract</TableHead>
                      <TableHead className="w-[40px]">K</TableHead>
                      <TableHead className="w-[40px]">B</TableHead>
                      <TableHead>Volgende</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {personnel.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                          Geen data gevonden.
                        </TableCell>
                      </TableRow>
                    ) : (
                      personnel.map((person) => (
                        <TableRow key={person.id}>
                          <TableCell>{person.firstName}</TableCell>
                          <TableCell>{person.lastName}</TableCell>
                          <TableCell>{person.mobile}</TableCell>
                          <TableCell>{person.function}</TableCell>
                          <TableCell>{person.endOfContract}</TableCell>
                          <TableCell>{person.k}</TableCell>
                          <TableCell>{person.b}</TableCell>
                          <TableCell>{person.next}</TableCell>
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
                  regels 0 - 0 van 0
                </div>
              </div>
            </TabsContent>

            <TabsContent value="qualification" className="mt-4">
              <div className="text-center py-12 text-muted-foreground">
                Kwalificatieverloop content will be displayed here
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

