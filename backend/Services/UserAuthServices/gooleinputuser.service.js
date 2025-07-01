import { hashedpassword } from "../../Utils/hashpassword.js";
import { sendverfication } from "../../Utils/sendverificationcode.mailer.js";
import crypto from "crypto";
import UserOne from "../../Models/UserOneScehma/UserOne.model.js";
import { getEmailAvatar } from "../../Utils/randomlyavatar.js";

export const googleinputuser = async (userData) => {
  try {
    const { email, displayName, password } = userData;

    if (!email) {
      throw new Error("Email is required");
    }

    const existingUser = await UserOne.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const genereatedIdcrypto = crypto.randomUUID().toString();

    const passwordhash = await hashedpassword(password);
    const avatar = getEmailAvatar(email);
    const newUser = new UserOne({
      email,
      displayName,
      avatar,
      authMethods: {
        googleuserbyemail: {
          idCrypto: genereatedIdcrypto,
          verificationCode,
          password: passwordhash,
        },
      },
    });

    await newUser.save();

    await sendverfication(email, verificationCode);

    const userObj = newUser.toObject();

    delete userObj.authMethods.googleuserbyemail.password;
    delete userObj.authMethods.googleuserbyemail.verificationCode;

    return {
      success: true,
      message: "User registered successfully",
      redirectURL: process.env.REDIRECT_TO_OTP,
      user: userObj,
    };
  } catch (error) {
    throw error;
  }
};
