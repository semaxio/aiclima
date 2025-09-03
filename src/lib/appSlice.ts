import { createSlice } from '@reduxjs/toolkit'
import { ProductCard } from '@/types/apiResponseTypes/apiResopnses'

type ProductInfo = Pick<ProductCard, 'article' | 'images' | 'brand' | 'name' | 'url' | 'schemas' | 'rrc' | 'category'>
export type BasketArray = Array<{article: string, count: number, info: ProductInfo}>

export const appSlice = createSlice({
    name: 'app',
    initialState: {
      // basket: {} as Record<string, AddProduct & { count: number }>,
      basket: [] as BasketArray,
      productCount: 0,
      isOpenBasket: false,
    },
    selectors: {
      selectBasket: (state) => state.basket,
      selectProductCount: (state) => state.productCount,
      selectIsOpenBasket: (state) => state.isOpenBasket,
    },
    reducers: creators => ({
      addProduct: creators.reducer<{article: string, info?: ProductInfo}>((state, action) => {
        const articleIndex = state.basket.findIndex(el => el.article === action.payload.article)
        if (articleIndex === -1) {
          state.basket.push({
            article: action.payload.article,
            info: action.payload.info || {} as ProductInfo,
            count: 1,
          })
          state.productCount += 1
        } else {
          state.basket[articleIndex].count += 1
          state.productCount += 1
        }
      }),
      clearProduct: creators.reducer<{ article: string }>((state, action) => {
        const articleIndex = state.basket.findIndex(el => el.article === action.payload.article)
        if (articleIndex !== -1) {
          if (state.basket[articleIndex].count === 1) {
            state.basket.splice(articleIndex, 1)
          } else {
            state.basket[articleIndex].count -= 1
          }
          state.productCount -= 1
        } else {
          return
        }
      }),
      clearArticle: creators.reducer<{article: string}>((state, action) => {
        const articleIndex = state.basket.findIndex(el => el.article === action.payload.article)
        if(articleIndex !== -1) {
          const articleCount = state.basket[articleIndex].count
          state.productCount -= articleCount
          state.basket.splice(articleIndex, 1)
        }
      }),
      clearBasket: creators.reducer((state) => {
        state.basket = []
        state.productCount = 0
      }),
      changeIsOpenBasket: creators.reducer<{ isOpen: boolean }>((state, action) => {
        state.isOpenBasket = action.payload.isOpen
      }),
    }),
  },
)

export const { selectBasket, selectProductCount, selectIsOpenBasket } = appSlice.selectors
export const { addProduct, clearProduct, changeIsOpenBasket, clearArticle, clearBasket } = appSlice.actions