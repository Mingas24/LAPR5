import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService {
  createUser(userDTO: IUserDTO): Promise<Result<IUserDTO>>;
  //updateUser(userDTO: IUserDTO): Promise<Result<IUserDTO>>
}
