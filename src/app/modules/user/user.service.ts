import bcrypt from "bcryptjs";
import { envVars } from "../../config/env.js";
import { IUser } from "./user.interface.js";
import { User } from "./user.model.js";

const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  if (userData.password) {
    const saltRounds = envVars.BCRYPT_SALT_ROUNDS || 10;
    userData.password = await bcrypt.hash(userData.password, saltRounds);
  }

  const user = await User.create(userData);
  return user;
};

export const userServices = {
  createUser,
};
