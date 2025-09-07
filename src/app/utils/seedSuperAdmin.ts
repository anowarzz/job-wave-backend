/* eslint-disable no-console */
import bcryptjs from "bcryptjs";
import { envVars } from "../config/env.js";
import { IUser, UserRole } from "../modules/user/user.interface.js";
import { User } from "../modules/user/user.model.js";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist: IUser | null = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdminExist) {
      console.log("Super Admin Already Exist");
      return;
    }

    const hashedPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD as string,
      Number(envVars.BCRYPT_SALT_ROUNDS)
    );

    const superAdminPayload: IUser = {
      name: "Super Admin",
      email: envVars.SUPER_ADMIN_EMAIL as string,
      role: UserRole.ADMIN,
      password: hashedPassword,
    };

    console.log("Creating super admin ...");

    const superAdmin = await User.create(superAdminPayload);

    console.log(superAdmin);
    console.log("Super admin created successfully ! \n");
  } catch (error) {
    console.log(error);
  }
};
