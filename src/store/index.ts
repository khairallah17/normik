import { configureStore } from '@reduxjs/toolkit'
import { usersSlice } from './slices/usersSlice'
import { wpiSlice } from './slices/wpiSlice'
import { uiSlice } from './slices/uiSlice'
import { handbookSlice } from './slices/handbookSlice'
import { documentsSlice } from './slices/documentsSlice'
import { notificationsSlice } from './slices/notificationsSlice'
import { personnelSlice } from './slices/personnelSlice'
import { workEquipmentSlice } from './slices/workEquipmentSlice'
import { workPlansSlice } from './slices/workPlansSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      users: usersSlice.reducer,
      wpi: wpiSlice.reducer,
      ui: uiSlice.reducer,
      handbook: handbookSlice.reducer,
      documents: documentsSlice.reducer,
      notifications: notificationsSlice.reducer,
      personnel: personnelSlice.reducer,
      workEquipment: workEquipmentSlice.reducer,
      workPlans: workPlansSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

