import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HandbookItem, Document, Folder } from '@/types/handbook'

interface HandbookState {
  items: HandbookItem[]
  currentItem: HandbookItem | null
  currentDocument: Document | null
  folders: Folder[]
  searchQuery: string
  selectedItems: string[]
  loading: boolean
  error: string | null
  editorOpen: boolean
  editorContent: string
}

const initialState: HandbookState = {
  items: [],
  currentItem: null,
  currentDocument: null,
  folders: [],
  searchQuery: '',
  selectedItems: [],
  loading: false,
  error: null,
  editorOpen: false,
  editorContent: '',
}

export const handbookSlice = createSlice({
  name: 'handbook',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<HandbookItem[]>) => {
      state.items = action.payload
    },
    setCurrentItem: (state, action: PayloadAction<HandbookItem | null>) => {
      state.currentItem = action.payload
    },
    setCurrentDocument: (state, action: PayloadAction<Document | null>) => {
      state.currentDocument = action.payload
    },
    setFolders: (state, action: PayloadAction<Folder[]>) => {
      state.folders = action.payload
    },
    addFolder: (state, action: PayloadAction<Folder>) => {
      state.folders.push(action.payload)
    },
    updateFolder: (state, action: PayloadAction<Folder>) => {
      const index = state.folders.findIndex((f) => f.id === action.payload.id)
      if (index !== -1) {
        state.folders[index] = action.payload
      }
    },
    deleteFolder: (state, action: PayloadAction<string>) => {
      state.folders = state.folders.filter((f) => f.id !== action.payload)
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setSelectedItems: (state, action: PayloadAction<string[]>) => {
      state.selectedItems = action.payload
    },
    toggleItemSelection: (state, action: PayloadAction<string>) => {
      const index = state.selectedItems.indexOf(action.payload)
      if (index === -1) {
        state.selectedItems.push(action.payload)
      } else {
        state.selectedItems.splice(index, 1)
      }
    },
    clearSelection: (state) => {
      state.selectedItems = []
    },
    setEditorOpen: (state, action: PayloadAction<boolean>) => {
      state.editorOpen = action.payload
    },
    setEditorContent: (state, action: PayloadAction<string>) => {
      state.editorContent = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setItems,
  setCurrentItem,
  setCurrentDocument,
  setFolders,
  addFolder,
  updateFolder,
  deleteFolder,
  setSearchQuery,
  setSelectedItems,
  toggleItemSelection,
  clearSelection,
  setEditorOpen,
  setEditorContent,
  setLoading,
  setError,
} = handbookSlice.actions

