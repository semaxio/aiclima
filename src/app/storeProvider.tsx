'use client'
import { Provider } from 'react-redux'
import { ReactNode, useEffect, useRef } from 'react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { AppStore, persistor, store } from '@/lib/store'
import { PersistGate } from 'redux-persist/integration/react'

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store
  }
  useEffect(() => {
    if (storeRef.current) {
      return setupListeners(storeRef.current.dispatch)
    }
  }, [])
  return <Provider store={storeRef.current} key={'storeProviderKey'}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
}
