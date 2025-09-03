'use client'

import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { ResponseType } from '@/types/apiResponseTypes/apiResopnses'
import Card from '@/components/card/Card'
import { Pagination, Spin } from 'antd'
import { CatalogContext } from '@/lib/catalog/CatalogProvider'
import handleRemoveScrollY from '@/features/handleRemoveScrollY/handleRemoveScrollY'

const Catalog = () => {
  const storagePage = localStorage.getItem('pageNumber') && Number(localStorage.getItem('pageNumber'))
  const { catalogId } = useContext(CatalogContext)
  const [products, setProducts] = useState<ResponseType>({} as ResponseType)
  const [page, setPage] = useState(storagePage || 1)
  const [productCount, setProductCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useLayoutEffect(() => {
      const pageY = localStorage.getItem('pageY')
      if (pageY) window.scrollTo({ top: Number(pageY) })
  }, [products])

  useEffect(() => {
    setIsLoading(true)
    fetch(`/api/homepage?page=${page}&filter_category=${catalogId}`, {cache: 'force-cache'})
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setProductCount(data.total)
        // console.log(data)
      })
      .finally(() => setIsLoading(false))
  }, [catalogId, page])

  useEffect(() => {
    const pageY = localStorage.getItem('pageY')
    if(pageY && pageY === window.pageYOffset.toString()) handleRemoveScrollY()
  }, [products])

  function paginationHandler(page: number) {
    setPage(page)
    localStorage.setItem('pageNumber', page.toString())
    window.scrollTo({ top: 0 })
    handleRemoveScrollY()
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