import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError.js";
import { User } from "../user/user.model.js";

// Get all users
const getAllUsers = async () => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  return users;
};

// Get user by ID
const getUserById = async (userId: string) => {
  if (!userId) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User ID is required");
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  return user;
};

export const adminService = {
  getAllUsers,
  getUserById,
};
