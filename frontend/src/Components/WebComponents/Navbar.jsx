import React, { useContext, useEffect, useState } from "react";
import { axiosinstance } from "../../AxiosInstance/axios";
import { SettingOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import HelpOutlineTwoToneIcon from "@mui/icons-material/HelpOutlineTwoTone";
import "remixicon/fonts/remixicon.css";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import ConfirmationNumberTwoToneIcon from "@mui/icons-material/ConfirmationNumberTwoTone";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Settings from "./Setting";
import Modalrapper from "./Modalrapper";
import { FlashContext } from "../../Context/FlashCardsContext";
import Notification from "../../UserScreensPage/UserPage/Notification";

const Navbar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();

  const [user, setuser] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [shownotify, setshownotify] = useState(false);
  const [notifylength, setnotifylength] = useState(null);
  const { setuserfetch } = useContext(FlashContext);

 useEffect(() => {
  const intervalId = setInterval(async () => {
    try {
      const response = await axiosinstance.get("/auth/userfetch");
      if (response.status === 200) {
        setuser(response.data.result);
        setuserfetch(response.data.result);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, 2000);

  return () => clearInterval(intervalId);
}, []);


  const logoutuser = async () => {
    try {
      const response = await axiosinstance.get("/auth/magic/logout");
      if (response.status === 200) {
        setuser(""); // clear user state
        setTimeout(() => {
          navigate("/");
        }, 2000);
        toast.success("Logout successful!");
      }
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleNotificationClick = () => {
    setshownotify(true);
  };

  const items = [
    {
      key: "1",
      label: <span onClick={handleSettingsClick}>Settings</span>,
      icon: <SettingOutlined />,
    },
    {
      key: "2",
      label: "Help",
      icon: <HelpOutlineTwoToneIcon />,
    },
    {
      key: "3",
      label: "Join our Discord",
      icon: <i className="ri-discord-line"></i>,
    },
    {
      key: "4",
      label: "My plan",
      icon: <ConfirmationNumberTwoToneIcon />,
      className: "plan-item",
    },
    {
      key: "5",
      label: <span onClick={logoutuser}>Logout</span>,
      icon: <LogoutTwoToneIcon />,
      className: "logout-item",
    },
  ];

  useEffect(() => {
    const notificationget = async () => {
      const response = await axiosinstance.get("/api/room/getnotify");
      if (response.status === 200) {
        setnotifylength(response.data.response.length);
      }
    };

    notificationget();

    const intervalId = setInterval(notificationget, 2000);

    return () => clearInterval(intervalId);
 
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full right-0  h-16 flex items-center justify-end px-8 text-white z-10 transition-all duration-300`}
      >


<div>
  <div className="mr-3 py-3 rounded-2xl ">
    <h1><span><i className="ri-coin-fill"></i></span> {user.credits} </h1>
  </div>
</div>

        <div className="relative" onClick={handleNotificationClick}>

          <div className="absolute top-0 -left-1 cursor-pointer">
            {notifylength > 0 && (
              <div className="bg-red-500 text-white relative flex items-center justify-center rounded-full w-4 h-4 text-xs">
                {notifylength}
              </div>
            )}
          </div>

          <i className="ri-notification-2-line mr-5 text-2xl mb-1 rounded-full cursor-pointer"></i>
       
        </div>
        

        <div className="">
          {user ? (
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              overlayClassName="custom-dropdown"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <div className="w-8 h-8">
                    <img
                      src={user.avatar}
                      className="w-full h-full rounded-full object-cover"
                      alt="avatar"
                    />
                  </div>
                </Space>
              </a>
            </Dropdown>
          ) : (
            <button
              onClick={() => navigate("/snapstudylogin")}
              className="px-5 text-[1.7vw] py-2 rounded-full cursor-pointer bg-[#1A1818] hover:bg-[var(--hover)] duration-300 text-white rounded"
            >
              Log in
            </button>
          )}
        </div>
      </header>
      {showSettings && (
        <Modalrapper
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        >
          <Settings />
        </Modalrapper>
      )}
      {shownotify && (
        <Modalrapper isOpen={shownotify} onClose={() => setshownotify(false)}>
          <Notification />
        </Modalrapper>
      )}
    </>
  );
};

export default Navbar;
