'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTranslations } from 'next-intl'
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function WorkPlansPage() {
  const t = useTranslations('handbook.structure');
  
  const moduleTitle = t('work_plans');

  // Mock data structure - in a real app, this would come from an API
  const workPlans: Array<{
    id: string
    start: string
    end: string
    title: string
    number: string
    location: string
    address: string
    type: string
  }> = []; // Empty for now, matching the "No data found" state

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{moduleTitle}</h1>
      </div>

      {/* Main Content Card */}
      <Card>
        <CardHeader>
          <CardTitle>{moduleTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search/Filter Section */}
          <div className="flex gap-2">
            <Input 
              placeholder="Filter..." 
              className="flex-1"
            />
            <div className="flex gap-2">
              <Input 
                placeholder="Zoek" 
                className="w-48"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10">
                  <TableHead className="w-[100px]">
                    <div className="flex items-center gap-2">
                      Start
                      <button className="hover:text-primary">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                    </div>
                  </TableHead>
                  <TableHead>Eind</TableHead>
                  <TableHead>Titel</TableHead>
                  <TableHead className="w-[80px]">Nr</TableHead>
                  <TableHead>Plaats</TableHead>
                  <TableHead>Adres</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workPlans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      Geen data gevonden.
                    </TableCell>
                  </TableRow>
                ) : (
                  workPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell>{plan.start}</TableCell>
                      <TableCell>{plan.end}</TableCell>
                      <TableCell>{plan.title}</TableCell>
                      <TableCell>{plan.number}</TableCell>
                      <TableCell>{plan.location}</TableCell>
                      <TableCell>{plan.address}</TableCell>
                      <TableCell>{plan.type}</TableCell>
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

