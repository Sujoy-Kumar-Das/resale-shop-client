import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
        <Link className="btn btn-ghost normal-case text-xl hidden lg:block">
          daisyUI
        </Link>
      </div>
      <Link className="btn btn-ghost normal-case text-xl lg:hidden text-center">
        daisyUI
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
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
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
              <li>
                <a>Logout</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
