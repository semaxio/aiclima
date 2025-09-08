'use client'

import { Typography } from '@/components/typography/Typography'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { changeIsOpenBasket, selectProductCount } from '@/lib/appSlice'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import BasketIcon from '@/components/basketIcon/BasketIcon'

export default function Header() {

  const productCount = useAppSelector(selectProductCount)
  const dispatch = useAppDispatch()
  const { isDesktop } = useMediaQuery()

  function removePagination() {
    localStorage.removeItem('pageNumber')
  }

  function basketHandler() {
    dispatch(changeIsOpenBasket({ isOpen: true }))
  }

  if (!isDesktop) {
    return (
      <header
        className={'bg-white fixed top-0 left-0 right-0 h-[70px] border-b-gray-100 border-b px-[20px] z-[1000] flex justify-between items-center'}>
        <Typography variant={'h1'} className={'text-accent-600'}>
          <Link href={'/'}>AICLIMA</Link>
        </Typography>
        <BasketIcon basketHandler={basketHandler} productCount={productCount} />
      </header>
    )
  }

  return (
    <header
      className={'bg-white fixed top-0 left-0 right-0 h-[70px] border-b-gray-100 border-b px-[45px] z-[1000] flex justify-between items-center'}>
      <Typography variant={'h1'} className={'text-accent-600'}>
        <Link href={'/'}>AICLIMA</Link>
      </Typography>
      <div className={'relative h-full flex items-center gap-[80px] text-accent-600 text-[20px] header'}>
        <Link href={'/catalog'} onClick={removePagination}>Каталог</Link>
        <Link href={'/'}>О нас</Link>
        <Link href={'/'}>Контакты</Link>
      </div>
      <BasketIcon basketHandler={basketHandler} productCount={productCount} />
    </header>
  )
}