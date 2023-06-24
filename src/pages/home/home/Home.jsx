import React from "react";
import Banner from "./banner/Banner";
import Products from "./products/productsSection/Products";
import AboutUs from "../about/AboutUs";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Products></Products>
      <AboutUs></AboutUs>
    </>
  );
};

export default Home;
