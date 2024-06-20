import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IVehicleTypeController from '../../controllers/IControllers/IVehicleTypeController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/vehicleType', route);

  const ctrl = Container.get(config.controller.vehicleType.name) as IVehicleTypeController;

  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        autonomy: Joi.number().required(),
        cost: Joi.number().required(),
        averageSpeed: Joi.number().required(),
        energySource: Joi.number().required(),
        consumption: Joi.number().required(),
        emissions: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createVehicleType(req, res, next) );

//   route.put('',
//     celebrate({
//       body: Joi.object({
//         id: Joi.string().required(),
//         name: Joi.string().required()
//       }),
//     }),
//     (req, res, next) => ctrl.updateVehicleType(req, res, next) );

  route.get('/listVehicleTypes',(req,res)=>ctrl.listVehicleTypes(req,res));
};