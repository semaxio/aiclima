'use client'

import ErrorImage from '@/../public/server-error.webp'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import handleRemoveScrollY from '@/features/handleRemoveScrollY/handleRemoveScrollY'
import removeLocalStorage from '@/features/removeLocalStorage/removeLocalStorage'

export default function ServerError() {
  const { isMobile } = useMediaQuery()
  handleRemoveScrollY()
  removeLocalStorage()

  return (
    <div className="w-full flex flex-col items-center pt-[80px] gap-[30px] px-[20px]">
      <Image src={ErrorImage} alt={'error'} />
      <h3 className={twMerge(
        'font-medium text-accent-600',
        isMobile ? 'text-[14px]' : 'text-[16px]',
      )}>Сервер не доступен, повторите попытку позже</h3>
    </div>
  )
}