import {configureStore,combineReducers} from "@reduxjs/toolkit";
import Data from "./Data";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
 
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const RootedReducer=combineReducers({
     assignmentData:Data
})
  const persistedReducer = persistReducer(persistConfig, RootedReducer)
 export const Store= configureStore({
     reducer:persistedReducer,
     middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware({
       serializableCheck: {
         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
       },
     }),
 })
export  const  persistor = persistStore(Store);