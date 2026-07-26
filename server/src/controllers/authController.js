import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";

function serializeUser(user) {
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    mobileNumber: user.mobileNumber,
    village: user.village
  };
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

export async function register(request, response) {
  try {
    const { fullName, email, password, mobileNumber, village } = request.body;

    if (!fullName || !email || !password) {
      return response
        .status(400)
        .json({ message: "Full name, email, and password are required." });
    }

    const trimmedMobile = mobileNumber ? mobileNumber.trim() : "";

    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase().trim() },
        ...(trimmedMobile ? [{ mobileNumber: trimmedMobile }] : [])
      ]
    });

    if (existingUser) {
      return response.status(409).json({ message: "User with this email or phone number already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email: email.toLowerCase().trim(),
      passwordHash,
      mobileNumber: trimmedMobile,
      village
    });

    const token = signToken({ id: user._id, email: user.email });

    response.cookie("token", token, COOKIE_OPTIONS);

    return response.status(201).json({
      token,
      user: serializeUser(user)
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

export async function login(request, response) {
  try {
    const { email, identifier, password } = request.body;
    const loginInput = (identifier || email || "").trim();

    if (!loginInput || !password) {
      return response.status(400).json({ message: "Email or phone number and password are required." });
    }

    const user = await User.findOne({
      $or: [
        { email: loginInput.toLowerCase() },
        { mobileNumber: loginInput }
      ]
    });

    if (!user) {
      return response.status(401).json({ message: "Invalid email/phone number or password." });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return response.status(401).json({ message: "Invalid email/phone number or password." });
    }

    const token = signToken({ id: user._id, email: user.email });

    response.cookie("token", token, COOKIE_OPTIONS);

    return response.json({
      token,
      user: serializeUser(user)
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

export async function logout(_request, response) {
  response.clearCookie("token", COOKIE_OPTIONS);
  return response.json({ message: "Logged out successfully." });
}

export async function me(request, response) {
  try {
    const user = await User.findById(request.user.id).select("-passwordHash");

    if (!user) {
      return response.status(404).json({ message: "User not found." });
    }

    return response.json({ user });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}
