import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Spiner from "../shared/spiner/Spiner";
import AllProductCard from "./AllProductCard";
import { BuyNowContextProvider } from "../../contexts/BuyNowContext";

const AllProducts = () => {
  const { setRefresh, refresh } = useContext(BuyNowContextProvider);
  const params = useParams();
  const {
    data: allProducts = [],
    isLoading,
    refetch,
  } = useQuery([params], {
    queryKey: ["/products/catagorys/allProducts"],
    queryFn: async () => {
      const res = await fetch(
        `https://resell-shop-server-sujoy-kumar-das.vercel.app/products/catagorys/allProducts/${params.id}`
      );
      const data = await res.json();
      return data;
    },
  });
  const { success, products, message } = allProducts;
  // Set refetch funtion in setRefresh funtion
  useEffect(() => {
    setRefresh(() => refetch);
  }, [refetch, setRefresh]);
  // loading
  if (isLoading) {
    return <Spiner></Spiner>;
  }
  if (!success) {
    return (
      <h1 className=" text-2xl lg:text-4xl text-center text-error mt-10">
        {message}
      </h1>
    );
  }
  return (
    <section className=" mb-10 px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
      <header className="text-center">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
          Available Product's on {products[0]?.BrandName}
        </h2>
      </header>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {products?.map((product) => (
          <AllProductCard key={product._id} product={product}></AllProductCard>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
