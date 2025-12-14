'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslations } from 'next-intl'
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, BarChart3, Settings, FileSpreadsheet } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NotificationsPage() {
  const t = useTranslations('handbook.structure');
  
  const moduleTitle = t('notifications');

  // Mock data structure
  const notifications: Array<{
    id: string
    date: string
    planned: string
    reference: string
    type: string
    description: string
    by: string
    status: string
    owner: string
    location: string
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
                  Nieuwe melding
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filter/Search Section */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Checkbox id="last3years" defaultChecked />
                  <label htmlFor="last3years" className="text-sm cursor-pointer">
                    laatste 3 jaar
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="open" defaultChecked />
                  <label htmlFor="open" className="text-sm cursor-pointer">
                    Open
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="monitoring" defaultChecked />
                  <label htmlFor="monitoring" className="text-sm cursor-pointer">
                    Monitoring
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="closed" />
                  <label htmlFor="closed" className="text-sm cursor-pointer">
                    Gesloten
                  </label>
                </div>
                <div className="flex gap-2 flex-1">
                  <Input 
                    placeholder="Zoek" 
                    className="flex-1"
                  />
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
                      <TableHead className="w-[60px]">Id</TableHead>
                      <TableHead>Datum</TableHead>
                      <TableHead>Gepland</TableHead>
                      <TableHead>Referentie</TableHead>
                      <TableHead>Soort</TableHead>
                      <TableHead>Omschrijving</TableHead>
                      <TableHead>Door</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Eigenaar</TableHead>
                      <TableHead>Locatie</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notifications.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-12 text-muted-foreground">
                          Geen data gevonden.
                        </TableCell>
                      </TableRow>
                    ) : (
                      notifications.map((notification) => (
                        <TableRow key={notification.id}>
                          <TableCell>{notification.id}</TableCell>
                          <TableCell>{notification.date}</TableCell>
                          <TableCell>{notification.planned}</TableCell>
                          <TableCell>{notification.reference}</TableCell>
                          <TableCell>{notification.type}</TableCell>
                          <TableCell>{notification.description}</TableCell>
                          <TableCell>{notification.by}</TableCell>
                          <TableCell>{notification.status}</TableCell>
                          <TableCell>{notification.owner}</TableCell>
                          <TableCell>{notification.location}</TableCell>
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

