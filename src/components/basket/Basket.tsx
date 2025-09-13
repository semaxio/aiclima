'use client'

import { Drawer } from 'antd'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { changeIsOpenBasket, clearBasket, selectBasket, selectIsOpenBasket } from '@/lib/appSlice'
import Image from 'next/image'
import Recycle from '@/assets/Recycle.svg'
import { Button } from '@/components/button/Button'
import Link from 'next/link'
import BasketItems from '@/components/basketItems/BasketItems'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function Basket() {

  const {isDesktop} = useMediaQuery()

  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectIsOpenBasket)
  const basket = useAppSelector(selectBasket)

  const clearBasketHandler = () => dispatch(clearBasket())
  const checkoutHandler = () => dispatch(changeIsOpenBasket({ isOpen: false }))

  const basketSum = basket.reduce((acc, el) => acc + el.count * Number(el.info.rrc.split('.')[0]), 0)

  if (basket.length === 0) {
    return (
      <Drawer open={isOpen} size={'large'} onClose={() => dispatch(changeIsOpenBasket({ isOpen: false }))}>
        <div
          className="w-full h-full flex justify-center items-center text-accent-100 text-[20px] font-medium">
          В корзине пусто
        </div>
      </Drawer>
    )
  }

  if(!isDesktop) {
    return (
      <Drawer open={isOpen} size={'large'} onClose={() => dispatch(changeIsOpenBasket({ isOpen: false }))}>
        <div className="w-full h-full flex flex-col gap-[20px] text-gray-500 pb-[50px]">
          <BasketItems basket={basket} />
          <div className="mt-[25px] pt-[20px] border-t border-t-gray-300 pb-[50px]">
            <p className="text-[18px] font-medium">Сумма заказа: {basketSum} р.</p>
            <div className="flex gap-[30px] mt-[50px] flex-col">
              <Link href={'/checkout'}>
                <Button
                  variant="primary"
                  className="text-[#fff] text-[14px]"
                  onClick={checkoutHandler}>
                  К оформлению
                </Button>
              </Link>
              <Button
                onClick={clearBasketHandler}
                variant="outline"
                className="flex gap-[10px] w-[200px]">
                <Image src={Recycle} width={15} height={15} alt={'recycle'} />
                Очистить корзину
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    )
  }

  return (
    <Drawer open={isOpen} size={'large'} onClose={() => dispatch(changeIsOpenBasket({ isOpen: false }))}>
      <div className="w-full h-full flex flex-col gap-[20px] text-gray-500 pb-[50px]">
        <BasketItems basket={basket} />
        <div className="mt-[25px] pt-[20px] border-t border-t-gray-300 pb-[50px]">
          <p className="text-[18px] font-medium">Сумма заказа: {basketSum} р.</p>
          <div className="flex gap-[50px] mt-[50px]">
            <Link href={'/checkout'}>
              <Button
                variant="primary"
                className="text-[#fff] text-[14px]"
                onClick={checkoutHandler}>
                К оформлению
              </Button>
            </Link>
            <Button
              onClick={clearBasketHandler}
              variant="outline"
              className="flex gap-[10px]">
              <Image src={Recycle} width={15} height={15} alt={'recycle'} />
              Очистить корзину
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  )
}