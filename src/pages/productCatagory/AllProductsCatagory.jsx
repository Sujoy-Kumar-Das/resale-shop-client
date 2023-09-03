import React from "react";
import { useQuery } from "react-query";
import Spiner from "../shared/spiner/Spiner";
import ProductCard from "../shared/productCard/ProductCard";

const AllProductsCatagory = () => {
  const { isLoading, data: products = [] } = useQuery({
    queryKey: ["products/catagorys"],
    queryFn: async () => {
      const res = await fetch(
        "https://resell-shop-server-sujoy-kumar-das.vercel.app/products/catagorys"
      );
      const data = await res.json();

      if (data.success) {
        return data;
      }
    },
  });
  if (isLoading) {
    return <Spiner></Spiner>;
  }
  const productsCatagory = products?.productsCatagory;

  return (
    <section className=" mb-10 px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
      <header className="text-center">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
          Available Brand's Collection's
        </h2>
      </header>

      <div className="grid gap-4 mt-8 sm:grid-cols-1 lg:grid-cols-3">
        {productsCatagory.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </section>
  );
};

export default AllProductsCatagory;
