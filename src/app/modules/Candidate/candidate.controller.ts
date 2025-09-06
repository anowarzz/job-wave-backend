import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { CandidateService } from "./candidate.service.js";

// Get User Own Applications
const getMyApplications = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;

  const result = await CandidateService.getMyApplications(decodedToken.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Applications Retrieved Successfully",
    data: result,
  });
});

export const candidateController = {
  getMyApplications,
};
