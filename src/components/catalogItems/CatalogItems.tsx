'use client'

import filterCategory from '@/notes/filterCategory'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { useContext } from 'react'
import { CatalogContext } from '@/lib/catalog/CatalogProvider'
import handleRemoveScrollY from '@/features/handleRemoveScrollY/handleRemoveScrollY'

const CatalogItems = () => {
  const { catalogId } = useContext(CatalogContext)

  function itemHandler(key: string) {
    const localStorageCatalog = localStorage.getItem('category')
    if(localStorageCatalog && localStorageCatalog !== key ) {
      localStorage.removeItem('category')
      handleRemoveScrollY()
    }
    localStorage.removeItem('pageNumber')
  }

  return (
    <div className="w-[260px] h-[865px] fixed top-[150px] left-[45px] border-r-[1px] border-r-gray-200">
      <ul className={'flex flex-col gap-[3px]'}>
        {
          Object.entries(filterCategory).map(([key, value]) => (
            <Link key={key}
                  className={twMerge(
              key === catalogId ? 'text-accent-600' : '',
              'cursor-pointer text-[14px] hover:opacity-[60%]',
            )} href={`/catalog/${key}`}
            onClick={() => itemHandler(key)}
            >{value}</Link>
          ))
        }
      </ul>
    </div>
  )
}

export default CatalogItems