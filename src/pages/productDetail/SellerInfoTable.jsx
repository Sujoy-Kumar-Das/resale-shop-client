import React from "react";

const SellerInfoTable = ({ productDetail }) => {
  return (
    <table className="table">
      <tbody>
        <tr className=" hover">
          <th>Profile Picture</th>
          <td>
            {" "}
            <div className="avatar">
              <div className="mask mask-squircle w-14">
                <img
                  src={productDetail?.seller?.image}
                  alt={`${productDetail?.seller?.name} image`}
                />
              </div>
            </div>
          </td>
        </tr>
        <tr className=" hover">
          <th>Name</th>
          <td>{productDetail?.seller?.name}</td>
        </tr>
        <tr className=" hover">
          <th>Email</th>
          <td>{productDetail?.seller?.email}</td>
        </tr>
        <tr className=" hover">
          <th>Phone</th>
          <td>{productDetail?.seller?.phone}</td>
        </tr>
        <tr className=" hover">
          <th>Address</th>
          <td>{productDetail?.seller?.address}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SellerInfoTable;
