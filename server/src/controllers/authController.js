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

export async function register(request, response) {
  try {
    const { fullName, email, password, mobileNumber, village } = request.body;

    if (!fullName || !email || !password) {
      return response
        .status(400)
        .json({ message: "Full name, email, and password are required." });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return response.status(409).json({ message: "User already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      passwordHash,
      mobileNumber,
      village
    });

    const token = signToken({ id: user._id, email: user.email });

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
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return response.status(401).json({ message: "Invalid email or password." });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return response.status(401).json({ message: "Invalid email or password." });
    }

    const token = signToken({ id: user._id, email: user.email });

    return response.json({
      token,
      user: serializeUser(user)
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
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
