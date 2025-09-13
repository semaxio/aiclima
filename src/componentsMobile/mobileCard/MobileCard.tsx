'use client'

import { useContext } from 'react'
import { CatalogContext } from '@/lib/catalog/CatalogProvider'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/lib/hooks'
import { selectProductCountByArticle } from '@/lib/selectors'
import { addProduct, clearProduct } from '@/lib/appSlice'
import Image from 'next/image'
import Link from 'next/link'
import { Typography } from '@/components/typography/Typography'
import { ProductCard } from '@/types/apiResponseTypes/apiResopnses'
import MobileBasketButton from '@/componentsMobile/mobileBasketButton/MobileBasketButton'
import { Carousel } from 'antd'
import s from './s.module.css'


// const contentStyle: React.CSSProperties = {
//   margin: 0,
//   height: '160px',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#364d79',
// }


export default function MobileCard({ item, page }: { item: ProductCard, page: number }) {
  const {
    article,
    brand,
    name,
    url,
    images,
    schemas,
    category,
    rrc,
  } = item

  const { catalogId } = useContext(CatalogContext)
  const dispatch = useDispatch()
  const productCount = useAppSelector(selectProductCountByArticle(article))
  const imagesAndSchemas = [...images, ...schemas]
  const encodedUrl = encodeURIComponent(article)

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
        category,
      },
    }))
  }

  const clearProductHandler = () => dispatch(clearProduct({ article: article }))

  const normalizedName = name.replace(/\u00A0/g, ' ')

  const handleScroll = () => {
    localStorage.setItem('pageY', String(window.pageYOffset))
    localStorage.setItem('pageNumber', String(page))
    localStorage.setItem('category', String(catalogId))
  }

  return (
    <div
      className="relative bg-white rounded-[5px] shadow-md overflow-hidden md:max-w-2xl w-[49%] max-w-[240px] pb-[35px]">
      {/* Галерея изображений */}
      <Carousel
        dotPosition={'bottom'}
        dots={imagesAndSchemas.length > 1 ? { className: s.customDots } : false}>
        {
          imagesAndSchemas.map(img => (
            <div key={img} className="h-[220px] w-full relative">
              <Image fill src={img} alt={'image'} className="w-full object-contain" />
            </div>
          ))
        }
      </Carousel>

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
              <p className={'text-[12px] hover:text-accent-600 leading-[15px]'}>
                {name.length > 99 ? normalizedName.substring(0, 99) + '...' : normalizedName}
              </p>
            </div>
          </div>
        </Link>

        {/* Кнопка перехода */}
      </div>
      <MobileBasketButton
        className="absolute w-[80%] bottom-[10px] left-[50%] translate-x-[-50%] text-[10px]"
        productCount={productCount}
        addProductAction={addProductHandler} clearProductAction={clearProductHandler} />
    </div>
  )
}