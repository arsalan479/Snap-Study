import React, { useContext, useEffect, useState } from "react";
import { axiosinstance } from "../../AxiosInstance/axios";
import toast from "react-hot-toast";
import { AppContext } from "../../Context/QuizCardsContext";

const ExtractTextQuiz = () => {
  
 const { FileUrl,setExtractText,setisProcessing } = useContext(AppContext);
 

  useEffect(() => {
    
    const extractText = async () => {
      if (!FileUrl) return;
      setisProcessing(true)

      try {
       const res = await toast.promise(
          axiosinstance.post("/api/quiz/extractfile-quiz", { fileUrl: FileUrl }),
        {
          loading:"Extracting Text...",
          success:"Extract Text Successfully",   
        }
        )
      
        setExtractText(res.data.text); //context
      
      } catch (err) {
        toast.error("Failed to extract text.");
      }finally{
        setisProcessing(false)
      }
    };

    if(FileUrl){
      extractText();
    }

  }, [FileUrl]);

  return (
    <>
    </>
  );
};

export default ExtractTextQuiz;
