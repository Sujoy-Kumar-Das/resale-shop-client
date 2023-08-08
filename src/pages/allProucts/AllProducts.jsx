import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Spiner from "../shared/spiner/Spiner";
import AllProductCard from "./AllProductCard";
import { BuyNowContextProvider } from "../../contexts/BuyNowContext";

const AllProducts = () => {
  const {refresh} = useContext(BuyNowContextProvider);
  const params = useParams();
  const { data:allProducts=[], isLoading } = useQuery([refresh],{
    queryKey: ["/products/catagorys/allProducts"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/products/catagorys/allProducts/${params.id}`
      );
      const data = await res.json();
      if (data?.success) {
        return data?.products;
      } else {
        return;
      }
    },
  });
  if (isLoading) {
    return <Spiner></Spiner>;
  }
  return (
    <section className=" mb-10 px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
      <header className="text-center">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
          Available Product's on {allProducts[0]?.BrandName}
        </h2>
      </header>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {allProducts?.map((product) => (
          <AllProductCard key={product._id} product={product}></AllProductCard>
        ))}
      </div>
      
    </section>
  );
};

export default AllProducts;
