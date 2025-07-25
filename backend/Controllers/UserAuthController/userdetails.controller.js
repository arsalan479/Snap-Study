import { validationResult } from "express-validator";
import { decodedToken } from "../../Utils/decodedtoken.js";
import { comparepasssword, hashedpassword } from "../../Utils/hashpassword.js";
import Userone from "../../Models/UserOneScehma/UserOne.model.js";
import Stripe from "stripe";
import { decode } from "jsonwebtoken";

export const passwordUpdate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const UserId = decodedToken(req);
    const { oldPassword, newPassword, comparePassword } = req.body;

    if (!UserId || !oldPassword || !newPassword) {
      return res.status(400).json({
        message: "something is missing",
      });
    }

    // Compare newPassword and comparePassword if comparePassword is provided
    if (comparePassword !== undefined && newPassword !== comparePassword) {
      return res.status(400).json({
        message: "New password and compare password do not match",
      });
    }

    const user = await Userone.findOne({ _id: UserId }).select(
      "authMethods.googleuserbyemail.password"
    );

    if (!user || !user.authMethods?.googleuserbyemail?.password) {
      return res.status(404).json({
        message: "user not found or no password set",
      });
    }

    const storedPassword = user.authMethods.googleuserbyemail.password;

    const isMatch = await comparepasssword(oldPassword, storedPassword);
    if (!isMatch) {
      return res.status(400).json({
        message: "Old Password Is Incorrect",
      });
    }

    const hashpassword = await hashedpassword(newPassword);
    user.authMethods.googleuserbyemail.password = hashpassword;

    await user.save();

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

export const usernameUpdate = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const UserId = decodedToken(req);
    const { username } = req.body;

    if (!UserId) {
      return res.status(400).json("id is not found");
    }

    const result = await Userone.findOneAndUpdate(
      { _id: UserId },
      { $set: { displayName: username } }
    );

    if (!result) {
      return res.status(401).json("something wrong");
    }

    return res.status(200).json({
      message: "username update successfully",
      result,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const useraccountdelete = async (req, res) => {
  try {
    const userId = decodedToken(req);

    if (!userId) {
      return res.status(400).json({
        message: "id is not found",
      });
    }

    const response = await Userone.findByIdAndDelete(userId);

    const cookieclear = res.clearCookie("token");

    if (!response) {
      return res.status(401).json({
        message: "something wrong",
      });
    }

    return res.status(200).json({
      message: "account deleted successfully",
      response,
    });
  } catch (error) {
    return res.status(500).json({
      messag: error.message,
    });
  }
};


