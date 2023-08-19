import React, { useEffect, useState } from "react";

const useSeller = (email) => {
  const [isSeller, setIsSeller] = useState(false);
  const [sellerLoading, setSellerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/user/seller/${email}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
          setIsSeller(data.success);
          setSellerLoading(false);
        });
    }
  }, [email]);
  return [isSeller, sellerLoading];
};

export default useSeller;
