import React from "react";
import ProductConfigTable from "../../../productDetail/ProductConfigTable";
import HardWareConfigTable from "../../../productDetail/HardWareConfigTable";
import SellerInfoTable from "../../../productDetail/SellerInfoTable";

const ViewProductModal = ({ orderedData }) => {
  return (
    <dialog id="view_detail_modal" className="modal ">
      <form method="dialog" className="modal-box w-11/12 max-w-5xlmodal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <p className=" text-center text-2xl mb-5 mt-8">
          Details About {orderedData?.BrandName} {orderedData?.model}
        </p>
        <div className=" w-3/4 mx-auto overflow-x-auto">
          <figure>
            <img
              src={orderedData?.image}
              alt={`${orderedData?.BrandName} ${orderedData?.model} image`}
              className="w-[500px] mx-auto mb-5"
            />
          </figure>

          <ProductConfigTable productDetail={orderedData}></ProductConfigTable>
          <p className=" text-center text-2xl my-3">Hardware Configaration</p>
          <HardWareConfigTable
            productDetail={orderedData}
          ></HardWareConfigTable>
          <p className=" text-center text-2xl my-3">Seller Information</p>
          <SellerInfoTable productDetail={orderedData}></SellerInfoTable>
        </div>
      </form>
    </dialog>
  );
};

export default ViewProductModal;
