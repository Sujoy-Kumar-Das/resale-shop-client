import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import Spiner from "../shared/spiner/Spiner";

const CheckoutModal = ({ product, setPaymentProduct }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(" ");
  const [clientSecretError, setClientSecretError] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  // load client secret
  const { data: clientSecret } = useQuery(
    [product?.orderedProduct?.resale_price],
    {
      queryKey: [],
      queryFn: async () => {
        const res = await fetch("http://localhost:5000/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: product?.orderedProduct?.resale_price,
          }),
        });
        const data = await res.json();
        if (data.success) {
          return data.clientSecret;
        } else {
          setClientSecretError(data.message);
        }
      },
    }
  );
  const handleSubmit = async () => {
    event.preventDefault();
    setPaymentLoading(true);
    if (!stripe || !elements) {
      toast.error(
        "Stripe or Elements is not properly initialized. Cannot proceed with payment."
      );
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentError(error.message);
    } else {
      setPaymentError("");
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: product?.name,
              email: product?.email,
            },
          },
        });
      if (confirmError) {
        setPaymentError(confirmError.message);
        return;
      }
      const paymentInfo = {
        name: product?.name,
        email: product?.email,
        productId: product?.orderedProduct?._id,
        transactionId: paymentIntent.id,
      };
      if (paymentIntent.status === "succeeded") {
        const res = await fetch(
          `http://localhost:5000/store-payment-info/${product?._id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentInfo),
          }
        );
        const data = await res.json();
        if (data.success) {
          setPaymentLoading(false);
          toast.success(data.message);
          setPaymentProduct(null);
        } else {
          setPaymentLoading(false);
          toast.error(data.message);
        }
      }
    }
  };
  return (
    <>
      <input type="checkbox" id="payment_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="payment_modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg uppercase mt-5">
            Payment $ {product?.orderedProduct?.resale_price} for{" "}
            {product?.orderedProduct?.model}
          </h3>
          <form onSubmit={handleSubmit} className=" mt-6">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />

            {paymentError && (
              <p className=" text-error mt-4">{paymentError} </p>
            )}
            <button
              className=" btn btn-primary w-full mt-5"
              type="submit"
              disabled={!stripe || !clientSecret}
            >
              {paymentLoading ? (
                <span className=" loading loading-spinner loading-xs"></span>
              ) : (
                "Pay"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
