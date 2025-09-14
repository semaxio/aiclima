import { NextResponse } from 'next/server'


export async function GET(request: Request) {
  // const requestData = await request.json()
  // const {} = requestData

  const { searchParams } = new URL(request.url)
  const article = searchParams.get('article')

  // const requestData = {
  //   // uuid: '',//	Уникальный идентификатор из 1С предприятия.
  //   article: true,//	Артикул товара
  //   name: true,//	Название товара
  //   brand: true,//	Производитель товара
  //   collection: '',//	Коллекция товара
  //   description: true,//	Описание товара
  //   // url: '',//	Ссылка товара на нашем сайте
  //   images: true,//	Фотографии товара
  //   schemas: true,//	Схемы товара
  //   // quantity: '',//	Доступный остаток
  //   // category: '',//	Категория товара
  //   price: true,//	Закупочная цена товара
  //   rrc: true,//	Рекомендуемая розничная цена
  //   // per_page: '' // лимит 100-500
  // } as const


  const externalApiUrl = new URL(`${process.env.BASE_URL}`)

  // console.log(externalResponse)
  let data
  try {
    const externalResponse = await fetch(`${externalApiUrl}/?filter_article[]=${article}&fields[]=show_all&attrs[]=show_all`, {
      credentials: 'include',
      headers: {
        'Authorization': `Bearer-Token ${process.env.API_KEY}`,
        'Content-type': 'application/json, application',
        'Accept': 'application/json',
      },
    })
    if(!externalResponse.ok) {
      return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
    data = await externalResponse.json()
  } catch (err) {
    return NextResponse.json({ error: JSON.stringify(err) }, { status: 500 })
  }

  return NextResponse.json(data)
}