import { NextResponse } from 'next/server'


export async function GET(request: Request) {
  // const requestData = await request.json()
  // const {} = requestData

  const { searchParams } = new URL(request.url)
  // console.log(searchParams) // searchParams.get('name')
  let fieldsData = ''

  const requestData = {
    // uuid: '',//	Уникальный идентификатор из 1С предприятия.
    article: true,//	Артикул товара
    name: true,//	Название товара
    brand: true,//	Производитель товара
    // collection: '',//	Коллекция товара
    // description: true,//	Описание товара
    url: true,//	Ссылка товара на нашем сайте
    images: true,//	Фотографии товара
    schemas: true,//	Схемы товаpnpm ра
    // quantity: '',//	Доступный остаток
    category: true,//	Категория товара
    price: true,//	Закупочная цена товара
    rrc: true,//	Рекомендуемая розничная цена
    // per_page: '' // лимит 100-500
  } as const

  for (const key in requestData) {
    if (requestData[key as keyof typeof requestData]) {
      fieldsData += `&fields[]=${key.toString()}`
    }
  }

  const externalApiUrl = new URL(`${process.env.BASE_URL}/?${fieldsData}`)

  searchParams.forEach((value, key) => {
    externalApiUrl.searchParams.append(key, value)
  })

  const externalResponse = await fetch(`${externalApiUrl}`, {
    // const externalResponse = await fetch(`${process.env.BASE_URL}/?&fields[]=show_all&page=19&fields[]=rrc`, {
    credentials: 'include',
    headers: {
      'Authorization': `Bearer-Token ${process.env.API_KEY}`,
      'Content-type': 'application/json, application',
      'Accept': 'application/json',
    },
  })


  let data
  try {
    data = await externalResponse.json()

  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
  return NextResponse.json(data)
}