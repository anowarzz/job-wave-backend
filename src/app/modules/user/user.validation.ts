import { z } from "zod";
import { UserRole } from "./user.interface.js";

// user creation validation schema
export const createUserValidationSchema = z.object({
  name: z
    .string({ error: "Name Is Required" })
    .min(3, "Name must be at least 3 characters")
    .max(25, "Name must be less than 25 characters"),

  email: z.email("Please Provide a valid email address"),

  userName: z
    .string({ error: "Username must be string" })
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .optional(),

  password: z
    .string({ error: "Password Is Required" })
    .min(6, "Password must be at least of 6 character")
    .max(20, "Password can not be more than 20 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
      "Password must be at least 6 characters long, include one uppercase letter and one special character."
    ),

  role: z.enum(Object.values(UserRole)),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be less than 100 characters")
    .optional(),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio must be less than 500 characters")
    .optional(),
  phone: z
    .string({ error: "Phone Number Is Required" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be  Bangladeshi number. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
});

// user info update validation schema

export const updateUserValidationSchema = z.object({
  name: z
    .string({ error: "Name Is Required" })
    .min(3, "Name must be at least 3 characters")
    .max(25, "Name must be less than 25 characters")
    .optional(),

  email: z.email("Invalid email format").optional(),

  password: z
    .string({ error: "Password Is Required" })
    .min(6, "Password must be at least of 6 character")
    .max(20, "Password can not be more than 20 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
      "Password must be at least 6 characters long, include one uppercase letter and one special character."
    )
    .optional(),

  userName: z
    .string({ error: "Username must be string" })
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .optional(),

  role: z.enum(Object.values(UserRole)).optional(),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be less than 100 characters")
    .optional(),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio must be less than 500 characters")
    .optional(),
  phone: z
    .string({ error: "Phone Number Is Required" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be  Bangladeshi number. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
});
