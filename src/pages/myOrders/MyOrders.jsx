import React, { useContext, useState } from "react";
import { AuthContextProvider } from "../../contexts/authContext/AuthContext";
import Spiner from "../shared/spiner/Spiner";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import ViewProductModal from "../shared/modals/viewProductModal/ViewProductModal";
import ShiftModal from "../shared/modals/shiftModal/ShiftModal";
import DeleteModal from "../shared/modals/DeleteModal/DeleteModal";
import CheckoutModal from "../payment/CheckoutModal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_PK_Stripe);
const MyOrders = () => {
  // auth context
  const { user, loading } = useContext(AuthContextProvider);

  // states
  const [orderedData, setOrderedData] = useState(null);
  const [canceledProduct, setCanceledProduct] = useState(null);
  const [paymentProduct, setPaymentProduct] = useState(null);
  // load ordered products
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery([user?.email], {
    queryKey: ["/myOrders"],
    queryFn: async () => {
      const res = await fetch(
        `https://resell-shop-server-sujoy-kumar-das.vercel.app/myOrders?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("Access_Token")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  // view order
  const handleViewOrder = async (id) => {
    const res = await fetch(
      `https://resell-shop-server-sujoy-kumar-das.vercel.app/products/detail/${id}`
    );
    const data = await res.json();
    if (data.success) {
      setOrderedData(data.productDetail);
    }
  };

  // cancel order
  const handleCancelOrder = async (id) => {
    const res = await fetch(
      `https://resell-shop-server-sujoy-kumar-das.vercel.app/delete/order/${id}?email=${user?.email}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("Access_Token")}`,
        },
      }
    );
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
      refetch();
    } else {
      toast.error(data.message);
      refetch();
    }
  };
  // loaded data
  const { success, orders, message } = data;
  
  if (loading || isLoading) {
    return <Spiner></Spiner>;
  }
  if (!success) {
    return (
      <h1 className=" text-2xl  lg:text-4xl text-error text-center">
        {message}
      </h1>
    );
  }
  return (
    <div>
      <h1 className=" text-center text-2xl mb-5">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Brand Name</th>
              <th>Model</th>
              <th>Status</th>
              <th>Display Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>
                  {" "}
                  <img
                    src={order?.orderedProduct?.image}
                    alt={`${order?.orderedProduct?.model} image`}
                    className=" w-28"
                  />{" "}
                </td>
                <td>{order?.orderedProduct?.BrandName}</td>
                <td>{order?.orderedProduct?.model}</td>
                
                <td>
                  {order?.completed ? (
                    <button
                      onClick={() => {
                        window.shift_modal.showModal();
                      }}
                      className=" btn btn-info btn-xs ms-2 rounded px-3 py-1"
                    >
                      Shifted
                    </button>
                  ) : order?.payment === "paid" ? (
                    <button className=" btn btn-disabled btn-xs rounded px-3 py-1">
                      Paid
                    </button>
                  ) : (
                    <label
                      onClick={() => {
                        setPaymentProduct(order);
                      }}
                      htmlFor="payment_modal"
                      className=" btn btn-primary btn-xs rounded px-3 py-1"
                    >
                      Pay Now
                    </label>
                  )}
              
                </td>
                <td>
                  <button
                    onClick={() => {
                      window.view_detail_modal.showModal();
                      handleViewOrder(order?.orderedProduct?._id);
                    }}
                    className=" btn btn-primary btn-xs rounded px-3 py-1"
                  >
                    View
                  </button>
                </td>
                <td>
                  {" "}
                  {order?.payment === "paid" ? (
                    <Link to={"/products/catagorys"}>
                      <button className=" btn btn-primary btn-sm rounded px-3 py-1">
                        Shop more
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        window.delete_modal.showModal();
                        setCanceledProduct(order);
                      }}
                      className=" btn btn-error btn-outline btn-xs rounded px-3 py-1"
                    >
                      Cancel
                    </button>
                  )}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteModal
        product={canceledProduct}
        deleteHandeler={handleCancelOrder}
        text={`Are you sure ? You want to cancel ${canceledProduct?.orderedProduct?.model} order.`}
      ></DeleteModal>
      <ShiftModal></ShiftModal>
      <ViewProductModal orderedData={orderedData}></ViewProductModal>
      {paymentProduct && (
        <Elements stripe={stripePromise}>
          <CheckoutModal
            setPaymentProduct={setPaymentProduct}
            product={paymentProduct}
          ></CheckoutModal>
        </Elements>
      )}
    </div>
  );
};

export default MyOrders;
