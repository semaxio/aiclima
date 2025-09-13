'use client'

import Image from 'next/image'
import Catalog from '@/assets/mobilemenu/catalog1.svg'
import Contacts from '@/assets/mobilemenu/contact1.svg'
import Homepage from '@/assets/mobilemenu/home1.svg'
import Menu from '@/assets/mobilemenu/menu1.svg'
import Link from 'next/link'


export default function MobileBottomMenu() {

  function removePagination() {
    localStorage.removeItem('pageNumber')
  }

  return (
    <div
      className="shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)] fixed bottom-0 left-0 right-0 h-[65px] bg-white z-[1000] flex text-accent-600 text-[10px] px-[20px] items-center justify-between">
      <Link onClick={removePagination} href="/public" className="flex flex-col gap-[10px] items-center"><Image
        width={22} height={22} src={Homepage} alt={'Homepage'} />Главная</Link>
      <Link onClick={removePagination} href="/catalog" className="flex flex-col gap-[10px] items-center"><Image
        width={22} height={22} src={Catalog} alt={'Catalog'} />Каталог</Link>
      <Link onClick={removePagination} href="/public" className="flex flex-col gap-[10px] items-center"><Image
        width={22} height={22} src={Contacts} alt={'Contacts'} />Контакты</Link>
      <Link onClick={removePagination} href="/public" className="flex flex-col gap-[10px] items-center"><Image
        width={22} height={22} src={Menu} alt={'Menu'} />Меню</Link>
    </div>
  )
}