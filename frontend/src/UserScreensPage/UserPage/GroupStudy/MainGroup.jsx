import {React, useState } from "react";
import { axiosinstance } from "../../../AxiosInstance/axios";
import toast from "react-hot-toast";

const MainGroup = () => {

  const [topic, settopic] = useState('')
  const [numberquestion, setnumberquestion] = useState('')
  const [levels, setlevels] = useState('')

  const [datashow, setdatashow] = useState([])

const generatecompetationquiz = async()=>{

  try {
    const response = await toast.promise(axiosinstance.post('/api/room/sendcomp',{
    topicName:topic,
    numberofquestions:numberquestion,
    levels:levels
  }),
  {
    loading:"Generating Quiz's...",
    success:"generated Quiz's Solve it"
  }

)

  if(response.status === 200){
    console.log(response.data)
    setdatashow(response.data.response)
  }
  } catch (error) {
   console.log(error) 
  }

}



  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Generate Competition</h1>
      <input
        type="text"
        value={topic}
        onChange={(e)=>settopic(e.target.value)}
        placeholder="Enter topic name"
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={numberquestion}
        onChange={(e)=>setnumberquestion(e.target.value)}
        placeholder="Enter number of question"
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select value={levels} onChange={(e)=>setlevels(e.target.value)} className="border bg-[var(--bg2)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Select Level</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      onClick={generatecompetationquiz}
      >
        Generate
      </button>

{
  datashow.map((item, index) => (
    <div key={index} className="border p-4 rounded-2xl mb-2">
      <h2 className="font-semibold">Question {index + 1}: {item.question}</h2>
      <ul className="list-disc ml-6">
        <li>a) {item.options.a}</li>
        <li>b) {item.options.b}</li>
        <li>c) {item.options.c}</li>
        <li>d) {item.options.d}</li>
      </ul>
      <p className="text-green-600 font-medium mt-1">Correct Answer: {item.correctAnswer}</p>
    </div>
  ))
}


    </div>
  )
};

export default MainGroup;
