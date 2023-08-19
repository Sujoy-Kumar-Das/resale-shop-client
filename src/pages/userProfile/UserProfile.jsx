import React, { useContext, useState } from "react";
import { AuthContextProvider } from "../../contexts/authContext/AuthContext";
import Spiner from "../shared/spiner/Spiner";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";
import { FaBell, FaRegBell } from "react-icons/fa6";
import NotificationModal from "./NotificationModal";

const UserProfile = () => {
  // contexts
  const { user, loading } = useContext(AuthContextProvider); // auth context
  const [loader, setLoader] = useState(false);
  const [verifyLoader, setverifyLoader] = useState(false);
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
    setverifyLoader(true);
    const res = await fetch(
      `http://localhost:5000/verify/user?email=${user?.email}`,
      { method: "PATCH" }
    );
    const data = await res.json();
    if (data.success) {
      setverifyLoader(false);
      toast.success(data.message);
      refetch();
    } else {
      toast.error(data.message);
      setverifyLoader(false);
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
  const handleClearNotification = async (id) => {
    const res = await fetch(
      `http://localhost:5000/clear-notification/${userData?.user?._id} `,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };
  if (loading || isLoading) {
    return <Spiner></Spiner>;
  }
  return (
    <>
      <div className="mx-auto flex ">
        <h1 className="text-xl lg:text-3xl text-center mb-3 me-5 lg:me-10 ">
          WellCome {user?.displayName}
        </h1>
        {userData?.user?.noficationVerify && (
          <p
            onClick={() => {
              window.notification_modal.showModal();
            }}
            className=" mt-1 text-center text-2xl lg:text-3xl"
          >
            {!userData?.user?.noficationVerify ? (
              <FaRegBell />
            ) : (
              <FaBell></FaBell>
            )}
          </p>
        )}
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
                  <button className=" btn btn-disabled btn-xs rounded px-3 py-1">
                    Pending
                  </button>
                ) : userData?.user?.verified === "retract" ? (
                  <button className=" btn btn-disabled btn-xs rounded px-3 py-1 text-black">
                    {" "}
                    Retracted
                  </button>
                ) : (
                  <button
                    onClick={handleVerify}
                    className=" btn btn-accent btn-xs rounded px-3 py-1"
                  >
                    {verifyLoader ? (
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
                    className=" btn btn-accent btn-xs me-2 rounded px-3 py-1"
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
                    className=" btn btn-info btn-xs ms-2 rounded px-3 py-1"
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
                    className=" btn btn-accent btn-xs me-2 rounded px-3 py-1"
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
                    className=" btn btn-info btn-xs ms-2 rounded px-3 py-1"
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
                  <button className=" btn btn-xs btn-disabled rounded px-3 py-1">
                    Both
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <NotificationModal
        notification={userData?.user?.noficationVerify}
        id={userData?.user?._id}
        handleClearNotification={handleClearNotification}
      ></NotificationModal>
    </>
  );
};

export default UserProfile;
