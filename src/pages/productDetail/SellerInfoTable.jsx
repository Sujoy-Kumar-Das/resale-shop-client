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
        <tr className=" hover">
          <th>Verified</th>
          <td>
            {productDetail?.seller?.verified ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default SellerInfoTable;
