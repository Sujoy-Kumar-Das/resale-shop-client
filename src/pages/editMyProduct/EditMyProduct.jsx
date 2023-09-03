import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Spiner from "../shared/spiner/Spiner";
import { useForm } from "react-hook-form";
import { validateImage } from "../../commonFuntions/ValidateImage";
import { toast } from "react-hot-toast";
import { AuthContextProvider } from "../../contexts/authContext/AuthContext";

const EditMyProduct = () => {
  const { user } = useContext(AuthContextProvider);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // params
  const { id } = useParams();
  //   states
  const [loader, setLoader] = useState(false);
  //   load porduct by id
  const {
    data: productDetail = {},
    isLoading,
    refetch,
  } = useQuery([id], {
    queryKey: ["/products/detail"],
    queryFn: async () => {
      const res = await fetch(
        `https://resell-shop-server-sujoy-kumar-das.vercel.app/products/detail/${id}`
      );
      const data = await res.json();
      if (data.success) {
        return data.productDetail;
      } else {
        return;
      }
    },
  });
  //   handle edit
  const handleEdit = async (data) => {
    setLoader(true);
    const editedData = {
      catagory_Id: productDetail.catagory_Id,
      BrandName: data.BrandName || productDetail.BrandName,
      model: data.model || productDetail.model,
      image: data.image || productDetail.image,
      condition: data.condition || productDetail.condition,
      original_price: data.original_price || productDetail.original_price,
      resale_price: data.resale_price || productDetail.resale_price,
      buying_year: data.buying_year || productDetail.buying_year,
      description: data.description || productDetail.description,
      seller: {
        name: data.name || productDetail.seller.name,
        phone: data.phone || productDetail.seller.phone,
        email: data.email || productDetail.seller.email,
        address: data.address || productDetail.seller.address,
        image: data.sellerImage || productDetail.seller.image,
      },
      specification: {
        Processor: data.Processor || productDetail.specification.Processor,
        RAM: data.RAM || productDetail.specification.RAM,
        Storage: data.Storage || productDetail.specification.Storage,
        Display: data.Display || productDetail.specification.Display,
        Graphics: data.Graphics || productDetail.specification.Graphics,
      },
    };
    const res = await fetch(
      `https://resell-shop-server-sujoy-kumar-das.vercel.app/edit?id=${id}&email=${user?.email}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("Access_Token")}`,
        },
        body: JSON.stringify(editedData),
      }
    );
    const resData = await res.json();
    if (resData.success) {
      toast.success(resData.message);
      refetch();
      reset();
      setLoader(false);
    } else {
      toast.error(resData.message);
      refetch();
      reset();
      setLoader(false);
    }
  };
  if (isLoading) {
    return <Spiner></Spiner>;
  }
  return (
    <div className="w-full lg:w-4/5 mx-auto">
      <h1 className=" text-2xl text-center mb-5">Edit Laptop Detail</h1>
      <form onSubmit={handleSubmit(handleEdit)}>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="">
            <label className="label">
              <span className="label-text">BrandName</span>
            </label>
            <input
              {...register("BrandName")}
              type="text"
              placeholder="Enter Your Products BrandName"
              defaultValue={productDetail?.BrandName}
              className={`input w-full input-bordered ${
                errors?.BrandName?.message && " input-error "
              }`}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Model</span>
            </label>
            <input
              {...register("model")}
              type="text"
              placeholder="Enter Your Products Model Name"
              defaultValue={productDetail?.model}
              className={`input w-full input-bordered ${
                errors?.model?.message && " input-error "
              }`}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Condition</span>
            </label>
            <input
              {...register("condition")}
              type="text"
              placeholder="Please Enter How Is Your Laptop Condition"
              defaultValue={productDetail?.condition}
              className={`input w-full input-bordered ${
                errors?.condition?.message && " input-error "
              }`}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Buying Year</span>
            </label>
            <input
              {...register("buying_year")}
              type="text"
              readOnly
              placeholder="Please Enter when Did You Buy."
              defaultValue={productDetail?.buying_year}
              className={`input w-full input-bordered ${
                errors?.buying_year?.message && " input-error "
              }`}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Original Price</span>
            </label>
            <input
              {...register("original_price")}
              type="text"
              placeholder="Please Enter Your Laptops Original Price."
              defaultValue={productDetail?.original_price}
              className={`input w-full input-bordered ${
                errors?.original_price?.message && " input-error "
              }`}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Resale Price</span>
            </label>
            <input
              {...register("resale_price")}
              type="text"
              placeholder="Please Enter How Much Do You Want To Sell."
              defaultValue={productDetail?.resale_price}
              className={`input w-full input-bordered ${
                errors?.resale_price?.message && " input-error "
              }`}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Display</span>
            </label>
            <input
              {...register("Display")}
              type="text"
              placeholder="Please Enter What Is The Size Of The Display."
              defaultValue={productDetail?.specification?.Display}
              className={`input w-full input-bordered ${
                errors?.specification?.Display?.message && " input-error "
              }`}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Graphics Card</span>
            </label>
            <input
              {...register("Graphics")}
              type="text"
              placeholder="Please Enter Your Graphics Card Configaration."
              defaultValue={productDetail?.specification?.Graphics}
              className={`input w-full input-bordered ${
                errors?.specification?.Graphics?.message && " input-error "
              }`}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Processor</span>
            </label>
            <input
              {...register("Processor")}
              type="text"
              placeholder="Please Enter What Is Your Processor."
              defaultValue={productDetail?.specification?.Processor}
              className={`input w-full input-bordered ${
                errors?.specification?.Processor?.message && " input-error "
              }`}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">RAM</span>
            </label>
            <input
              {...register("RAM")}
              type="text"
              placeholder="Please Enter Your RAM Size."
              defaultValue={productDetail?.specification?.RAM}
              className={`input w-full input-bordered ${
                errors?.specification?.RAM?.message && " input-error "
              }`}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Storage</span>
            </label>
            <input
              {...register("Storage")}
              type="text"
              placeholder="Please Enter What Is Your Processor."
              defaultValue={productDetail?.specification?.Storage}
              className={`input w-full input-bordered ${
                errors?.specification?.Storage?.message && " input-error "
              }`}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name")}
              type="text"
              readOnly
              placeholder="Please Enter Your Name."
              defaultValue={productDetail?.seller?.name}
              className={`input w-full input-bordered ${
                errors?.seller?.name?.message && " input-error "
              }`}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              {...register("address")}
              type="address"
              placeholder="Please Enter Your Address"
              defaultValue={productDetail?.seller?.address}
              className={`input w-full input-bordered ${
                errors?.seller?.address?.message && " input-error "
              }`}
            />
            {errors?.seller?.address && (
              <p className=" text-error mt-1">
                {errors?.seller?.address?.message}
              </p>
            )}
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email")}
              type="email"
              readOnly
              placeholder="Please Enter Your Email."
              defaultValue={productDetail?.seller?.email}
              className={`input w-full input-bordered ${
                errors?.seller?.email?.message && " input-error "
              }`}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Mobile</span>
            </label>
            <input
              {...register("phone")}
              type="phone"
              placeholder="Please Enter Your Mobile Number"
              defaultValue={productDetail?.seller?.phone}
              className={`input w-full input-bordered ${
                errors?.seller?.phone?.message && " input-error "
              }`}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("description")}
              type="text"
              placeholder="Please Enter Your Description"
              defaultValue={productDetail.description}
              className={` p-2 input w-full input-bordered ${
                errors?.description?.message && " input-error "
              }`}
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button className=" btn btn-accent">
            {loader ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMyProduct;
