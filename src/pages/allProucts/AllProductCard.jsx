import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BuyNowContextProvider } from "../../contexts/BuyNowContext";
import { AuthContextProvider } from "../../contexts/authContext/AuthContext";

const AllProductCard = ({ product }) => {
  // contexts
  const { user } = useContext(AuthContextProvider);
  const { setBuyingData } = useContext(BuyNowContextProvider);

  const { _id, image, model, condition, resale_price, original_price } =
    product;
  return (
    <div className="card  bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt={`${model} image`} className="rounded-xl h-52" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{model}</h2>
        <p>Condition : {condition} </p>
        <p>Original Price:${original_price}.00</p>
        <p>Resale Price :${resale_price}.00</p>

        <div className="mt-2">
          <Link className="btn btn-info  me-2" to={`/products/detail/${_id}`}>
            Show Detail
          </Link>
          <label
            onClick={() => {
              setBuyingData(product);
            }}
            htmlFor="buy_now_modal"
            className={`btn ${!user ? " btn-disabled":"btn-accent"}`}
          >
            Buy Now
          </label>
        </div>
      </div>
    </div>
  );
};

export default AllProductCard;
