import React from "react";

const UploadProduct = () => {
  return (
    <div className="w-full lg:w-4/5 mx-auto">
      <h1 className=" text-2xl text-center mb-5">Edit Laptop Detail</h1>
      <form onSubmit={handleSubmit(handleEdit)}>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">BrandName</span>
            </label>
            <input
              {...register("BrandName", {
                required: "Please Enter Your Products BrandName",
              })}
              type="text"
              placeholder="Enter Your Products BrandName"
              defaultValue={productDetail?.BrandName}
              className={`input w-full input-bordered ${
                errors?.BrandName?.message && " input-error "
              }`}
            />
            {errors?.BrandName && (
              <p className=" text-error mt-1">{errors?.BrandName?.message}</p>
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
              defaultValue={productDetail?.model}
              className={`input w-full input-bordered ${
                errors?.model?.message && " input-error "
              }`}
            />
            {errors?.model && (
              <p className=" text-error mt-1">{errors?.model?.message}</p>
            )}
          </div>
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-x-3">
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
              defaultValue={productDetail?.condition}
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
              readOnly
              placeholder="Please Enter when Did You Buy."
              defaultValue={productDetail?.buying_year}
              className={`input w-full input-bordered ${
                errors?.buying_year?.message && " input-error "
              }`}
            />
            {errors?.buying_year && (
              <p className=" text-error mt-1">{errors?.buying_year?.message}</p>
            )}
          </div>
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-x-3">
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
              defaultValue={productDetail?.original_price}
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
              defaultValue={productDetail?.resale_price}
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
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Display</span>
            </label>
            <input
              {...register("Display", {
                required: "Please Enter What Is The Size Of The Display.",
              })}
              type="text"
              placeholder="Please Enter What Is The Size Of The Display."
              defaultValue={productDetail?.specification?.Display}
              className={`input w-full input-bordered ${
                errors?.specification?.Display?.message && " input-error "
              }`}
            />
            {errors?.specification?.Display && (
              <p className=" text-error mt-1">
                {errors?.specification?.Display?.message}
              </p>
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
              defaultValue={productDetail?.specification?.Graphics}
              className={`input w-full input-bordered ${
                errors?.specification?.Graphics?.message && " input-error "
              }`}
            />
            {errors?.specification?.Graphics && (
              <p className=" text-error mt-1">
                {errors?.specification?.Graphics?.message}
              </p>
            )}
          </div>
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-x-3">
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
              defaultValue={productDetail?.specification?.Processor}
              className={`input w-full input-bordered ${
                errors?.specification?.Processor?.message && " input-error "
              }`}
            />
            {errors?.specification?.Processor && (
              <p className=" text-error mt-1">
                {errors?.specification?.Processor?.message}
              </p>
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
              defaultValue={productDetail?.specification?.RAM}
              className={`input w-full input-bordered ${
                errors?.specification?.RAM?.message && " input-error "
              }`}
            />
            {errors?.specification?.RAM && (
              <p className=" text-error mt-1">
                {errors?.specification?.RAM?.message}
              </p>
            )}
          </div>
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Storage</span>
            </label>
            <input
              {...register("Storage", {
                required: "Please Enter What Is Your Processor.",
              })}
              type="text"
              placeholder="Please Enter What Is Your Processor."
              defaultValue={productDetail?.specification?.Storage}
              className={`input w-full input-bordered ${
                errors?.specification?.Storage?.message && " input-error "
              }`}
            />
            {errors?.specification?.Storage && (
              <p className=" text-error mt-1">
                {errors?.specification?.Storage?.message}
              </p>
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
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Storage</span>
            </label>
            <input
              {...register("Storage", {
                required: "Please Enter What Is Your Processor.",
              })}
              type="text"
              placeholder="Please Enter What Is Your Processor."
              defaultValue={productDetail?.specification?.Storage}
              className={`input w-full input-bordered ${
                errors?.specification?.Storage?.message && " input-error "
              }`}
            />
            {errors?.specification?.Storage && (
              <p className=" text-error mt-1">
                {errors?.specification?.Storage?.message}
              </p>
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
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", {
                required: "Please Enter Your Name.",
              })}
              type="text"
              readOnly
              placeholder="Please Enter Your Name."
              defaultValue={productDetail?.seller?.name}
              className={`input w-full input-bordered ${
                errors?.seller?.name?.message && " input-error "
              }`}
            />
            {errors?.seller?.name && (
              <p className=" text-error mt-1">
                {errors?.seller?.name?.message}
              </p>
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
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", {
                required: "Please Enter Your Email.",
              })}
              type="email"
              readOnly
              placeholder="Please Enter Your Email."
              defaultValue={productDetail?.seller?.email}
              className={`input w-full input-bordered ${
                errors?.seller?.email?.message && " input-error "
              }`}
            />
            {errors?.seller?.email && (
              <p className=" text-error mt-1">
                {errors?.seller?.email?.message}
              </p>
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
              defaultValue={productDetail?.seller?.phone}
              className={`input w-full input-bordered ${
                errors?.seller?.phone?.message && " input-error "
              }`}
            />
            {errors?.seller?.phone && (
              <p className=" text-error mt-1">
                {errors?.seller?.phone?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button className=" btn btn-accent">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default UploadProduct;
