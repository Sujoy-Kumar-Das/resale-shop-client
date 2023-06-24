import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/MainRoute/MainRouter";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient()
  return (
    <div className=" max-w-[95%] mx-auto">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
