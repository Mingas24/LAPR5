import { Request, Response, NextFunction } from 'express'
import { Inject } from 'typedi'
import config from "../../config"
import IPathService from '../services/IServices/IPathService'
import IPathDTO from '../dto/IPathDTO'
import { Result } from "../core/logic/Result"
import IPathController from './IControllers/IPathController'

export default class PathController implements IPathController {

    constructor(
        @Inject(config.services.path.name) private pathServiceInstance: IPathService
    ) { }

    public async createPath(req: Request, res: Response, next: NextFunction) {
        try {
            const pathOrError = await this.pathServiceInstance.createPath(req.body as IPathDTO) as Result<IPathDTO>

            if (pathOrError.isFailure) {
                return res.status(402).send()
            }

            const pathDTO = pathOrError.getValue()
            return res.status(201).json(pathDTO)
        }
        catch (e) {
            return next(e)
        }
    }

    public async listPaths(req: Request, res: Response) {
        try {
            var pathArr = await this.pathServiceInstance.getPaths();


            if (!pathArr) {
                return res.status(402).send();
            }
            return res.status(201).send(pathArr);

        } catch (e) {
            console.log(e);
            return res.status(400).send();
        }
    };
}