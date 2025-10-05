import type { Product } from "../types/types";
export default function paginateProducts(
  products: Product,
  start: number,
  end: number
) {
  return products.slice(start, end);
}
