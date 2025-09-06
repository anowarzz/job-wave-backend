import { IApplication } from "./application.interface.js";
import { Application } from "./application.model.js";

// create application
const createApplication = async (payload: IApplication) => {
  const application = await Application.create(payload);
  return application;
};

export const ApplicationService = {
  createApplication,
};
