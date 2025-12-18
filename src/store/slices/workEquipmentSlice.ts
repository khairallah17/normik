import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WorkEquipment {
  id: string
  name: string
  type: string
  serialNumber?: string
  status: 'available' | 'in_use' | 'maintenance' | 'retired'
  location?: string
  lastInspection?: Date
  nextInspection?: Date
}

interface WorkEquipmentState {
  equipment: WorkEquipment[]
  currentEquipment: WorkEquipment | null
  selectedEquipment: string[]
  filters: {
    search: string
    type: string
    status: string
    location: string
  }
  pagination: {
    page: number
    pageSize: number
    total: number
  }
  loading: boolean
  error: string | null
}

const initialState: WorkEquipmentState = {
  equipment: [],
  currentEquipment: null,
  selectedEquipment: [],
  filters: {
    search: '',
    type: '',
    status: '',
    location: '',
  },
  pagination: {
    page: 1,
    pageSize: 30,
    total: 0,
  },
  loading: false,
  error: null,
}

export const workEquipmentSlice = createSlice({
  name: 'workEquipment',
  initialState,
  reducers: {
    setEquipment: (state, action: PayloadAction<WorkEquipment[]>) => {
      state.equipment = action.payload
      state.pagination.total = action.payload.length
    },
    addEquipment: (state, action: PayloadAction<WorkEquipment>) => {
      state.equipment.push(action.payload)
      state.pagination.total += 1
    },
    updateEquipment: (state, action: PayloadAction<WorkEquipment>) => {
      const index = state.equipment.findIndex((e) => e.id === action.payload.id)
      if (index !== -1) {
        state.equipment[index] = action.payload
      }
    },
    deleteEquipment: (state, action: PayloadAction<string>) => {
      state.equipment = state.equipment.filter((e) => e.id !== action.payload)
      state.selectedEquipment = state.selectedEquipment.filter((id) => id !== action.payload)
      state.pagination.total -= 1
    },
    setCurrentEquipment: (state, action: PayloadAction<WorkEquipment | null>) => {
      state.currentEquipment = action.payload
    },
    setSelectedEquipment: (state, action: PayloadAction<string[]>) => {
      state.selectedEquipment = action.payload
    },
    toggleEquipmentSelection: (state, action: PayloadAction<string>) => {
      const index = state.selectedEquipment.indexOf(action.payload)
      if (index === -1) {
        state.selectedEquipment.push(action.payload)
      } else {
        state.selectedEquipment.splice(index, 1)
      }
    },
    clearSelection: (state) => {
      state.selectedEquipment = []
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
      state.pagination.page = 1
    },
    setTypeFilter: (state, action: PayloadAction<string>) => {
      state.filters.type = action.payload
      state.pagination.page = 1
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload
      state.pagination.page = 1
    },
    setLocationFilter: (state, action: PayloadAction<string>) => {
      state.filters.location = action.payload
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
  setEquipment,
  addEquipment,
  updateEquipment,
  deleteEquipment,
  setCurrentEquipment,
  setSelectedEquipment,
  toggleEquipmentSelection,
  clearSelection,
  setSearchFilter,
  setTypeFilter,
  setStatusFilter,
  setLocationFilter,
  clearFilters,
  setPage,
  setPageSize,
  setLoading,
  setError,
} = workEquipmentSlice.actions

