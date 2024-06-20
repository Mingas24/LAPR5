import { Result } from "../../core/logic/Result";
import IDriverDTO from "../../dto/IDriverTypeDTO";

export default interface IDriverService  {
  createDriverType(driverDTO: IDriverDTO): Promise<Result<IDriverDTO>>;
  getDriverTypeByID(any):Promise<IDriverDTO>
  getDriverTypes(): Promise<IDriverDTO[]>
}
