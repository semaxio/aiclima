'use client'

import { useContext, useEffect, useState } from 'react'
import { ResponseType } from '@/types/apiResponseTypes/apiResopnses'
import Card from '@/components/card/Card'
import { Pagination, Spin } from 'antd'
import { CatalogContext } from '@/lib/catalog/CatalogProvider'

const Catalog = () => {
  const { catalogId } = useContext(CatalogContext)
  const [products, setProducts] = useState<ResponseType>({} as ResponseType)
  const [page, setPage] = useState(1)
  const [productCount, setProductCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(`/api/homepage?page=${page}&filter_category=${catalogId}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setProductCount(data.total)
      })
      .finally(() => setIsLoading(false))
  }, [catalogId, page])

  function paginationHandler(page: number) {
    setPage(page)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="w-full py-[45px] pl-[280px]">
      {
        isLoading
          ? (<div className="w-full h-[70vh] flex items-center justify-center"><Spin size={'large'} /></div>)
          : (
            <div className="px-[30px] flex flex-wrap gap-[25px] justify-center">
              {products.data?.length && products.data.map(item => <Card key={item.article} item={item} />)}
            </div>
          )
      }
      {productCount > 99 && (<div
        className="w-full h-[60px] flex justify-center items-center z-[1000] bg-white fixed bottom-0 right-0 left-0">
        <Pagination onChange={(page) => paginationHandler(page)} defaultCurrent={page} total={productCount}
                    showSizeChanger={false} pageSize={100} />
      </div>)}
    </div>
  )
}

export default Catalog