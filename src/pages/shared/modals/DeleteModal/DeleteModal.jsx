import React from "react";

const DeleteModal = ({
  deleteHandeler,
  product,
  text,
  deleteLoader,
  closeHandeler,
}) => {
  return (
    <dialog id="delete_modal" className="modal">
      <form method="dialog" className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg text-error">{text} </h3>
        <div className="modal-action">
          <button
            onClick={() => deleteHandeler(product?._id)}
            className=" btn btn-error"
          >
            {deleteLoader ? (
              <span className=" loading loading-spinner loading-xs"></span>
            ) : (
              "Delete"
            )}
          </button>
          <button onClick={closeHandeler} className="btn btn-outline btn-info">
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default DeleteModal;
