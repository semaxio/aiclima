//
// export default function HomePage() {
//
//   return(
//     <div>HomePage</div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/card/Card'
import { ResponseType } from '@/types/apiResponseTypes/apiResopnses'


export default function Home() {
  const [products, setProducts] = useState<ResponseType>({} as ResponseType)
  useEffect(() => {
    fetch('/api/homepage?page=1&filter_category=577&filter_brand[]=SANTEK')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        console.log(data)
      })
  }, [])

  return (
    <div className={'flex flex-wrap gap-[40px] justify-center'}>
      {products.data?.length && products.data.map((item, index) => {
        // if (item.images[0] === 'https://laval.ru/upload/iblock/a4c/pr6zlh9xy17zbk7stk2n3f9d1n1idsg5.jpg') return
        return <Card key={index}
                     article={item.article}
                     brand={item.brand}
                     name={item.name}
                     url={item.url}
                     images={item.images}
                     schemas={item.schemas}
                     collection={item.collection}
                     description={item.description}
                     stocks={item.stocks}
                     rrc={item.rrc}
        />
      })}
      {/*{products.data && products.data.length === 0 && <div>Товаров нет</div>}*/}
    </div>
  )

}
