import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { adminService } from "./admin.service.js";

// Get all candidates
const getAllCandidates = catchAsync(async (req: Request, res: Response) => {
  const candidates = await adminService.getAllCandidates();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Candidates retrieved successfully",
    data: candidates,
  });
});

// Get all recruiters
const getAllRecruiters = catchAsync(async (req: Request, res: Response) => {
  const recruiters = await adminService.getAllRecruiters();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Recruiters retrieved successfully",
    data: recruiters,
  });
});

// Get user by ID
const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await adminService.getUserById(userId as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});

// Block user
const blockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await adminService.blockUser(userId as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User blocked successfully",
    data: user,
  });
});

// Unblock user
const unblockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await adminService.unblockUser(userId as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User unblocked successfully",
    data: user,
  });
});

// Get analytics
const getAnalytics = catchAsync(async (req: Request, res: Response) => {
  const analytics = await adminService.getAnalytics();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Analytics retrieved successfully",
    data: analytics,
  });
});

// Delete user (soft delete)
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await adminService.deleteUser(userId as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User deleted successfully",
    data: user,
  });
});

export const AdminController = {
  getAllCandidates,
  getAllRecruiters,
  getUserById,
  blockUser,
  unblockUser,
  getAnalytics,
  deleteUser,
};
