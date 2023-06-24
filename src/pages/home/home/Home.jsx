import React from "react";
import Banner from "../banner/Banner";
import Products from "../products/productsSection/Products";
import AboutUs from "../about/AboutUs";
import Discount from "../discount/Discount";




const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Products></Products>
      <Discount></Discount>
      <AboutUs></AboutUs>
    </>
  );
};

export default Home;
