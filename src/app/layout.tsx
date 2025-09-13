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


// export const metadata: Metadata = {
//   title: 'AiClima',
//   description: 'AiClima',
// }

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {

  const { isDesktop } = useMediaQuery()

  return (
    <html lang="en">
    <body className={twMerge(isDesktop ? 'px-[45px] pt-[125px]' : 'pt-[70px] px-[20px]')}>
    <StoreProvider>
      <ConfigProvider
        theme={{
          components: {
            Carousel: {
              // dotOffset: 0,
              // dotHeight: 10

            },
          },
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
