import TextField from '@mui/material/TextField'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import useSocket from '../Utils/socketio'
import { useContext } from 'react'
import { FlashContext } from '../Context/FlashCardsContext'

const CheckSocket = () => {
  
    // const [message, setmessage] = useState('')
  
    // const socket = useSocket()

    // const handlesend = ()=>{
    //     socket.emit("message",message)
    //     setmessage('')
    // }



    // useEffect(()=>{
    
        
    //     socket.on("connection",()=>{
    //         console.log("connected")        
    //     })
    
    //     socket.on("reieve-message",(message)=>{
    //         console.log(message)
    //     })
    //     return () =>{
    //     socket.disconnect()
    // }

    // },[])


    return (
    // <div className='mt-10 '>
    //     <TextField
    //     label="message"
    //     variant="outlined"
    //     value={message}
    //     onChange={(e) => setmessage(e.target.value)}
    //       />
    //       <button
    //       onClick={handlesend}
    //     className='bg-red-500 cursor-pointer'
    //    >
    //       Send
    //     </button>
    // </div>
    <>
    
    </>
  )
}

export default CheckSocket