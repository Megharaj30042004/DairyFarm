import { verifyToken } from "../utils/jwt.js";

export function requireAuth(request, response, next) {
  const authorization = request.headers.authorization || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  if (!token) {
    return response.status(401).json({ message: "Authentication required." });
  }

  try {
    const decoded = verifyToken(token);
    request.user = decoded;
    return next();
  } catch (_error) {
    return response.status(401).json({ message: "Invalid or expired token." });
  }
}
