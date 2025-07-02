import { useState } from 'react'
import toast from 'react-hot-toast'
import { axiosinstance } from '../AxiosInstance/axios'

const UserPasswordUpdate = () => {
    const [oldPassword, setoldPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [comparePassword, setcomparePassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const passwordUpdate = async () => {
        try {
            const response = await toast.promise(
                axiosinstance.post('/userdetail/updatePassword', {
                    oldPassword,
                    newPassword,
                    comparePassword
                }),
                {
                    loading: 'Updating password...',
                    success: 'Password updated successfully!',
                }
            )
            console.log(response.data)
            
        } catch (error) {

        const errRes = error?.response?.data
        if(errRes?.errors && Array.isArray(errRes.errors)){
            toast.error(errRes.errors[0]?.msg)
        }else if(errRes?.message){
            toast.error(errRes.message)
        }else{
            toast.error("Something Went Wrong")
        }    
     }
    }

    return (
        <>
            <div className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-8">
                <label>Enter a Old Password</label>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Old Password"
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={oldPassword}
                    onChange={e => setoldPassword(e.target.value)}
                    required
                />
                <label>Enter a New Password</label>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPassword}
                    onChange={e => setnewPassword(e.target.value)}
                    required
                />
                <label>Enter a Compare Password</label>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Compare Password"
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={comparePassword}
                    onChange={e => setcomparePassword(e.target.value)}
                    required
                />
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label htmlFor="showPassword">Show Passwords</label>
                </div>
                <button
                    onClick={passwordUpdate}
                    className='px-6 rounded-2xl py-3 bg-blue-600 cursor-pointer'
                >
                    Update Password
                </button>
            </div>
        </>
    )
}

export default UserPasswordUpdate