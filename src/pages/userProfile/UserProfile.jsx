import React, { useContext, useState } from "react";
import { AuthContextProvider } from "../../contexts/authContext/AuthContext";
import Spiner from "../shared/spiner/Spiner";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  // contexts
  const { user, loading } = useContext(AuthContextProvider); // auth context
  const [loader, setLoader] = useState(false);
  const [bothLoader, setBothLoader] = useState(false);
  // load user data
  const {
    data: userData = {},
    isLoading,
    refetch,
  } = useQuery([user?.email], {
    queryKey: ["/user"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/user?email=${user?.email}`
      );
      const data = await res.json();

      if (data.success) {
        return data;
      }
    },
  });
  // handle verify
  const handleVerify = async () => {
    setLoader(true);
    const res = await fetch(
      `http://localhost:5000/verify/user?email=${user?.email}`,
      { method: "PATCH" }
    );
    const data = await res.json();
    if (data.success) {
      setLoader(false);
      toast.success(data.message);
      refetch();
    } else {
      toast.error(data.message);
      setLoader(false);
    }
  };
  // handle role change as a seller
  const handeChangeRoleSeller = async () => {
    setLoader(true);
    const res = await fetch(
      `http://localhost:5000/change/role?email=${user?.email} `,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "seller" }),
      }
    );
    const data = await res.json();
    if (data.success) {
      setLoader(false);
      refetch();
      toast.success(data.message);
    } else {
      toast.error(data.message);
      setLoader(false);
      refetch();
    }
  };
  // handle role chang as a buyer
  const handleChangeRoleSeller = async () => {
    setLoader(true);
    const res = await fetch(
      `http://localhost:5000/change/role?email=${user?.email} `,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "buyer" }),
      }
    );
    const data = await res.json();
    if (data.success) {
      setLoader(false);
      refetch();
      toast.success(data.message);
    } else {
      toast.error(data.message);
      setLoader(false);
      refetch();
    }
  };
  // handle role change as both
  const handleChangeRoleBoth = async () => {
    setBothLoader(true);
    const res = await fetch(
      `http://localhost:5000/change/role?email=${user?.email} `,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "both" }),
      }
    );
    const data = await res.json();
    if (data.success) {
      setBothLoader(false);
      refetch();
      toast.success(data.message);
    } else {
      toast.error(data.message);
      setBothLoader(false);
      refetch();
    }
  };
  if (loading || isLoading) {
    return <Spiner></Spiner>;
  }
  return (
    <>
      <div className="mx-auto">
        <h1 className="text-xl lg:text-3xl text-center mb-3">
          WellCome {user?.displayName}
        </h1>
      </div>
      <figure className=" flex justify-center mt-5 ">
        <img
          src={user?.photoURL}
          alt={`${user?.photoURL} image`}
          className="rounded-xl w-40"
        />
      </figure>
      <div className="overflow-x-auto mt-5">
        <table className="table">
          <tbody>
            <tr className=" hover">
              <th></th>
              <th>Name</th>
              <td>{user?.displayName}</td>
            </tr>
            <tr className=" hover">
              <th></th>
              <th>Email</th>
              <td>{user?.email}</td>
            </tr>
            <tr className=" hover">
              <th></th>
              <th>Verify Account</th>
              <td>
                {userData?.user?.verified === true ? (
                  "Verified"
                ) : userData?.user?.verified === "requested" ? (
                  <button className=" btn btn-disabled btn-xs">Pending</button>
                ) : (
                  <button
                    onClick={handleVerify}
                    className=" btn btn-accent btn-xs"
                  >
                    {loader ? (
                      <span className=" loading loading-spinner loading-xs"></span>
                    ) : (
                      "Verify now"
                    )}
                  </button>
                )}
              </td>
            </tr>
            <tr className=" hover">
              <th></th>
              <th>Role</th>
              <td className=" uppercase">{userData?.user?.role}</td>
            </tr>
            {userData?.user?.role === "buyer" ? (
              <tr className=" hover">
                <th></th>
                <th>Apply For</th>
                <td>
                  <button
                    onClick={handeChangeRoleSeller}
                    className=" btn btn-accent btn-xs me-2"
                  >
                    {loader ? (
                      <span className=" loading loading-spinner loading-xs"></span>
                    ) : (
                      "Seller"
                    )}
                  </button>{" "}
                  <span>OR</span>
                  <button
                    onClick={handleChangeRoleBoth}
                    className=" btn btn-info btn-xs ms-2"
                  >
                    {bothLoader ? (
                      <span className=" loading loading-spinner loading-xs"></span>
                    ) : (
                      "Buyer"
                    )}
                  </button>
                </td>
              </tr>
            ) : userData?.user?.role === "seller" ? (
              <tr className=" hover">
                <th></th>
                <th>Apply For</th>
                <td>
                  <button
                    onClick={handleChangeRoleSeller}
                    className=" btn btn-accent btn-xs me-2"
                  >
                    {loader ? (
                      <span className=" loading loading-spinner loading-xs"></span>
                    ) : (
                      "Buyer"
                    )}
                  </button>
                  <span>OR</span>
                  <button
                    onClick={handleChangeRoleBoth}
                    className=" btn btn-info btn-xs ms-2"
                  >
                    {bothLoader ? (
                      <span className=" loader loading-spinner loading-xs"></span>
                    ) : (
                      "Both"
                    )}
                  </button>
                </td>
              </tr>
            ) : (
              <tr className=" hover">
                <th></th>
                <th>Apply For</th>
                <td>
                  <button className=" btn btn-xs btn-disabled">Both</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserProfile;
