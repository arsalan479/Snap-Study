import React from 'react'
// import useSocket from '../../Utils/socketio'
// import { useState,useEffect } from 'react'
// import TextField from '@mui/material/TextField';

const Communication = () => {

    // const [message, setmessage] = useState('')
      
    //     const socket = useSocket()
    
    //     const handlesend = ()=>{
    //         socket.emit("message",message)
    //         setmessage('')
    //     }
    
    
    
    //     useEffect(()=>{
        
            
    //         socket.on("connection",()=>{
    //             console.log("connected")        
    //         })
        
    //         socket.on("reieve-message",(message)=>{
    //             console.log(message)
    //         })
    //         return () =>{
    //         socket.disconnect()
    //     }
    
    //     },[])

  return (
    <>
    
     <div className='mt-10 '>
             {/* <TextField
             label="message"
             variant="outlined"
             value={message}
             onChange={(e) => setmessage(e.target.value)}
               />
               <button
               onClick={handlesend}
           className='bg-red-500 cursor-pointer'
           >
              Send
            </button> */}
<section class="flex flex-col items-center justify-center text-center h-full mt-60 px-4">
  <h1 class="text-4xl font-bold text-white mb-4">Coming Soon</h1>
  <p class="text-lg text-white">
    We’re working hard to bring you an exciting new feature. Stay tuned for updates!
  </p>
</section>
         </div>
    </>
  )
}

export default Communication