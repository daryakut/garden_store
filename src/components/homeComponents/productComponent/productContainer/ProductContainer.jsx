import React from "react";
import s from "./ProductContainer.module.css";
import ProductsItem from "../productsItem/ProductsItem";
import { useFetchAllProductsQuery } from "../../../../store/slices/apiSlice";

const ProductContainer = () => {
  const { data: products, isLoading, error } = useFetchAllProductsQuery();

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  const discountedProducts = products?.filter(
    (product) => product.discont_price !== null
  );

  let randomDiscountedProducts = [];

  //логика выбора 4 рандомных товаров со скидкой
  while (randomDiscountedProducts.length < 4) {
    const randomIndex = Math.floor(Math.random() * discountedProducts.length);
    const randomProduct = discountedProducts[randomIndex];
    // Проверяем, содержит ли массив уже этот продукт
    if (!randomDiscountedProducts.includes(randomProduct)) {
      randomDiscountedProducts.push(randomProduct);
    }
  }


  return (
    <div className={s.products_container}>
      {randomDiscountedProducts?.map((product) => (
        <ProductsItem key={product.id} el={product} />
      ))}
    </div>
  );
};

export default ProductContainer;
