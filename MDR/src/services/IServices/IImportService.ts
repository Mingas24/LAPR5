import { NextFunction, Request, Response } from "express";

export default interface IImportService  {
    xmlToJson(req: Request, res: Response, next: NextFunction)
}