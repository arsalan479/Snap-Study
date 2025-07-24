import React from "react";
import { useEffect, useState } from "react";
import { axiosinstance } from "../../AxiosInstance/axios";
import { useContext } from "react";
import { FlashContext } from "../../Context/FlashCardsContext";
import toast from "react-hot-toast";
import useSocket from "../../Utils/socketio";
import HorizontalRuleTwoToneIcon from '@mui/icons-material/HorizontalRuleTwoTone';

const Notification = () => {
  const { receiveId, userfetch ,setNotificationCount,setreceiversIds} = useContext(FlashContext);
  const [notifydata, setnotifydata] = useState([]);
  const socket = useSocket()

  useEffect(() => {
    const getnotify = async () => {
      try {
        const response = await axiosinstance.get(`/api/room/getnotify`);
        if (response.status === 200) {
          setnotifydata(response.data.response);
          //forcontext
          setNotificationCount(response.data.response.length);
        }
      } catch (error) {
        console.log("Error fetching notifications:", error);
      }
    };

    getnotify();

    const intervalId = setInterval(getnotify, 2000);

    return () => clearInterval(intervalId);
  }, [receiveId, userfetch]);

  const declinerequest = async (deadlineId) => {
    try {
      const response = await toast.promise(
        axiosinstance.delete(`/api/room/decline/${deadlineId}`),
        {
          loading: "Declining Request...",
          success: "Request Declined Successfully",
        }
      );

      if (response.status === 200) {
        console.log(response.data.result.senderId);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const acceptrequest = async (acceptId) => {
    try {
      const response = await axiosinstance.get(
        `/api/room/acceptrequest/${acceptId}`
      );

      const senderstatus = response.data.response.senderId.status;

      if (senderstatus === "offline") {
        toast.error("user is offline");
      } else if (senderstatus === "online") {

        const receiveId = response.data.response.receiverId;
        socket.emit("receiverId",receiveId)
        setreceiversIds(receiveId)

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-[#2D2D2D] w-130 rounded-2xl h-120 px-2">
        <h1 className="ml-4 pt-5 font-semibold text-2xl">Notifications</h1>

        <div className="scroll h-96 overflow-auto pr-2 space-y-3 ">
          
          {notifydata.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-center text-2xl font-semibold text-gray-400">
                <p>
                  Nothing to see here <span><HorizontalRuleTwoToneIcon/></span> yet
                </p>
              </div>
            </div>
          ) : (
            notifydata.map((notify) => (
              <div
                key={notify._id}
                className="bg-black rounded-3xl w-full mt-3 p-4 "
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-start gap-3">
                    <div>
                      <img
                        src={notify.senderId.avatar}
                        className="w-12 h-12 rounded-full"
                        alt={notify.senderId.displayName}
                      />
                    </div>

                    <div>
                      <p className="font-semibold">
                        {notify.senderId.displayName}{" "}
                        <span className="font-normal">sent a request</span>
                      </p>
                      <p className="text-sm text-gray-400">
                        {" "}
                        <span>
                          <i
                            className={`${notify.senderId.status === "online" ? "text-green-500" : "text-red-500"} ri-circle-fill text-sm mr-1`}
                          ></i>
                        </span>
                        {notify.senderId.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex  gap-2">
                    <button
                      onClick={() => acceptrequest(notify._id)}
                      className="text-black cursor-pointer bg-white w-8 h-8 rounded-full text-sm"
                    >
                      <i className="ri-check-double-line"></i>
                    </button>
                    <button
                      onClick={() => declinerequest(notify._id)}
                      className="text-white cursor-pointer bg-transparet border border-white w-8 h-8 rounded-full text-sm"
                    >
                      <i className="ri-close-line"></i>
                    </button>
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
