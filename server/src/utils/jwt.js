import jwt from "jsonwebtoken";

const defaultSecret = "development-secret-change-me";

export function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || defaultSecret, {
    expiresIn: "7d"
  });
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET || defaultSecret);
}
