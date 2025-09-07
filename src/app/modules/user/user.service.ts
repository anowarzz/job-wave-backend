import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env.js";
import AppError from "../../errorHelpers/appError.js";
import { IUser, UserRole } from "./user.interface.js";
import { User } from "./user.model.js";

// create a user
const createUser = async (userPayload: Partial<IUser>) => {
  const { email, password, ...userData } = userPayload;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User already exists");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUNDS)
  );

  const user = await User.create({
    email,
    password: hashedPassword,
    ...userData,
  });

  const { password: pass, ...rest } = user.toObject();
  return rest;
};

/*/ get user profile  /*/
const getMyProfile = async (userId: string) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User Not Found");
  }

  return user;
};

/*/ get any user profile by userId /*/
const getUserProfile = async (userId: string) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User Not Found");
  }

  return user;
};

/*/ update user info /*/
const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  // check if user exist with this id
  const ifUserExist = await User.findById(userId);

  if (!ifUserExist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "User does not exist with this id"
    );
  }

  // prevent user and agent to update role
  if (payload.role) {
    if (
      decodedToken.role === UserRole.CANDIDATE ||
      decodedToken.role === UserRole.RECRUITER
    ) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        "You are not authorized updating role"
      );
    }
  }

  // prevent normal user to update  isDeleted
  if (payload.isDeleted) {
    if (
      decodedToken.role === UserRole.CANDIDATE ||
      decodedToken.role === UserRole.RECRUITER
    ) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        "You are not authorized to delete account"
      );
    }
  }

  // hashing updated password
  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      envVars.BCRYPT_SALT_ROUNDS
    );
  }

  // update operation
  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  }).select("-password");

  return updatedUser;
};

export const userServices = {
  createUser,
  getMyProfile,
  getUserProfile,
  updateUser,
};
