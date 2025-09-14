'use client'

import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import ServerWorksImage from '@/../public/serverWorks.png'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import removeLocalStorage from '@/features/removeLocalStorage/removeLocalStorage'

export default function ServerWorks() {
  const { isMobile } = useMediaQuery()
  removeLocalStorage()

  return (
    <div className={twMerge(
      'flex flex-col items-center gap-[30px] pt-[120px] w-full',
      isMobile ? 'text-[16px]' : 'text-[18px]',
    )}>
      <Image src={ServerWorksImage} alt={'works'} className={twMerge(isMobile ? 'w-[60%]' : 'w-[300px]')} />
      <h3 className="text-accent-600 font-medium">Ведутся технические работы</h3>
    </div>
  )
}