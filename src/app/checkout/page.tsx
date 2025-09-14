'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { clearBasket, selectBasket } from '@/lib/appSlice'
import { Button } from '@/components/button/Button'
import Link from 'next/link'
import Image from 'next/image'
import Recycle from '@/assets/Recycle.svg'
import BasketItems from '@/components/basketItems/BasketItems'
import CheckoutForm from '@/components/checkoutForm/CheckoutForm'
import { Result, Spin } from 'antd'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function Page() {

  const dispatch = useAppDispatch()
  const basket = useAppSelector(selectBasket)
  const [isSending, setIsSending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { isMobile } = useMediaQuery()

  const clearBasketHandler = () => dispatch(clearBasket())

  const basketSum = basket.reduce((acc, el) => acc + el.count * Number(el.info.rrc.split('.')[0]), 0)

  if (isSending) {
    return <div>
      <Spin size="large" fullscreen />
    </div>
  }

  if (isSuccess) {
    return <div>
      <Result
        className="flex flex-col justify-center items-center"
        status="success"
        title="Заказ успешно оформлен!"
        subTitle="Менеджер свяжется с вами в ближайшее время. Спасибо!"
        extra={[
          <Link href={'/catalog'} key="qwertyuio312567ser">
            <Button variant="primary" className="text-white rounded-[5px]">
              Перейти в каталог
            </Button>
          </Link>,
        ]}
      />
    </div>
  }

  if (basket.length === 0) {
    return (
      <div className="h-full w-full flex flex-col gap-[25px] justify-center items-center">
        <h2 className={twMerge(
          "text-accent-600 font-medium",
          isMobile ? 'text-[15px] mt-[200px]' :  'text-[25px]'
        )}>Товары к оформлению отсутствуют</h2>
        <Link href={'/catalog'}>
          <Button variant="primary" className="text-[#fff]">В каталог</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="text-gray-500 pb-[50px]">
      <BasketItems basket={basket} />
      <div className="mt-[50px] flex justify-between items-center">
        <p className="text-[18px] font-medium">Сумма заказа: {basketSum} р.</p>
        <Button
          onClick={clearBasketHandler}
          variant="outline"
          className={twMerge(
            'flex gap-[10px] text-[14px]',
            isMobile && 'hidden',
          )}>
          <Image src={Recycle} width={15} height={15} alt={'recycle'} />
          Очистить всю корзину
        </Button>
      </div>
      <div className="mt-[25px] text-[18px]">
        <div className="w-full flex items-center justify-center flex-col gap-[30px] mt-[50px]">
          <p>Заполните форму обратной связи и менеджер свяжется с вами для уточнения деталей:</p>
          <CheckoutForm
            basketSum={basketSum}
            setIsSendingAction={setIsSending}
            setIsSuccessAction={setIsSuccess}
          />
        </div>
      </div>
      {
        isMobile && (
          <Button
            onClick={clearBasketHandler}
            variant="outline"
            className="flex gap-[10px] text-[14px] mt-[50px] mb-[20px] w-full">
            <Image src={Recycle} width={15} height={15} alt={'recycle'} />
            Очистить всю корзину
          </Button>
        )
      }
    </div>
  )
}

