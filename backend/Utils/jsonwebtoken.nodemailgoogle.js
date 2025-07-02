import jwt from "jsonwebtoken";

export const jwtgooglemail = (user, res, message) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h", // 24 hours
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });
};
