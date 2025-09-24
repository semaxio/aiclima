'use client'

import './globals.css'
import { StoreProvider } from '@/app/storeProvider'
import Header from '@/components/header/Header'
import { ConfigProvider } from 'antd'
import Basket from '@/components/basket/Basket'
import '@ant-design/v5-patch-for-react-19'
import { twMerge } from 'tailwind-merge'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import MobileBottomMenu from '@/componentsMobile/mobileBottomMenu/MobileBottomMenu'
import { ReactNode } from 'react'


// export const metadata: Metadata = {
//   title: 'AiClima',
//   description: 'AiClima',
// }

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {

  const { isDesktop } = useMediaQuery()

  return (
    <html lang="en">
    <body className={twMerge(isDesktop ? 'px-[45px] pt-[125px]' : 'pt-[70px] px-[5px]')}>
    <StoreProvider>
      <ConfigProvider
        key={'antDesignProviderKey'}
        theme={{
          components: {
            Carousel: {
              dotHeight: 3,
              dotWidth: 3,
              dotGap: 1.5,
              dotActiveWidth: 3,
              dotOffset: 5
            },
            Pagination: {
              colorText	: '#63b0ff',
              fontSize: 12
            }}
        }}
      >
        <Header />
        {children}
        <Basket />
        {!isDesktop && <MobileBottomMenu />}
      </ConfigProvider>
    </StoreProvider>
    </body>
    </html>
  )
}
