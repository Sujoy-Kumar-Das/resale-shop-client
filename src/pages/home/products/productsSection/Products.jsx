import React from "react";
import { useQuery } from "react-query";
import Spiner from "../../../shared/spiner/Spiner";
import ProductCard from "../../../shared/productCard/ProductCard";


const Products = () => {
  let limit = 3;
  const {
    isLoading,
    refetch,
    data = [],
  } = useQuery({
    queryKey: ["products/catagorys"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/products/catagorys?view=${limit}`
      );
      const data = await res.json();
      if (data.success) {
        return data;
      }
    },
  });
  const products = data?.productsCatagory;

  const handleViewAllProducts = () => {
    limit = data?.count;

    refetch();
  };
  if (isLoading) {
    return <Spiner></Spiner>;
  }
  return (
    <section className=" my-10">
      <header className="text-center">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
          Available Brand's Collection's
        </h2>
      </header>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
      <div className=" flex justify-center mt-8">
        <button
          onClick={handleViewAllProducts}
          className={`btn btn-primary ${products?.length === data?.count && " hidden" } }`}
        >
          Show all{" "}
        </button>
      </div>
    </section>
  );
};

export default Products;
