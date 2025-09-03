'use client'


import Image from 'next/image'
import BasketButton from '@/components/basketButton/BasketButton'
import { Button } from '@/components/button/Button'
import Recycle from '@/assets/Recycle.svg'
import { addProduct, BasketArray, clearArticle, clearProduct } from '@/lib/appSlice'
import { useAppDispatch } from '@/lib/hooks'

type Props = {
  basket: BasketArray
}

export default function BasketItems({ basket }: Props) {

  const dispatch = useAppDispatch()

  const addProductHandler = (article: string) => dispatch(addProduct({ article }))
  const clearProductHandler = (article: string) => dispatch(clearProduct({ article }))
  const clearArticleHandler = (article: string) => dispatch(clearArticle({ article }))

  return (
    basket.map(product => (
      <div key={product.article} className="text-[14px] flex gap-[15px] w-full">
        <div className="flex gap-[40px] items-center w-full">
          <Image
            className="" width={80} height={80}
            src={[...product.info.images, ...product.info.schemas][0]}
            alt={product.article} />
          <div className="w-full">
            <p>{product.info.name}</p>
            <div className="flex items-center mt-[15px] justify-between w-full">
              <BasketButton
                productCount={product.count}
                addProductAction={() => addProductHandler(product.article)}
                clearProductAction={() => clearProductHandler(product.article)}
                className={'w-[120px]'} />
              <div>
                        <span className="text-accent-300 font-medium">
                        {Number(product.info.rrc.split('.')[0]) * product.count} р.
                        </span>
                <span className="text-gray-500 text-[12px] ml-[15px]">
                          {product.count} * {product.info.rrc.split('.')[0]} р.
                        </span>
              </div>
              <Button
                onClick={() => clearArticleHandler(product.article)}
                variant="outline"
                className="flex items-center gap-[10px] text-[12px] w-[130px] p-[4px]">
                <Image width={15} height={15} src={Recycle} alt="recycle" />
                Удалить товары
              </Button>
            </div>
          </div>
        </div>
      </div>
    ))
  )
}