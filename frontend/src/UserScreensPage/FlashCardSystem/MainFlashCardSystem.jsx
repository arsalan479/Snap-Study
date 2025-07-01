import React from 'react'
import FlashFileUpload from '../../Components/FlashCardComponents/FlashFileUpload'
import FlashExtractText from '../../Components/FlashCardComponents/FlashExtractText'
import FlashCardCreateGemini from '../../Components/FlashCardComponents/FlashCardCreateGemini'
import FlashCardSave from '../../Components/FlashCardComponents/FlashCardSave'

const MainFlashCardSystem = () => {
  return (
<>
<FlashCardSave/>
<FlashFileUpload/>
<FlashExtractText/>
<FlashCardCreateGemini/>
</>
)
}

export default MainFlashCardSystem