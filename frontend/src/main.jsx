import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import FlashCardsContext from './Context/FlashCardsContext.jsx'
import QuizCardsContext from './Context/QuizCardsContext.jsx'
import { QuizCardCrudContext } from './Context/QuizCardCrudContext.jsx'

createRoot(document.getElementById('root')).render(
 <QuizCardCrudContext>
   <FlashCardsContext>
<QuizCardsContext>
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>
</QuizCardsContext>
</FlashCardsContext>  
 </QuizCardCrudContext>
)
