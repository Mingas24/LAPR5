import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import ILineController from "../../controllers/IControllers/ILineController";

import config from "../../../config";

const line = Router();

export default (app: Router) => {
  app.use("/lines", line);

  const ctrl = Container.get(config.controller.line.name) as ILineController;

  line.post(
    "",
    celebrate({
      body: Joi.object({
        lineID: Joi.string().required(),
        name: Joi.string().required(),
        color: Joi.string().required(),
        linePath: Joi.array(),
      }),
    }),
    (req, res, next) => ctrl.createLine(req, res, next)
  );

  line.put(
    "",
    celebrate({
      body: Joi.object({
        lineID: Joi.string().required(),
        name: Joi.string().required(),
        color: Joi.string().required(),
        linePath: Joi.array(),
      }),
    }),
    (req, res, next) => ctrl.addLinePath(req, res, next)
  );

  line.get('/pathByLineID', (req, res, next) => ctrl.pathByLineID(req, res, next));

  line.get('/colorByLineID',(req, res, next) => ctrl.colorByLineID(req, res, next));

  line.get("",
    celebrate({
      body: Joi.object({
        code: Joi.string(),
        name: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.listLines(req, res, next)
  );
};
