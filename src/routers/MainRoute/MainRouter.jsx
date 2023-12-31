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
import DashboardLayout from "../../layouts/dashboardLayout/DashboardLayout";
import UserProfile from "../../pages/userProfile/UserProfile";
import MyAllProducts from "../../pages/myAllProducts/MyAllProducts";
import EditMyProduct from "../../pages/editMyProduct/EditMyProduct";
import MyOrders from "../../pages/myOrders/MyOrders";
import AllUsers from "../../pages/allUsers/AllUsers";
import UploadProduct from "../../pages/uploadProduct/UploadProduct";
import PrivetRouter from "../privetRouter/PrivetRouter";
import AdminRouter from "../adminRouter/AdminRouter";
import About from "../../pages/about/About";

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
        path: "/products/detail/:id",
        element: <ProductDetail></ProductDetail>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
    ],
  },
  {
    path: "/registration",
    element: <LoginLayout></LoginLayout>,
    children: [
      {
        path: "/registration/login",
        element: <Login></Login>,
      },
      {
        path: "/registration/singup",
        element: <SingUp></SingUp>,
      },
      {
        path: "/registration/reset-password",
        element: <ResetPage></ResetPage>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRouter>
        <DashboardLayout></DashboardLayout>
      </PrivetRouter>
    ),
    children: [
      {
        path: "/dashboard/user/profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/dashboard/myAllProducts",
        element: <MyAllProducts></MyAllProducts>,
      },
      {
        path: "/dashboard/edit/product/:id",
        element: <EditMyProduct></EditMyProduct>,
      },
      {
        path: "/dashboard/myOrders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/upload-product",
        element: <UploadProduct></UploadProduct>,
      },
      {
        path: "/dashboard/all-users",
        element: (
          <AdminRouter>
            <AllUsers></AllUsers>
          </AdminRouter>
        ),
      },
    ],
  },
  { path: "*", element: <Error></Error> },
]);
