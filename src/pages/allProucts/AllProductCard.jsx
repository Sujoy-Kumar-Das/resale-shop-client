import React from "react";
import { Link } from "react-router-dom";

const AllProductCard = ({ product }) => {
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

        <div className="card-actions">
          <Link to={`/products/detail/${_id}`}>
            <button className="btn btn-info mt-2">Show Detail</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllProductCard;
