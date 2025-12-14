'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ContentItem {
  id: string
  title: string
  content: string
}

interface ContentEditorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (item: { title: string; content: string }) => void
  editingItem?: ContentItem | null
  mode: 'create' | 'edit'
}

export function ContentEditorDialog({
  open,
  onOpenChange,
  onSave,
  editingItem,
  mode
}: ContentEditorDialogProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && editingItem) {
        setTitle(editingItem.title)
        setContent(editingItem.content)
      } else {
        setTitle('')
        setContent('')
      }
    }
  }, [open, mode, editingItem])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    
    onSave({ title: title.trim(), content: content.trim() })
    onOpenChange(false)
  }

  const handleCancel = () => {
    setTitle('')
    setContent('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Bewerk pagina' : 'Nieuwe pagina toevoegen'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit' 
              ? 'Wijzig de titel en inhoud van deze pagina.'
              : 'Voeg een nieuwe pagina toe met een titel en inhoud.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titel *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Voer de titel in"
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Inhoud</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Voer de inhoud in (ondersteunt meerdere regels)"
              rows={12}
              className="w-full font-mono text-sm"
              style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6' }}
            />
            <p className="text-xs text-muted-foreground">
              Tip: Gebruik Enter voor nieuwe regels. De tekst wordt weergegeven zoals ingevoerd.
            </p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Annuleren
            </Button>
            <Button type="submit">
              {mode === 'edit' ? 'Opslaan' : 'Toevoegen'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

