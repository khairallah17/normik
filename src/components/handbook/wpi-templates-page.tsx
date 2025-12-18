'use client'

import { useState } from 'react'
import { useRouter } from '@/i18n/routing'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { VCANavigation } from "@/components/vca-navigation"
import { Link } from "@/i18n/routing"
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Plus, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Template {
  id: string
  name: string
  checklists: number
}

const standardTemplates = [
  { id: 'empty', name: 'Lege lijst' },
  { id: 'soil-basic', name: 'Bodemsanering BASISKLASSE' },
  { id: 'soil-tf', name: 'Bodemsanering met T- en F-KLASSEN' },
  { id: 'demolition', name: 'Sloopwerk (SVMS 007)' },
  { id: 'general', name: 'Werkplekinspectie Algemeen' },
  { id: 'sca-inventory', name: 'WPI SC A bestinventarisatie' },
  { id: 'sca-removal', name: 'WPI SC A bestverwijderen' },
  { id: 'sca-removal-short', name: 'WPI SC A bestverwijderen (verkort)' },
]

export function WpiTemplatesPage() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [showDeactivated, setShowDeactivated] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [pageSize, setPageSize] = useState<string>('30')
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Mock data
  const templates: Template[] = [
    { id: '1', name: 'Bodemsanering BASISKLASSE', checklists: 0 },
    { id: '2', name: 'Kopie (1) van Nieuwe werkplekinspectie template', checklists: 0 },
    { id: '3', name: 'Nieuwe werkplekinspectie template', checklists: 0 },
  ]

  const handleCreateTemplate = () => {
    if (selectedTemplate) {
      // Generate a new template ID and navigate to edit page with the selected template ID
      const newTemplateId = Date.now().toString()
      setIsModalOpen(false)
      const templateId = selectedTemplate
      setSelectedTemplate('')
      // Navigate to edit page with the standard template ID as a query parameter
      router.push(`/dashboard/vca/modules/workplace-inspections/templates/${newTemplateId}?fromTemplate=${templateId}`)
    }
  }

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredTemplates.length / parseInt(pageSize))
  const startIndex = (currentPage - 1) * parseInt(pageSize)
  const paginatedTemplates = filteredTemplates.slice(startIndex, startIndex + parseInt(pageSize))

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* VCA Navigation */}
      <VCANavigation />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#333', fontSize: '24px', fontWeight: 600 }}>
          Werkplekinspectie template
        </h1>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Link
              href="/dashboard/vca/modules/workplace-inspections"
              className="flex items-center gap-2 text-sm text-[#0066CC] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Terug naar werkplekinspectie
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="show-deactivated"
                  checked={showDeactivated}
                  onCheckedChange={(checked) => setShowDeactivated(checked === true)}
                />
                <Label htmlFor="show-deactivated" className="text-sm cursor-pointer">
                  Toon gedeactiveerde template
                </Label>
              </div>
              
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Zoek"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-48"
                />
              </div>
              
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#0066CC] hover:bg-[#004499] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nieuwe lijst
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10">
                  <TableHead>Id</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Checklists</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTemplates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-12 text-muted-foreground">
                      Geen data gevonden.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedTemplates.map((template) => (
                    <TableRow key={template.id} className="cursor-pointer hover:bg-accent/50">
                      <TableCell>{template.id}</TableCell>
                      <TableCell>
                        <Link
                          href={`/dashboard/vca/modules/workplace-inspections/templates/${template.id}`}
                          className="text-[#0066CC] hover:underline"
                        >
                          {template.name}
                        </Link>
                      </TableCell>
                      <TableCell>{template.checklists}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground px-4">
                pagina <span className="font-semibold text-foreground">{currentPage}</span> van {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={pageSize} onValueChange={(value) => {
                setPageSize(value)
                setCurrentPage(1)
              }}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="45">45</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">
              regels {startIndex + 1} - {Math.min(startIndex + parseInt(pageSize), filteredTemplates.length)} van {filteredTemplates.length}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Template Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[95vw] sm:w-full max-w-2xl p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Standaard checklist templates</DialogTitle>
            <DialogDescription className="text-sm">
              Selecteer een standaard vragenlijst uit de volgende opties:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {standardTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedTemplate === template.id
                    ? 'border-[#0066CC] bg-[#0066CC]/10'
                    : 'border-border hover:border-[#0066CC]/50'
                }`}
              >
                <div className="font-medium">{template.name}</div>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false)
                setSelectedTemplate('')
              }}
              className="w-full sm:w-auto"
            >
              Annuleren
            </Button>
            <Button
              type="button"
              onClick={handleCreateTemplate}
              disabled={!selectedTemplate}
              className="bg-[#0066CC] hover:bg-[#004499] text-white w-full sm:w-auto"
            >
              Opslaan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
