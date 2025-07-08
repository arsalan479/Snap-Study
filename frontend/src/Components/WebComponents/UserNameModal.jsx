import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import { axiosinstance } from '../../AxiosInstance/axios';
import toast from 'react-hot-toast';

const UserNameModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async() => {
   try {
    const response = await axiosinstance.patch('/userdetail/updateusername',{
        username
    })
    if(response.status === 200){
        console.log(response.data.message)
        toast.success(response.data.message)
    }
   } catch (error) {
    console.log(error)
   }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="text"
        style={{
          backgroundColor: "transparent",
          padding: 0,
          margin: 0,
          border: "none",
          boxShadow: "none",
          lineHeight: 1,
          color: 'white'
        }}
        className="hover:!bg-transparent active:!bg-transparent focus:!bg-transparent"
      >
        <DriveFileRenameOutlineTwoToneIcon style={{ fontSize: 20 }} />
      </Button>

      <Modal
        title="Update Username"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // we will use a custom button inside
      >
        <div className='space-y-4'>
          <input
            type="text"
            name='username'
            placeholder='Enter Your Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />

          <Button
            type="primary"
            block
            onClick={handleOk}
          >
            Save Username
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UserNameModal;
