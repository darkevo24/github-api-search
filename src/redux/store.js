import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'data',
  storage
};
const persistedReducer = persistReducer(persistConfig, dataSlice);

export const store = configureStore({
  reducer: persistedReducer
})