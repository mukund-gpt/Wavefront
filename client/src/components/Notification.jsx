// import React from "react";
// import { useSelector } from "react-redux";

// const Notification = ({ open, setOpen }) => {
//   const { likeNotification } = useSelector(
//     (store) => store.realTimeNotification
//   );
//   console.log(likeNotification);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const stopPropagation = (e) => {
//     e.stopPropagation();
//   };

//   return (
//     <>
//       {open && (
//         <div className="modal modal-open" onClick={handleClose}>
//           <div
//             className="bg-white h-1/2 w-10/12 sm:w-1/2 rounded-lg shadow-lg overflow-hidden"
//             onClick={stopPropagation}
//           >
//             <div className="h-full overflow-y-auto scrollbar-hide px-4 py-2">
//               {likeNotification.map((noti) => (
//                 <div
//                   key={noti.id}
//                   className="flex items-center gap-4 border-b py-2"
//                 >
//                   <img
//                     src={noti.userDetails.profilePic}
//                     alt={noti.userDetails.username}
//                     className="w-12 h-12 rounded-full object-cover"
//                   />

//                   <div className="flex flex-col">
//                     <span className="font-semibold text-gray-800">
//                       {noti.userDetails.username}
//                     </span>
//                     <span className="text-gray-600 text-sm">
//                       {noti.message}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Notification;

import React from "react";
import { useSelector } from "react-redux";

const Notification = ({ open, setOpen }) => {
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );

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
          <div
            className="bg-white h-1/2 w-10/12 sm:w-1/2 rounded-lg shadow-lg overflow-hidden"
            onClick={stopPropagation}
          >
            <div className="h-full overflow-y-auto scrollbar-hide px-4 py-2">
              {likeNotification.map((noti) => (
                <div
                  key={noti.id}
                  className="flex items-center justify-between gap-4 border-b py-2"
                >
                  {/* User profile and details */}
                  <div className="flex items-center gap-4">
                    <img
                      src={noti.userDetails.profilePic}
                      alt={noti.userDetails.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">
                        {noti.userDetails.username}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {noti.message}
                      </span>
                    </div>
                  </div>

                  {/*  Post image */}
                  {noti.post && (
                    <img
                      src={noti.post}
                      alt="Post"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
