import { Result } from "../../core/logic/Result";
import IPathDTO from "../../dto/IPathDTO";

export default interface IPathService {
  getPaths();
  createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  getPathByID(any): Promise<IPathDTO>;
  //updateLine(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
}