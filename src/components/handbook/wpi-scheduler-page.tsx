'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { VCANavigation } from "@/components/vca-navigation"
import { Link } from "@/i18n/routing"
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

export function WpiSchedulerPage() {
  const [selectedYear, setSelectedYear] = useState<string>('2025')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [geplandChecked, setGeplandChecked] = useState<boolean>(false)
  const [nietUitgevoerdChecked, setNietUitgevoerdChecked] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  
  // Form state
  const [planDatum, setPlanDatum] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [titel, setTitel] = useState<string>('')
  const [nr, setNr] = useState<string>('')
  const [naamInspecteur, setNaamInspecteur] = useState<string>('')
  const [locatie, setLocatie] = useState<string>('')

  const years = [
    { value: '2026', label: '2026 (0)' },
    { value: '2025', label: '2025 (0)' },
  ]

  const types = [
    { value: 'all', label: '- alle -' },
    { value: 'copy-1', label: 'Kopie (1) van Nieuwe werkplekinspectie template' },
    { value: 'new-template', label: 'Nieuwe werkplekinspectie template' },
  ]

  const formTypes = [
    { value: '', label: '- selecteer -' },
    { value: 'copy-1', label: 'Kopie (1) van Nieuwe werkplekinspectie template' },
    { value: 'new-template', label: 'Nieuwe werkplekinspectie template' },
  ]

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving:', { planDatum, type, titel, nr, naamInspecteur, locatie })
    setIsDialogOpen(false)
    // Reset form
    setPlanDatum('')
    setType('')
    setTitel('')
    setNr('')
    setNaamInspecteur('')
    setLocatie('')
  }

  const handleSaveAndNew = () => {
    // TODO: Implement save and new functionality
    console.log('Saving and creating new:', { planDatum, type, titel, nr, naamInspecteur, locatie })
    // Reset form but keep dialog open
    setPlanDatum('')
    setType('')
    setTitel('')
    setNr('')
    setNaamInspecteur('')
    setLocatie('')
  }

  const handleSaveAndClose = () => {
    handleSave()
    setIsDialogOpen(false)
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
    // Reset form
    setPlanDatum('')
    setType('')
    setTitel('')
    setNr('')
    setNaamInspecteur('')
    setLocatie('')
  }

  // Mock data - empty for now
  const inspections: Array<{
    id: string
    datum: string
    gepland: string
    voor: string
    titel: string
    nr: string
    soort: string
    locatie: string
    uitgevoerd: string
    uitvoerder: string
  }> = []

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* VCA Navigation */}
      <VCANavigation />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#333', fontSize: '24px', fontWeight: 600 }}>
          Werkplekinspectie planner
        </h1>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Link
              href="/dashboard/vca/modules/workplace-inspections"
              className="flex items-center gap-2 text-sm text-[#0066CC] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Terug naar werkplekinspectie
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Year Selector */}
            <div className="flex items-center gap-2">
              <Label htmlFor="year" className="text-sm font-medium">
                Jaar:
              </Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger id="year" className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Type Selector */}
            <div className="flex items-center gap-2">
              <Label htmlFor="type" className="text-sm font-medium">
                Type:
              </Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger id="type" className="w-[300px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Checkboxes */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="gepland"
                  checked={geplandChecked}
                  onCheckedChange={(checked) => setGeplandChecked(checked === true)}
                />
                <Label htmlFor="gepland" className="text-sm font-normal cursor-pointer">
                  Gepland
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="niet-uitgevoerd"
                  checked={nietUitgevoerdChecked}
                  onCheckedChange={(checked) => setNietUitgevoerdChecked(checked === true)}
                />
                <Label htmlFor="niet-uitgevoerd" className="text-sm font-normal cursor-pointer">
                  Nog niet uitgevoerd
                </Label>
              </div>
            </div>

            {/* Schedule Button */}
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-[#0066CC] hover:bg-[#004499] text-white"
            >
              Werkplekinspectie inplannen
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Geplande werkplekinspecties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10">
                  <TableHead>Id</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead>Gepland</TableHead>
                  <TableHead>Voor</TableHead>
                  <TableHead>Titel</TableHead>
                  <TableHead>Nr</TableHead>
                  <TableHead>Soort</TableHead>
                  <TableHead>Locatie</TableHead>
                  <TableHead>Uitgevoerd</TableHead>
                  <TableHead>Uitvoerder</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inspections.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-12 text-muted-foreground">
                      Geen data gevonden.
                    </TableCell>
                  </TableRow>
                ) : (
                  inspections.map((inspection) => (
                    <TableRow key={inspection.id}>
                      <TableCell>{inspection.id}</TableCell>
                      <TableCell>{inspection.datum}</TableCell>
                      <TableCell>{inspection.gepland}</TableCell>
                      <TableCell>{inspection.voor}</TableCell>
                      <TableCell>{inspection.titel}</TableCell>
                      <TableCell>{inspection.nr}</TableCell>
                      <TableCell>{inspection.soort}</TableCell>
                      <TableCell>{inspection.locatie}</TableCell>
                      <TableCell>{inspection.uitgevoerd}</TableCell>
                      <TableCell>{inspection.uitvoerder}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t mt-4">
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
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="45">45</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">
              Geen data gevonden.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Werkplekinspectie inplannen</DialogTitle>
            <DialogDescription>
              Vul de gegevens in om een nieuwe werkplekinspectie in te plannen
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4">
            {/* Plan datum */}
            <div className="space-y-2">
              <Label htmlFor="plan-datum">Plan datum</Label>
              <Input
                id="plan-datum"
                type="date"
                value={planDatum}
                onChange={(e) => setPlanDatum(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="form-type">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="form-type" className="w-full">
                  <SelectValue placeholder="- selecteer -" />
                </SelectTrigger>
                <SelectContent>
                  {formTypes.map((formType) => (
                    <SelectItem key={formType.value} value={formType.value}>
                      {formType.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Titel */}
            <div className="space-y-2">
              <Label htmlFor="titel">Titel</Label>
              <Input
                id="titel"
                type="text"
                value={titel}
                onChange={(e) => setTitel(e.target.value)}
                placeholder="Titel"
                className="w-full"
              />
            </div>

            {/* Nr */}
            <div className="space-y-2">
              <Label htmlFor="nr">Nr</Label>
              <Input
                id="nr"
                type="text"
                value={nr}
                onChange={(e) => setNr(e.target.value)}
                placeholder="Nr"
                className="w-full"
              />
            </div>

            {/* Naam inspecteur */}
            <div className="space-y-2">
              <Label htmlFor="naam-inspecteur">Naam inspecteur</Label>
              <Input
                id="naam-inspecteur"
                type="text"
                value={naamInspecteur}
                onChange={(e) => setNaamInspecteur(e.target.value)}
                placeholder="Naam inspecteur"
                className="w-full"
              />
            </div>

            {/* Locatie/ Vestiging */}
            <div className="space-y-2">
              <Label htmlFor="locatie">Locatie/ Vestiging</Label>
              <Input
                id="locatie"
                type="text"
                value={locatie}
                onChange={(e) => setLocatie(e.target.value)}
                placeholder="Locatie/ Vestiging"
                className="w-full"
              />
            </div>
          </form>

          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Annuleren
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="bg-[#0066CC] hover:bg-[#004499] text-white"
            >
              Opslaan
            </Button>
            <Button
              type="button"
              onClick={handleSaveAndNew}
              className="bg-[#0066CC] hover:bg-[#004499] text-white"
            >
              Opslaan en nieuw
            </Button>
            <Button
              type="button"
              onClick={handleSaveAndClose}
              className="bg-[#0066CC] hover:bg-[#004499] text-white"
            >
              Opslaan en sluiten
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
