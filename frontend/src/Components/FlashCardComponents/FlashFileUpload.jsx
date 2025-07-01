import React, { useContext, useEffect, useState } from "react";
import { axiosinstance } from "../../AxiosInstance/axios";
import toast from "react-hot-toast";
import { FlashContext } from "../../Context/FlashCardsContext";


const FlashFileUpload = () => {

    
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const {setFileurl} = useContext(FlashContext)
    
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };


    const flashfileupload = async () => {
      if (!file) {
        toast.error("Please select a file.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
          const response = await toast.promise(
              axiosinstance.post(
          "/api/file/file-upload-flash",
          formData
        ),{
            loading: "Image Uploading...",
          success: "Image Upload Successfully!",
        }
        )
        setFileurl(response.data.result.file.fileUrl) //context

      } catch (error) {
        toast.error(error)
      }
    };

  return (
    <>
    <input
        type="file"
        name="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border border-black"
      />
      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="max-w-xs max-h-60 rounded shadow"
          />
        </div>
      )}
      <button
        onClick={flashfileupload}
        className="bg-blue-500 px-8 py-3 text-white rounded-2xl mt-4"
      >
        ImageUpload
      </button>
    </>
  );
};

export default FlashFileUpload;
