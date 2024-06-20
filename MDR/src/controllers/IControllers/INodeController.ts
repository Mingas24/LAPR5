import { Request, Response, NextFunction } from 'express'

export default interface INodeController {
  createNode(req: Request, res: Response,next: NextFunction)
  //updateNode(req: Request, res: Response, next: NextFunction)
  listNodes(req: Request, res:Response)
  nodeByID(req: Request, res:Response)
  nodeByName(req: Request, res:Response)
}