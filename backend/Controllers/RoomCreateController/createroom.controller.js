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

    // 1. Save the request
    const friendRequest = await FriendRequest.create({
      senderId,
      receiverId,
    });

    // 2. Fetch sender’s details
    const senderdata = await UserOne.findById({_id:senderId}).select(
      "displayName email"
    );

    // 3. Emit notification if receiver is online
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      req.app.get("io").to(receiverSocketId).emit("friendRequest", {
        senderId,
        senderName: senderdata.displayName,
        senderEmail:senderdata.email,
        requestId: friendRequest._id,
      });
    }

    // 4. Always respond success
      return res.status(200).json({
      success: true,
      message: "Friend request sent successfully.",
      request: {
        _id: friendRequest._id,
        senderId: friendRequest.senderId,
        receiverId: friendRequest.receiverId,
        status: friendRequest.status,
        createdAt: friendRequest.createdAt,
        senderName: senderdata.displayName,
        senderEmail: senderdata.email,
      },
    });

  } catch (error) {
    console.error("Send request error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


