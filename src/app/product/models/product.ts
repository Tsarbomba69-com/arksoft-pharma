import {Category} from "@product/models";

export interface Product {
  id?: number,
  name: string,
  cateogryName?: string,
  category: Category,
  price: number,
  description: string,
  image: string
}
