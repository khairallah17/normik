'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { VCANavigation } from "@/components/vca-navigation"
import { FileText } from "lucide-react"

export function WpiReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('2025')
  const [endDate, setEndDate] = useState<string>('2025')
  const [selectedChecklists, setSelectedChecklists] = useState<Set<string>>(new Set())

  const reportTypes = [
    { value: '', label: '- Selecteer rapport -' },
    { value: 'action-list-open', label: 'Actielijst openstaand' },
    { value: 'action-list-later', label: 'Actielijst later afgehandeld' },
    { value: 'action-list-direct', label: 'Actielijst direct afgehandeld' },
    { value: 'deviations-category', label: 'Afwijkingen per categorie' },
    { value: 'deviations-question', label: 'Afwijkingen per vraag' },
    { value: 'checklist', label: 'Checklist' },
    { value: 'total', label: 'Totaal werkplekinspectie' },
    { value: 'per-inspector', label: 'Werkplekinspectie per inspecteur' },
    { value: 'per-auditee', label: 'Werkplekinspectie per geauditeerde' },
    { value: 'per-location', label: 'Werkplekinspectie per locatie' },
    { value: 'positive-findings', label: 'Positieve bevindingen' },
    { value: 'positive-findings-category', label: 'Positieve bevindingen per category' },
  ]

  const handleDownloadPdf = () => {
    window.print()
  }

  const handleSelectAllChecklists = () => {
    if (selectedChecklists.size === 0) {
      // Select all (mock data - in real app would come from API)
      setSelectedChecklists(new Set(['checklist-1', 'checklist-2', 'checklist-3']))
    } else {
      setSelectedChecklists(new Set())
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* VCA Navigation */}
      <VCANavigation />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main Content - Left Side (Form) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header with PDF Button */}
          <div className="flex items-center justify-end">
            <Button
              onClick={handleDownloadPdf}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Download Pdf
            </Button>
          </div>

          {/* Report Form */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <form className="space-y-6">
                {/* Report Type Selection */}
                <div>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                    Werkplekinspectie rapportage
                  </h2>
                  <RadioGroup
                    value={selectedReport}
                    onValueChange={setSelectedReport}
                    className="space-y-3"
                  >
                    {reportTypes.map((report) => (
                      <div key={report.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={report.value} id={report.value} />
                        <Label
                          htmlFor={report.value}
                          className="text-sm font-normal cursor-pointer"
                          style={{ color: '#333', fontSize: '14px' }}
                        >
                          {report.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Period Selection */}
                <div>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                    Periode
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Input
                        type="text"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="2025"
                        className="w-full"
                      />
                    </div>
                    <span className="text-muted-foreground">-</span>
                    <div className="flex-1">
                      <Input
                        type="text"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="2025"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Checklist Selection */}
                <div>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
                    Checklist
                  </h2>
                  <div className="mb-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSelectAllChecklists}
                      className="text-sm"
                    >
                      {selectedChecklists.size === 0 ? 'Selecteer alle' : 'De-selecteer alle'}
                    </Button>
                  </div>
                  <div className="space-y-2 border rounded-lg p-4" style={{ minHeight: '200px' }}>
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Geen checklists beschikbaar
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Results */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold" style={{ color: '#333', fontSize: '16px', fontWeight: 600 }}>
                Totaal werkplekinspectie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Chart placeholder */}
                <div className="border rounded-lg p-4 bg-gray-50" style={{ minHeight: '300px' }}>
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    Grafiek wordt hier weergegeven
                  </div>
                </div>
                
                {/* Table placeholder */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold" style={{ color: '#333', fontSize: '14px' }}>
                          Label
                        </th>
                        <th className="px-4 py-2 text-right font-semibold" style={{ color: '#333', fontSize: '14px' }}>
                          Waarde
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-2" style={{ color: '#333', fontSize: '14px' }}>
                          Nieuwe werkplekinspectie template
                        </td>
                        <td className="px-4 py-2 text-right" style={{ color: '#333', fontSize: '14px' }}>
                          0
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
