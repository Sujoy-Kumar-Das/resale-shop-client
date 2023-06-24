import React from "react";
import { Link } from "react-router-dom";
import Ratting from "../ratting/Ratting";

const ProductCard = ({ product }) => {
  const { title, image, description, rating } = product;
  return (
    <div className="card  bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={image}
          alt={`${title} image`}
          className="rounded-xl h-52"
        />
      </figure>
      <div className="card-body items-center text-center">
        <Ratting ratting={rating} ></Ratting>
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions">
          <Link>
            <button className="btn btn-info">Show Detail</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
