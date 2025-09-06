import bcrypt from "bcryptjs";
import { envVars } from "../../config/env.js";
import { IUser } from "./user.interface.js";
import { User } from "./user.model.js";

const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  if (userData.password) {
    userData.password = await bcrypt.hash(
      userData.password,
      envVars.BCRYPT_SALT_ROUNDS
    );
  }

  const user = await User.create(userData);
  return user;
};

export const userServices = {
  createUser,
};
