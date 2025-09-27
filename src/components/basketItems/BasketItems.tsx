'use client'


import Image from 'next/image'
import BasketButton from '@/components/basketButton/BasketButton'
import { Button } from '@/components/button/Button'
import Recycle from '@/assets/Recycle.svg'
import { addProduct, BasketArray, clearArticle, clearProduct } from '@/lib/appSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type Props = {
  basket: BasketArray
}

export default function BasketItems({ basket }: Props) {
  const { isMobile, isTablet } = useMediaQuery()
  const dispatch = useAppDispatch()

  const addProductHandler = (article: string) => dispatch(addProduct({ article }))
  const clearProductHandler = (article: string) => dispatch(clearProduct({ article }))
  const clearArticleHandler = (article: string) => dispatch(clearArticle({ article }))


  if (isMobile || isTablet) {
    return (
      <div className="flex flex-col gap-[15px]">
        {
          basket.map(product => (
            <div
              key={product.article}
              className="text-[14px] p-[10px] rounded-[5px] w-full bg-[#fbfbfb] border border-[#f2f2f2]"
            >
              <div className="flex justify-between items-center">
                <Image
                  className="" width={120} height={120}
                  src={[...product.info.images, ...product.info.schemas][0]}
                  alt={product.article} />
                <BasketButton
                  productCount={product.count}
                  addProductAction={() => addProductHandler(product.article)}
                  clearProductAction={() => clearProductHandler(product.article)}
                  className={'w-[120px]'} />
              </div>
              <p>{product.info.name}</p>
              <div className="w-full">
                <div className="flex items-center mt-[10px] justify-between w-full">
                  <div className="flex gap-[70px] items-center">
                    <div>
                        <span className="text-accent-300 font-medium">
                        {Number(product.info.rrc.split('.')[0]) * product.count} р.
                        </span>
                      <span className="text-gray-500 text-[12px] ml-[15px]">
                          {product.count} * {product.info.rrc.split('.')[0]} р.
                        </span>
                    </div>
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
          ))
        }
      </div>
    )
  }


  return (
    <div className="flex flex-col gap-[25px]">
      {
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
                  <div className="flex gap-[70px] items-center">
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
      }
    </div>
  )
}