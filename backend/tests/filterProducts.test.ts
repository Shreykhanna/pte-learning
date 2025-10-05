import filterProducts from "../src/helper/filterProducts";
// @ts-ignore
import data from "../data/products.json";

describe("filterProducts", () => {
  test("Should filter products by search query", () => {
    const filtered = filterProducts(data, "Solace 15", "", false);
    expect(filtered[0].publicName).toBe("Solace 15");
  });

  test("Should not return the products if search query does not match", () => {
    const filtered = filterProducts(data, "NonExistentProduct", "", false);
    expect(filtered.length).toBe(0);
  });
});
