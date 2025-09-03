'use client'

import filterCategory from '@/notes/filterCategory'
import Link from 'next/link'
import { Button } from '@/components/button/Button'
import { MouseEventHandler } from 'react'

interface DropdownProps {
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

const CatalogModal = ({ onMouseLeave, onMouseEnter }: DropdownProps) => {

  return (
    <div onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}
         className={'bg-white w-[800px] flex flex-wrap absolute left-[50%] translate-x-[-50%] z-[1000]'}>
      {
        Object.entries(filterCategory).map(([key, value]) => (
          <Button key={key} variant={'outline'} className={'flex-grow'}>
            <Link href={`/catalog/category/${key}`}>{value}</Link>
          </Button>))
      }
    </div>
  )
}

export default CatalogModal