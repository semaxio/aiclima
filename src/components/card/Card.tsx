'use client'


import { useState } from 'react'
import Image from 'next/image'
import { Typography } from '@/components/typography/Typography'
import Link from 'next/link'
import { ProductCard } from '@/types/apiResponseTypes/apiResopnses'
import basket from '@/../public/basket.svg'
import { Button } from '@/components/button/Button'
import { addProduct, clearProduct } from '@/lib/appSlice'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/lib/hooks'
import { selectProductCountByArticle } from '@/lib/selectors'

const Card = ({
                images,
                brand,
                name,
                article,
                schemas,
                rrc,
              }: ProductCard) => {
  const dispatch = useDispatch()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const productCount = useAppSelector(selectProductCountByArticle(article))
  const imagesAndSchemas = [...images, ...schemas]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagesAndSchemas.length)
  }
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imagesAndSchemas.length) % imagesAndSchemas.length)
  }

  function addProductHandler() {
    dispatch(addProduct({ article: article }))
  }

  function clearProductHandler() {
    dispatch(clearProduct({ article: article }))
  }

  return (
    <div className="relative bg-white rounded-[5px] shadow-md overflow-hidden md:max-w-2xl w-[300px] pb-[50px]">
      {/* Галерея изображений */}
      <div className="relative h-[240px] w-full bg-white">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="bg-white object-contain"
          src={imagesAndSchemas[currentImageIndex]}
          alt={name}
          // priority={currentImageIndex === 0}
        />
        {imagesAndSchemas.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="opacity-40 absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="grey">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="opacity-40 absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="grey">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {imagesAndSchemas.length > 1 && imagesAndSchemas.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 w-2 rounded-full ${currentImageIndex === index ? 'bg-blue-500' : 'bg-gray-300'} cursor-pointer`}
            />
          ))}
        </div>
      </div>

      {/* Информация о товаре */}
      <div className="p-[20px]">
        <Link href={'/'}>
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold text-gray-500 uppercase tracking-wide flex justify-between">
                <Typography variant="medium_text_14">
                  {brand}
                </Typography>
                <Typography variant="small_text" className={'lowercase'}>
                  {rrc.split('.')[0]}р.
                </Typography>
              </div>
              <Typography variant="regular_text_14" style={{ lineHeight: '1.5', fontWeight: '500' }}
                          className={'break-all hover:text-dark-100'}>
                {name}
              </Typography>
            </div>
          </div>
        </Link>

        {/* Кнопка перехода */}
        {productCount === 0
          ? <div className="absolute bottom-[0px] left-[50%] translate-[-50%] w-[80%]">
            <Button
              onClick={addProductHandler}
              className="h-[35px] w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600"
            >
              <Typography>В корзину</Typography>
              <Image className={'ml-[15px]'} src={basket} alt={'basket'} />
            </Button>
          </div>
          : <div
            className="h-[35px] absolute bottom-[0px] left-[50%] translate-[-50%] w-[80%] flex justify-center items-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600">
            <Button className={'w-[30%] h-[100%] bg-transparent flex justify-center items-center'}
                    onClick={clearProductHandler}>-</Button>
            <div className={'w-[40%] text-center border-dark-300 border-r-[1px] border-l-[1px]'}>{productCount}</div>
            <Button className={'w-[30%] h-[100%] bg-transparent flex justify-center items-center'}
                    onClick={addProductHandler}>+</Button>
          </div>
        }

      </div>
    </div>
  )
}

export default Card
