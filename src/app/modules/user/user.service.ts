import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { envVars } from "../../config/env.js";
import AppError from "../../errorHelpers/appError.js";
import { IUser } from "./user.interface.js";
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

export const userServices = {
  createUser,
};
