import { emailverificationtemplate } from "../libs/emailverification.template.js";
import { resetPasswordEmailTemplate } from "../libs/resetpassowrdemailtemplate.js";
import { welcomeemailverification } from "../libs/welcomemailverificatio.template.js";
import { transporter } from "./googleinput.mailer.js";

export const sendverfication = async (email, verificationCode) => {
  try {
    const infoemail = await transporter.sendMail({
      from: '"SnapStudy" <arsalanalikhana9@gmail.com>',
      to: email,
      subject: "Email Verification Code",
      text: "verify your email",
      html: emailverificationtemplate(verificationCode),
    });
  } catch (err) {
    console.log("email info error", err);
  }
};

export const welcomeVerification = async (name, email) => {
  try {
    const infoEmail = await transporter.sendMail({
      from: '"SnapStudy" <arsalanalikhana9@gmail.com>',
      to: email,
      subject: "Welcome to SnapStudy – Verify Your Email",
      text: "Welcome! Verify your email",
      html: welcomeemailverification.replace("{name}", name),
    });
    console.log("Welcome email sent:", infoEmail.messageId);
  } catch (err) {
    console.log("Email info error", err);
  }
};

export const passwordresetverification = async (email, resetlink,displayName) => {
  try {
    const infopassword = await transporter.sendMail({
      from: '"SnapStudy" <arsalanalikhana9@gmail.com>',
      to: email,
      subject: "Email Verification Password",
      text: "verify your email",
      html:resetPasswordEmailTemplate(displayName,resetlink)
    });
  } catch (error) {

    console.log("reset password email error",error)
    
  }
};
