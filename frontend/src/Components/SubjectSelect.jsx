import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SubjectSelect = ({ onSelectSubject }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(""); // new state

  const [customInput, setCustomInput] = useState("");

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
    setSelectedSubject(subject);
    onSelectSubject?.(subject);
  };

  const handleCustomSubjectSubmit = () => {
    if (customInput.trim() !== "") {
      handleSubjectSelect(customInput.trim());
      setShowPopup(false);
      setCustomInput("");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xs">
        <label
          className="block mb-2 text-lg font-medium text-white"
          htmlFor="subject-select"
        >
          Select Subject
        </label>
        <select
          id="subject-select"
          className="block w-full p-3 rounded-lg border border-white bg-[#202020] text-white focus:outline-none focus:ring-2 focus:ring-white mb-4"
          value={
            subjects.includes(selectedSubject) || selectedSubject === ""
              ? selectedSubject
              : "custom"
          }
          onChange={(e) => {
            const value = e.target.value;
            if (value === "Others") {
              setShowPopup(true);
            } else {
              handleSubjectSelect(value);
            }
          }}
        >
          <option value="" disabled>
            -- Choose a subject --
          </option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
          <option value="Others">Others</option>
          {selectedSubject && !subjects.includes(selectedSubject) && (
            <option value="custom">{selectedSubject}</option>
          )}
        </select>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#2D2D2D] p-6 rounded-xl shadow-xl w-120"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-semibold mb-4 text-white">
                Enter Subject Name
              </h2>
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="w-full border text-white border-white rounded-lg p-2 mb-4 outline-none"
                placeholder="Type subject..."
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 text-sm text-white rounded-full tracking-tight cursor-pointer bg-[#4B4B4B]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCustomSubjectSubmit}
                  className="px-4 py-2 text-sm bg-white text-black tracking-tight rounded-full cursor-pointer"
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
