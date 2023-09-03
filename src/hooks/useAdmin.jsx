import React, { useEffect, useState } from "react";

const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(
        `https://resell-shop-server-sujoy-kumar-das.vercel.app/user/admin/${email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("Access_Token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setIsAdmin(data.success);
          setAdminLoading(false);
        });
    }
  }, [email]);
  return [isAdmin, adminLoading];
};

export default useAdmin;
