import React, { useContext, useEffect, useState } from 'react'
import { FlashContext } from '../../Context/FlashCardsContext'
import toast from 'react-hot-toast';
import { axiosinstance } from '../../AxiosInstance/axios';

const FlashCardSave = () => {
    
    const{Fileurl,FlashCards} = useContext(FlashContext);
    const [title, settitle] = useState("")

    const subject = localStorage.getItem('subject');

    useEffect(()=>{

        const flashcardsave = async()=>{

            try {
                const response = await toast.promise(
                axiosinstance.post('/api/file/flashcard-save',{
                    fileUrl:Fileurl,
                    Title:title,
                    Subjects:subject,
                    Cards:FlashCards
                }
            ),
            {
                loading:"FlashCard Card Save...",
                success:"FlashCard Card Successfully Saved"
            }
            )
            } catch (error) {
             console.log("flashcardsavederror",error)   
            }

        }
        if(Fileurl && title && subject && FlashCards){
            flashcardsave()
        }

    },[Fileurl, title, subject, FlashCards])

    return (
    <div>

    <input
      type="text"
      className="border border-black rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter flashcard title"
      value={title}
      onChange={(e) => settitle(e.target.value)}
    />

    </div>
  )
}

export default FlashCardSave