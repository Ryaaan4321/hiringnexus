import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/redux/slices/userslice'
import jobsReducer from '@/redux/slices/jobs/jobsslice'
import filteredjobsreducer from '@/redux/slices/jobs/filteredJobsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    jobs: jobsReducer,
    filteredJobs: filteredjobsreducer
  }
})


export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
