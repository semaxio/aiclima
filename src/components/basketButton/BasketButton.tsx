'use client'

import { Button } from '@/components/button/Button'
import { Typography } from '@/components/typography/Typography'
import Image from 'next/image'
import basket from '../../../public/basket.svg'
import { twMerge } from 'tailwind-merge'

type Props = {
  productCount: number
  addProductAction: () => void
  clearProductAction: () => void
  className: string
}

export default function BasketButton({ productCount, addProductAction, clearProductAction, className }: Props) {
  return (<>
      {productCount === 0
        ? <div className={className}>
          <Button
            onClick={addProductAction}
            className="h-[30px] w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600"
          >
            <Typography className={'text-[10px]'}>В корзину</Typography>
            <Image width={20} height={20} className={'ml-[15px]'} src={basket} alt={'basket'} />
          </Button>
        </div>
        : <div
          className={twMerge(
            "h-[30px] flex justify-center items-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600",
            className
          )} >
          <Button className={'w-[30%] h-[100%] bg-transparent flex justify-center items-center'}
                  onClick={clearProductAction}>-</Button>
          <div className={'w-[40%] text-center border-dark-300'}>{productCount}</div>
          <Button className={'w-[30%] h-[100%] bg-transparent flex justify-center items-center'}
                  onClick={addProductAction}>+</Button>
        </div>
      }
    </>
  )
}