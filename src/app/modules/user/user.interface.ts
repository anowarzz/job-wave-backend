import { Types } from "mongoose";

export enum UserRole {
  USER = "USER",
  AGENT = "AGENT",
  ADMIN = "ADMIN",
}

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  address?: string;
  bio?: string;
  phone?: string;
  role: UserRole;
  isBlocked?: boolean;
  isDeleted?: boolean;
  createdAt: Date;
}
