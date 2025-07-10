import { RootState } from '@/lib/store'

export const selectProductCountByArticle = (article: string) => (state: RootState) =>
  state.app.basket[article]?.count ?? 0