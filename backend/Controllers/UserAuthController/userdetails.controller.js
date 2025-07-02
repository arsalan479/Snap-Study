import { validationResult } from "express-validator";
import UserOne from "../../Models/UserOneScehma/UserOne.model.js";
import { decodedToken } from "../../Utils/decodedtoken.js";
import { comparepasssword, hashedpassword } from "../../Utils/hashpassword.js";

export const passwordUpdate = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const UserId = decodedToken(req);
        const { oldPassword, newPassword } = req.body;

        if (!UserId || !oldPassword || !newPassword) {
            return res.status(400).json({
                message: "something is missing",
            });
        }

        const user = await UserOne.findOne({ _id: UserId }).select(
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
            return res.status(401).json({
                message: "old password is incorrect",
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
