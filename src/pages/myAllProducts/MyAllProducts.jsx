import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { AuthContextProvider } from "../../contexts/authContext/AuthContext";
import Spiner from "../shared/spiner/Spiner";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import GenericModal from "../shared/modals/DeleteModal/DeleteModal";
import DeleteModal from "../shared/modals/DeleteModal/DeleteModal";

const MyAllProducts = () => {
  // constexts
  const { user, loading } = useContext(AuthContextProvider); // auth context
  // states
  const [deletedProduct, setdeletedProduct] = useState(null);
  const [deleteLoader, setDeleteLoader] = useState(false);
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
      // console.log(data);
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
      refetch();
    } else {
      toast.error(data.message);
      refetch();
    }
  };
  // handle delete
  const handleDelete = async (id) => {
    setDeleteLoader(true);
    const res = await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
      setDeleteLoader(false);
      refetch();
    } else {
      toast.error(data.message);
      setDeleteLoader(false);
      refetch();
    }
  };

  // cancelHander
  const cancelHander = () => {
    toast.success("You cancelled the deletion.", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#000000",
      },
      iconTheme: {
        primary: "#5c6ac4",
        secondary: "#ffff",
      },
    });
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
                  {product?.orderedProduct ? (
                    <img
                      src={product?.orderedProduct?.image}
                      alt={`${product?.model} image`}
                      className=" w-28"
                    />
                  ) : (
                    <img
                      src={product?.image}
                      alt={`${product?.model} image`}
                      className=" w-28"
                    />
                  )}
                </td>
                <td>
                  {product?.orderedProduct
                    ? product?.orderedProduct?.BrandName
                    : product?.BrandName}
                </td>

                <td>
                  {product?.orderedProduct
                    ? product?.orderedProduct?.model
                    : product?.model}
                </td>
                <td>{product?.booked ? "Booked" : "Not Booked"}</td>
                <td>
                  {product?.booked ? (
                    <>
                      {product.completed ? (
                        <button className=" btn btn-disabled btn-xs rounded px-3 py-1">
                          Completed
                        </button>
                      ) : (
                        <button
                          className="  btn btn-accent btn-xs rounded px-3 py-1"
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
                        className=" btn btn-accent btn-xs rounded px-3 py-1 me-2"
                        to={`/dashboard/edit/product/${product._id}`}
                      >
                        Edit
                      </Link>
                      <span>OR</span>{" "}
                      <button
                        onClick={() => {
                          window.delete_modal.showModal();
                          setdeletedProduct(product);
                        }}
                        className=" btn btn-error btn-xs ms-2 rounded px-3 py-1"
                      >
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
      <DeleteModal
        product={deletedProduct}
        deleteHandeler={handleDelete}
        deleteLoader={deleteLoader}
        closeHandeler={cancelHander}
        text={`Are You Sure ? You want't to delete ${deletedProduct?.model}`}
      ></DeleteModal>
    </div>
  );
};

export default MyAllProducts;
