import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/QuizCardsContext';
import { axiosinstance } from '../../AxiosInstance/axios';
import toast from 'react-hot-toast';

const QuizCardSave = () => {
  const [title, settitle] = useState('');
  const [hasSaved, setHasSaved] = useState(false);

  const { FileUrl, Cards, setisProcessing,setSaveQuizCard } = useContext(AppContext);


  const subject = localStorage.getItem('subject');

  
     const handleSave = async () => {
    if (!title || !subject || !FileUrl || !Cards?.length) {
      toast.error('Missing data to save quiz card');
      return;
    }

    setisProcessing(true);

    try {
      await toast.promise(
        axiosinstance.post('/api/quiz/quizcard-save', {
          fileUrl: FileUrl,
          Title: title,
          Subjects: subject,
          Cards,
        }),
        {
          loading: 'Saving quiz card...',
          success: 'Quiz card saved successfully!',
          error: 'Failed to save quiz card.',
        }
      );
    } catch (error) {
      toast.error(error?.response?.data?.result?.message || 'Something went wrong.');
    } finally {
      setisProcessing(false);
    }
  };

  useEffect(()=>{
    setSaveQuizCard(()=>handleSave)
},[FileUrl,Cards,title,subject])

  return (
    <div>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
            setHasSaved(false); // allow save again if title is changed
          }}
          placeholder="Title"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </form>
    </div>
  );
};

export default QuizCardSave;
