import React from "react";

const ProductConfigTable = ({ productDetail }) => {
  return (
    <table className="table">
      <tbody>
        <tr className=" hover">
          <th>Brand</th>
          <td>{productDetail?.BrandName}</td>
        </tr>
        <tr className=" hover">
          <th>Model</th>
          <td>{productDetail?.model}</td>
        </tr>
        <tr className=" hover">
          <th>Condition</th>
          <td>{productDetail?.condition}</td>
        </tr>
        <tr className=" hover">
          <th>Original Price</th>
          <td>${productDetail?.original_price}.00</td>
        </tr>
        <tr className=" hover">
          <th>Resale Price</th>
          <td>${productDetail?.resale_price}.00</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProductConfigTable;
