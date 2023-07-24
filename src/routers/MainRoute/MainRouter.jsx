import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/main/Main";
import Home from "../../pages/home/home/Home";
import Error from "../../pages/shared/error/Error";
import AllProductsCatagory from "../../pages/productCatagory/AllProductsCatagory";
import AllProducts from "../../pages/allProucts/AllProducts";
import ProductDetail from "../../pages/productDetail/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home></Home> },
      {
        path: "/products/catagorys",
        element: <AllProductsCatagory></AllProductsCatagory>,
      },
      {
        path: "/products/catagorys/allProducts/:id",
        element: <AllProducts></AllProducts>,
      },
      {
        path:"/products/detail/:id",
        element:<ProductDetail></ProductDetail>
      }
    ],
  },
  { path: "*", element: <Error></Error> },
]);
