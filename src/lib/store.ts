import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { appSlice } from '@/lib/appSlice'
import storage from 'redux-persist/lib/storage' // localStorage для веба
import {
  persistReducer, persistStore, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
})

const persistConfig = {
  key: 'basket', // ключ в localStorage
  storage,
  whitelist: [appSlice.name], // указываем, какие редьюсеры сохранять (например, 'app' — ваш слайс корзины)
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })
}


export const store = makeStore()
export const persistor = persistStore(store)
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the lib itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']