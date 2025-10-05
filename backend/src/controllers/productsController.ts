import data from "../../data/products.json";
import { Request, Response, NextFunction } from "express";
import filterProducts from "../helper/filterProducts";
import paginateProducts from "../helper/paginateProducts";

export const getProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { q = "", pageStart = 0, pageEnd = 10, role, showNew } = req.query;

  const start =
    typeof pageStart === "string" ? parseInt(pageStart, 10) : Number(pageStart);
  const end =
    typeof pageEnd === "string" ? parseInt(pageEnd, 10) : Number(pageEnd);
  const validEnd = isNaN(end) ? start + 10 : end;

  let products = filterProducts(
    data,
    typeof q === "string" ? q : "",
    typeof role === "string" ? role : "",
    typeof showNew === "string" && showNew === "true" ? Boolean(showNew) : false
  );
  if (products.length > 0) {
    const result = paginateProducts(products, start, validEnd);
    res.locals.items = result;
    res.json(result);
  } else {
    res.locals.items = 0;
    next({ status: 404, message: "Product not found" });
  }
};
