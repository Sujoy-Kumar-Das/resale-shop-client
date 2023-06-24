import React from "react";
import discountImage from "../../../assets/dicountImg.jpg";
const Discount = () => {
  return (
    <section className=" w-full lg:w-4/5 mx-auto mb-10">
      <h3 className=" text-center text-3xl font-bold mb-5">
        Special Discount Offer
      </h3>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={discountImage}
            className=" mx-auto me-10 w-full  lg:w-[400px] rounded-lg "
          />

          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mt-4 lg:mt-0">
              Get 20% Off Today!
            </h1>
            <button className="btn btn-primary mt-6">Get Started</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discount;
