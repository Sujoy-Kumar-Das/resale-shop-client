import React, { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/MainRoute/MainRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import BuyNowModal from "./pages/shared/modals/buyNowModal/BuyNowModal";
import { BuyNowContextProvider } from "./contexts/BuyNowContext";

const App = () => {
  const queryClient = new QueryClient();
  const { buyingData } = useContext(BuyNowContextProvider);
  return (
    <div className=" max-w-[95%] mx-auto">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
        {buyingData && <BuyNowModal></BuyNowModal>}
      </QueryClientProvider>
    </div>
  );
};

export default App;
