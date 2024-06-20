import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },

  /**
   * API configs
   */
  api: {
    prefix: "/api",
  },

  controller: {
    vehicleType: {
      name: "VehicleType",
      path: "../controllers/VehicleTypeController",
    },

    line: {
      name: "lineController",
      path: "../controllers/LineController",
    },

    driverType: {
      name: "DriverTypeController",
      path: "../controllers/DriverTypeController",
    },

    node: {
      name: "NodeController",
      path: "../controllers/NodeController",
    },

    path: {
      name: "PathController",
      path: "../controllers/PathController",
    },
    import_: {
      name: "ImportController",
      path: "../controllers/ImportController",
    },
    user: {
      name: "UserController",
      path: "../controllers/UserController",
    },
  },

  repos: {
    vehicleType: {
      name: "VehicleTypeRepo",
      path: "../repos/VehicleTypeRepo",
    },

    line: {
      name: "lineRepo",
      path: "../repos/LineRepo",
    },

    driverType: {
      name: "DriverTypeRepo",
      path: "../repos/DriverTypeRepo",
    },

    node: {
      name: "NodeRepo",
      path: "../repos/NodeRepo",
    },

    path: {
      name: "PathRepo",
      path: "../repos/PathRepo",
    },
    user: {
      name: "UserRepo",
      path: "../repos/UserRepo",
    },
  },

  services: {
    vehicleType: {
      name: "VehicleTypeService",
      path: "../services/VehicleTypeService",
    },

    line: {
      name: "lineService",
      path: "../services/LineService",
    },

    driverType: {
      name: "driverTypeService",
      path: "../services/DriverTypeService",
    },

    node: {
      name: "NodeService",
      path: "../services/NodeService",
    },

    path: {
      name: "PathService",
      path: "../services/PathService",
    },
    import_: {
      name: "ImportService",
      path: "../services/ImportService",
    },
    user: {
      name: "UserService",
      path: "../services/UserService",
    },
  },

  tests: {
    path: "../",
  },
};
