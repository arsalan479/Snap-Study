import UserOne from "../../Models/UserOneScehma/UserOne.model.js";
import FriendRequest from "../../Models/UserRooms/friendrequest.js";
import { userSocketMap } from "../../server.js";
import { decodedToken } from "../../Utils/decodedtoken.js";

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
    const senderId = decodedToken(req);
    const { receiverId } = req.body;

    // 1. Check if receiverId exists
    if (!receiverId) {
      return res.status(400).json({ success: false, message: "Receiver ID missing!" });
    }

    // 2. FriendRequest create karo
    const friendRequest = await FriendRequest.create({
      senderId,
      receiverId,
    });

    // 3. Sender ka data fetch karo
    const senderdata = await UserOne.findById(senderId).select(
      "displayName email avatar"
    );

    if (!senderdata) {
      return res.status(404).json({ success: false, message: "Sender not found!" });
    }

    // 4. Check if receiver online hai
    const receiverSocketId = userSocketMap[receiverId];
    console.log("Online Users Map:", userSocketMap); // Debugging ke liye

    if (receiverSocketId) {
      req.app.get("io").to(receiverSocketId).emit("newFriendRequest", {
        senderId,
        receiverId,
        senderName: senderdata.displayName,
        senderEmail: senderdata.email,
        avatar: senderdata.avatar,
        requestId: friendRequest._id,
      });
    }

    // 5. Response bhejo with complete data
    return res.status(200).json({
      success: true,
      message: "Request successfully sent!",
      requestData: friendRequest, // Frontend pe yeh data ayega
    });

  } catch (error) {
    console.error("Error in sendrequest:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error!",
    });
  }
};



