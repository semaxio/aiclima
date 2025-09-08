import { AttributesList } from '@/features/mappedAttributes/mappedAttributes'

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
  category: string
}

type AttributeSingle<K extends keyof AttributesList = keyof AttributesList> = {
  code: K;
  multiple: false;
  name: string;
  value: string | number;
};

type AttributeMultiple<K extends keyof AttributesList = keyof AttributesList> = {
  code: K;
  multiple: true;
  name: string;
  value: string[] | number[];
};

export type Attributes<K extends keyof AttributesList = keyof AttributesList> = Array<AttributeSingle<K> | AttributeMultiple<K>>;

export type ArticleCard = ProductCard & { attributes?: Attributes }
