import { createSlice } from '@reduxjs/toolkit'
import { bool } from 'prop-types'

const initialState = {
  currentUser: null,
  auth: null,
  token: null,
  restaurant: null,
  orderSaved: null,
  progress: null
}

export const userSlice = createSlice({
  name: 'nav ',
  initialState,
  reducers: {
    setCurrentUser: (state: any, action) => {
      // eslint-disable-next-line no-param-reassign
      state.currentUser = action.payload
    },
    setAuth: (state: any, action) => {
      // eslint-disable-next-line no-param-reassign
      state.auth = action.payload
    },
    setToken: (state: any, action) => {
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload
    },
    setRestaurant: (state: any, action) => {
      state.restaurant = action.payload
    },
    setOrderSaved: (state: any, action) => {
      state.orderSaved = action.payload
    },
    setProgress: (state: any, action) => {
      state.progress = action.payload
    }
  },
})


export const { setCurrentUser, setAuth, setToken, setRestaurant, setOrderSaved } = userSlice.actions
