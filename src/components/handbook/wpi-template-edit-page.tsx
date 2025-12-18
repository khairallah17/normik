'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { VCANavigation } from "@/components/vca-navigation"
import { Link, useRouter } from "@/i18n/routing"
import { ArrowLeft, Copy, Plus, Trash2, X, ChevronDown } from "lucide-react"
import { createTemplateFromStandard } from "@/lib/wpi-templates"

interface Category {
  id: string
  name: string
  questions: Question[]
}

interface Question {
  id: string
  text: string
}


export function WpiTemplateEditPage({ templateId }: { templateId: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromTemplate = searchParams?.get('fromTemplate')
  
  const [templateName, setTemplateName] = useState<string>('Nieuwe werkplekinspectie template')
  const [isEditingName, setIsEditingName] = useState<boolean>(false)
  const [showOpenDeviations, setShowOpenDeviations] = useState<boolean>(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)
  const [editingCategoryName, setEditingCategoryName] = useState<string>('')
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({})
  const [newCategoryName, setNewCategoryName] = useState<string>('')
  const [newQuestionText, setNewQuestionText] = useState<Record<string, string>>({})
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  // Initialize template from standard template or sessionStorage
  useEffect(() => {
    if (isInitialized) return

    // First, check if there's a stored template (for copied templates)
    const storedTemplate = sessionStorage.getItem(`template-${templateId}`)
    if (storedTemplate) {
      try {
        const parsed = JSON.parse(storedTemplate)
        if (parsed.name) setTemplateName(parsed.name)
        if (parsed.categories) {
          setCategories(parsed.categories)
          // Open first category by default
          if (parsed.categories.length > 0) {
            setOpenCategories({ [parsed.categories[0].id]: true })
          }
        }
        if (parsed.showOpenDeviations !== undefined) setShowOpenDeviations(parsed.showOpenDeviations)
        // Clear the stored data after loading
        sessionStorage.removeItem(`template-${templateId}`)
        setIsInitialized(true)
        return
      } catch (e) {
        console.error('Error loading template from sessionStorage:', e)
      }
    }

    // If fromTemplate is provided, load the standard template
    if (fromTemplate) {
      const standardTemplate = createTemplateFromStandard(fromTemplate, templateId)
      if (standardTemplate) {
        setTemplateName(standardTemplate.name)
        setCategories(standardTemplate.categories)
        // Open first category by default
        if (standardTemplate.categories.length > 0) {
          setOpenCategories({ [standardTemplate.categories[0].id]: true })
        }
        setIsInitialized(true)
        return
      }
    }

    // Default: empty template
    setIsInitialized(true)
  }, [templateId, fromTemplate, isInitialized])
  

  const handleSaveName = () => {
    // TODO: Save template name
    setIsEditingName(false)
  }

  const handleCancelName = () => {
    setIsEditingName(false)
  }

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategoryId = Date.now().toString()
      const newCategory: Category = {
        id: newCategoryId,
        name: newCategoryName.trim(),
        questions: [],
      }
      setCategories([...categories, newCategory])
      setOpenCategories({ ...openCategories, [newCategoryId]: true })
      setNewCategoryName('')
    }
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId))
  }

  const handleStartEditCategory = (categoryId: string, currentName: string) => {
    setEditingCategoryId(categoryId)
    setEditingCategoryName(currentName)
  }

  const handleSaveCategoryName = (categoryId: string) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, name: editingCategoryName.trim() }
      }
      return cat
    }))
    setEditingCategoryId(null)
    setEditingCategoryName('')
  }

  const handleCancelEditCategory = () => {
    setEditingCategoryId(null)
    setEditingCategoryName('')
  }

  const handleAddQuestion = (categoryId: string) => {
    const questionText = newQuestionText[categoryId]?.trim()
    if (questionText) {
      setCategories(categories.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            questions: [
              ...cat.questions,
              { id: Date.now().toString(), text: questionText },
            ],
          }
        }
        return cat
      }))
      setNewQuestionText({ ...newQuestionText, [categoryId]: '' })
    }
  }

  const handleDeleteQuestion = (categoryId: string, questionId: string) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          questions: cat.questions.filter(q => q.id !== questionId),
        }
      }
      return cat
    }))
  }

  const handleCopyTemplate = () => {
    // Create a copy of the current template
    const newTemplateId = Date.now().toString()
    
    // Generate new IDs for categories and questions
    const newCategories = categories.map((cat, idx) => ({
      ...cat,
      id: `${newTemplateId}-cat-${idx + 1}`,
      questions: cat.questions.map((q, qIdx) => ({
        ...q,
        id: `${newTemplateId}-q-${idx + 1}-${qIdx + 1}`,
      })),
    }))
    
    // Update openCategories for the new template
    const newOpenCategories: Record<string, boolean> = {}
    newCategories.forEach((cat, idx) => {
      newOpenCategories[cat.id] = idx === 0 // First category open by default
    })
    
    // Create copied template name
    const copiedTemplateName = `Kopie van ${templateName}`
    
    // Store the copied template data in sessionStorage
    const templateData = {
      name: copiedTemplateName,
      categories: newCategories,
      showOpenDeviations,
      openCategories: newOpenCategories,
    }
    sessionStorage.setItem(`template-${newTemplateId}`, JSON.stringify(templateData))
    
    // TODO: Save the copied template to the backend/API
    // For now, we'll navigate to the new template edit page
    // In a real implementation, you would:
    // 1. Call an API to create the template copy
    // 2. Get the new template ID from the response
    // 3. Navigate to that template's edit page
    
    // Navigate to the new template edit page
    router.push(`/dashboard/vca/modules/workplace-inspections/templates/${newTemplateId}`)
  }

  const handleDeactivateTemplate = () => {
    // TODO: Implement template deactivation
    console.log('Deactivating template:', templateId)
  }

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

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/vca/modules/workplace-inspections/templates"
          className="flex items-center gap-2 text-sm text-[#0066CC] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Terug naar overzicht
        </Link>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault()
            handleCopyTemplate()
          }}
          className="flex items-center gap-2 text-sm text-[#0066CC] hover:underline"
        >
          <Copy className="h-4 w-4" />
          Template kopieren
        </Link>
      </div>

      {/* Template Settings */}
      <Card>
        <CardContent className="p-6 space-y-4">
          {/* Warning Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
            <strong>Let op:</strong> Indien vragen worden toegevoegd of verwijderd in de template wordt dit pas zichtbaar in de nieuwe werkplekinspecties. Verwijderde vragen blijven zichtbaar in de reeds gedane werkplekinspecties.
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="show-open-deviations"
              checked={showOpenDeviations}
              onCheckedChange={(checked) => setShowOpenDeviations(checked === true)}
            />
            <Label htmlFor="show-open-deviations" className="text-sm cursor-pointer">
              Toon openstaande afwijkingen in checklist
            </Label>
          </div>

          {/* Template Name */}
          <div className="space-y-2">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Voer de naam van de lijst in"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelName}
                >
                  Annuleren
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveName}
                  className="bg-[#0066CC] hover:bg-[#004499] text-white"
                >
                  Naam opslaan
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">{templateName}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingName(true)}
                  className="text-[#0066CC] hover:text-[#004499]"
                >
                  Naam bewerken
                </Button>
              </div>
            )}
          </div>

          {/* Categories Accordion */}
          <div className="space-y-2">
            {categories.map((category, index) => (
              <Collapsible
                key={category.id}
                open={openCategories[category.id] || false}
                onOpenChange={(open) =>
                  setOpenCategories({ ...openCategories, [category.id]: open })
                }
              >
                <div className="border rounded-lg">
                  {/* Category Header */}
                  <div className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors">
                    <CollapsibleTrigger className="flex items-center gap-3 flex-1 text-left">
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform ${
                          openCategories[category.id] ? 'rotate-180' : ''
                        }`}
                      />
                      <span className="font-medium">
                        {index + 1}. {category.name}
                      </span>
                      {category.questions.length > 0 && (
                        <span className="text-sm text-muted-foreground">
                          ({category.questions.length} {category.questions.length === 1 ? 'vraag' : 'vragen'})
                        </span>
                      )}
                    </CollapsibleTrigger>
                    <div className="flex items-center gap-2">
                      {editingCategoryId === category.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="text"
                            value={editingCategoryName}
                            onChange={(e) => setEditingCategoryName(e.target.value)}
                            className="w-48"
                            autoFocus
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelEditCategory}
                          >
                            Annuleren
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleSaveCategoryName(category.id)}
                            className="bg-[#0066CC] hover:bg-[#004499] text-white"
                          >
                            Opslaan
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStartEditCategory(category.id, category.name)}
                            className="text-[#0066CC] hover:text-[#004499]"
                          >
                            Naam bewerken
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCategory(category.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Categorie verwijderen
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Category Content */}
                  <CollapsibleContent className="px-4 pb-4 space-y-4">
                    {/* Questions List */}
                    {category.questions.length > 0 && (
                      <div className="space-y-2 pt-2">
                        {category.questions.map((question, qIndex) => (
                          <div
                            key={question.id}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <span className="text-sm font-medium text-muted-foreground min-w-[24px]">
                                {qIndex + 1}.
                              </span>
                              <span className="flex-1">{question.text}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteQuestion(category.id, question.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Vraag verwijderen
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Question */}
                    <div className="flex items-center gap-2 p-3 border rounded-lg bg-accent/30">
                      <Input
                        type="text"
                        placeholder="Voer een vraag in"
                        value={newQuestionText[category.id] || ''}
                        onChange={(e) =>
                          setNewQuestionText({ ...newQuestionText, [category.id]: e.target.value })
                        }
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddQuestion(category.id)
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => handleAddQuestion(category.id)}
                        className="bg-[#0066CC] hover:bg-[#004499] text-white"
                      >
                        toevoegen
                      </Button>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>

          {/* Add Category */}
          <div className="flex items-center gap-2 p-3 border rounded-lg bg-accent/30">
            <Input
              type="text"
              placeholder="Voer een categorie in"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddCategory()
                }
              }}
              className="flex-1"
            />
            <Button
              onClick={handleAddCategory}
              className="bg-[#0066CC] hover:bg-[#004499] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              toevoegen
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Deactivate Template */}
      <div className="flex justify-end">
        <Button
          variant="ghost"
          onClick={handleDeactivateTemplate}
          className="text-red-600 hover:text-red-700"
        >
          Deactiveer deze template
        </Button>
      </div>
    </div>
  )
}

