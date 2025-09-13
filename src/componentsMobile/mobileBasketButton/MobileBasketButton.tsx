'use client'


import { Typography } from '@/components/typography/Typography'
import Image from 'next/image'
import basket from '../../../public/basket.svg'
import { twMerge } from 'tailwind-merge'
import { MobileButton } from '@/componentsMobile/mobileButton/MobileButton'


type Props = {
  productCount: number
  addProductAction: () => void
  clearProductAction: () => void
  className: string
}

export default function MobileBasketButton({ className, addProductAction, clearProductAction, productCount }: Props) {


  return (
    <>
      {productCount === 0
        ? <div className={className}>
          <MobileButton
            onClick={addProductAction}
            className="h-[30px] w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 active:opacity-90"
          >
            <Typography className={'text-[11px] font-medium'}>В корзину</Typography>
            <Image width={15} height={15} className={'ml-[15px]'} src={basket} alt={'basket'} />
          </MobileButton>
        </div>
        : <div
          className={twMerge(
            'h-[30px] flex justify-center items-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600',
            className,
          )}>
          <MobileButton className={'w-[30%] h-[100%] bg-transparent flex justify-center items-center'}
                  onClick={clearProductAction}>-</MobileButton>
          <div className={'w-[40%] text-center border-dark-300'}>{productCount}</div>
          <MobileButton className={'w-[30%] h-[100%] bg-transparent flex justify-center items-center'}
                  onClick={addProductAction}>+</MobileButton>
        </div>
      }
    </>
  )
}