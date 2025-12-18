import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  sidebar: {
    open: boolean
    defaultOpen: boolean
  }
  dialogs: {
    [key: string]: boolean
  }
  modals: {
    [key: string]: boolean
  }
  notifications: {
    id: string
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    duration?: number
  }[]
  loading: {
    [key: string]: boolean
  }
}

const initialState: UiState = {
  sidebar: {
    open: true,
    defaultOpen: true,
  },
  dialogs: {},
  modals: {},
  notifications: [],
  loading: {},
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebar.open = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebar.open = !state.sidebar.open
    },
    setDialogOpen: (state, action: PayloadAction<{ key: string; open: boolean }>) => {
      state.dialogs[action.payload.key] = action.payload.open
    },
    setModalOpen: (state, action: PayloadAction<{ key: string; open: boolean }>) => {
      state.modals[action.payload.key] = action.payload.open
    },
    closeAllDialogs: (state) => {
      Object.keys(state.dialogs).forEach((key) => {
        state.dialogs[key] = false
      })
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((key) => {
        state.modals[key] = false
      })
    },
    addNotification: (
      state,
      action: PayloadAction<{
        id?: string
        message: string
        type: 'success' | 'error' | 'warning' | 'info'
        duration?: number
      }>
    ) => {
      const id = action.payload.id || `notification-${Date.now()}`
      state.notifications.push({
        id,
        message: action.payload.message,
        type: action.payload.type,
        duration: action.payload.duration || 5000,
      })
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    setLoading: (state, action: PayloadAction<{ key: string; loading: boolean }>) => {
      state.loading[action.payload.key] = action.payload.loading
    },
    clearLoading: (state, action: PayloadAction<string>) => {
      delete state.loading[action.payload]
    },
  },
})

export const {
  setSidebarOpen,
  toggleSidebar,
  setDialogOpen,
  setModalOpen,
  closeAllDialogs,
  closeAllModals,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoading,
  clearLoading,
} = uiSlice.actions

