import React, { createContext, useState } from "react";

export const BuyNowContextProvider = createContext();
const BuyNowContext = ({ children }) => {
  const [bookedProduct, setbookedProduct] = useState(null);
  const [refresh,setRefresh] = useState(()=>{});
  const BuyNowContextValue = { bookedProduct, setbookedProduct,refresh,setRefresh };
  return (
    <BuyNowContextProvider.Provider value={BuyNowContextValue}>
      {children}
    </BuyNowContextProvider.Provider>
  );
};

export default BuyNowContext;
