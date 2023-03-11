import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './slices/userSlice/index'

export default combineReducers({
  user: userSlice.reducer,
})
