import { useState } from 'react'
import toast from 'react-hot-toast'
import { axiosinstance } from '../AxiosInstance/axios'

const UserPasswordUpdate = () => {
    const [oldPassword, setoldPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')

    const passwordUpdate = async () => {
        try {
            const response = await toast.promise(
                axiosinstance.post('/userdetail/updatePassword', {
                    oldPassword,
                    newPassword
                }),
                {
                    loading: 'Updating password...',
                    success: 'Password updated successfully!',
                    error: 'Failed to update password.'
                }
            )
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-8">
                <input
                    type="password"
                    placeholder="Old Password"
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={oldPassword}
                    onChange={e => setoldPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPassword}
                    onChange={e => setnewPassword(e.target.value)}
                />
                <button
                    onClick={passwordUpdate}
                    className='px-6 rounded-2xl py-3 bg-blue-500 cursor-pointer'
                >
                    Update Password
                </button>
            </div>
        </>
    )
}

export default UserPasswordUpdate