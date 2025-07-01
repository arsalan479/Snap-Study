import React, { useContext, useEffect } from "react";
import { FlashContext } from "../../Context/FlashCardsContext";
import toast from "react-hot-toast";
import { axiosinstance } from "../../AxiosInstance/axios";

const FlashExtractText = () => {
    
  const { Fileurl,setExtractText } = useContext(FlashContext);

  useEffect(() => {
        if (!Fileurl) return;

    const extractTextFlash = async () => {
      try {
        const response = await toast.promise(
          axiosinstance.post("api/file/extract-text", { fileUrl: Fileurl }),
          {
            loading: "Extracting Text...",
            success: "Extract Text Successfully",
          }
        );
        setExtractText(response.data.text) // flashcontext

    } catch (error) {
        console.log("extract error" ,error)
      }
    };

if(Fileurl){
     extractTextFlash()

}
    
  },[Fileurl]);

  return <div></div>;
};

export default FlashExtractText;
