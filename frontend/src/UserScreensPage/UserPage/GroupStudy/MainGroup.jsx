import {React, useState } from "react";
import { axiosinstance } from "../../../AxiosInstance/axios";
import toast from "react-hot-toast";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const MainGroup = () => {

  const [topic, settopic] = useState('')
  const [numberquestion, setnumberquestion] = useState('')
  const [levels, setlevels] = useState('')
  const [datashow, setdatashow] = useState([])
  const [useranswer, setuseranswer] = useState({})
  const [scoreData, setscoreData] = useState(null)

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
    setdatashow(response.data.response)
  }
  } catch (error) {
   toast.error(error.response.data.error[0].msg) 
  }

}

const submitquizdata = async()=>{

  const payload = datashow.map((item,index)=>({
    question:item.question,
    selectedAnswer:useranswer[index] || null,
    correctAnswer:item.correctAnswer
  }))


  await axiosinstance.post('/api/room/sumbitquizdata',{
    quiz:payload
  }).then((res)=>{
    setscoreData(res.data)
  }).catch((err)=>{
    console.log(err)
  })
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

      <select value={numberquestion} onChange={(e)=>setnumberquestion(e.target.value)} className="border bg-[var(--bg2)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option selected disabled value="">Select number of questions</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>

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

{datashow.map((item, index) => (
 
 <div key={index} className="border p-4 rounded-2xl mb-2">
 
    <h2 className="font-semibold">
      Question {index + 1}: {item.question}
    </h2>

    <div className="ml-4 mt-2 space-y-1">
      {Object.entries(item.options).map(([key, value]) => (
        <label key={key} className="flex items-center gap-2">
          <input
            type="radio"
            name={`question-${index}`} 
            value={value}
            onChange={()=>setuseranswer(prev=>({...prev,[index]:value}))}
            className="accent-blue-600"
          />
          <span>{value}</span>
        </label>
      ))}
    </div>

  
  </div>
))}
<div>
  <button onClick={submitquizdata} className="bg-red-400 px-8 py-3 rounded-2xl cursor-pointer">Submit Quiz</button>
</div>





<div className="py-20">
  {scoreData && (
    <>
      <div className="mt-6 w-60 h-60 mx-auto">
        <CircularProgressbar
          value={(scoreData.score / scoreData.total) * 100}
          text={`${scoreData.score}/${scoreData.total}`}
          styles={buildStyles({
            textColor: 'white',
            pathColor: '#5227FF',
            trailColor: 'gray'
          })}
        />
      </div>

      <h2 className="text-xl font-semibold text-center mt-6 text-red-600">
        Incorrect Answers
      </h2>

      <div className="mt-4 space-y-4">
        {scoreData.result
          .filter(item => !item.isCorrect)
          .map((item, idx) => (
            <div
              key={idx}
              className="bg-black border-l-4 border-red-500 p-4 rounded"
            >
              <p className="font-medium">Question: {item.question}</p>
              <p>Your Answer: <span className="text-red-600">{item.selectedAnswer || 'No Answer'}</span></p>
              <p>Correct Answer: <span className="text-green-600">{item.correctAnswer}</span></p>
            </div>
          ))}
      </div>

  <h2 className="text-xl font-semibold text-center mt-6 text-green-600">
        Corrected Answers
      </h2>    
      
        <div className="mt-4 space-y-4">
        {scoreData.result
          .filter(item => item.isCorrect)
          .map((item, idx) => (
            <div
              key={idx}
              className="bg-black border-l-4 border-red-500 p-4 rounded"
            >
              <p className="font-medium">Question: {item.question}</p>
              <p>Correct Answer: <span className="text-green-600">{item.correctAnswer}</span></p>
            </div>
          ))}
      </div>

      
      </>
  )}
</div>


    </div>
  )
};

export default MainGroup;
