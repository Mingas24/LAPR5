import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import { Container } from "typedi";
import IUserController from "../../controllers/IControllers/IUserController";
import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  const ctrl = Container.get(config.controller.user.name) as IUserController;

  route.post(
    "",
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        pass: Joi.string().required(),
        sex: Joi.string().required(),
        birth: Joi.number().required(),
        address: Joi.string().required(),
        phoneNumber: Joi.number().required(),
        role: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createUser(req, res, next)
  );
};
