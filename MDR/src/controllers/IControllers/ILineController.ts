import { Request, Response, NextFunction } from 'express';

export default interface ILineController  {
  createLine(req: Request, res: Response, next: NextFunction);
  addLinePath(req: Request, res: Response, next: NextFunction);
  listLines(req: Request, res: Response, next: NextFunction);
  pathByLineID(req: Request, res: Response, next: NextFunction);
  lineByName(req: Request, res: Response, next: NextFunction);
  colorByLineID(req: Request, res: Response, next: NextFunction);
}