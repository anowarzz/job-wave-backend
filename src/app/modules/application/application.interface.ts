import { ObjectId } from "mongoose";

export interface IApplication {
  _id: ObjectId;
  candidateId: ObjectId;
  jobId: ObjectId;
}
