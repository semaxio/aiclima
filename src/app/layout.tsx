import type { Metadata } from 'next'
import './globals.css'
import { StoreProvider } from '@/app/storeProvider'
import Header from '@/components/header/Header'
import { ConfigProvider } from 'antd'
import Basket from '@/components/basket/Basket'
import '@ant-design/v5-patch-for-react-19';


export const metadata: Metadata = {
  title: 'AiClima',
  description: 'AiClima',
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
    <body
      className={`px-[45px] pt-[125px]`}
    >
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
        <Basket/>
      </ConfigProvider>
    </StoreProvider>
    </body>
    </html>
  )
}
