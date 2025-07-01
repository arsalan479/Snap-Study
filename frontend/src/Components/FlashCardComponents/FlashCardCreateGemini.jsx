import React, { useContext, useEffect, useState } from 'react'
import { FlashContext } from '../../Context/FlashCardsContext'
import toast from 'react-hot-toast';
import { axiosinstance } from '../../AxiosInstance/axios.js';

const FlashCardCreateGemini = () => {

const {ExtractText,setFlashCards} = useContext(FlashContext);
const [Cards, setCards] = useState([]);

useEffect(()=>{

    const flashCardCreate = async()=>{

        try {
            
            const response = await toast.promise(
                axiosinstance.post('api/file/generate-text',{text:ExtractText}),
            {
            loading: "FlashCard Generating...",
            success: "FlashCard Generated Successfully",

            }
            )
            setCards(response.data.data)

            setFlashCards(response.data.data) //context

        } catch (error) {
            console.log("card generate error",error)
        }

    }
 if(ExtractText){
        flashCardCreate()
    }
   
},[ExtractText])


  return (
    <div>
<div className="p-4">
  <h2 className="text-xl font-bold mb-4">Generated Flash Cards</h2>
  {Cards.length === 0 ? (
    <p className="text-gray-500">No cards generated yet.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Cards.map((card, index) => (
        <div key={index} className="border rounded-lg p-4 shadow bg-white">
          <h3 className="font-semibold text-lg mb-2">Q{index + 1}:{card.question || `Question ${index + 1}`}</h3>
          <p className="mt-2 text-green-600 text-sm">
            <strong>Answer:</strong> {card.answer}
          </p>
        </div>
      ))}
    </div>
  )}
</div>



    </div>
  )
}

export default FlashCardCreateGemini