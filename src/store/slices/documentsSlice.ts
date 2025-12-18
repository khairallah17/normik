import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Document } from '@/types/handbook'

interface DocumentsState {
  documents: Document[]
  currentDocument: Document | null
  selectedDocuments: string[]
  filters: {
    search: string
    type: string
    dateFrom: string
    dateTo: string
  }
  pagination: {
    page: number
    pageSize: number
    total: number
  }
  loading: boolean
  error: string | null
  uploadProgress: {
    [key: string]: number
  }
}

const initialState: DocumentsState = {
  documents: [],
  currentDocument: null,
  selectedDocuments: [],
  filters: {
    search: '',
    type: '',
    dateFrom: '',
    dateTo: '',
  },
  pagination: {
    page: 1,
    pageSize: 30,
    total: 0,
  },
  loading: false,
  error: null,
  uploadProgress: {},
}

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setDocuments: (state, action: PayloadAction<Document[]>) => {
      state.documents = action.payload
      state.pagination.total = action.payload.length
    },
    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload)
      state.pagination.total += 1
    },
    updateDocument: (state, action: PayloadAction<Document>) => {
      const index = state.documents.findIndex((d) => d.id === action.payload.id)
      if (index !== -1) {
        state.documents[index] = action.payload
      }
    },
    deleteDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter((d) => d.id !== action.payload)
      state.selectedDocuments = state.selectedDocuments.filter((id) => id !== action.payload)
      state.pagination.total -= 1
    },
    deleteDocuments: (state, action: PayloadAction<string[]>) => {
      state.documents = state.documents.filter((d) => !action.payload.includes(d.id))
      state.selectedDocuments = []
      state.pagination.total -= action.payload.length
    },
    setCurrentDocument: (state, action: PayloadAction<Document | null>) => {
      state.currentDocument = action.payload
    },
    setSelectedDocuments: (state, action: PayloadAction<string[]>) => {
      state.selectedDocuments = action.payload
    },
    toggleDocumentSelection: (state, action: PayloadAction<string>) => {
      const index = state.selectedDocuments.indexOf(action.payload)
      if (index === -1) {
        state.selectedDocuments.push(action.payload)
      } else {
        state.selectedDocuments.splice(index, 1)
      }
    },
    clearSelection: (state) => {
      state.selectedDocuments = []
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
      state.pagination.page = 1
    },
    setTypeFilter: (state, action: PayloadAction<string>) => {
      state.filters.type = action.payload
      state.pagination.page = 1
    },
    setDateFilters: (state, action: PayloadAction<{ from: string; to: string }>) => {
      state.filters.dateFrom = action.payload.from
      state.filters.dateTo = action.payload.to
      state.pagination.page = 1
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
      state.pagination.page = 1
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload
      state.pagination.page = 1
    },
    setUploadProgress: (state, action: PayloadAction<{ id: string; progress: number }>) => {
      state.uploadProgress[action.payload.id] = action.payload.progress
    },
    clearUploadProgress: (state, action: PayloadAction<string>) => {
      delete state.uploadProgress[action.payload]
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
  setDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  deleteDocuments,
  setCurrentDocument,
  setSelectedDocuments,
  toggleDocumentSelection,
  clearSelection,
  setSearchFilter,
  setTypeFilter,
  setDateFilters,
  clearFilters,
  setPage,
  setPageSize,
  setUploadProgress,
  clearUploadProgress,
  setLoading,
  setError,
} = documentsSlice.actions

