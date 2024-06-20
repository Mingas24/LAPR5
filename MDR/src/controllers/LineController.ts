import { Request, Response, NextFunction } from "express";
import Container, { Inject } from "typedi";
import config from "../../config";
import ILineController from "./IControllers/ILineController";
import ILineService from "../services/IServices/ILineService";
import ILineDTO from "../dto/ILineDTO";
import { Result } from "../core/logic/Result";
import IPathService from "../services/IServices/IPathService";

export default class lineController
  implements ILineController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.line.name) private lineServiceInstance: ILineService,
    @Inject(config.services.path.name) private pathServiceInstance: IPathService
  ) { }

  public async createLine(req: Request, res: Response, next: NextFunction) {
    try {
      const ILineServ = Container.get(
        config.services.line.name
      ) as ILineService;
      const lineOrError = (await ILineServ.createLine(
        req.body as ILineDTO
      )) as Result<ILineDTO>;

      if (lineOrError.isFailure) {
        return res.status(402).send();
      }

      const lineDTO = lineOrError.getValue();
      return res.status(201).json(lineDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async addLinePath(req: Request, res: Response, next: NextFunction) {
    try {
      const lineOrError = (await this.lineServiceInstance.addLinePath(
        req.body as ILineDTO
      )) as Result<ILineDTO>;

      if (lineOrError.isFailure) {
        return res.status(404).send();
      }

      const lineDTO = lineOrError.getValue();
      return res.status(201).json(lineDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async lineByName(req: Request, res: Response, next: NextFunction) {
    try {
      var line = await this.lineServiceInstance.getLineByName(req.query.name);
      if (!line) {
        return res.status(402).send()
      }
      return res.status(201).send(line)

    } catch (e) {
      console.log(e)
      return res.status(400).send()
    }
  }

  public async pathByLineID(req: Request, res: Response, next: NextFunction) {
    try {
      let pathID;
      let path;
      let line = await this.lineServiceInstance.getLineByName(req.query.name);
      if (!line) {
        return res.status(402).send()
      }
      const pathArray = []
      for (let i = 0; i < line.linePath.length; i++) {
        pathID = line.linePath[i].pathID
        path = await this.pathServiceInstance.getPathByID(pathID);
        pathArray.push(path);
      }
      return res.status(201).send(pathArray)
    } catch (e) {
      console.log(e)
      return res.status(400).send()
    }
  }

  public async listLines(req: Request, res: Response, next: NextFunction) {

    try {
      let allLinesDTO = await this.lineServiceInstance.getLines();
      let resultLinesDTO: Array<ILineDTO> = [];
      if (allLinesDTO != null) {
        if (req.body.name != null) {
          for (let i = 0; i < allLinesDTO.length; i++) {
            if (allLinesDTO[i].name.includes(req.body.name)) {
              resultLinesDTO.push(allLinesDTO[i]);
            }
          }
        }
        else resultLinesDTO = allLinesDTO;
      }

      return res.status(201).json(resultLinesDTO);
    } catch (e) {
      return next(e);
    }
  }
  public async colorByLineID(req: Request, res: Response, next: NextFunction) {

    try {
      var line = await this.lineServiceInstance.getLineByName(req.query.name);
      if (!line) {
        return res.status(402).send()
      }
      var color =  (await this.lineServiceInstance.getColorByLineName(req.query.name)).color;
      return res.status(201).send(color)
    } catch (e) {
      console.log(e)
      return res.status(400).send()
    }
  }
}
