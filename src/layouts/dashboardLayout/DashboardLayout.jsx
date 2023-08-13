import React from "react";
import Header from "../../pages/shared/header/Header";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <Header></Header>
      <div className="drawer lg:drawer-open lg:mt-20">
        <input id="dashboar-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ms-10">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side ">
          <label htmlFor="dashboar-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content ">
            <li>
              <Link to={"/dashboard/user/profile"}>My Profile</Link>
            </li>
            <li>
              <Link to={"/dashboard/myAllProducts"}>My All Products</Link>
            </li>
            <li>
              <Link to={"/dashboard/myAllProducts"}>My Orders</Link>
            </li>
            <li>
              <Link to={"/dashboard/myAllProducts"}>Upload Product</Link>
            </li>
            <li>
              <Link to={"/dashboard/myAllProducts"}>All User</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
