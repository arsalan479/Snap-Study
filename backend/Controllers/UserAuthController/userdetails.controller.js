import { validationResult } from "express-validator";
import { decodedToken } from "../../Utils/decodedtoken.js";
import {comparepasssword,hashedpassword} from '../../Utils/hashpassword.js'
import Userone from '../../Models/UserOneScehma/UserOne.model.js'

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
