import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import Spiner from "../shared/spiner/Spiner";
import { toast } from "react-hot-toast";
import { AuthContextProvider } from "../../contexts/authContext/AuthContext";

const AllUsers = () => {
  const { user } = useContext(AuthContextProvider);
  // load all users
  const {
    data: users,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["/all-users"],
    queryFn: async () => {
      const res = await fetch(
        `https://resell-shop-server-sujoy-kumar-das.vercel.app/all-users`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("Access_Token")}`,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        return data.users;
      } else {
        throw new Error(data.message);
      }
    },
  });
  //   handle notify
  const handleNotify = async (id) => {
    const res = await fetch(
      `https://resell-shop-server-sujoy-kumar-das.vercel.app/notify-user/${id}?email=${user?.email}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${localStorage.getItem("Access_Token")}`,
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

  //   handle accept verification
  const handleAcceptVerification = async (id) => {
    const res = await fetch(
      `https://resell-shop-server-sujoy-kumar-das.vercel.app/accept-verification/${id}?email=${user?.email}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${localStorage.getItem("Access_Token")}`,
        },
      }
    );
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
      refetch();
    } else {
      toast.error(data.message);
      refetch();
    }
  };
  // handle Decline verification request
  const handleDeclineVerification = async (id) => {
    const res = await fetch(
      `https://resell-shop-server-sujoy-kumar-das.vercel.app/decline-verification/${id}?email=${user?.email}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${localStorage.getItem("Access_Token")}`,
        },
      }
    );
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
      refetch();
    } else {
      toast.error(data.message);
      refetch();
    }
  };

  const handeRetractVerification = async (id) => {
    const res = await fetch(
      `https://resell-shop-server-sujoy-kumar-das.vercel.app/retract-verification/${id}?email=${user?.email}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${localStorage.getItem("Access_Token")}`,
        },
      }
    );
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
      refetch();
    } else {
      toast.error(data.message);
      refetch();
    }
  };
  if (isLoading) {
    return <Spiner></Spiner>;
  }
  if (error) {
    return (
      <h3 className=" text-center text-4xl text-error">{error?.message}</h3>
    );
  }
  return (
    <div>
      <h1 className=" text-center text-2xl mb-5">All Users</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Verification</th>
              <td>Action</td>
            </tr>
          </thead>

          <tbody>
            {users.map((user, i) => (
              <tr className=" hover" key={user?._id}>
               
                <th>{i + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>
                  {user?.verified === true
                    ? "Verified"
                    : user?.verified === "requested"
                    ? "Requested"
                    : user?.verified === "canceled"
                    ? "Canceled"
                    : "Unverified"}
                </td>
                <td>
                  {user?.verified === true ? (
                    <button
                      onClick={() => handeRetractVerification(user?._id)}
                      className=" btn btn-error btn-xs rounded px-3 py-1"
                    >
                      Retract verification
                    </button>
                  ) : user?.verified === "requested" ? (
                    <>
                      <button
                        onClick={() => handleAcceptVerification(user?._id)}
                        className=" btn btn-primary btn-xs rounded px-3 py-1"
                      >
                        Accept
                      </button>{" "}
                      <span>OR</span>{" "}
                      <button
                        onClick={() => handleDeclineVerification(user?._id)}
                        className=" btn btn-primary btn-xs rounded px-3 py-1"
                      >
                        Decline
                      </button>
                    </>
                  ) : user?.verified === "retract" ? (
                    <button className=" btn btn-disabled btn-xs rounded px-3 py-1 text-black">
                      Retracted
                    </button>
                  ) : (
                    <button
                      data-tip="Notify user for verification."
                      className=" btn btn-info btn-xs rounded px-3 py-1 tooltip"
                      onClick={() => handleNotify(user?._id)}
                    >
                      Notify
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
