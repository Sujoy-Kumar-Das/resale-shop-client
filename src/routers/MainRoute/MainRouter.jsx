import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/main/Main";
import Home from "../../pages/home/home/Home";
import Error from "../../pages/shared/error/Error";
import AllProductsCatagory from "../../pages/productCatagory/AllProductsCatagory";
import AllProducts from "../../pages/allProucts/AllProducts";
import ProductDetail from "../../pages/productDetail/ProductDetail";
import Login from "../../pages/registaration/login/Login";
import LoginLayout from "../../layouts/loginLayout/LoginLayout";
import SingUp from "../../pages/registaration/singup/SingUp";
import ResetPage from "../../pages/registaration/resetPage/ResetPage";

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
      },
    ],
  },
  {
    path:'/registration',
    element:<LoginLayout></LoginLayout>,
    children:[
      {
        path:"/registration/login",
        element:<Login></Login>
      },
      {
        path:"/registration/singup",
        element:<SingUp></SingUp>
      },
      {
        path:"/registration/reset-password",
        element:<ResetPage></ResetPage>
      }
    ]
  },
  { path: "*", element: <Error></Error> },
]);
