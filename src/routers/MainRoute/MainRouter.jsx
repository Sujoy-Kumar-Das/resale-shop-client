import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/main/Main";
import Home from "../../pages/home/home/Home";
import Error from "../../pages/shared/error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [{ path: "/", element: <Home></Home> }],
  },
  { path: "*", element: <Error></Error> },
]);
