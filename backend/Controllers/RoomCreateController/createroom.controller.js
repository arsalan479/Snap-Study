import UserOne from "../../Models/UserOneScehma/UserOne.model.js";
import FriendRequest from "../../Models/UserRooms/friendrequest.js";
import { decodedToken } from "../../Utils/decodedtoken.js";
import Notification from "../../Models/UserRooms/notification.model.js";

export const fetchalluser = async (req, res) => {
  try {
    const userId = decodedToken(req);

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token missing or invalid." });
    }

    const response = await UserOne.find({ role: "user", _id: { $ne: userId } });

    return res.status(200).json({
      message: "Users fetched successfully.",
      success: true,
      users: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error",
      error,
    });
  }
};

export const freindsearch = async (req, res) => {
  try {
    const userId = decodedToken(req);
    const search = req.query.displayName;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!search) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const response = await UserOne.find({
      role: "user",
      _id: { $ne: userId },
      displayName: { $regex: search, $options: "i" },
    });

    return res.status(200).json({
      message: "Users searched successfully.",
      success: true,
      response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const sendrequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    // Validate users exist
    const sender = await UserOne.findById(senderId);
    const receiver = await UserOne.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if request already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Friend request already exists",
      });
    }

    // Check if users are already friends
    // if (sender.friends.includes(receiverId)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "You are already friends with this user"
    //   });
    // }

    // Create new friend request - ONLY IDs
    const newRequest = new FriendRequest({
      senderId,
      receiverId,
      status: "pending",
    });

    await newRequest.save();

    // Create notification
    const notification = new Notification({
      receiverId,
      senderId,
      type: "friend_request",
      title: "New Friend Request",
      message: `${sender.displayName} sent you a friend request`,
      requestId: newRequest._id,
    });

    await notification.save();

    res.status(200).json({
      success: true,
      message: "Friend request sent successfully",
      request: newRequest,
    });
  } catch (error) {
    console.error("Send request error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getnotificaion = async (req, res) => {
  try {
    const userId = decodedToken(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token missing or invalid",
      });
    }

    const response = await FriendRequest.find({
      $or: [
        { receiverId: userId, status: "pending" },
        { senderId: userId, status: "pending" },
      ],
      senderId: { $ne: userId },
    })
      .populate("senderId", "displayName avatar status email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const decline = async (req, res) => {
  try {

    const { notificationcurrentId } = req.params;

    if (!notificationcurrentId) {
      return res.status(400).json({
        message: "id is missing",
      });
    }

    const result = await FriendRequest.findByIdAndDelete(notificationcurrentId);

    if (!result) {
      return res.status(404).json({
        message: "notification not found",
      });
    }

    return res.status(200).json({
      message: "declined successfully",
      result,
    });


  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const acceptrequest = async(req,res)=>{
try {
  
  const {senderId} = req.params;

  if(!senderId){
    return res.status(400).json({
      message:"senderId is not found"
    })
  }

  const response = await FriendRequest.findById(senderId).populate("senderId",'status')



  return res.status(200).json({
    response
  })


} catch (error) {
  return res.status(500).json({
    message:error.message
  })  
}
}

