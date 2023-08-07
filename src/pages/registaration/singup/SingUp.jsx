import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Social from "../social/Social";
import { Controller, useForm } from "react-hook-form";
import { AuthContextProvider } from "../../../contexts/authContext/AuthContext";
import { toast } from "react-hot-toast";
import storeUserInfo from "../../../commonFuntions/StoreUserInfo";

const SingUp = () => {
  // auth context
  const { singupWithEmailAndPass, updateUserInfo } =
    useContext(AuthContextProvider);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // states
  const [firebaseError, setFirebaseError] = useState("");
  const [accept, setAccpet] = useState(false);
  const [loading, setLoading] = useState(false);
  // validate image file type
  const validateImage = (file) => {
    const allowedExtantions = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowedExtantions.includes(file[0].type)) {
      return "File does not support. You must use .png or .jpg or jpeg";
    } else {
      return true;
    }
  };
  // validate password validation
  const validatedPassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one digit";
    }
    if (!/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(password)) {
      return "Password must contain at least one special charecter";
    }
    return true;
  };
  // handle singup
  const handleSingup = async (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const image = data.image;
    const role = data.role;
    try {
      // Create user
      setLoading(true);
      await singupWithEmailAndPass(email, password);
      // Update user profile
      await updateUserProfile(name, image, email, role);
    } catch (error) {
      setFirebaseError(error.message);
      setLoading(false);
      setAccpet(false);
    }
  };

  // upload image
  const uploadImage = async (image) => {
    const imageFile = image[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_REACT_APP_imgApi_key
      }`,
      {
        method: "POST",
        body: formData,
      }
    );
    const imageData = await res.json();
    if (imageData.success) {
      return imageData.data.display_url;
    } else {
      toast.error(`${errors?.image?.message}`);
    }
  };
  // update user
  const updateUserProfile = async (name, image, email, role) => {
    const imageURL = await uploadImage(image);
    // for update user informaion
    const userInfo = {
      displayName: name,
      photoURL: imageURL,
    };
    // for store in database
    const userData = {
      name,
      email,
      role,
    };

    updateUserInfo(userInfo)
      .then(() => {
        storeUserInfo(userData); // storedata in database
        setFirebaseError(" ");
        setLoading(false);
        setAccpet(false);
        reset();
      })
      .catch((error) => {
        setFirebaseError(error.message);
        setLoading(false);
        setAccpet(false);
      });
  };
  return (
    <div className=" w-4/5 lg:w-2/5 mx-auto pb-3">
      <p className=" text-5xl text-center my-5">Singup Now !</p>
      <form onSubmit={handleSubmit(handleSingup)}>
        <div className="border-2 p-2 rounded">
          <p>Create Account as a </p>
          <div className=" form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Buyer</span>
              <input
                type="radio"
                name="role"
                value="buyer"
                {...register("role", { required: "Please select a role" })}
                className="radio "
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">Seller</span>
              <input
                type="radio"
                name="role"
                value="seller"
                {...register("role", { required: "Please select a role" })}
                className="radio "
              />
            </label>
          </div>
        </div>
        {errors?.role && (
          <p className=" text-error mt-1">{errors?.role?.message}</p>
        )}
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            {...register("name", {
              required: "Please Enter Your Name",
            })}
            type="text"
            placeholder="Enter Your Password"
            className={`input w-full input-bordered ${
              errors?.name?.message && " input-error "
            }`}
          />
          {errors?.name && (
            <p className=" text-error mt-1">{errors?.name?.message}</p>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>

          <input
            {...register("image", {
              required:
                "A profile picture is useful to confirm your are logged into your account",
              validate: validateImage,
            })}
            type="file"
            className={`file-input w-full input-bordered ${
              errors?.image?.message && " input-error "
            }`}
          />
          {errors?.image && (
            <p className=" text-error mt-1">{errors?.image?.message}</p>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email", {
              required: "Please Enter Your Email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="Enter Your Email"
            className={`input w-full input-bordered ${
              errors?.email?.message && " input-error "
            }`}
          />
          {errors?.email && (
            <p className=" text-error mt-1">{errors?.email?.message}</p>
          )}
          {firebaseError === "Firebase: Error (auth/email-already-in-use)." && (
            <p className=" text-error mt-1">
              This email address already had an account
            </p>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register("password", {
              required: "Please Enter Your Password",
              validate: validatedPassword,
            })}
            type="password"
            placeholder="Enter Your Password"
            className={`input w-full input-bordered ${
              errors?.password?.message && " input-error "
            }`}
          />
          {errors?.password && (
            <p className=" text-error mt-1">{errors?.password?.message}</p>
          )}
        </div>
        <div className="form-control mt-2">
          <label className=" flex gap-x-1 cursor-pointer">
            <input
              type="checkbox"
              checked={accept}
              onChange={() => setAccpet(!accept)}
              className="checkbox checkbox-sm"
            />
            <p className="label-text">
              accept our <Link className=" btn-link">terms and conditions</Link>{" "}
            </p>
          </label>
        </div>
        <button
          className="w-full btn btn-accent text-white mt-5"
          disabled={!accept}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Singup"
          )}
        </button>
      </form>
      <label className="label">
        <span className="label-text">
          Already have an account? Please{" "}
          <Link to={"/registration/login"} className=" btn-link">
            Login now
          </Link>
        </span>
      </label>
      <div className="divider">OR</div>
      <Social>Singup</Social>
    </div>
  );
};

export default SingUp;
