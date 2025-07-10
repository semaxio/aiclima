'use client'

import { Typography } from '@/components/typography/Typography'
import { useAppSelector } from '@/lib/hooks'
import { selectProductCount } from '@/lib/appSlice'

export default function Header() {

  const productCount = useAppSelector(selectProductCount)

  return (
    <header
      className={'fixed top-0 left-0 right-0 h-[60px] bg-blue-700 px-[40px] py-[10px] z-[1000] flex justify-between'}>
      <Typography variant={'h1'} className={'text-light-100'}>LOGO</Typography>
      <h2 className={'text-light-100'}>{productCount}</h2>
    </header>
  )
}