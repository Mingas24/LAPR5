import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import Logger from "./logger";

import config from "../../config";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  const driverTypeSchema = {
    // compare with the approach followed in repos and services
    name: "driverTypeSchema",
    schema: "../persistence/schemas/DriverTypeSchema",
  };

  const vehicleTypeSchema = {
    name: "vehicleTypeSchema",
    schema: "../persistence/schemas/VehicleTypeSchema",
  };

  const nodeSchema = {
    // compare with the approach followed in repos and services
    name: "NodeSchema",
    schema: "../persistence/schemas/NodeSchema",
  };
  const lineSchema = {
    // compare with the approach followed in repos and services
    name: "Line",
    schema: "../persistence/schemas/LineSchema",
  };

  const pathSchema = {
    name: "Path",
    schema: "../persistence/schemas/PathSchema",
  };

  const userSchema = {
    name: "User",
    schema: "../persistence/schemas/UserSchema",
  };
  const driverTypeController = {
    name: config.controller.driverType.name,
    path: config.controller.driverType.path,
  };
  const driverTypeRepo = {
    name: config.repos.driverType.name,
    path: config.repos.driverType.path,
  };

  const driverTypeService = {
    name: config.services.driverType.name,
    path: config.services.driverType.path,
  };

  const importService = {
    name: config.services.import_.name,
    path: config.services.import_.path,
  };

  const importController = {
    name: config.controller.import_.name,
    path: config.controller.import_.path,
  };

  const vehicleTypeController = {
    name: config.controller.vehicleType.name,
    path: config.controller.vehicleType.path,
  };

  const NodeController = {
    name: config.controller.node.name,
    path: config.controller.node.path,
  };

  const lineController = {
    name: config.controller.line.name,
    path: config.controller.line.path,
  };

  const pathController = {
    name: config.controller.path.name,
    path: config.controller.path.path,
  };

  const NodeRepo = {
    name: config.repos.node.name,
    path: config.repos.node.path,
  };

  const lineRepo = {
    name: config.repos.line.name,
    path: config.repos.line.path,
  };

  const pathRepo = {
    name: config.repos.path.name,
    path: config.repos.path.path,
  };

  const vehicleTypeRepo = {
    name: config.repos.vehicleType.name,
    path: config.repos.vehicleType.path,
  };

  const vehicleTypeService = {
    name: config.services.vehicleType.name,
    path: config.services.vehicleType.path,
  };

  const NodeService = {
    name: config.services.node.name,
    path: config.services.node.path,
  };

  const lineService = {
    name: config.services.line.name,
    path: config.services.line.path,
  };

  const pathService = {
    name: config.services.path.name,
    path: config.services.path.path,
  };

  const userController = {
    name: config.controller.user.name,
    path: config.controller.user.path,
  };

  const userService = {
    name: config.services.user.name,
    path: config.services.user.path,
  };

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path,
  };

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      vehicleTypeSchema,
      nodeSchema,
      driverTypeSchema,
      lineSchema,
      pathSchema,
      userSchema,
    ],
    controllers: [
      driverTypeController,
      NodeController,
      lineController,
      vehicleTypeController,
      pathController,
      importController,
      userController,
    ],
    repos: [
      vehicleTypeRepo,
      driverTypeRepo,
      NodeRepo,
      lineRepo,
      pathRepo,
      userRepo,
    ],
    services: [
      driverTypeService,
      NodeService,
      lineService,
      vehicleTypeService,
      pathService,
      importService,
      userService,
    ],
  });
  Logger.info("✌️ Schemas, Controllers, Repositories, Services, etc. loaded");

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
