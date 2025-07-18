import React from 'react'
import { useEffect, useState } from 'react'
import { axiosinstance } from '../../AxiosInstance/axios'
import { useContext } from 'react'
import { FlashContext } from '../../Context/FlashCardsContext'

const Notification = () => {
  const { receiveId,userfetch } = useContext(FlashContext);
  const [notifydata, setnotifydata] = useState([])

  useEffect(() => {
    
    const getnotify = async(receiverId) => {
      if (!receiverId) {
        console.log("No receiver ID available");
        return;
      }
      
      
      try {
        const response = await axiosinstance.get(`/api/room/getnotify/${receiverId}`)
        if(response.status === 200){
          console.log("Notifications data:", response.data)
          setnotifydata(response.data.response)
        }
      } catch (error) {
        console.log("Error fetching notifications:", error)
      }
    }

    // Check multiple sources for receiver ID
    const receiverId = receiveId 
    
    if (receiverId) {
      getnotify(receiverId);
    } else {
      console.log("No valid receiver ID found");
    }
  }, [receiveId, userfetch])

  return (
    <div>
      <h2>Notifications</h2>
     {notifydata.length === 0 ? (
      <p>No notifications found</p>
     ):(
      notifydata.map((notify) => (
        <div key={notify._id}>
          <img src={notify.senderId.avatar} className='w-10 h-10 rounded-full' alt="" />
          <p>{notify.senderId.displayName}</p>
          <p>{notify.senderId.email}</p>
          <p className={notify.senderId.status === "online" ? "text-green-500" : "text-red-500"}>{notify.senderId.status}</p>
          <p>{notify.createdAt}</p>
        </div>
      ))
     )}
    </div>
  )
}

export default Notification
