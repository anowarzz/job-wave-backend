import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError.js";
import { Application } from "../application/application.model.js";
import { Job } from "../job/job.model.js";
import { UserRole } from "../user/user.interface.js";
import { User } from "../user/user.model.js";

// Get all candidates
const getAllCandidates = async () => {
  const candidates = await User.find({
    role: UserRole.CANDIDATE,
    isDeleted: false,
  })
    .select("-password")
    .sort({ createdAt: -1 });
  return candidates;
};

// Get all recruiters
const getAllRecruiters = async () => {
  const recruiters = await User.find({
    role: UserRole.RECRUITER,
    isDeleted: false,
  })
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

// Block user
const blockUser = async (userId: string) => {
  if (!userId) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User ID is required");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  if (user.role === UserRole.ADMIN) {
    throw new AppError(StatusCodes.FORBIDDEN, "Cannot block admin user");
  }

  if (user.isBlocked) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is already blocked");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true }
  ).select("-password");

  return updatedUser;
};

// Unblock user
const unblockUser = async (userId: string) => {
  if (!userId) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User ID is required");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  if (!user.isBlocked) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is not blocked");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { isBlocked: false },
    { new: true }
  ).select("-password");

  return updatedUser;
};

// Get analytics data
const getAnalytics = async () => {
  const [totalCandidates, totalRecruiters, totalJobPosts, totalApplications] =
    await Promise.all([
      User.countDocuments({ role: UserRole.CANDIDATE }),
      User.countDocuments({ role: UserRole.RECRUITER }),
      Job.countDocuments(),
      Application.countDocuments(),
    ]);

  return {
    totalCandidates,
    totalRecruiters,
    totalJobPosts,
    totalApplications,
  };
};

// Delete user (soft delete)
const deleteUser = async (userId: string) => {
  if (!userId) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User ID is required");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  if (user.role === UserRole.ADMIN) {
    throw new AppError(StatusCodes.FORBIDDEN, "Cannot delete admin user");
  }

  if (user.isDeleted) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is already deleted");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { isDeleted: true },
    { new: true }
  ).select("-password");

  return updatedUser;
};

// Get all jobs (admin view)
const getAllJobs = async () => {
  const jobs = await Job.find()
    .populate("recruiter", "name email")
    .sort({ createdAt: -1 });
  return jobs;
};

export const adminService = {
  getAllCandidates,
  getAllRecruiters,
  getUserById,
  blockUser,
  unblockUser,
  getAnalytics,
  deleteUser,
  getAllJobs,
};
