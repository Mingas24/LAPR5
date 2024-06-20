import { Request, Response, NextFunction } from 'express'
import { Inject } from 'typedi'
import config from "../../config"
import INodeController from "./IControllers/INodeController"
import INodeService from '../services/IServices/INodeService'
import INodeDTO from '../dto/INodeDTO'
import { Result } from "../core/logic/Result"

export default class NodeController implements INodeController {

  constructor(
    @Inject(config.services.node.name) private nodeServiceInstance: INodeService
  ) { }

  public async createNode(req: Request, res: Response, next: NextFunction) {
    try {
      const nodeOrError = await this.nodeServiceInstance.createNode(req.body as INodeDTO) as Result<INodeDTO>;

      if (nodeOrError.isFailure) {
        return res.status(402).send();
      }

      const nodeDTO = nodeOrError.getValue();
      return res.status(201).json(nodeDTO);
    }
    catch (e) {
      return next(e);
    }
  };

  /*public async updateNode(req: Request, res: Response, next: NextFunction) {
    try {
      const nodeOrError = await this.nodeServiceInstance.updateNode(req.body as INodeDTO) as Result<INodeDTO>;

      if (nodeOrError.isFailure) {
        return res.status(404).send();
      }

      const nodeDTO = nodeOrError.getValue();
      return res.status(201).json(nodeDTO);
    }
    catch (e) {
      return next(e);
    }
  };*/

  public async listNodes(req: Request, res: Response) {
    try {
      var nodeArray = await this.nodeServiceInstance.getNodes()


      if (!nodeArray) {
        return res.status(402).send()
      }
      return res.status(201).send(nodeArray)

    } catch (e) {
      console.log(e)
      return res.status(400).send()
    }
  };

  public async nodeByID(req: Request, res: Response) {
    try {
      var node = await this.nodeServiceInstance.getNodeByID(req.query.nodeID);
      if (!node) {
        return res.status(402).send()
      }
      return res.status(201).send(node)

    } catch (e) {
      console.log(e)
      return res.status(400).send()
    }
  }

  public async nodeByName(req: Request, res: Response) {
    try {
      var node = await this.nodeServiceInstance.getNodeByName(req.query.name);
      if (!node) {
        return res.status(402).send()
      }
      return res.status(201).send(node)

    } catch (e) {
      console.log(e)
      return res.status(400).send()
    }
  }
}