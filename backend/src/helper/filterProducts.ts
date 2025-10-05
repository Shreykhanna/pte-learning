import type { Product } from "../types/types";
import QueryString from "qs";

export default function filterProducts(
  products: Product,
  q: string,
  role: string,
  showNew: boolean
) {
  let result = products;

  if (q && typeof q === "string" && q.trim() !== "") {
    result = result.filter(
      (item) =>
        item.publicName &&
        item.publicName.toLowerCase().includes(q.toLowerCase().trim())
    );
  }

  if (
    role &&
    typeof role === "string" &&
    role.trim() !== "" &&
    role !== "select"
  ) {
    result = result.filter(
      (item) => item.visibleTo && item.visibleTo.includes(role)
    );
  }

  if (showNew === true) {
    const now = new Date().getTime();
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
    result = result.filter((item) => {
      if (!item.createdAt) return false;
      const created = new Date(item.createdAt).getTime();
      return now - created <= THIRTY_DAYS;
    });
  }
  return result;
}
