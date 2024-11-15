import { user } from '@/redux/slices/user-slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {user},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch