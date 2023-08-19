import React, { useState } from "react";
import { useQuery } from "react-query";
import Spiner from "../shared/spiner/Spiner";

const AllUsers = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/all-users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/all-users`);
      const data = await res.json();
      if (data.success) {
        return data.users;
      } else {
        throw new Error(data.message);
      }
    },
  });
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
                {console.log(user)}
                <th>{i + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>
                  {user?.verified === true
                    ? "Verified"
                    : user?.verified === "requested"
                    ? "Requested"
                    : "Unverified"}
                </td>
                <td>
                  {user?.verified === true ? (
                    <button className=" btn btn-error btn-xs rounded px-3 py-1">
                      Retract verification
                    </button>
                  ) : user?.verified === "requested" ? (
                    <button className=" btn btn-primary btn-xs rounded px-3 py-1">
                      Accept
                    </button>
                  ) : (
                    <button
                      data-tip="Notify user for verification."
                      className=" btn btn-info btn-xs rounded px-3 py-1 tooltip"
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
