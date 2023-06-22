import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/MainRoute/MainRouter";

const App = () => {
  return (
    <div className=" max-w-[95%] mx-auto">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
