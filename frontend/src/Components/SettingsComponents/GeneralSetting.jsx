import React, { useContext } from 'react';
import { FlashContext } from '../../Context/FlashCardsContext';
import { format, formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import { axiosinstance } from '../../AxiosInstance/axios';

const GeneralSetting = () => {
  const { userfetch } = useContext(FlashContext);
  const createDate = new Date(userfetch.createdAt)


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
  


  return (
    <div className="w-full max-w-xl mx-auto bg-[#1f1f1f] text-white p-6 rounded-xl shadow-md space-y-6">
      
      {/* Avatar & Name */}
      <div className="flex items-center gap-4">
        <img
          src={userfetch.avatar}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-3 border-gray-500"
        />
        <div>
          <h1 className="text-2xl font-semibold">{userfetch.displayName} <span><i className="ri-pencil-fill text-[18px]"></i></span> </h1>
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
            <button onClick={accountdelete} className='bg-red-500 cursor-pointer hover:bg-red-400 duration-300 rounded-2xl py-2 px-4'>Remove Account</button>
        </div>  
      </div>
    </div>
  );
};

export default GeneralSetting;
