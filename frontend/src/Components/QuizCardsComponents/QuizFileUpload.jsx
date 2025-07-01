import React, { useContext, useEffect, useState } from "react";
import { axiosinstance } from "../../AxiosInstance/axios.js";
import toast from "react-hot-toast";
import { AppContext } from "../../Context/QuizCardsContext.jsx";

const QuizFileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Context values
  const { setFileUrl, Cards, setcards } = useContext(AppContext);

  // Handle file input
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

  // Upload image and start processing
  const imageupload = async () => {
    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    setLoading(true);
    setProcessing(true);
    setcards([]); // 🧠 Clear old cards before uploading new image

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await toast.promise(
        axiosinstance.post("/api/quiz/file-upload-quiz", formData),
        {
          loading: "Uploading image...",
          success: "Image uploaded successfully!",
          error: "Something went wrong. Try again.",
        }
      );

      setFileUrl(response.data.result.file.fileUrl);
    } catch (error) {
      console.error("Upload error:", error);
      setProcessing(false); // ❗Stop processing on error
    } finally {
      setLoading(false);
    }
  };

  // Watch for card generation completion
  useEffect(() => {
    if (processing && Cards && Cards.length > 0) {
      setProcessing(false); // ✅ Card generation complete
    }
  }, [Cards, processing]);

  return (
    <div>
      <input
        type="file"
        name="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border border-black px-2 py-1"
        disabled={loading || processing}
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
        onClick={imageupload}
        disabled={!file || loading || processing}
        className={`px-8 py-3 rounded-2xl mt-4 text-white ${
          !file || loading || processing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {processing
          ? "Processing..."
          : loading
          ? "Uploading..."
          : "Upload Image"}
      </button>
    </div>
  );
};

export default QuizFileUpload;
