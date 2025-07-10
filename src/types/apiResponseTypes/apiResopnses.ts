
export type ResponseType = {
  current_page: number
  data: ProductCard[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: null
  to: number
  total: number
  rrc: number
}

export type Stock = {
  id: number;
  name: string;
  stock: string;
}

export type ProductCard = {
  images: string[];
  article: string;
  brand: string;
  collection: string[];
  description: string;
  name: string;
  schemas: string[];
  url: string;
  stocks: Stock[];
  rrc: string
}
