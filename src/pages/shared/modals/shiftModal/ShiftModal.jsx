import React from "react";

const ShiftModal = () => {
  return (
    <dialog id="shift_modal" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg text-info">Your order has been shifted.You will recive soon.And don't forget to share your experience</h3>
        <div className="modal-action">
          <button className="btn btn-info btn-outline">OK</button>
        </div>
      </form>
    </dialog>
  );
};

export default ShiftModal;
