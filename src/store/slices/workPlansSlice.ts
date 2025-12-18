import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WorkPlan {
  id: string
  title: string
  description?: string
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  startDate?: Date
  endDate?: Date
  assignedTo?: string
  priority: 'low' | 'medium' | 'high'
}

interface WorkPlansState {
  plans: WorkPlan[]
  currentPlan: WorkPlan | null
  selectedPlans: string[]
  filters: {
    search: string
    status: string
    priority: string
    assignedTo: string
  }
  pagination: {
    page: number
    pageSize: number
    total: number
  }
  loading: boolean
  error: string | null
}

const initialState: WorkPlansState = {
  plans: [],
  currentPlan: null,
  selectedPlans: [],
  filters: {
    search: '',
    status: '',
    priority: '',
    assignedTo: '',
  },
  pagination: {
    page: 1,
    pageSize: 30,
    total: 0,
  },
  loading: false,
  error: null,
}

export const workPlansSlice = createSlice({
  name: 'workPlans',
  initialState,
  reducers: {
    setPlans: (state, action: PayloadAction<WorkPlan[]>) => {
      state.plans = action.payload
      state.pagination.total = action.payload.length
    },
    addPlan: (state, action: PayloadAction<WorkPlan>) => {
      state.plans.push(action.payload)
      state.pagination.total += 1
    },
    updatePlan: (state, action: PayloadAction<WorkPlan>) => {
      const index = state.plans.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.plans[index] = action.payload
      }
    },
    deletePlan: (state, action: PayloadAction<string>) => {
      state.plans = state.plans.filter((p) => p.id !== action.payload)
      state.selectedPlans = state.selectedPlans.filter((id) => id !== action.payload)
      state.pagination.total -= 1
    },
    setCurrentPlan: (state, action: PayloadAction<WorkPlan | null>) => {
      state.currentPlan = action.payload
    },
    setSelectedPlans: (state, action: PayloadAction<string[]>) => {
      state.selectedPlans = action.payload
    },
    togglePlanSelection: (state, action: PayloadAction<string>) => {
      const index = state.selectedPlans.indexOf(action.payload)
      if (index === -1) {
        state.selectedPlans.push(action.payload)
      } else {
        state.selectedPlans.splice(index, 1)
      }
    },
    clearSelection: (state) => {
      state.selectedPlans = []
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
      state.pagination.page = 1
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload
      state.pagination.page = 1
    },
    setPriorityFilter: (state, action: PayloadAction<string>) => {
      state.filters.priority = action.payload
      state.pagination.page = 1
    },
    setAssignedToFilter: (state, action: PayloadAction<string>) => {
      state.filters.assignedTo = action.payload
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
  setPlans,
  addPlan,
  updatePlan,
  deletePlan,
  setCurrentPlan,
  setSelectedPlans,
  togglePlanSelection,
  clearSelection,
  setSearchFilter,
  setStatusFilter,
  setPriorityFilter,
  setAssignedToFilter,
  clearFilters,
  setPage,
  setPageSize,
  setLoading,
  setError,
} = workPlansSlice.actions

