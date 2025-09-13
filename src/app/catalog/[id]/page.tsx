'use client'

import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { ResponseType } from '@/types/apiResponseTypes/apiResopnses'
import Card from '@/components/card/Card'
import { Pagination, Spin } from 'antd'
import { CatalogContext } from '@/lib/catalog/CatalogProvider'
import handleRemoveScrollY from '@/features/handleRemoveScrollY/handleRemoveScrollY'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import MobileCard from '@/componentsMobile/mobileCard/MobileCard'

const Catalog = () => {
  const storagePage = localStorage.getItem('pageNumber') && Number(localStorage.getItem('pageNumber'))
  const { catalogId } = useContext(CatalogContext)
  const [products, setProducts] = useState<ResponseType>({} as ResponseType)
  const [page, setPage] = useState(storagePage || 1)
  const [productCount, setProductCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { isDesktop } = useMediaQuery()


  useLayoutEffect(() => {
    const pageY = localStorage.getItem('pageY')
    if (pageY) window.scrollTo({ top: Number(pageY) })
  }, [products])

  useEffect(() => {
    setIsLoading(true)
    fetch(`/api/homepage?page=${page}&filter_category=${catalogId}`, { cache: 'force-cache' })
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setProductCount(data.total)
        // console.log(data)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, [catalogId, page])

  useEffect(() => {
    const pageY = localStorage.getItem('pageY')
    if (pageY && pageY === window.pageYOffset.toString()) handleRemoveScrollY()
  }, [products])

  function paginationHandler(page: number) {
    setPage(page)
    localStorage.setItem('pageNumber', page.toString())
    window.scrollTo({ top: 0 })
    handleRemoveScrollY()
  }

  if (!isDesktop) {
    if (isLoading) {
      return (
        <div className='h-[80vh]'>
          <Spin className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" size={'large'} />
        </div>
      )
    }

    return (
      <div className="pt-[10px] pb-[45px]">
        <div className="flex flex-wrap gap-[5px] justify-center">
          {products.data?.length && products.data.map(item => <MobileCard key={item.article} item={item} page={page} />)}
        </div>
        {/*{productCount && <Pagination*/}
        {productCount > 99 && <Pagination

          size="small"
          onChange={(page) => paginationHandler(page)}
          defaultCurrent={page} total={productCount}
          showSizeChanger={false} pageSize={100}
          className="h-[30px] bg-white flex justify-center items-center fixed bottom-[65px] w-[100%] left-0"
        />}
      </div>
    )
  }

  return (
    <div className="w-full">
      {
        isLoading
          ? (<div className="w-full h-[70vh] flex items-center justify-center"><Spin size={'large'} /></div>)
          : (
            <div className="px-[30px] flex flex-wrap gap-[25px] justify-center">
              {products.data?.length && products.data.map(item => <Card key={item.article} item={item} page={page} />)}
            </div>
          )
      }
      {productCount > 99 && (<div
        className="w-full h-[40px] flex justify-center items-center z-[1000] bg-white fixed bottom-0 right-0 left-0">
        <Pagination onChange={(page) => paginationHandler(page)} defaultCurrent={page} total={productCount}
                    showSizeChanger={false} pageSize={100} />
      </div>)}
    </div>
  )
}

export default Catalog