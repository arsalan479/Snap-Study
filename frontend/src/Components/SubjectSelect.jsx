import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/20/solid";
import { motion, AnimatePresence } from "framer-motion";

const SubjectSelect = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [customSubject, setCustomSubject] = useState("");

  const subjects = [
    "Mathematics",
    "Physics",
    "Biology",
    "Chemistry",
    "Computer Science",
    "Urdu",
  ];

  const handleSubjectSelect = (subject) => {
    localStorage.setItem("subject", subject);
    setTimeout(() => {
      navigate("/checkscreen");

    }, 1000);
  };

  const handleCustomSubjectSubmit = () => {
    if (customSubject.trim() !== "") {
      localStorage.setItem("subject", customSubject.trim());
      setShowPopup(false);
      setCustomSubject("");
setTimeout(()=>{
 navigate("/checkscreen");

},1000)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <h1 className="text-4xl text-[#5A271E] font-bold mb-10">Hello Arsalan</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl w-full">
        {subjects.map((subject) => (
          <div
            key={subject}
            className="rounded-2xl border border-dashed border-[#5A271E] flex flex-col items-center justify-center p-6 cursor-pointer transition hover:scale-105"
            onClick={() => handleSubjectSelect(subject)}
          >
            <PlusIcon className="w-10 h-10 text-[#5A271E]" />
            <h1 className="uppercase text-[#5A271E] mt-2 text-center">{subject}</h1>
          </div>
        ))}

        {/* Others Card */}
        <div
          className="rounded-2xl border border-dashed border-[#5A271E] flex flex-col items-center justify-center p-6 cursor-pointer transition hover:scale-105"
          onClick={() => setShowPopup(true)}
        >
          <PlusIcon className="w-10 h-10 text-[#5A271E]" />
          <h1 className="uppercase text-[#5A271E] mt-2 text-center">Others</h1>
        </div>
      </div>

      {/* Popup */}
     <AnimatePresence>
  {showPopup && (
    <motion.div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-xl shadow-xl w-80"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-[#5A271E]">Enter Subject Name</h2>
        <input
          type="text"
          value={customSubject}
          onChange={(e) => setCustomSubject(e.target.value)}
          className="w-full border border-[#5A271E] rounded-lg p-2 mb-4 outline-none"
          placeholder="Type subject..."
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowPopup(false)}
            className="px-4 py-2 text-sm text-gray-600 hover:text-red-500"
          >
            Cancel
          </button>
          <button
            onClick={handleCustomSubjectSubmit}
            className="px-4 py-2 text-sm bg-[#5A271E] text-white rounded-lg"
          >
            Submit
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};

export default SubjectSelect;
