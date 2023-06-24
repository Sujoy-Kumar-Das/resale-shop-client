import React from "react";
import { FaAdn, FaStar } from "react-icons/fa6";
const Ratting = ({ ratting }) => {
  return (
    <>
      {ratting === 5 ? (
        <div className=" flex text-yellow-500 text-xl">
          <p className=" me-1">
            <FaStar />
          </p>
          <p className=" me-1">
            <FaStar />
          </p>
          <p className=" me-1">
            <FaStar />
          </p>
          <p className=" me-1">
            <FaStar />
          </p>
          <p className=" me-1">
            <FaStar />
          </p>
        </div>
      ) : ratting === 4 ? (
        <div className=" flex text-yellow-500 text-xl">
          <p className=" me-1">
            <FaStar />
          </p>
          <p className=" me-1">
            <FaStar />
          </p>
          <p className=" me-1">
            <FaStar />
          </p>
          <p className=" me-1">
            <FaStar />
          </p>
        </div>
      ) : ratting === 3 ? (
        <div className=" flex text-yellow-500 text-xl">
          <p className=" me-1">
            <FaStar />
          </p>
          <p className=" me-1">
            <FaStar />
          </p>
          <p className=" me-1">
            <FaStar />
          </p>
        </div>
      ) : ratting === 2 ? (
        <div className=" flex text-yellow-500 text-xl">
          <p className=" me-1">
            <FaStar />
          </p>
          <p className=" me-1">
            <FaStar />
          </p>
        </div>
      ) : ratting === 1 ? (
        <div className=" flex text-yellow-500 text-xl">
          <p className=" me-1">
            <FaStar />
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Ratting;
