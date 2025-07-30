import React, { useContext, useState } from "react";
import { Modal } from "antd";
import { axiosinstance } from "../../AxiosInstance/axios";
import toast from "react-hot-toast";
import { FlashContext } from "../../Context/FlashCardsContext";
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
const UserNameModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const { userfetch, setuserfetch } = useContext(FlashContext);

  const handleOk = async () => {
    if (!username.trim()) {
      toast.error("Username cannot be empty.");
      return;
    }

    try {
      const response = await toast.promise(
        axiosinstance.patch("/userdetail/updateusername", { username }),
        {
          loading: "User Name Updating...",
          success: "User Name Updated Successfully",
        }
      );

      if (response.status === 200) {
        setuserfetch((prev) => ({
          ...prev,
          displayName: username,
        }));
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.errors?.[0]?.msg || "Update failed.");
    }
  };

 const showModal = () => {
    setUsername("");
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={showModal}
        className="text-white cursor-pointer hover:bg-transparent active:bg-transparent focus:bg-transparent"
      >
<DriveFileRenameOutlineTwoToneIcon titleAccessg="Edit UserName"/>
      </button>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        className="p-0 custom-modal-style"
        centered
      >
        <div className="bg-[#2d2d2d] p-1 ">
          <div className="flex justify-between">
            <label className="block text-sm text-white font-semibold mb-2">
              Username
            </label>
            <label className="block text-sm text-gray-400 font-semibold mb-2">
              At least 3 characters
            </label>
          </div>
          <input
            type="text"
            name="username"
            placeholder={userfetch?.displayName || "Enter your username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full text-white px-4 py-3 rounded-[13px] bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-white"
          />

          <div className="flex justify-between gap-2 mt-4">
            <button
              onClick={handleCancel}
              className="flex-1 py-2 rounded-full cursor-pointer bg-[#4b4b4b] text-white text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleOk}
              className="flex-1 py-2 rounded-full cursor-pointer bg-white text-black text-sm font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>


    </>
  );
};

export default UserNameModal;
