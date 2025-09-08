'use client'

import Sink from '@/assets/rakovini.png'
import Toilet from '@/assets/unitasibide.png'
import Faucet from '@/assets/smesiteli.png'
import Installations from '@/assets/sistemiinstalyacii.png'
import Bath from '@/assets/vanni.png'
import BathFurniture from '@/assets/mebeldlyavanni.png'
import BathCabine from '@/assets/dusheviekabiniiograzhdenia.png'
import BathAccesuares from '@/assets/aksessuaridlyavannoy.png'

import filterCategory from '@/notes/filterCategory'
import Image from 'next/image'
import { Typography } from '@/components/typography/Typography'
import Link from 'next/link'
import handleRemoveScrollY from '@/features/handleRemoveScrollY/handleRemoveScrollY'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const popularCategories = [
  {
    title: filterCategory[386],
    imageUrl: Sink,
    category: 386,
  },
  {
    title: filterCategory[391],
    imageUrl: Toilet,
    category: 391,
  },
  {
    title: filterCategory[390],
    imageUrl: Faucet,
    category: 390,
  }, {
    title: filterCategory[577],
    imageUrl: Installations,
    category: 577,
  },
  {
    title: filterCategory[377],
    imageUrl: Bath,
    category: 377,
  }, {
    title: filterCategory[384],
    imageUrl: BathFurniture,
    category: 384,
  },
  {
    title: filterCategory[379],
    imageUrl: BathCabine,
    category: 379,
  }, {
    title: filterCategory[375],
    imageUrl: BathAccesuares,
    category: 375,
  },
]

const Catalog = () => {

  const { isDesktop } = useMediaQuery()

  if (!isDesktop) {
    return (
      <div className='flex gap-[8px] flex-col pt-[15px] pb-[25px]'>
        {
          Object.entries(filterCategory).map(c => (
            <Link href={`/catalog/${c[0]}`}
              key={`category-${c[0]}`}
              className="w-[100%] text-gray-500 text-[14px] font-medium border border-gray-200 rounded-[9px] py-[5px] px-[8px]"
            >
              {c[1]}
            </Link>),
          )}
      </div>
    )
  }


  return (
    <div className="w-full text-center">
      <Typography variant="menu_item" className="">Популярные категории</Typography>
      <div className="w-full flex flex-wrap gap-[20px] justify-center mt-[15px]" onClick={() => handleRemoveScrollY()}>{
        popularCategories.map(c => (
          <Link key={c.title} href={`/catalog/${c.category}`}>
            <div
              className="gap-[20px] w-[270px] h-[240px] bg-[#F1F2F6] rounded-[5px] flex flex-col items-center justify-center hover:shadow-[5px_5px_10px_rgba(0,0,0,0.3)] transition-shadow duration-300">
              <Image src={c.imageUrl} alt={c.title} height={100} />
              <Typography variant="regular_text_14" className="text-[#4798DE] font-medium">{c.title}</Typography>
            </div>
          </Link>
        ))
      }</div>
    </div>
  )
}

export default Catalog