import { Router } from "express";
//import auth from './routes/authRoute';
import vehicleType from "./routes/vehicleTypeRoute";
import node from "./routes/nodeRoutes";
import line from "./routes/lineRoute";
import driverType from "./routes/driverRoute";
import path from "./routes/pathRoute";
import import_ from "./routes/importRoute";
import user from "./routes/userRoute";

export default () => {
  const app = Router();

  //auth(app);
  vehicleType(app);
  driverType(app);
  node(app);
  line(app);
  path(app);
  import_(app);
  user(app);

  return app;
};
