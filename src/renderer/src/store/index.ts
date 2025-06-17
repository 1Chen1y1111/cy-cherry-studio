import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import assistantsReducer from './assistants'
import llmReducer from './llm'
import migrate from './migrate'
import runtimeReducer from './runtime'
import settingsReducer from './settings'

const rootReducer = combineReducers({
  assistants: assistantsReducer,
  settings: settingsReducer,
  llm: llmReducer,
  runtime: runtimeReducer
})

const persistConfig = {
  key: 'cherry-studio',
  storage,
  version: 6,
  blacklist: ['runtime'],
  migrate
}

const store = configureStore({
  // @ts-ignore store type is unknown
  reducer: persistReducer(persistConfig, rootReducer) as typeof rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  },
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<typeof store>()

export default store
