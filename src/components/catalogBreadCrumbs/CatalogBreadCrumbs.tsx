'use client'

import Link from 'next/link'
import Image from 'next/image'
import Dots from '@/assets/dotsCatalog.svg'
import { Typography } from '@/components/typography/Typography'
import ArrowRight from '@/assets/arrowRight.svg'
import filterCategory from '@/notes/filterCategory'
import { useContext } from 'react'
import { CatalogContext } from '@/lib/catalog/CatalogProvider'

export default function CatalogBreadCrumbs() {
  const { catalogId } = useContext(CatalogContext)

  return (
    <div className="flex gap-[55px] fixed top-[70px] left-[45px] items-center z-[900] bg-white w-full h-[70px]">
      <Link href="/catalog" className="flex gap-[25px]">
        <Image width={31} height={31} src={Dots} alt="dots" />
        <Typography variant="menu_item">Каталог товаров</Typography>
      </Link>
      <div className="flex gap-[6px] items-center">
        <Link href="/"><Typography variant="menu_link">Главная</Typography></Link>
        <Image src={ArrowRight} width={10} height={10} alt="ArrowRight" />
        <Link href="/catalog"><Typography variant="menu_link">Все категории</Typography></Link>
        {catalogId && <>
          <Image src={ArrowRight} width={10} height={10} alt="ArrowRight" />
          <Link href={`/catalog/${catalogId}`}>
            <Typography
              variant="menu_link">{filterCategory[catalogId]}
            </Typography>
          </Link>
        </>
        }
      </div>
    </div>
  )
}