import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Personnel {
  id: string
  name: string
  role: string
  department: string
  email: string
  phone?: string
  status: 'active' | 'inactive'
}

interface PersonnelState {
  personnel: Personnel[]
  currentPersonnel: Personnel | null
  selectedPersonnel: string[]
  filters: {
    search: string
    role: string
    department: string
    status: string
  }
  pagination: {
    page: number
    pageSize: number
    total: number
  }
  loading: boolean
  error: string | null
}

const initialState: PersonnelState = {
  personnel: [],
  currentPersonnel: null,
  selectedPersonnel: [],
  filters: {
    search: '',
    role: '',
    department: '',
    status: '',
  },
  pagination: {
    page: 1,
    pageSize: 30,
    total: 0,
  },
  loading: false,
  error: null,
}

export const personnelSlice = createSlice({
  name: 'personnel',
  initialState,
  reducers: {
    setPersonnel: (state, action: PayloadAction<Personnel[]>) => {
      state.personnel = action.payload
      state.pagination.total = action.payload.length
    },
    addPersonnel: (state, action: PayloadAction<Personnel>) => {
      state.personnel.push(action.payload)
      state.pagination.total += 1
    },
    updatePersonnel: (state, action: PayloadAction<Personnel>) => {
      const index = state.personnel.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.personnel[index] = action.payload
      }
    },
    deletePersonnel: (state, action: PayloadAction<string>) => {
      state.personnel = state.personnel.filter((p) => p.id !== action.payload)
      state.selectedPersonnel = state.selectedPersonnel.filter((id) => id !== action.payload)
      state.pagination.total -= 1
    },
    setCurrentPersonnel: (state, action: PayloadAction<Personnel | null>) => {
      state.currentPersonnel = action.payload
    },
    setSelectedPersonnel: (state, action: PayloadAction<string[]>) => {
      state.selectedPersonnel = action.payload
    },
    togglePersonnelSelection: (state, action: PayloadAction<string>) => {
      const index = state.selectedPersonnel.indexOf(action.payload)
      if (index === -1) {
        state.selectedPersonnel.push(action.payload)
      } else {
        state.selectedPersonnel.splice(index, 1)
      }
    },
    clearSelection: (state) => {
      state.selectedPersonnel = []
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
      state.pagination.page = 1
    },
    setRoleFilter: (state, action: PayloadAction<string>) => {
      state.filters.role = action.payload
      state.pagination.page = 1
    },
    setDepartmentFilter: (state, action: PayloadAction<string>) => {
      state.filters.department = action.payload
      state.pagination.page = 1
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setPersonnel,
  addPersonnel,
  updatePersonnel,
  deletePersonnel,
  setCurrentPersonnel,
  setSelectedPersonnel,
  togglePersonnelSelection,
  clearSelection,
  setSearchFilter,
  setRoleFilter,
  setDepartmentFilter,
  setStatusFilter,
  clearFilters,
  setPage,
  setPageSize,
  setLoading,
  setError,
} = personnelSlice.actions

