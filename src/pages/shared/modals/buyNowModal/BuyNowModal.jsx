import React, { useContext, useState } from "react";
import { AuthContextProvider } from "../../../../contexts/authContext/AuthContext";
import { BuyNowContextProvider } from "../../../../contexts/BuyNowContext";
import { toast } from "react-hot-toast";

const BuyNowModal = () => {
  // auth context
  const { user } = useContext(AuthContextProvider);
  const { bookedProduct, setbookedProduct, refresh } = useContext(
    BuyNowContextProvider
  );
  // states
  const [loading, setLoading] = useState(false);
  // handleBuyNowForm
  const handleBuyNowForm = (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const orderData = {
      name,
      email,
      phone,
      address,
      orderedProduct: bookedProduct,
    };
    fetch(
      `https://resell-shop-server-sujoy-kumar-das.vercel.app/post-order?productId=${bookedProduct?._id}&email=${user?.email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("Access_Token")}`,
        },
        body: JSON.stringify(orderData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          setLoading(false);
          setbookedProduct(null);
          refresh();
        } else {
          toast.error(data.message);
          setLoading(false);
          setbookedProduct(null);
          refresh();
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <input type="checkbox" id="buy_now_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="buy_now_modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold uppercase">
            Order for {bookedProduct?.model}
          </h3>
          <form
            onSubmit={handleBuyNowForm}
            className=" grid grid-cols-1 gap-3 my-5"
          >
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              disabled
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              disabled
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Please Enter Your Phone"
              name="phone"
              required
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Please enter your address."
              name="address"
              required
              className="input input-bordered w-full"
            />
            <button className=" btn btn-accent">
              {loading ? (
                <span className=" loading loading-spinner loading-sm"></span>
              ) : (
                "Place Order"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BuyNowModal;
