import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "lax",
    secure: false, // 100% Native HTTP mode (Works on http://3.6.36.57 without any paid domain or SSL certificate)
    path: "/", // Critical: ensure cookie is valid for all routes including /api/messages
  });

  return token;
};
