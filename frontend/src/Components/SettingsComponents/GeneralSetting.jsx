import React, { useContext, useState } from 'react';
import { FlashContext } from '../../Context/FlashCardsContext';
import { format, formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import { axiosinstance } from '../../AxiosInstance/axios';
import UserNameModal from '../WebComponents/UserNameModal';
import { Modal } from "antd";

const GeneralSetting = () => {
  const { userfetch } = useContext(FlashContext);
  const createDate = new Date(userfetch.createdAt)
  const [modelopen, setmodelopen] = useState(false)


    const accountdelete = async () => {
      try {
        const response = await toast.promise(
          axiosinstance.delete("/userdetail/deleteaccount"),
          {
            loading: "Account Deleting...",
            success: "Account Deleted Successfully",
          }
        );
        if (response.status === 200) {
          setTimeout(() => {
            navigate("/");
          }, 2000);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const opendeletemodel = () =>{
      setmodelopen(true)
    }

    const closedeletemodel = () =>{
      setmodelopen(false)
    }


  return (
   <div className='w-full h-full flex justify-center items-center'>
     <div className="w-full max-w-xl mx-auto bg-[#1f1f1f] text-white p-10 rounded-xl shadow-md space-y-6">
      
      {/* Avatar & Name */}
      <div className="flex items-center gap-4">
        <img
          src={userfetch.avatar}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-3 border-gray-500"
        />
        <div>
          <h1 className="text-2xl font-semibold">{userfetch.displayName} <span><UserNameModal/></span> </h1>
          <p className="text-sm text-gray-400">Joined on: {format(createDate, "dd MMMM yyyy")} (
            {formatDistanceToNow(createDate, { addSuffix: true })})</p>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-700" />

      {/* Profile Details */}
      <div className="space-y-4">
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span className="text-gray-400">Email</span>
          <span>{userfetch.email}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span className="text-gray-400">Subscription Plan</span>
          <span className="text-green-400 font-medium">{userfetch.Plans}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span className="text-gray-400">Per Day Credits</span>
          <span className="text-green-400 font-medium">{userfetch.credits}</span>
        </div>  
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span className="text-gray-400">Account</span>
            <button onClick={opendeletemodel} className='bg-red-500 cursor-pointer hover:bg-red-400 duration-300 rounded-2xl py-2 px-4'>Remove Account</button>
        </div>  
      </div>

      <Modal
        open={modelopen}
        onCancel={closedeletemodel}
        footer={null}
        closable={false}
        className="p-0 custom-modal-style"
        centered
      >
        
       <div className='text-white'>
         <h1 className='text-[19px] tracking-tight'><span><i className="ri-error-warning-line text-yellow-300"></i></span> Remove Account Permission</h1>
            <p className='text-gray-300 mt-2 tracking-tight text-[15px]'>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className='flex justify-end gap-2 mt-4'>
              <button onClick={closedeletemodel} className='bg-[#4b4b4b] text-white  px-10 py-2 rounded-full cursor-pointer'>Cancel</button>
              <button onClick={accountdelete} className='bg-white text-black px-10 py-2 rounded-full cursor-pointer'>Ok</button>
            </div>
       </div>

      </Modal>

    </div>
   </div>
  );
};

export default GeneralSetting;
