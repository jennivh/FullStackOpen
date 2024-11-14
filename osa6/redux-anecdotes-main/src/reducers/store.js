import anecdoteReducer from './anecdoteReducer'
import filterReducer from './filterReducer'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'


const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

export default store