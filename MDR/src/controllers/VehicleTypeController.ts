import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from "../../config";

import IVehicleTypeController from "./IControllers/IVehicleTypeController";
import IVehicleTypeService from '../services/IServices/IVehicleTypeService';
import IVehicleTypeDTO from '../dto/IVehicleTypeDTO';

import { Result } from "../core/logic/Result";

export default class VehicleTypeController implements IVehicleTypeController /* TODO: extends ../core/infra/BaseController */ {
  //vehicleServiceInstance: any;
  constructor(
      @Inject(config.services.vehicleType.name) private vehicleTypeServiceInstance : IVehicleTypeService
  ) {}

  public async createVehicleType(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicleTypeOrError = await this.vehicleTypeServiceInstance.createVehicleType(req.body as IVehicleTypeDTO) as Result<IVehicleTypeDTO>;

      if (vehicleTypeOrError.isFailure) {
        return res.status(402).send();
      }

      const vehicleTypeDTO = vehicleTypeOrError.getValue();
      return res.status(201).json( vehicleTypeDTO );
    }
    catch (e) {
      return next(e);
    }
  };

//   public async updateVehicleType(req: Request, res: Response, next: NextFunction) {
//     try {
//       const roleOrError = await this.vehicleTypeServiceInstance.updateVehicleType(req.body as IVehicleTypeDTO) as Result<IVehicleTypeDTO>;

//       if (roleOrError.isFailure) {
//         return res.status(404).send();
//       }

//       const vehicleTypeDTO = roleOrError.getValue();
//       return res.status(201).json( vehicleTypeDTO );
//     }
//     catch (e) {
//       return next(e);
//     }
//   };

public async listVehicleTypes(req: Request, res: Response) {
  try {
    var vehicleTypesArray = await this.vehicleTypeServiceInstance.getVehicleTypes()


    if (!vehicleTypesArray) {
      return res.status(402).send()
    }
    return res.status(201).send(vehicleTypesArray)

  } catch (e) {
    console.log(e)
    return res.status(400).send()
  }
};
}