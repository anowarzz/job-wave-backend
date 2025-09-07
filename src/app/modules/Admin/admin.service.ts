import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError.js";
import { UserRole } from "../user/user.interface.js";
import { User } from "../user/user.model.js";

// Get all candidates
const getAllCandidates = async () => {
  const candidates = await User.find({ role: UserRole.CANDIDATE })
    .select("-password")
    .sort({ createdAt: -1 });
  return candidates;
};

// Get all recruiters
const getAllRecruiters = async () => {
  const recruiters = await User.find({ role: UserRole.RECRUITER })
    .select("-password")
    .sort({ createdAt: -1 });
  return recruiters;
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
  getAllCandidates,
  getAllRecruiters,
  getUserById,
};
