import { RootState } from '@/lib/store'

export const selectProductCountByArticle = (article: string) => (state: RootState) =>{
  const articleIndex = state.app.basket.findIndex(el => el.article === article)
  if(articleIndex !== -1) return state.app.basket[articleIndex].count
  return 0
}
