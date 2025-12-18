'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { VCANavigation } from "@/components/vca-navigation"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function WpiSettingsPage() {
  const [activeTab, setActiveTab] = useState<string>('contacts')
  const [isContactDialogOpen, setIsContactDialogOpen] = useState<boolean>(false)
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<string>('30')
  
  // Contact form state
  const [voornaam, setVoornaam] = useState<string>('')
  const [tussenvoegsel, setTussenvoegsel] = useState<string>('')
  const [achternaam, setAchternaam] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  
  // Location form state
  const [locatieCode, setLocatieCode] = useState<string>('')
  const [omschrijving, setOmschrijving] = useState<string>('')

  // Mock data
  const contacts: Array<{
    id: string
    naam: string
    email: string
    mld: number
    wpi: number
    arb: number
  }> = []

  const locations: Array<{
    id: string
    code: string
    description: string
    mld: number
    wpi: number
    arb: number
  }> = []

  const handleSaveContact = () => {
    // TODO: Implement save functionality
    console.log('Saving contact:', { voornaam, tussenvoegsel, achternaam, email })
    setIsContactDialogOpen(false)
    // Reset form
    setVoornaam('')
    setTussenvoegsel('')
    setAchternaam('')
    setEmail('')
  }

  const handleCancelContact = () => {
    setIsContactDialogOpen(false)
    // Reset form
    setVoornaam('')
    setTussenvoegsel('')
    setAchternaam('')
    setEmail('')
  }

  const handleSaveLocation = () => {
    // TODO: Implement save functionality
    console.log('Saving location:', { locatieCode, omschrijving })
    setIsLocationDialogOpen(false)
    // Reset form
    setLocatieCode('')
    setOmschrijving('')
  }

  const handleCancelLocation = () => {
    setIsLocationDialogOpen(false)
    // Reset form
    setLocatieCode('')
    setOmschrijving('')
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* VCA Navigation */}
      <VCANavigation />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#333', fontSize: '24px', fontWeight: 600 }}>
          Instellingen voor werkplekinspectie en meldingen
        </h1>
      </div>

      {/* Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="contacts">Contactpersonen</TabsTrigger>
                <TabsTrigger value="locations">Vestigingen/ locaties</TabsTrigger>
              </TabsList>
              {activeTab === 'contacts' && (
                <Button
                  onClick={() => setIsContactDialogOpen(true)}
                  className="bg-[#0066CC] hover:bg-[#004499] text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nieuwe contactpersoon
                </Button>
              )}
              {activeTab === 'locations' && (
                <Button
                  onClick={() => setIsLocationDialogOpen(true)}
                  className="bg-[#0066CC] hover:bg-[#004499] text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nieuwe locatie/ vestiging
                </Button>
              )}
            </div>

            {/* Contactpersonen Tab */}
            <TabsContent value="contacts" className="space-y-4">

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/10">
                      <TableHead>Id</TableHead>
                      <TableHead>Naam</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Mld</TableHead>
                      <TableHead>Wpi</TableHead>
                      <TableHead>Arb</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                          Geen data gevonden.
                        </TableCell>
                      </TableRow>
                    ) : (
                      contacts.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell>{contact.id}</TableCell>
                          <TableCell>{contact.naam}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.mld}</TableCell>
                          <TableCell>{contact.wpi}</TableCell>
                          <TableCell>{contact.arb}</TableCell>
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
                  <Select value={pageSize} onValueChange={setPageSize}>
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
            </TabsContent>

            {/* Vestigingen/ locaties Tab */}
            <TabsContent value="locations" className="space-y-4">

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/10">
                      <TableHead>Id</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Mld</TableHead>
                      <TableHead>Wpi</TableHead>
                      <TableHead>Arb</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {locations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                          Geen data gevonden.
                        </TableCell>
                      </TableRow>
                    ) : (
                      locations.map((location) => (
                        <TableRow key={location.id}>
                          <TableCell>{location.id}</TableCell>
                          <TableCell>{location.code}</TableCell>
                          <TableCell>{location.description}</TableCell>
                          <TableCell>{location.mld}</TableCell>
                          <TableCell>{location.wpi}</TableCell>
                          <TableCell>{location.arb}</TableCell>
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
                  <Select value={pageSize} onValueChange={setPageSize}>
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Contact Person Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="w-[95vw] sm:w-full max-w-lg p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Nieuwe contactpersoon</DialogTitle>
            <DialogDescription className="text-sm">
              Vul de gegevens in om een nieuwe contactpersoon toe te voegen
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4">
            {/* Voornaam */}
            <div className="space-y-2">
              <Label htmlFor="voornaam">Voornaam</Label>
              <Input
                id="voornaam"
                type="text"
                value={voornaam}
                onChange={(e) => setVoornaam(e.target.value)}
                placeholder="Voornaam"
                className="w-full"
              />
            </div>

            {/* Tussenvoegsel */}
            <div className="space-y-2">
              <Label htmlFor="tussenvoegsel">Tussenvoegsel</Label>
              <Input
                id="tussenvoegsel"
                type="text"
                value={tussenvoegsel}
                onChange={(e) => setTussenvoegsel(e.target.value)}
                placeholder="Tussenvoegsel"
                className="w-full"
              />
            </div>

            {/* Achternaam */}
            <div className="space-y-2">
              <Label htmlFor="achternaam">Achternaam</Label>
              <Input
                id="achternaam"
                type="text"
                value={achternaam}
                onChange={(e) => setAchternaam(e.target.value)}
                placeholder="Achternaam"
                className="w-full"
              />
            </div>

            {/* E-mail adres */}
            <div className="space-y-2">
              <Label htmlFor="email">E-mail adres</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail adres"
                className="w-full"
              />
            </div>
          </form>

          <DialogFooter className="flex flex-wrap gap-2 flex-shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelContact}
              className="w-full sm:w-auto"
            >
              Annuleren
            </Button>
            <Button
              type="button"
              onClick={handleSaveContact}
              className="bg-[#0066CC] hover:bg-[#004499] text-white w-full sm:w-auto"
            >
              Opslaan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Location Dialog */}
      <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
        <DialogContent className="w-[95vw] sm:w-full max-w-lg p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Nieuwe locatie/ vestiging</DialogTitle>
            <DialogDescription className="text-sm">
              Vul de gegevens in om een nieuwe locatie/ vestiging toe te voegen
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4">
            {/* Locatie code */}
            <div className="space-y-2">
              <Label htmlFor="locatie-code">Locatie code</Label>
              <Input
                id="locatie-code"
                type="text"
                value={locatieCode}
                onChange={(e) => setLocatieCode(e.target.value)}
                placeholder="Locatie code"
                className="w-full"
              />
            </div>

            {/* Omschrijving */}
            <div className="space-y-2">
              <Label htmlFor="omschrijving">Omschrijving</Label>
              <Input
                id="omschrijving"
                type="text"
                value={omschrijving}
                onChange={(e) => setOmschrijving(e.target.value)}
                placeholder="Omschrijving"
                className="w-full"
              />
            </div>
          </form>

          <DialogFooter className="flex flex-wrap gap-2 flex-shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelLocation}
              className="w-full sm:w-auto"
            >
              Annuleren
            </Button>
            <Button
              type="button"
              onClick={handleSaveLocation}
              className="bg-[#0066CC] hover:bg-[#004499] text-white w-full sm:w-auto"
            >
              Opslaan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
