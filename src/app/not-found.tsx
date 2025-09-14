import Image from 'next/image'

import notFound from '@/../public/not-found.webp'
import { Button } from '@/components/button/Button'
import Link from 'next/link'

export default function NotFound() {

  return (
    <div className='w-full h-full flex flex-col items-center gap-[50px] pt-[50px]'>
      <Image src={notFound} alt={'not found'}/>
      <Button variant='primary' className='text-white text-[15px] rounded-[5px]'>
        <Link href={'/catalog'}>Перейти в каталог</Link>
      </Button>
    </div>
  )
}