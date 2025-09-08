import Image from 'next/image'
import Basket from '@/assets/basket2.svg'

type Props = {
  basketHandler: () => void
  productCount: number
}


export default function BasketIcon({basketHandler, productCount}: Props) {

  return (
    <div className={'w-[30px] h-[30px] relative'} onClick={basketHandler}>
      <Image src={Basket} alt={'basket'} width={30} height={30} />
      {productCount > 0 && <div
        onClick={() => {
        }}
        className={'text-white w-[15px] h-[15px] bg-accent-600 rounded-full flex items-center justify-center absolute right-[-8px] top-[-6px] text-[9px]'}>
        {productCount}
      </div>}
    </div>
  )
}