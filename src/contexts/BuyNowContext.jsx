import React, { createContext, useState } from "react";

export const BuyNowContextProvider = createContext();
const BuyNowContext = ({ children }) => {
  const [buyingData, setBuyingData] = useState(null);

  const BuyNowContextValue = { buyingData, setBuyingData };
  return (
    <BuyNowContextProvider.Provider value={BuyNowContextValue}>
      {children}
    </BuyNowContextProvider.Provider>
  );
};

export default BuyNowContext;
