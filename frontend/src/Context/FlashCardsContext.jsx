import React, { createContext, useState } from 'react'

export const FlashContext = createContext()

const FlashCardsContext = ({children}) => {

    const [Fileurl, setFileurl] = useState(null)
    const [ExtractText, setExtractText] = useState(null)
    const [FlashCards, setFlashCards] = useState(null)
    const [userfetch, setuserfetch] = useState(null)
    const [receiveId, setreceiveId] = useState(null)
    const [notificationCount, setNotificationCount] = useState(0);

  return (
    <>
    
    <FlashContext.Provider
    value={{
        Fileurl,
        setFileurl,
        ExtractText,
        setExtractText,
        FlashCards,
        setFlashCards,
        userfetch,
        setuserfetch,
        receiveId,
        setreceiveId,
        notificationCount,
        setNotificationCount
    }}
    >

    {children}

    </FlashContext.Provider>
    
    </>
  )
}

export default FlashCardsContext