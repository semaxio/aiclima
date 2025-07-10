import { createSlice } from '@reduxjs/toolkit'


export const appSlice = createSlice({
    name: 'app',
    initialState: {
      // Можно ли брать в слайсе из локал стораджа (ПРоблема с SSR) !!localStorage.getItem(AUTH_TOKEN)
      basket: {} as Record<string, { article: string, count: number }>,
      productCount: 0
    },
    selectors: {
      selectBasket: (state) => state.basket,
      selectProductCount: (state) => state.productCount,
    },
    reducers: creators => ({
      addProduct: creators.reducer<{ article: string }>((state, action) => {
        if (!state.basket[action.payload.article]) {
          state.basket[action.payload.article] = {
            article: action.payload.article,
            count: 1
          }
          state.productCount += 1
        } else {
          state.basket[action.payload.article].count += 1
          state.productCount += 1
        }
      }),
      clearProduct: creators.reducer<{ article: string }>((state, action) => {
        if (state.basket[action.payload.article]) {
          if(state.basket[action.payload.article].count === 1) {
            delete state.basket[action.payload.article]
          } else {
            state.basket[action.payload.article].count -= 1
            }
          state.productCount -= 1
        } else {
          return
        }
      }),
    }),
  },
)

export const { selectBasket, selectProductCount } = appSlice.selectors
export const { addProduct, clearProduct } = appSlice.actions