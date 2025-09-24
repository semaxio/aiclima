'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Modal, Spin } from 'antd'
import { ArticleCard } from '@/types/apiResponseTypes/apiResopnses'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import ArrowLeft from '@/assets/arrowleft.svg'
import Resize from '@/assets/resize.svg'
import PrevImage from '@/components/prevImage/PrevImage'
import NexImage from '@/components/nextImage/NextImage'
import DOMPurify from 'dompurify'
import { useAppSelector } from '@/lib/hooks'
import { selectProductCountByArticle } from '@/lib/selectors'
import { addProduct, clearProduct } from '@/lib/appSlice'
import { useDispatch } from 'react-redux'
import BasketButton from '@/components/basketButton/BasketButton'
import { Button } from '@/components/button/Button'
import mappedAttributes from '@/features/mappedAttributes/mappedAttributes'
import s from './style.module.css'
import ServerError from '@/components/serverError/ServerError'
import {useMediaQuery} from "@/hooks/useMediaQuery";


export default function Product() {
  const params = useParams<{ article: string }>()
  const { article } = params
  const router = useRouter()

  const dispatch = useDispatch()
  const productCount = useAppSelector(selectProductCountByArticle(article))
  const [product, setProduct] = useState<ArticleCard | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [imageIndex, setImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const productDescription = DOMPurify.sanitize(product?.description || '')

  const {isMobile} = useMediaQuery()

  useEffect(() => {
    fetch(`/api/product?article=${article}`, { cache: 'force-cache' })
      .then(res => res.json())
      .then(data => {
        if (data.data.length === 0) throw new Error('server error : []')
        if (data.data[0]?.article) {
          setProduct(data.data[0])
        }
      })
      .catch(err => {
        setError('server error')
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }, [article])

  if (error) return <ServerError />

  if (isLoading || !product) {
    return <div className="w-full h-[70vh] flex items-center justify-center"><Spin
      size={'large'} /></div>
  }

  const imagesAndSchemas = [...product.images, ...product.schemas]

  function nextIndexHandler() {
    if (imageIndex >= imagesAndSchemas.length - 1) {
      setImageIndex(0)
    } else {
      setImageIndex(prev => prev + 1)
    }
  }

  function prevIndexHandler() {
    if (imageIndex === 0) {
      setImageIndex(imagesAndSchemas.length - 1)
    } else {
      setImageIndex(prev => prev - 1)
    }
  }

  function modalHandler() {
    setIsModalOpen(true)
  }

  function addProductHandler() {
    if (product) {
      dispatch(addProduct({
        article: article, info: {
          article: product.article,
          brand: product.brand,
          name: product.name,
          url: product.url,
          images: product.images,
          schemas: product.schemas,
          rrc: product.rrc,
          category: product.category,
        },
      }))
    }
  }

  function clearProductHandler() {
    dispatch(clearProduct({ article: article }))
  }

  const handlerDebugger = () => {
    // debugger
    router.back()
  }

  return (
    <div className="pt-[70px] relative">
      <div
        className="text-[14px] flex items-center gap-[8px] hover:opacity-60 absolute top-[15px] left-[15px] cursor-pointer"
        onClick={() => handlerDebugger()}>
        <Image width={16} height={8} src={ArrowLeft} alt={'ArrowLeft'} />
        Назад
      </div>
      <div className={twMerge(
          "flex relative w-full",
          isMobile ? 'flex-col' : ''
      )}>
        <div className={twMerge(
            "h-[480px]",
            isMobile ? 'w-full' : 'w-[50%]'
        )}>
          <div className="relative w-full h-[420px]">
            <Image sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw" priority fill
                   src={imagesAndSchemas[imageIndex]}
                   alt={String(article)} className="object-contain" />
            {
              imagesAndSchemas.length > 1 && (<>
                <PrevImage handlerAction={prevIndexHandler} />
                <NexImage handlerAction={nextIndexHandler} />
              </>)
            }
            <Image onClick={modalHandler} width={25} height={25} src={Resize} alt={'resize'}
                   className="rotate-270 absolute bottom-0 right-0 opacity-50" />
          </div>
          <div className="flex justify-center gap-[8px] px-[8px] mt-[8px]">
            {imagesAndSchemas.map((p, index) => (
              <div key={p} className={twMerge(
                'relative w-[50px] h-[40px] border border-[#e5e5e5]',
                imageIndex === index ? '' : 'opacity-30',
              )}>
                <Image sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw" fill src={p}
                       alt={`image-${index}`} className="object-contain cursor-pointer"
                       onClick={() => setImageIndex(index)} />
              </div>
            ))}
          </div>
        </div>
        <div className={twMerge(
            isMobile ? 'w-full px-[10px]' : 'w-[50%] pl-[50px]'
        )}>
          {product.name && <p className="font-bold text-[18px]">{product.name}</p>}
          {product.brand && <p className="text-[15px] mt-[25px] text-[#6F7682]">Бренд: {product.brand}</p>}
          {product.description && (
            <p className="text-[15px] mt-[10px] text-[#6F7682]"><span className="text-[16px] ">Описание: </span>
              <span className="" dangerouslySetInnerHTML={{ __html: productDescription }} />
            </p>)}
          {product.rrc && <div className={twMerge(
              'flex gap-[30px] items-center mt-[40px] flex-wrap',
              isMobile ? 'justify-center' : ''
          )}>
            <p className="text-[18px] text-accent-300 font-bold">{product.rrc.split('.')[0]}р.</p>
            <BasketButton className="w-[160px]" productCount={productCount} addProductAction={addProductHandler}
                          clearProductAction={clearProductHandler} />
            <Button variant="outline" className="text-[15px] font-medium">Купить в один клик</Button>
          </div>
          }
        </div>
      </div>

      <div className="text-[#6F7682] pt-[30px] w-full flex items-center flex-col">
        <p className="text-[16px]">Все характеристики:</p>
        {
          product.attributes && mappedAttributes(product.attributes).map((attr, index) => (
            <div key={index + attr[0]}
                 className="w-full max-w-[1000px] gap-[10px] flex justify-between relative text-[14px]">
              <span className={s.productTitle}>{attr[0]}</span>
              <span>{attr[1]}</span>
            </div>
          ))
        }
      </div>


      <Modal width="680px" centered open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}
             styles={{ mask: { backdropFilter: 'blur(3px)' } }}
      >
        <Image className="object-contain max-h-[680px]" width={680} height={680} src={imagesAndSchemas[imageIndex]}
               alt={'product photo'} />
        {
          imagesAndSchemas.length > 1 && (<>
            <PrevImage handlerAction={prevIndexHandler} />
            <NexImage handlerAction={nextIndexHandler} />
          </>)
        }
      </Modal>
    </div>
  )
}