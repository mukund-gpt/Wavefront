import React from "react";

const Notification = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {open && (
        <div className="modal modal-open" onClick={handleClose}>
          <div className="bg-white h-40 w-40" onClick={stopPropagation}>
            <h1>Notification</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
