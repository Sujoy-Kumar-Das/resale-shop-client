import React, { useContext } from "react";
import Header from "../../pages/shared/header/Header";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { AuthContextProvider } from "../../contexts/authContext/AuthContext";
import Spiner from "../../pages/shared/spiner/Spiner";
import useSeller from "../../hooks/useSeller";

const DashboardLayout = () => {
  const { user } = useContext(AuthContextProvider);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
 
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
              <Link to={`/dashboard/myOrders`}>My Orders</Link>
            </li>
            {isAdmin || isSeller  ? (
              <>
                <li>
                  <Link to={"/dashboard/myAllProducts"}>My All Products</Link>
                </li>
                <li>
                  <Link to={"/dashboard/upload-product"}>Upload Product</Link>
                </li>
              </>
            ) : null}
            {isAdmin && (
              <li>
                <Link to={"/dashboard/all-users"}>All User</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
