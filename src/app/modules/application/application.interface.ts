import { ObjectId } from "mongoose";

export interface IApplication {
  _id: ObjectId;
  candidate: ObjectId;
  job: ObjectId;
}
