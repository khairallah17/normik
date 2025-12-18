import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  read: boolean
  createdAt: Date
  link?: string
}

interface NotificationsState {
  notifications: Notification[]
  unreadCount: number
  filters: {
    type: string
    read: boolean | null
  }
  loading: boolean
  error: string | null
}

const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
  filters: {
    type: '',
    read: null,
  },
  loading: false,
  error: null,
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload
      state.unreadCount = action.payload.filter((n) => !n.read).length
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'createdAt'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: `notification-${Date.now()}-${Math.random()}`,
        createdAt: new Date(),
      }
      state.notifications.unshift(notification)
      if (!notification.read) {
        state.unreadCount += 1
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n.id === action.payload)
      if (notification && !notification.read) {
        notification.read = true
        state.unreadCount -= 1
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.read = true
      })
      state.unreadCount = 0
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n.id === action.payload)
      if (notification && !notification.read) {
        state.unreadCount -= 1
      }
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
    deleteAllNotifications: (state) => {
      state.notifications = []
      state.unreadCount = 0
    },
    setTypeFilter: (state, action: PayloadAction<string>) => {
      state.filters.type = action.payload
    },
    setReadFilter: (state, action: PayloadAction<boolean | null>) => {
      state.filters.read = action.payload
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
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
  setNotifications,
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  setTypeFilter,
  setReadFilter,
  clearFilters,
  setLoading,
  setError,
} = notificationsSlice.actions

