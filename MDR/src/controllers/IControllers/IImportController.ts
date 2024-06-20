import { Request, Response, NextFunction } from 'express';

export default interface IImportController  {
  createImport(req: Request, res: Response, next: NextFunction);
}