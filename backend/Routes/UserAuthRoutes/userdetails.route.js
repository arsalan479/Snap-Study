import { Router } from "express";
import {
  passwordUpdate,
  usernameUpdate,
} from "../../Controllers/UserAuthController/userdetails.controller.js";
import { body } from "express-validator";

const route = Router();

route.post(
  "/updatePassword",
  [
    body("oldPassword").notEmpty().withMessage("Old Password Is Required"),
    body("newPassword")
      .notEmpty()
      .withMessage("New Password Is Required")
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 character")
      .matches(/[0-9]/)
      .withMessage("password must contain a number")
      .matches(/[!@#$%&*]/)
      .withMessage("password must contain a special character"),
  ],
  passwordUpdate
);

route.patch(
    "/updateusername",

    body("username")
        .notEmpty()
        .withMessage("User Name Is Required")
        .isLength({ min: 3 })
        .withMessage("user name must be at least 3 characters")
        .isLength({ max: 40 })
        .withMessage("user name maximum length is 40 characters long")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("username must contain only alphabetic characters"),

    usernameUpdate
);

export default route;
