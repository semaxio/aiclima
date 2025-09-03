'use client'

import { ReactNode } from 'react'
import CatalogItems from '@/components/catalogItems/CatalogItems'
import CatalogProvider from '@/lib/catalog/CatalogProvider'
import CatalogBreadCrumbs from '@/components/catalogBreadCrumbs/CatalogBreadCrumbs'

type Props = Readonly<{
  children: ReactNode;
}>

export default function Layout({ children }: Props) {
  return (
    <CatalogProvider>
      <div className="pt-[20px] pb-[70px] pl-[280px]">
        <CatalogItems />
        <CatalogBreadCrumbs />
        {children}
      </div>
    </CatalogProvider>
  )
}

