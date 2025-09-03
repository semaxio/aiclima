'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { clearBasket, selectBasket } from '@/lib/appSlice'
import { Button } from '@/components/button/Button'
import Link from 'next/link'
import Image from 'next/image'
import Recycle from '@/assets/Recycle.svg'
import BasketItems from '@/components/basketItems/BasketItems'

export default function Page() {

  const dispatch = useAppDispatch()
  const basket = useAppSelector(selectBasket)

  const clearBasketHandler = () => dispatch(clearBasket())

  const basketSum = basket.reduce((acc, el) => acc + el.count * Number(el.info.rrc.split('.')[0]), 0)

  if (basket.length === 0) {
    return (
      <div className="h-full w-full flex flex-col gap-[25px] justify-center items-center">
        <h2 className="text-accent-600 text-[25px] font-medium">Товары к оформлению отсутствуют</h2>
        <Link href={'/catalog'}>
          <Button variant='primary' className='text-[#fff]'>В каталог</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className='text-gray-500 pb-[50px]'>
      <BasketItems basket={basket}/>
      <div className='mt-[50px] flex justify-between items-center'>
        <p className="text-[18px] font-medium">Сумма заказа: {basketSum} р.</p>
        <Button
          onClick={clearBasketHandler}
          variant="outline"
          className="flex gap-[10px] text-[14px]">
          <Image src={Recycle} width={15} height={15} alt={'recycle'} />
          Очистить всю корзину
        </Button>
      </div>
      <div className='mt-[25px] text-[18px]'>
        <p>Заполните форму обратной связи и менеджер свяжется с вами для уточнения деталей:</p>
      </div>
    </div>
  )
}

