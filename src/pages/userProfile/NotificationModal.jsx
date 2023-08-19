import React from "react";

const NotificationModal = ({ id, notification, handleClearNotification }) => {
  return (
    <dialog id="notification_modal" className="modal">
      <form method="dialog" className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg">{notification}</h3>
        <div className="modal-action">
          <button
            onClick={() => {
              handleClearNotification(id);
            }}
            className=" btn btn-accent "
          >
            clear
          </button>
          <button className="btn">Close</button>
        </div>
      </form>
    </dialog>
  );
};

export default NotificationModal;
