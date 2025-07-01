import flashcardmodel from "../../Models/UserFileUploadModel/flashcard.model.js";
import { fetchdatacardflash } from "../../Services/EditDeleteFetch/fetchdata.service.js";
import { decodedToken } from "../../Utils/decodedtoken.js";



export const flashcardDelete = async(req,res)=>{
try {
    const id = decodedToken(req)

if(!id){
  return res.status(400).json({
    message:"id not found"
  })
}

const deletecard = await flashcardmodel.deleteMany({UserLoginId:id,Modes:"flashcard"});

if (deletecard.deletedCount === 0) {
      return res.status(404).json({
        message: "Flashcard not found"
      });
    }
return res.status(200).json({
  message:"All Flashcard delete successfully",
  deletecard
})


} catch (error) {
  console.log("del card err",error)
  res.status(500).json({
    message:"Something Wrong"
  })  
}

}


export const deleteSpecificCardFlash = async (req, res) => {
  try {
    
    const UserId = decodedToken(req);
    const cardId = req.params.id; 

    if (!UserId || !cardId ) {
      return res.status(400).json({
        message: "User ID, Card ID or mode is missing"
      });
    }

    const result = await flashcardmodel.updateOne(
      { UserLoginId: UserId, Modes: 'flashcard' },
      { $pull: { Cards: { _id: cardId } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        message:'card not found or already deleted'
      });
    }

    return res.status(200).json({
      message: 'card deleted successfully'
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};


export const FlashTitleupdate = async(req,res)=>{
    
try {
    const userId = decodedToken(req);
    const {title} = req.body

if(!userId || !title ){
    return res.status(400).json({
        message:"id or title is missing"
    })
}

const result = await flashcardmodel.updateOne(
  {UserLoginId:userId,
    Modes:'flashcard'
},
  {$set:{Title:title}})

    if (result.modifiedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No matching flashcards found or title already matches"
            });
        }
return res.status(200).json({
    message:"title updated successfully"
})
} catch (error) {
  return res.status(500).json({
    message:`something wrong ${error}`
  })  
}


}

export const Subjectupdate = async(req,res)=>{

try {
 const userId = decodedToken(req);
const {subject} = req.body;
const mode = req.query.mode;

if(!userId || !mode || !subject){
    return res.status(400).json({
        message:"id or mode or Subject is missing"
    })
}

const result = await flashcardmodel.updateOne({UserLoginId:userId,Modes:mode},{$set:{Subjects:subject}});

if(result.modifiedCount  === 0){
    return res.status(404).json({
        message:"subject is already updated"
    })
}

return res.status(200).json({
    message:"subject updated successfully"
})



} catch (error) {
return res.status(500).json({
    message:`something wrong ${error}`
})    
}

}

export const CardUpdated = async(req,res)=>{
 
    try {

    const userId = decodedToken(req);
    const cardId = req.params.id;
    const mode = req.query.mode
    const {question,answer,options} = req.body;


   
    if (!userId || !cardId || !mode) {
      return res.status(400).json({
        message: "User ID, card ID or mode is missing"
      });
    }

const result = await flashcardmodel.updateOne(
      {
        UserLoginId: userId,
        Modes: mode,
        "Cards._id": cardId // ✅ This is the fix
      },
      {
        $set: {
          "Cards.$.question": question,
          "Cards.$.answer": answer,
          ...(options ? { "Cards.$.options": options } : {}) // only update options if provided
        }
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        message: "Card not found or data already up to date"
      });
    }

    return res.status(200).json({
      message: "Card updated successfully"
    });

    } catch (error) {
    return res.status(500).json({
        message:`something wrong ${error}`
    })        
    }
 
}

export const flashcardfetch = async(req,res)=>{

try {
  
const userId = decodedToken(req)

if(!userId){
  return res.status(400).json({
    message:"id is missing"
  })
}

const response = await fetchdatacardflash(userId)

if(!response){
  return res.status(404).json({
    message:"some error in response"
  })
}

return res.status(200).json({message:'flashcardDataFetch Successfully',response})


} catch (error) {
  
  return res.message(500).json({
    message:`something wrong ${error}`
  })

}


}


