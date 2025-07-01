import jwt from "jsonwebtoken";

export const jwtgooglemail = (user, res, message) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1m", // 1 minute
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1 * 60 * 1000, // 1 minute
  });
};
