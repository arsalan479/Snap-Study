import passport from "passport";
import { jwtgooglemail } from "../../Utils/jsonwebtoken.nodemailgoogle.js";
import { decodedToken } from "../../Utils/decodedtoken.js";
import UserOneModel from "../../Models/UserOneScehma/UserOne.model.js";

export const google = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })(req, res, next);
};

export const googlecallback = async (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err) {
      return res.redirect(
        `http://localhost:5173/?error=${encodeURIComponent(err.message)}`
      );
    }

    if (!user) {
      return res.redirect("http://localhost:5173/?error=authentication_failed");
    }

    // Handle case where email already exists
    if (user.exists) {
      const message = "This email is already registered with another account.";
      return res.redirect(
        `http://localhost:5173/?error=${encodeURIComponent(message)}`
      );
    }

    // Successful authentication
    jwtgooglemail(user, res, "Google login successful");

    if (user.role == "admin") {
      return res.redirect(
        `http://localhost:5173/AdminDashboard?success=true&name=${encodeURIComponent(
          user.displayName
        )}&role=${encodeURIComponent(user.role)}`
      );
    }

    return res.redirect(
      `http://localhost:5173/dashboard?success=true&name=${encodeURIComponent(
        user.displayName
      )}`
    );
  })(req, res, next);
};

export const userfetch = async (req, res) => {
  try {
    const userId = decodedToken(req);

    if (!userId) {
      return res.status(400).json({
        message: "id is missing",
      });
    }

    const finduser = await UserOneModel.findOne({ _id: userId });

    if (!finduser) {
      return res.status(401).json({
        message: "User is not exist",
      });
    }

    return res.status(200).json({
      message: "User sucessfully fetched!",
      result: finduser,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Something wrong ${error}`,
    });
  }
};
