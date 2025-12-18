import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/users'

interface UsersState {
  users: User[]
  selectedUsers: string[]
  loading: boolean
  error: string | null
  currentUser: User | null
  filters: {
    search: string
    name: string
    username: string
    employeeNumber: string
    role: string
    status: string
    department: string
  }
  pagination: {
    page: number
    pageSize: number
    total: number
  }
}

const initialState: UsersState = {
  users: [],
  selectedUsers: [],
  loading: false,
  error: null,
  currentUser: null,
  filters: {
    search: '',
    name: '',
    username: '',
    employeeNumber: '',
    role: '',
    status: '',
    department: '',
  },
  pagination: {
    page: 1,
    pageSize: 30,
    total: 0,
  },
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
      state.pagination.total = action.payload.length
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
      state.pagination.total += 1
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id)
      if (index !== -1) {
        state.users[index] = action.payload
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((u) => u.id !== action.payload)
      state.selectedUsers = state.selectedUsers.filter((id) => id !== action.payload)
      state.pagination.total -= 1
    },
    deleteUsers: (state, action: PayloadAction<string[]>) => {
      state.users = state.users.filter((u) => !action.payload.includes(u.id))
      state.selectedUsers = []
      state.pagination.total -= action.payload.length
    },
    setSelectedUsers: (state, action: PayloadAction<string[]>) => {
      state.selectedUsers = action.payload
    },
    toggleUserSelection: (state, action: PayloadAction<string>) => {
      const index = state.selectedUsers.indexOf(action.payload)
      if (index === -1) {
        state.selectedUsers.push(action.payload)
      } else {
        state.selectedUsers.splice(index, 1)
      }
    },
    clearSelection: (state) => {
      state.selectedUsers = []
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
      state.pagination.page = 1
    },
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.filters.name = action.payload
      state.pagination.page = 1
    },
    setUsernameFilter: (state, action: PayloadAction<string>) => {
      state.filters.username = action.payload
      state.pagination.page = 1
    },
    setEmployeeNumberFilter: (state, action: PayloadAction<string>) => {
      state.filters.employeeNumber = action.payload
      state.pagination.page = 1
    },
    setRoleFilter: (state, action: PayloadAction<string>) => {
      state.filters.role = action.payload
      state.pagination.page = 1
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload
      state.pagination.page = 1
    },
    setDepartmentFilter: (state, action: PayloadAction<string>) => {
      state.filters.department = action.payload
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
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  deleteUsers,
  setSelectedUsers,
  toggleUserSelection,
  clearSelection,
  setCurrentUser,
  setSearchFilter,
  setNameFilter,
  setUsernameFilter,
  setEmployeeNumberFilter,
  setRoleFilter,
  setStatusFilter,
  setDepartmentFilter,
  clearFilters,
  setPage,
  setPageSize,
  setLoading,
  setError,
} = usersSlice.actions

