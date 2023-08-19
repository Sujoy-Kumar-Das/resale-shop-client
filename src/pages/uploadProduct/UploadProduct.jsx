import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContextProvider } from "../../contexts/authContext/AuthContext";
import { validateImage } from "../../commonFuntions/ValidateImage";
import Spiner from "../shared/spiner/Spiner";
import uploadImage from "../../commonFuntions/UploadImage";
import { toast } from "react-hot-toast";

const UploadProduct = () => {
  const { user, loading } = useContext(AuthContextProvider);
  // states
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleUpload = async (data) => {
    setLoader(true);
    const brandName = data.BrandName;
    const productImage = data.image;
    const uploadedData = {
      catagory_Id:
        brandName === "Apple"
          ? "646da86c90217363302bd341"
          : brandName === "Acer"
          ? "646da86c90217363302bd346"
          : brandName === "ASUS"
          ? "646da86c90217363302bd345"
          : brandName === "HP"
          ? "646da86c90217363302bd343"
          : brandName === "Lenovo"
          ? "646da86c90217363302bd344"
          : brandName === "Dell"
          ? "646da86c90217363302bd342"
          : "",
      BrandName: data.BrandName,
      model: data.model,
      image: await uploadImage(productImage, errors),
      condition: data.condition,
      original_price: data.original_price,
      resale_price: data.resale_price,
      buying_year: data.buying_year,
      description: data.description,
      seller: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        image: user.photoURL,
      },
      specification: {
        Processor: data.Processor,
        RAM: data.RAM,
        Storage: data.Storage,
        Display: data.display,
        Graphics: data.Graphics,
      },
    };
    const res = await fetch("http://localhost:5000/upload-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(uploadedData),
    });
    const uploadedResult = await res.json();
    if (uploadedResult.success) {
      toast.success(uploadedResult.message);
      setLoader(false);
      reset();
    } else {
      toast.error(uploadedResult.message);
      setLoader(false);
    }
  };
  if (loading) {
    return <Spiner></Spiner>;
  }
  return (
    <div className="w-full lg:w-4/5 mx-auto ">
      <h1 className=" text-2xl text-center mb-5">Uplaod a Laptop</h1>
      <form onSubmit={handleSubmit(handleUpload)}>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">BrandName</span>
            </label>
            <select
              {...register("BrandName", {
                required: "Please Select Products BrandName",
              })}
              type="select"
              placeholder="Enter Your Products BrandName"
              className={`select select-bordered w-full  ${
                errors?.BrandName?.message && " input-error "
              }`}
            >
              <option value={""} selected disabled>
                Select Brand Name{" "}
              </option>
              <option value={"Apple"}>Apple</option>
              <option value={"ASUS"}>Asus</option>
              <option value={"Acer"}>Acer</option>
              <option value={"Dell"}>Dell</option>
              <option value={"HP"}>HP</option>
              <option value="Lenovo">Lenovo</option>
            </select>
            {errors.BrandName?.message && (
              <p className=" text-error mt-1">{errors.BrandName?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Model</span>
            </label>
            <input
              {...register("model", {
                required: "Please Enter Your Products Model Name",
              })}
              type="text"
              placeholder="Enter Your Products Model Name"
              className={`input w-full input-bordered ${
                errors?.model?.message && " input-error "
              }`}
            />
            {errors?.model && (
              <p className=" text-error mt-1">{errors?.model?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Condition</span>
            </label>
            <input
              {...register("condition", {
                required: "Please Enter How Is Your Laptop Condition",
              })}
              type="text"
              placeholder="Please Enter How Is Your Laptop Condition"
              className={`input w-full input-bordered ${
                errors?.condition?.message && " input-error "
              }`}
            />
            {errors?.condition && (
              <p className=" text-error mt-1">{errors?.condition?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Buying Year</span>
            </label>
            <input
              {...register("buying_year", {
                required: "Please Enter When Did You Buy.",
              })}
              type="text"
              placeholder="Please Enter when Did You Buy."
              className={`input w-full input-bordered ${
                errors?.buying_year?.message && " input-error "
              }`}
            />
            {errors?.buying_year && (
              <p className=" text-error mt-1">{errors?.buying_year?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Original Price</span>
            </label>
            <input
              {...register("original_price", {
                required: "Please Enter Your Laptops Original Price.",
              })}
              type="text"
              placeholder="Please Enter Your Laptops Original Price."
              className={`input w-full input-bordered ${
                errors?.original_price?.message && " input-error "
              }`}
            />
            {errors.original_price && (
              <p className=" text-error mt-1">
                {errors?.original_price?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Resale Price</span>
            </label>
            <input
              {...register("resale_price", {
                required: "Please Enter How Much Do You Want To Sell.",
              })}
              type="text"
              placeholder="Please Enter How Much Do You Want To Sell."
              className={`input w-full input-bordered ${
                errors?.resale_price?.message && " input-error "
              }`}
            />
            {errors?.resale_price && (
              <p className=" text-error mt-1">
                {errors?.resale_price?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Display</span>
            </label>
            <input
              {...register("display", {
                required: "Please Enter What Is The Size Of The Display.",
              })}
              type="text"
              placeholder="Please Enter What Is The Size Of The Display."
              className={`input w-full input-bordered ${
                errors?.display?.message && " input-error "
              }`}
            />
            {errors?.display?.message && (
              <p className=" text-error mt-1">{errors?.display?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Graphics Card</span>
            </label>
            <input
              {...register("Graphics", {
                required: "Please Enter Your Graphics Card Configaration.",
              })}
              type="text"
              placeholder="Please Enter Your Graphics Card Configaration."
              className={`input w-full input-bordered ${
                errors?.Graphics?.message && " input-error "
              }`}
            />
            {errors?.Graphics?.message && (
              <p className=" text-error mt-1">{errors?.Graphics?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Processor</span>
            </label>
            <input
              {...register("Processor", {
                required: "Please Enter What Is Your Processor.",
              })}
              type="text"
              placeholder="Please Enter What Is Your Processor."
              className={`input w-full input-bordered ${
                errors?.Processor?.message && " input-error "
              }`}
            />
            {errors?.Processor?.message && (
              <p className=" text-error mt-1">{errors?.Processor?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">RAM</span>
            </label>
            <input
              {...register("RAM", {
                required: "Please Enter Your RAM Size.",
              })}
              type="text"
              placeholder="Please Enter Your RAM Size."
              className={`input w-full input-bordered ${
                errors?.RAM?.message && " input-error "
              }`}
            />
            {errors?.RAM?.message && (
              <p className=" text-error mt-1">{errors?.RAM?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              {...register("description", {
                required:
                  "Please Enter A Description. Why you like to sell this product.",
              })}
              type="text"
              placeholder="Please Enter Your Description"
              className={`input w-full input-bordered ${
                errors?.description?.message && " input-error "
              }`}
            />
            {errors?.description?.message && (
              <p className=" text-error mt-1">{errors?.description?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Laptops Image</span>
            </label>

            <input
              {...register("image", {
                required: "Providing Image Of Your Products Is Required.",
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
              <span className="label-text">Storage</span>
            </label>
            <input
              {...register("Storage", {
                required: "Please Enter What Is Your Storage Size.",
              })}
              type="text"
              placeholder="Please Enter Your Storage."
              className={`input w-full input-bordered ${
                errors?.Storage?.message && " input-error "
              }`}
            />
            {errors?.Storage?.message && (
              <p className=" text-error mt-1">{errors?.Storage?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Profile Photo</span>
            </label>

            <input
              {...register("sellerImage", {
                required:
                  "A profile picture is useful to confirm your are logged into your account",
                validate: validateImage,
              })}
              type="file"
              className={`file-input w-full input-bordered ${
                errors?.sellerImage?.message && " input-error "
              }`}
            />
            {errors?.sellerImage && (
              <p className=" text-error mt-1">{errors?.sellerImage?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", {
                required: "Please Enter Your Name.",
              })}
              type="text"
              value={user?.displayName}
              defaultValue={user?.displayName}
              placeholder="Please Enter Your Name."
              className={`input w-full input-bordered ${
                errors?.name?.message && " input-error "
              }`}
            />
            {errors?.name?.message && (
              <p className=" text-error mt-1">{errors?.name?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              {...register("address", {
                required: "Please Enter Your Address",
              })}
              type="address"
              placeholder="Please Enter Your Address"
              className={`input w-full input-bordered ${
                errors?.address?.message && " input-error "
              }`}
            />
            {errors?.address?.message && (
              <p className=" text-error mt-1">{errors?.address?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", {
                required: "Please Enter Your Email.",
              })}
              type="email"
              placeholder="Please Enter Your Email."
              readOnly
              defaultValue={user?.email}
              value={user?.email}
              className={`input w-full input-bordered ${
                errors?.email?.message && " input-error "
              }`}
            />
            {errors?.email?.message && (
              <p className=" text-error mt-1">{errors?.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Mobile</span>
            </label>
            <input
              {...register("phone", {
                required: "Please Enter Your Mobile Number",
              })}
              type="phone"
              placeholder="Please Enter Your Mobile Number"
              className={`input w-full input-bordered ${
                errors?.phone?.message && " input-error "
              }`}
            />
            {errors?.phone?.message && (
              <p className=" text-error mt-1">{errors?.phone?.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <button className=" btn btn-accent w-80 mb-5">
            {loader ? (
              <span className=" loading loading-spinner loading-xs"></span>
            ) : (
              "Upload Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadProduct;
