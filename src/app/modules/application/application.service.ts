import { IApplication } from "./application.interface.js";
import { Application } from "./application.model.js";

export const ApplicationService = {
  async createApplication(payload: IApplication) {
    const application = await Application.create(payload);
    return application;
  },
};
