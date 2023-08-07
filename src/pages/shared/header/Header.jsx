import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContextProvider } from "../../../contexts/authContext/AuthContext";
import { toast } from "react-hot-toast";
import { FaUser } from "react-icons/fa6";
import brandImage from "../../../assets/pngwing.com.png";

const Header = () => {
  // contexts
  const { user, logOut } = useContext(AuthContextProvider);
  // states
  const [isOpen, setIsOpen] = useState(false);
  // toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // handle singout
  const handleSingout = () => {
    logOut()
      .then(() => {
        toast.success("Singout successfully");
      })
      .catch((error) => console.log(error));
  };
  const menuItems = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/products/catagorys"}>Products</Link>
      </li>
    </>
  );

  return (
    <header className="navbar bg-base-100">
      <div className=" navbar-start">
        <div className="dropdown lg:hidden">
          <label
            onClick={toggleDropdown}
            tabIndex={0}
            className="btn btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          {isOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul>
          )}
        </div>
        <Link
          to={"/"}
          className="btn btn-ghost normal-case text-xl hidden lg:block"
        >
          <img src={brandImage} className=" inline w-[50px]" alt="" />
          <span className="ms-1 italic">Resale Station</span>
        </Link>
      </div>
      <Link
        to={"/"}
        className="btn btn-ghost normal-case text-xl lg:hidden text-center"
      >
        <span className="ms-1">Resale Station</span>
      </Link>
      <div className="navbar-center hidden lg:block">
        <ul className=" menu menu-horizontal px-1 ">{menuItems}</ul>
      </div>
      <div className=" navbar-end">
        <div className="dropdown dropdown-end">
          <button
            className="btn btn-ghost btn-circle avatar"
            onClick={toggleDropdown}
          >
            <div className="w-10 rounded-full">
              {user && user?.uid ? (
                <img src={user?.photoURL} alt="" />
              ) : (
                <p className=" mt-2 ms-2 text-2xl">
                  <FaUser></FaUser>
                </p>
              )}
            </div>
          </button>
          {isOpen && (
            <ul className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              {user && user?.uid ? (
                <button
                  onClick={handleSingout}
                  className=" btn btn-xs btn-info"
                >
                  Singout
                </button>
              ) : (
                <li>
                  <Link to={"/registration/singup"}>Singup</Link>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
