/**
 * Handbook Types
 * 
 * Type definitions for the handbook structure
 */

export interface HandbookItem {
  id: string
  title: string
  description?: string
  children?: HandbookItem[]
  type?: 'folder' | 'document'
  url?: string
}

export interface Document {
  id: string
  name: string
  description?: string
  type: 'pdf' | 'word' | 'excel' | 'other'
  date?: string
  author?: string
}

export interface Folder {
  id: string
  name: string
  description?: string
  items?: (Folder | Document)[]
}

