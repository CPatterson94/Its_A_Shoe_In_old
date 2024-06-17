import React, { useEffect } from "react";
import { useGetProductsQuery } from "../redux/api/products";

const ProductList = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  useEffect(() => {
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products: {error.message}</div>;

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products && products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;