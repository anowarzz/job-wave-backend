import { model, Schema, Types } from "mongoose";
import { IApplication } from "./application.interface.js";

const applicationSchema = new Schema<IApplication>(
  {
    candidateId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Application = model<IApplication>(
  "Application",
  applicationSchema
);
