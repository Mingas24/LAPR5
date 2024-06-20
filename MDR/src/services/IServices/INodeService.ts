import { Result } from "../../core/logic/Result"
import INodeDTO from "../../dto/INodeDTO"

export default interface INodeService  {
  createNode(nodeDTO: INodeDTO): Promise<Result<INodeDTO>>
  //updateNode(nodeDTO: INodeDTO): Promise<Result<INodeDTO>>
  getNodes(): Promise<INodeDTO[]>
  getNodeByID(any):Promise<INodeDTO>
  getNodeByName(any):Promise<INodeDTO>
}
