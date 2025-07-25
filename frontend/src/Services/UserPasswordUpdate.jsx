import { useState } from 'react';
import toast from 'react-hot-toast';
import { axiosinstance } from '../AxiosInstance/axios';

const UserPasswordUpdate = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [comparePassword, setComparePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const passwordUpdate = async () => {
    try {
      const response = await toast.promise(
        axiosinstance.post('/userdetail/updatePassword', {
          oldPassword,
          newPassword,
          comparePassword,
        }),
        {
          loading: 'Updating password...',
          success: 'Password updated successfully!',
        }
      );

      if(response.status === 200){
        setOldPassword('');
        setNewPassword('');
        setComparePassword('');
      }

    } catch (error) {
      const errRes = error?.response?.data;
      if (errRes?.errors && Array.isArray(errRes.errors)) {
        toast.error(errRes.errors[0]?.msg);
      } else if (errRes?.message) {
        toast.error(errRes.message);
      } else {
        toast.error('Something Went Wrong');
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-[#1f1f1f] text-white p-8 rounded-xl shadow-md mt-10 space-y-6">
      <h2 className="text-2xl font-semibold text-center">Update Your Password</h2>

      <div className="space-y-4">
        {/* Old Password */}
        <div>
          <label className="block mb-1 font-medium">Old Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter old password"
            className="w-full px-4 py-2 rounded-lg bg-[#2d2d2d] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block mb-1 font-medium">New Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter new password"
            className="w-full px-4 py-2 rounded-lg bg-[#2d2d2d] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        {/* Compare Password */}
        <div>
          <label className="block mb-1 font-medium">Confirm New Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Re-enter new password"
            className="w-full px-4 py-2 rounded-lg bg-[#2d2d2d] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={comparePassword}
            onChange={(e) => setComparePassword(e.target.value)}
            required
          />
        </div>

        {/* Show Password Toggle */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="accent-blue-600 w-4 h-4"
          />
          <label htmlFor="showPassword" className="text-sm text-gray-300">
            Show Passwords
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={passwordUpdate}
          className="cursor-pointer w-full py-3 mt-4 bg-white text-black hover:bg-[#ebe6e6] transition duration-300  rounded-lg"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default UserPasswordUpdate;
