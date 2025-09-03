'use client'

import { createContext, ReactNode, useState } from 'react'
import CatalogItems from '@/components/catalogItems/CatalogItems'
import { useParams } from 'next/navigation'

type Props = Readonly<{
  children: ReactNode;
}>

export const CatalogContext = createContext<
  {
    catalogId?: string | undefined
    setCategory: (value: string) => void
  } | null
>(null)

export default function Layout({ children }: Props) {
  const { id: catalogId } = useParams<{id?: string}>()
  const [category, setCategory] = useState(catalogId)

  return (
    <>
      <CatalogContext value={{ catalogId, setCategory }}>
        <CatalogItems category={category || '0'} />
        {children}
      </CatalogContext>
    </>
  )
}

