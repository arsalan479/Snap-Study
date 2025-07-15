import UserOne from "../../Models/UserOneScehma/UserOne.model.js";
import roomModel from "../../Models/UserRooms/createroom.model.js";
import FriendRequest from "../../Models/UserRooms/friendrequest.model.js";
import Notification from "../../Models/UserRooms/notification.model.js";
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

export const friendrequest = async (req, res) => {
  try {

    const { senderId , receiverId } = req.body;

    const sender = await UserOne.findById(receiverId);
    const reciver = await UserOne.findById(senderId);

    if (!sender || !reciver) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

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

    // if (senderId.includes(reciver)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "You are already friends with this user",
    //   });
    // }

    const newRequest = await FriendRequest.create({
      senderId,
      receiverId,
    });

    const notification = await Notification.create({
      receiverId,
      senderId,
      title: "New Friend Request",
      message: `${sender.displayName} sent you a friend request`,
      requestId: newRequest._id,
    });

   res.status(200).json({
      success: true,
      message: "Friend request sent successfully",
      request: newRequest
    });
    

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
      error: error.message,
    });
  }
};

export const getonlinefriends = async (req, res) => {
  try {
    const userId = decodedToken(req);

    if (!userId) {
      return res.status(400).json({
        message: "something is missing in get online friends",
      });
    }

    const user = await UserOne.find({ status: "online" });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    // const onlineFriend = await user.friends.filter(
    //   (f) => f.status === "online"
    // );
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log("online friend error", error);
  }
};

export const sendjoinrequest = async (req, res) => {
  try {
    const { freindId } = req.body;
    const userId = decodedToken(req);
    const io = getIO();

    const friend = await UserOne.findById(freindId);
    if (!friend || friend.status !== "online") {
      return res.status(400).json({
        message: "your friend is not found or your friend is offline",
      });
    }

    io.to(freindId).emit("quiz-request", {
      from: { _id: userId },
      name: req.user.displayName,
    });
    return res.status(200).json({
      message: "request send",
    });
  } catch (error) {
    console.log("send join request", error);
  }
};

export const acceptrequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const userId = decodedToken(req);

    if (!requestId || !userId) {
      return res.status(400).json({
        message: "somthing is missing in accept reques",
      });
    }

    const room = await roomModel.create({
      participants: [{ _id: userId }, requestId],
    });

    return res.status(200).json({
      room,
    });
  } catch (error) {
    console.log("accept request error", error);
  }
};
