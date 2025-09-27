'use client'

import { Typography } from '@/components/typography/Typography'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { changeIsOpenBasket, selectProductCount } from '@/lib/appSlice'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import BasketIcon from '@/components/basketIcon/BasketIcon'
import { twMerge } from 'tailwind-merge'

export default function Header() {

  const productCount = useAppSelector(selectProductCount)
  const dispatch = useAppDispatch()
  const { isDesktop, isMobile, isTablet } = useMediaQuery()

  function removePagination() {
    localStorage.removeItem('pageNumber')
  }

  function basketHandler() {
    dispatch(changeIsOpenBasket({ isOpen: true }))
  }

  if (isMobile || isTablet) {
    return (
      <header
        className={'bg-white fixed top-0 left-0 right-0 h-[60px] border-b-gray-100 border-b px-[20px] z-[1000] flex justify-between items-center'}>
        <Typography variant={'h1'} className={'text-accent-600'}>
          <Link onClick={removePagination} href={'/'}>AICLIMA</Link>
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
      <div className={twMerge(
        'relative h-full flex items-center text-accent-600 text-[20px] header',
        isDesktop ? 'gap-[80px]' : 'gap-[30px] text-[18px]'
      )}>
        <Link href={'/catalog'} onClick={removePagination}>Каталог</Link>
        <Link href={'/'}>Контакты</Link>
        <Link href={'/'}>Доставка</Link>
        <Link href={'/'}>Оплата</Link>
        <Link href={'/'}>Гарантии</Link>
        <Link href={'/'}>О магазине</Link>
        <Link href={'/'}>Дизайнерам</Link>
      </div>
      <BasketIcon basketHandler={basketHandler} productCount={productCount} />
    </header>
  )
}