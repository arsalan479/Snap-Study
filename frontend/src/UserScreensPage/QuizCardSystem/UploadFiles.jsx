import React from "react";
import { useEffect } from "react";
import { axiosinstance } from "../../AxiosInstance/axios";
import { useState } from "react";

const UploadFiles = () => {

    const [filedata, setfiledata] = useState([])

  useEffect(() => {
    const filesdata = async () => {
      try {
        const response = await axiosinstance.get("/api/quiz/crud/filefetch");
        if (response.status === 200) {
          setfiledata(response.data.data)
        }
      } catch (error) {
        console.log(error);
      }
    };
    filesdata()
  }, []);

  return (
    <>
    
    {filedata.map((item) => (
        <div key={item._id}>
            <div className="w-full h-full mt-5">
                <img src={item.fileUrl} className="rounded-2xl w-full h-full object-cover" alt="" />
            </div>
        </div>
      ))}
    
    </>
  );
};

export default UploadFiles;
