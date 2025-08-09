import React from "react";
import { useEffect, useState } from "react";
import { axiosinstance } from "../../../AxiosInstance/axios";
import HorizontalRuleTwoToneIcon from "@mui/icons-material/HorizontalRuleTwoTone";
import toast from "react-hot-toast";
import { Modal } from "antd";

const Bookmark = () => {
  const [bookmarkdata, setbookmarkdata] = useState([]);
  const [modelopen, setmodelopen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchbookmark = async () => {
      try {
        const response = await axiosinstance.get("/api/room/fetchbookmark");
        if (response.status === 200) {
          setbookmarkdata(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchbookmark();
  }, []);

  const opendeletemodel = (id) => {
    setSelectedId(id);
    setmodelopen(true);
  };

  const closedeletemodel = () => {
    setmodelopen(false);
    setSelectedId(null);
  };

  const bookmarkdelete = async (bookmarkId) => {
    try {
      const response = await toast.promise(
        axiosinstance.delete(`/api/room/bookmarkdelete/${bookmarkId}`),
        {
          loading: "Deleting Bookmark...",
          success: "Bookmark Deleted Successfully",
        }
      );

      if (response.status === 200) {
        setbookmarkdata((prevData) =>
          prevData.filter((data) => data._id !== bookmarkId)
        );
        closedeletemodel();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <Modal
        open={modelopen}
        onCancel={closedeletemodel}
        footer={null}
        closable={false}
        className="p-0 custom-modal-style"
        centered
      >
        <div className="text-white">
          <h1 className="text-[19px] tracking-tight">
            <span>
              <i className="ri-error-warning-line mr-1 text-yellow-300"></i>
            </span>
            Remove BookMark Permission
          </h1>
          <p className="text-gray-300 mt-2 tracking-tight text-[15px]">
            Are you sure you want to delete your bookmark? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={closedeletemodel}
              className="bg-[#4b4b4b] text-white px-10 py-2 rounded-full cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => bookmarkdelete(selectedId)}
              className="bg-white text-black px-10 py-2 rounded-full cursor-pointer"
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>

      <div className="mx-auto px-4 h-[70vh]">
        {bookmarkdata.length === 0 ? (
          <div className="flex justify-center items-center h-full min-h-[450px]">
          <div className="flex flex-col items-center">
            <p className="text-center font-semibold text-2xl text-gray-400">
              Nothing to see here
              <span>
                <HorizontalRuleTwoToneIcon />
              </span>
              yet
            </p>
          </div>
        </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookmarkdata.map((item, value) =>
              item.cards.map((card, index) => (
                <div
                  key={`${value}-${index}`}
                  className="bg-[#2D2D2D] rounded-xl p-6"
                >
                  <div>
                    <button
                      onClick={() => opendeletemodel(item._id)}
                      className="bg-[#474545] hover:bg-red-500 duration-300 px-3 py-2 rounded-full cursor-pointer mb-4"
                    >
                      <i className="ri-delete-bin-6-line"></i>
                    </button>
                  </div>

                  <h2 className="text-white text-xl font-semibold mb-4">
                    {card.question}
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {card.options.map((option, idx) => (
                      <li key={idx}>{option}</li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-3">
                    <p className="text-[#00C851] font-medium">Answer: {card.answer}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Bookmark;
