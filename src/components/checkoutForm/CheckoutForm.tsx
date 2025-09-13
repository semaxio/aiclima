'use client'

import { Checkbox, Form, FormProps, Input } from 'antd'
import { Button } from '@/components/button/Button'
import { useState } from 'react'
import '@ant-design/v5-patch-for-react-19'
import emailjs from 'emailjs-com'
import { BasketArray, clearBasket, selectBasket } from '@/lib/appSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { twMerge } from 'tailwind-merge'


type FieldType = {
  name: string;
  phone: string;
  accept: string;
}

type Props = {
  basketSum: number
  setIsSendingAction: (value: boolean) => void
  setIsSuccessAction: (value: boolean) => void
}


const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {

  console.log('Failed:', errorInfo)
}

const formatBasketHtml = (basket: BasketArray, basketSum: number) => {
  let html = '<ul>'
  basket.forEach(({ article, count, info }) => {
    html += `<li>
      <strong>${info.name}</strong> (${info.brand})<br/>
      <img src="${info.images[0]}" alt="товар ${article}" style="height: 80px; width: auto;" />
      <br/>
      Артикул: ${article}<br/>
      Количество: ${count}<br/>
      Цена(шт.): ${info.rrc}<br/>
      Категория: ${info.category}<br/>
      <a href="${info.url}">Ссылка на товар</a>
    </li><br/>`
  })
  html += '<hr/>'
  html += `<span>Общая сумма заказа: ${basketSum} р.</span><br/><br/><br/>`
  html += '</ul>'
  return html
}


export default function CheckoutForm({ basketSum, setIsSendingAction, setIsSuccessAction }: Props) {
  const basket = useAppSelector(selectBasket)
  const dispatch = useAppDispatch()
  const { isMobile } = useMediaQuery()

  const [isChecked, setIsChecked] = useState(false)
  const [form] = Form.useForm()
  const formatedBasket = formatBasketHtml(basket, basketSum)

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (!values.accept) return
    setIsSendingAction(true)
    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        name: values.name,
        phone: values.phone,
        html: formatedBasket,
      },
      process.env.NEXT_PUBLIC_EMAILJS_ACCOUNT_ID,
    ).then(resp => {
      console.log(resp)
      dispatch(clearBasket())
      setIsSuccessAction(true)
    })
      .catch(e => console.log(e))
      .finally(() => setIsSendingAction(false))
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: isMobile ? 1.5 : 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ phone: 7 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="middle"
      className={twMerge(isMobile ? '300px' : 'w-[450px]')}
    >
      <Form.Item<FieldType>
        label="Ваше имя :"
        name="name"
        rules={[
          { required: true, min: 3, message: 'Обязательное поле' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Номер телефона: "
        name="phone"
        rules={[
          { required: true, message: 'Обязательное поле' },
          { min: 7, message: 'Введите номер телефона' },
          { pattern: RegExp('^\\d+$'), message: 'Формат 79123456789' },
        ]}

      >
        <Input type="tel" />
      </Form.Item>

      <Form.Item<FieldType> name="accept" valuePropName="checked" label={null}>
        <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}><span
          className="text-[12px] text-gray-600">Согласен на обработку персональных данных</span></Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button
          variant="primary"
          className="font-medium text-white rounded-[5px] w-[230px]"
          onClick={() => {
          }}
          disabled={!isChecked}>
          Связаться с менеджером
        </Button>
      </Form.Item>
    </Form>
  )
}

