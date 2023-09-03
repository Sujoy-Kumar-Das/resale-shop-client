import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Social from "../social/Social";
import { AuthContextProvider } from "../../../contexts/authContext/AuthContext";
import { toast } from "react-hot-toast";
import getJwtToken from "../../../commonFuntions/getJwt";

const Login = () => {
  // auth context
  const { loginWithEmailAndPass } = useContext(AuthContextProvider);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // states
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState(" ");
  // hooks
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  // handle login
  const handleLogin = (data) => {
    setLoading(true);
    const email = data.email;
    const password = data.password;
    // login user
    loginWithEmailAndPass(email, password)
      .then((result) => {
        const user = result.user;
        toast.success(`${user?.displayName} Logged in succesfully`);
        reset();
        setLoading(false);
        getJwtToken(email);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setFirebaseError(error.message);
        setLoading(false);
      });
  };
  return (
    <div className=" w-4/5 lg:w-2/5 mx-auto">
      <p className=" text-5xl text-center my-5">Login Now !</p>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email", { required: "Please enter your email" })}
            type="email"
            placeholder="Email"
            className="input input-bordered w-full "
          />
          {errors.email && (
            <p className=" text-error">{errors.email?.message}</p>
          )}
          {firebaseError && (
            <p className=" mt-1 text-error">
              {firebaseError === "Firebase: Error (auth/user-not-found)." &&
                "Invalid email address.This email address had no account."}
            </p>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register("password", {
              required: "Please enter your password",
            })}
            type="password"
            placeholder="Password"
            className="input input-bordered w-full "
          />
          {errors.password && (
            <p className=" text-error">{errors.password?.message}</p>
          )}
          {firebaseError && (
            <p className=" text-error mt-1">
              {firebaseError === "Firebase: Error (auth/wrong-password)." &&
                "Wrong password"}
            </p>
          )}
        </div>
        <button className="w-full btn btn-accent text-white mt-3">
          {loading ? (
            <span className=" loading loading-spinner loading-sm"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <label className="label">
        <span className="label-text">
          Forgot Password ? want to{" "}
          <Link to={"/registration/reset-password"} className=" btn-link">
            reset now
          </Link>
        </span>
      </label>
      <label className="label">
        <span className="label-text">
          New to Doctors Portal?{" "}
          <Link to={"/registration/singup"} className=" btn-link">
            Create new account
          </Link>
        </span>
      </label>
      <div className="divider">OR</div>
      <Social>Login</Social>
    </div>
  );
};

export default Login;
