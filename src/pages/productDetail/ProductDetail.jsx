import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Spiner from "../shared/spiner/Spiner";
import ProductConfigTable from "./ProductConfigTable";
import HardWareConfigTable from "./HardWareConfigTable";
import SellerInfoTable from "./SellerInfoTable";

const ProductDetail = () => {
  const params = useParams();
  const { data: productDetail = [], isLoading } = useQuery({
    queryKey: ["/products/detail"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/products/detail/${params.id}`
      );
      const data = await res.json();
      if (data.success) {
        return data.productDetail;
      } else {
        return;
      }
    },
  });
  if (isLoading) {
    return <Spiner></Spiner>;
  }
  console.log(productDetail);
  return (
    <section className=" my-5">
      <p className=" text-center text-2xl mb-5">
        Details About {productDetail?.BrandName} {productDetail.model}
      </p>
      <div className=" w-3/4 mx-auto overflow-x-auto">
        <figure>
          <img
            src={productDetail.image}
            alt={`${productDetail?.BrandName} ${productDetail.model} image`}
            className="w-[500px] mx-auto mb-5"
          />
        </figure>

        <ProductConfigTable productDetail={productDetail}></ProductConfigTable>
        <p className=" text-center text-2xl my-3">Hardware Configaration</p>
        <HardWareConfigTable
          productDetail={productDetail}
        ></HardWareConfigTable>
        <p className=" text-center text-2xl my-3">Seller Information</p>
        <SellerInfoTable productDetail={productDetail}></SellerInfoTable>
      </div>
    </section>
  );
};

export default ProductDetail;
