import { decodedToken } from "../../Utils/decodedtoken.js";
import quizcardmodel from "../../Models/QuizCarsSystemModel/quizcard.model.js";
import Bookmark from "../../Models/UserRooms/bookmark.model.js";
import competiondata from "../../Models/UserRooms/quizcompdata.model.js";
import post from "../../Models/UserRooms/compPoststore.js";

export const bookmark = async (req, res) => {
  const userId = decodedToken(req);
  const { cardId } = req.params;

  if (!userId || !cardId) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    const result = await quizcardmodel.findOne(
      {
        UserLoginId: userId,
        "Cards._id": cardId
      },
      {
        "Cards.$": 1,
      }
    );

    if (!result || !result.Cards || result.Cards.length === 0) {
      return res.status(404).json({
        message: "Card not found",
      });
    }

    const existingCard = await Bookmark.findOne({
      userId,
      "cards._id": cardId,
    });

    if (existingCard) {
      return res.status(400).json({
        message: "This Card is already bookmarked",
      });
    }

    const card = result.Cards[0];           

    const createBookmark = await Bookmark.create({
      userId,
      cards: [card],
    });

    return res.status(201).json({
      message: "Card bookmarked successfully",
      data: createBookmark,
    });

  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong: ${error.message}`,
    });
  }
};

export const bookmarkdelete = async (req, res) => {
  
  const userId = decodedToken(req);
  const { bookmarkId } = req.params;
  try {
    if (!userId || !bookmarkId) {
      return res.status(400).json({
        message: "missinginfo",
      });
    }

    const response = await Bookmark.findByIdAndDelete({
      userId,
      _id: bookmarkId,
    });

    return res.status(200).json({
      message: "deletebookmark",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const fetchbookmark = async (req, res) => {

    const userId = decodedToken(req);

  if (!userId) {
    return res.status(400).json({
      message: "missinginfo",
    });
  }

  try {
    const response = await Bookmark.find({ userId });
    if (!response) {
      return res.status(404).json({
        message: "bookmark not found",
      });
    }

    return res.status(200).json({
      message: "fetchbookmark",
      data: response,
    });
  } catch (error) {
return res.status(500).json({
  message: error.message,
});  
}
}

export const competionpost = async(req,res)=>{

try {
  
  const userId = decodedToken(req);
  const {compId} = req.params

  if(!userId || !compId){
    return res.status(400).json({
      message:"id is not found"
    })
  }

  const response = await competiondata.find({_id:compId});

    const postdatacreate = await post.create({
      userId,
      compId
    })



  return res.status(200).json({find:response , create:postdatacreate})


} catch (error) {
  return res.status(500).json({
    message:error.message
  })  
}


}

export const compdatafetch = async (req, res) => {
  try {
    const userId = decodedToken(req);

    if (!userId) {
      return res.status(400).json({ message: "User not found" });
    }

    const posts = await post
      .find({})
      .populate({ path: "userId", select: "displayName email avatar" })
      .populate({ path: "compId", select: "topicName levels score total quizdatacards" }) 
      .sort({ createdAt: -1 }); 

  
    return res.status(200).json(posts);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletecompPost = async(req,res)=>{
  try {
    const {compcardId} = req.params
  const userId = decodedToken(req)

  const response = await post.deleteOne({userId,compId:compcardId})

  return res.status(200).json({
    message:response
  })
  } catch (error) {
    return res.status(500).json({
      message:error.message
    })
  }
}