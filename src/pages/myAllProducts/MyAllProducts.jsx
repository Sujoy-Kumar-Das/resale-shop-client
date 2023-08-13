import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { AuthContextProvider } from "../../contexts/authContext/AuthContext";
import Spiner from "../shared/spiner/Spiner";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const MyAllProducts = () => {
  // constexts
  const { user, loading } = useContext(AuthContextProvider); // auth context
  // load user data
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery([user?.email], {
    queryKey: ["/myProducts"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/myProducts?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  const { success, message, products } = data;
  //   handle order complete
  const handleOrderComplete = async (id) => {
    const res = await fetch(`http://localhost:5000/completeOrder?id=${id}`, {
      method: "PATCH",
    });
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };
  if (isLoading || loading) {
    return <Spiner></Spiner>;
  }
  if (!success) {
    return (
      <div className=" text-center text-2xl text-error">
        <h1>{message}</h1>
      </div>
    );
  }
  return (
    <div>
      <h1 className=" text-center text-2xl mb-2">My All Products</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, i) => (
              <tr key={i} className=" hover">
                <th>{i + 1}</th>
                <td>
                  {" "}
                  <img
                    src={product?.image}
                    alt={`${product?.model} image`}
                    className=" w-28"
                  />{" "}
                </td>
                <td>{product?.BrandName}</td>
                <td>{product?.model}</td>
                <td>{product?.booked ? "Booked" : "Not Booked"}</td>
                <td>
                  {product?.booked ? (
                    <>
                      {product.completed ? (
                        <button className=" btn btn-disabled btn-xs">
                          Completed
                        </button>
                      ) : (
                        <button
                          className="  btn btn-accent btn-xs"
                          onClick={() => {
                            handleOrderComplete(product?._id);
                          }}
                        >
                          complete
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <Link
                        className=" btn btn-accent btn-xs me-2"
                        to={`/dashboard/edit/product/${product._id}`}
                      >
                        Edit
                      </Link>
                      <span>OR</span>{" "}
                      <button className=" btn btn-error btn-xs ms-2">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAllProducts;
