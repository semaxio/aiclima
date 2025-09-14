'use client'

import Image from 'next/image'
import ErrorImage from '../../public/server-error.webp'

export default function ErrorPage({ error }: { error: Error }) {

  console.log(error)
  return (
    <div className="w-full flex flex-col items-center pt-[80px] gap-[30px] px-[25px]">
      <Image src={ErrorImage} alt={'error'} />
      <h3 className="text-[16px] font-medium text-accent-600">Сервер не достуен, повторите попытку позже...</h3>
    </div>
  )
}