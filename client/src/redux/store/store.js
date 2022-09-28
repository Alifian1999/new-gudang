import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import allReducers from '../reducer'


const applyMiddlewares = [thunk]

const store = configureStore({
   reducer : allReducers,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck:false,
      applyMiddlewares
   })
})

export default store;