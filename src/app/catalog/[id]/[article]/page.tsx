'use client'


import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { log } from 'node:util'
import { Spin } from 'antd'

export default function Product() {
  const params = useParams()
  const { article } = params

  // const [error, setError] = useState(null)
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // setIsLoading(true)
    fetch(`/api/product?article=${article}`)
      .then(res => res.json())
      .then(data => {
        // setProducts(data)
        // setProductCount(data.total)
        if(data.data[0].article) {
          setIsLoading(false)
          setProduct(data.data[0])
        }
        console.log(data.data[0])
      })
      // .finally(() => setIsLoading(false))
      .catch(err => console.log(err))
  }, [article])


  if(isLoading || !product) return <Spin/>

  return (
    <div>{article}</div>
  )
}