'use client'


import { useContext, useState } from 'react'
import { CatalogContext } from '@/lib/catalog/CatalogProvider'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/lib/hooks'
import { selectProductCountByArticle } from '@/lib/selectors'
import { addProduct, clearProduct } from '@/lib/appSlice'
import Image from 'next/image'
import PrevImage from '@/components/prevImage/PrevImage'
import NexImage from '@/components/nextImage/NextImage'
import Link from 'next/link'
import { Typography } from '@/components/typography/Typography'
import BasketButton from '@/components/basketButton/BasketButton'
import { ProductCard } from '@/types/apiResponseTypes/apiResopnses'

export default function MobileCard({ item, page }: { item: ProductCard, page: number }) {
  const {
    article,
    brand,
    name,
    url,
    images,
    schemas,
    // collection,
    // description,
    // stocks,
    category,
    rrc,
  } = item

  const { catalogId } = useContext(CatalogContext)
  const dispatch = useDispatch()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const productCount = useAppSelector(selectProductCountByArticle(article))
  const imagesAndSchemas = [...images, ...schemas]
  const encodedUrl = encodeURIComponent(article)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagesAndSchemas.length)
  }
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imagesAndSchemas.length) % imagesAndSchemas.length)
  }

  function addProductHandler() {
    dispatch(addProduct({
      article: article,
      info: {
        article,
        brand,
        name,
        url,
        images,
        schemas,
        rrc,
        category
      },
    }))
    console.log(item)
  }

  function clearProductHandler() {
    dispatch(clearProduct({ article: article }))
  }

  const normalizedName = name.replace(/\u00A0/g, ' ')

  const handleScroll = () => {
    localStorage.setItem('pageY', String(window.pageYOffset))
    localStorage.setItem('pageNumber', String(page))
    localStorage.setItem('category', String(catalogId))
  }


  return (
    <div className="relative bg-white rounded-[5px] shadow-md overflow-hidden md:max-w-2xl w-[49%] max-w-[240px] pb-[35px]">
      {/* Галерея изображений */}
      <div className="relative h-[240px] w-full bg-white">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="bg-white object-contain"
          src={imagesAndSchemas[currentImageIndex]}
          alt={name}
        />
        {imagesAndSchemas.length > 1 && (
          <>
            <PrevImage handlerAction={prevImage} />
            <NexImage handlerAction={nextImage} />
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
      <div className="p-[15px]">
        <Link href={`/catalog/${catalogId}/${encodedUrl}`} onClick={handleScroll}>
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold text-gray-500 uppercase tracking-wide flex justify-between">
                <Typography variant="small_text">
                  {brand}
                </Typography>
                <Typography variant="small_text" className={'lowercase'}>
                  {rrc.split('.')[0]}р.
                </Typography>
              </div>
              <p className={'text-[12px] hover:text-accent-600'}>
                {name.length > 99 ? normalizedName.substring(0, 99) + '...' : normalizedName}
              </p>
            </div>
          </div>
        </Link>

        {/* Кнопка перехода */}
      </div>
      <BasketButton
        className="absolute w-[80%] bottom-[10px] left-[50%] translate-x-[-50%] text-[10px]"
        productCount={productCount}
        addProductAction={addProductHandler} clearProductAction={clearProductHandler} />
    </div>
  )
}