import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IDriverController from '../../controllers/IControllers/IDriverTypeController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/driver', route);

  const ctrl = Container.get(config.controller.driverType.name) as IDriverController;

  //create driver type
  route.post('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        description: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createDriverType(req, res, next) );

    route.get('/id',(req, res) => ctrl.driverTypeByID(req, res))

    route.get('/listDriverTypes',(req,res)=>ctrl.listDriverTypes(req,res));
};