'use client'

import { ReactNode } from 'react'
import CatalogItems from '@/components/catalogItems/CatalogItems'
import CatalogProvider from '@/lib/catalog/CatalogProvider'
import CatalogBreadCrumbs from '@/components/catalogBreadCrumbs/CatalogBreadCrumbs'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { twMerge } from 'tailwind-merge'

type Props = Readonly<{
  children: ReactNode;
}>

export default function Layout({ children }: Props) {
  const { isDesktop } = useMediaQuery()

  return (
    <CatalogProvider>
      <div className={twMerge(
        'pt-[20px] pb-[70px]',
        isDesktop && 'pl-[280px]',
      )}>
        {isDesktop && <CatalogItems />}
        <CatalogBreadCrumbs />
        {children}
      </div>
    </CatalogProvider>
  )
}

