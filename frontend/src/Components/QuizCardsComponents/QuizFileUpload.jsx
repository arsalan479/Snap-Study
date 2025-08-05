import React, { useContext, useEffect, useState } from "react";
import { axiosinstance } from "../../AxiosInstance/axios.js";
import toast from "react-hot-toast";
import { AppContext } from "../../Context/QuizCardsContext.jsx";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const QuizFileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [imgSize, setImgSize] = useState({ width: "45vw", height: "32vw" });

  const { setFileUrl, Cards, setcards } = useContext(AppContext);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);

        const img = new Image();
        img.onload = () => {
          const maxWidth = 600;
          const maxHeight = 600;
          let { width, height } = img;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = width * ratio;
            height = height * ratio;
          }

          setImgSize({ width: `${width}px`, height: `${height}px` });
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
      setImgSize({ width: "40vw", height: "40vw" });
    }
  };

  const imageupload = async () => {
    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    setLoading(true);
    setProcessing(true);
    setcards([]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await toast.promise(
        axiosinstance.post("/api/quiz/file-upload-quiz", formData),
        {
          loading: "Uploading image...",
          success: "Image uploaded successfully!",
        }
      );

      if (response.status === 200) {
        console.log(response);
        //forcontext
        setFileUrl(response.data.result.file.fileUrl);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);

      setProcessing(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (processing && Cards && Cards.length > 0) {
      setProcessing(false);
    }
  }, [Cards, processing]);

  return (
    <div className="flex flex-col items-center ">
      <div className="relative inline-block ">
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
          id="fileInput"
          className="hidden"
          disabled={loading || processing}
        />
        <label
          htmlFor="fileInput"
          className="border bg-[#202020] border-white rounded-2xl border-dashed flex flex-col items-center justify-center  relative overflow-hidden"
          style={{
            width: imgSize.width,
            height: imgSize.height,
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain rounded-2xl"
            />
          ) : (
            <>
              <div className="mb-4 bg-[#33384C] rounded-full w-13 h-13 flex justify-center items-center">
                <FileUploadOutlinedIcon
                  style={{ fontSize: 34, color: "#2750f7" }}
                />
              </div>
              <span className="font-semibold text-[1.9vw] tracking-tight capitalize">
                Upload Source
              </span>
              <span className=" text-[1.5vw] text-[#808284]">
                Drag & drop or{" "}
                <span className="cursor-pointer text-[#2750f7]">
                  choose file
                </span>{" "}
                to upload
              </span>
              <span className="tracking-tight text-[#808284] relative top-15 text-[1.5vw] font-semibold">
                Supported file types: .png, .jpg, .jpeg
              </span>
            </>
          )}
        </label>
      </div>

      <button
        onClick={imageupload}
        disabled={!file || loading || processing}
        className={`px-8 py-3 rounded-2xl mt-4 ${
          !file || loading || processing
            ? "bg-[#4B4B4B] cursor-not-allowed"
            : "bg-white text-black cursor-pointer hover:bg-[var(--text)] duration-300"
        }`}
      >
        {processing || loading ? (
          <span className="flex items-center gap-2">Uploading...</span>
        ) : (
          <>
            {" "}
            Upload Image{" "}
            <span>
              <FileUploadOutlinedIcon className="w-2 h-2" />
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default QuizFileUpload;
