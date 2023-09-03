import { useEffect, useState } from "react";

const useSeller = (email) => {
  const [isSeller, setIsSeller] = useState(false);
  const [sellerLoading, setSellerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(
        `https://resell-shop-server-sujoy-kumar-das.vercel.app/user/seller/${email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("Access_Token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setIsSeller(data.success);
          setSellerLoading(false);
        });
    }
  }, [email]);
  return [isSeller, sellerLoading];
};

export default useSeller;
