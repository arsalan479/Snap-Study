import React, { useContext, useEffect, useState } from "react";
import { axiosinstance } from "../../AxiosInstance/axios";
import { Dropdown, Space } from "antd";
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

  // ✅ Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosinstance.get("/auth/userfetch");
        if (response.status === 200) {
          setuser(response.data.result);
          setuserfetch(response.data.result);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser(); // run once
    const intervalId = setInterval(fetchUser, 10000); // 🔄 every 10s (not 2s)
    return () => clearInterval(intervalId);
  }, []);

  // ✅ Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosinstance.get("/api/room/getnotify");
        if (response.status === 200) {
          setnotifylength(response.data.response.length);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 10000); // 🔄 every 10s
    return () => clearInterval(intervalId);
  }, []);

  // ✅ Logout
  const logoutuser = async () => {
    try {
      const response = await axiosinstance.get("/auth/magic/logout");
      if (response.status === 200) {
        setuser(""); // clear user state
        navigate("/"); // 🚀 direct navigate, no delay
        toast.success("Logout successful!");
      }
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  const handleSettingsClick = () => setShowSettings(true);
  const handleNotificationClick = () => setshownotify(true);

  // ✅ Dropdown menu items
  const items = [
    {
      key: "1",
      label: <span onClick={handleSettingsClick}>Settings</span>,
      icon: <i className="ri-settings-5-line"></i>,
    },
    {
      key: "2",
      label: "Help",
      icon: <i className="ri-question-line"></i>,
    },
    {
      key: "3",
      label: "Join our Discord",
      icon: <i className="ri-discord-line"></i>,
    },
    {
      key: "5",
      label: <span onClick={logoutuser}>Logout</span>,
      icon: <i className="ri-logout-circle-line"></i>,
      className: "logout-item",
    },
  ];

  return (
    <>
      {/* ✅ Fixed Navbar */}
      <header
        className={`fixed top-0 z-50 w-full right-0 h-16 flex items-center justify-end px-8 text-white transition-all duration-300`}
      >
        {user && user.credits !== undefined && (
          <>
            {/* ✅ User credits */}
            <div>
              <div className="mr-3 cursor-pointer px-3 py-2 rounded-2xl bg-[#2D2D2D]">
                <h1>
                  <span>
                    <i className="text-[#3468f5] fa-solid fa-coins"></i>
                  </span>{" "}
                  {user.credits}
                </h1>
              </div>
            </div>

            {/* ✅ Notifications */}
            <div className="relative" onClick={handleNotificationClick}>
              <div className="absolute top-0 -left-1 cursor-pointer">
                {notifylength > 0 && (
                  <div className="bg-red-500 text-white relative flex items-center justify-center rounded-full w-4 h-4 text-xs">
                    {notifylength}
                  </div>
                )}
              </div>
              <i className="ri-notification-2-line mr-5 text-2xl mb-1 text-[#fff] rounded-full cursor-pointer"></i>
            </div>
          </>
        )}

        {/* ✅ Avatar / Login */}
        <div>
          {user ? (
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              overlayClassName="custom-dropdown"
            >
              <div onClick={(e) => e.preventDefault()}>
                <Space>
                  <div className="w-8 h-8">
                    <img
                      src={user.avatar}
                      className="w-full h-full rounded-full object-cover"
                      alt="avatar"
                    />
                  </div>
                </Space>
              </div>
            </Dropdown>
          ) : (
            <button
              onClick={() => navigate("/snapstudylogin")}
              className="px-5 text-[1.7vw] py-2 rounded-full cursor-pointer bg-[#1A1818] hover:bg-[var(--hover)] duration-300 text-white"
            >
              Log in
            </button>
          )}
        </div>
      </header>

      {/* ✅ Settings Modal */}
      {showSettings && (
        <Modalrapper isOpen={showSettings} onClose={() => setShowSettings(false)}>
          <Settings />
        </Modalrapper>
      )}

      {/* ✅ Notifications Modal */}
      {shownotify && (
        <Modalrapper isOpen={shownotify} onClose={() => setshownotify(false)}>
          <Notification />
        </Modalrapper>
      )}
    </>
  );
};

export default Navbar;
