
import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from "../../config";

import IDriverTypeController from "./IControllers/IDriverTypeController";
import IDriverTypeService from '../services/IServices/IDriverTypeService';
import IDriverTypeDTO from '../dto/IDriverTypeDTO';

import { Result } from "../core/logic/Result";

export default class DriverController implements IDriverTypeController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.driverType.name) private driverServiceInstance : IDriverTypeService
  ) {}

  public async createDriverType(req: Request, res: Response, next: NextFunction) {
    try {
      const driverOrError = await this.driverServiceInstance.createDriverType(req.body as IDriverTypeDTO) as Result<IDriverTypeDTO>;

      if (driverOrError.isFailure) {
        return res.status(402).send();
      }

      const driverDTO = driverOrError.getValue();
      return res.status(201).json( driverDTO );
    }
    catch (e) {
      return next(e);
    }
  };
  public async driverTypeByID(req: Request, res: Response) {
    try {
      var dt = await this.driverServiceInstance.getDriverTypeByID(req.query.id);
      if (!dt) {
        return res.status(402).send()
      }
      return res.status(201).send(dt)

    } catch (e) {
      console.log(e)
      return res.status(400).send()
    }
  }

  public async listDriverTypes(req: Request, res: Response) {
    try {
      var driverTypesArray = await this.driverServiceInstance.getDriverTypes()


      if (!driverTypesArray) {
        return res.status(402).send()
      }
      return res.status(201).send(driverTypesArray)

    } catch (e) {
      console.log(e)
      return res.status(400).send()
    }
  };
}