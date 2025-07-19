
import React from "react";
import { useEffect, useState } from "react";
import { axiosinstance } from "../../AxiosInstance/axios";
import { useContext } from "react";
import { FlashContext } from "../../Context/FlashCardsContext";

const Notification = () => {
  const { receiveId, userfetch } = useContext(FlashContext);
  const [notifydata, setnotifydata] = useState([]);

  useEffect(() => {
    const getnotify = async () => {
      // if (!receiverId) {
      //   console.log("No receiver ID available");
      //   return;
      // }

      try {
        const response = await axiosinstance.get(`/api/room/getnotify`);
        if (response.status === 200) {
          setnotifydata(response.data.response);
        }
      } catch (error) {
        console.log("Error fetching notifications:", error);
      }
    };

    getnotify();

    const intervalId = setInterval(getnotify, 2000);

    return () => clearInterval(intervalId);
  }, [receiveId, userfetch]);

  return (
    <div>

<div className="bg-[#2D2D2D] w-130 rounded-3xl h-120 px-2">

<h1 className="ml-4 pt-5 font-semibold text-2xl">Notifications</h1>

  <div className="scroll mt-3 h-96 overflow-auto pr-2 space-y-3 ">

{notifydata.length === 0 ? (
  <div className="text-center text-[20px]  text-gray-400 ">
    <p>No Notification Yet <span className="ml-1"><i className="ri-notification-off-fill"></i></span></p>
  </div>
) : (
  notifydata.map((notify) => (
    <div
      key={notify._id}
      className="bg-black rounded-2xl w-full mt-3 p-4 "
    >
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-3">
          <div>
            <img

            src={notify.senderId.avatar}
            className="w-12 h-12 rounded-full"
            alt="User Avatar"
          />
          </div>

          <div>
            <p className="font-semibold">
              {notify.senderId.displayName} <span className="font-normal">sent a request</span>
            </p>
            <p className="text-sm text-gray-400"> <span><i className={`${notify.senderId.status === "online" ? "text-green-500" : "text-red-500" } ri-circle-fill text-[1.1vw]`}></i></span> {notify.senderId.status}</p>
          </div>
        </div>

        <div className="flex  gap-2">
          <button className="text-black cursor-pointer bg-white w-8 h-8 rounded-full text-sm"><i className="ri-check-double-line"></i></button>
          <button className="text-white cursor-pointer bg-transparet border border-white w-8 h-8 rounded-full text-sm"><i className="ri-close-line"></i></button>
        </div>
      </div>
    </div>
  ))
)}

 </div>


</div>




    </div>
  );
};

export default Notification;
