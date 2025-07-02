import { Router } from "express";
import { passwordUpdate } from "../../Controllers/UserAuthController/userdetails.controller.js";
import { body } from "express-validator";

const route = Router();

route.post(
    "/updatePassword",
    [
        body("oldPassword")
            .notEmpty()
            .withMessage("Old Password Is Required"),
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

export default route;
