import { Request, Response, NextFunction } from 'express';

export default interface IVehicleTypeController  {
  createVehicleType(req: Request, res: Response, next: NextFunction);
  //updateVehicleType(req: Request, res: Response, next: NextFunction);
  listVehicleTypes(req: Request, res:Response)
}