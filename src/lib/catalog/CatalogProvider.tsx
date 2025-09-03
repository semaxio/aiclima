'use client'

import { createContext, ReactNode } from 'react'
import { useParams } from 'next/navigation'

type CatalogContextType = { catalogId?: string | undefined }

export const CatalogContext = createContext<CatalogContextType>({catalogId: '0'})

type Props = {
  children: ReactNode
}

export default function CatalogProvider({ children }: Props) {
  const { id: catalogId } = useParams<{ id?: string }>()

  return (
    <CatalogContext.Provider value={{ catalogId }}>
      {children}
    </CatalogContext.Provider>
  )
}