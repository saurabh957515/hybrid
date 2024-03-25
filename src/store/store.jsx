import { configureStore } from '@reduxjs/toolkit'
import NavigationSlice from './Slices/NavigationSlice'
export const store = configureStore({
  reducer: {
    NavigationSlice
  },
})
