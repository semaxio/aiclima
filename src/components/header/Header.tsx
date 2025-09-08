'use client'

import { Typography } from '@/components/typography/Typography'
import Basket from '@/assets/basket2.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { changeIsOpenBasket, selectProductCount } from '@/lib/appSlice'

export default function Header() {

  const productCount = useAppSelector(selectProductCount)
  const dispatch = useAppDispatch()

  function removePagination() {
    localStorage.removeItem('pageNumber')
  }

  function basketHandler() {
    dispatch(changeIsOpenBasket({ isOpen: true }))
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
      <div className={'w-[30px] h-[30px] relative'} onClick={basketHandler}>
        <Image src={Basket} alt={'basket'} width={30} height={30} />
        {productCount > 0 && <div
          onClick={() => {
          }}
          className={'text-white w-[15px] h-[15px] bg-accent-600 rounded-full flex items-center justify-center absolute right-[-8px] top-[-6px] text-[9px]'}>
          {productCount}
        </div>}
      </div>

    </header>
  )
}