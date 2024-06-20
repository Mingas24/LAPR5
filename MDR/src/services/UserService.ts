import { Service, Inject } from "typedi";
import config from "../../config";
import { IUserDTO } from "../dto/IUserDTO";
import { User } from "../domain/User/User";
import { IUserRepo } from "../services/IRepos/IUserRepo";
import IUserService from "./IServices/IUserService";
import { Result } from "../core/logic/Result";
import { UserMap } from "../mappers/UserMap";

@Service()
export default class UserService implements IUserService {
  constructor(@Inject(config.repos.user.name) private userRepo: IUserRepo) {}

  public async createUser(userDTO: IUserDTO): Promise<Result<IUserDTO>> {
    try {
      const userOrError = await User.create(userDTO);

      if (userOrError.isFailure) {
        return Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      await this.userRepo.save(userResult);

      const userDTOResult = UserMap.toDTO(userResult) as IUserDTO;
      return Result.ok<IUserDTO>(userDTOResult);
    } catch (e) {
      throw e;
    }
  }

  /*
    public async updateUser(userDTO: IUserDTO): Promise<Result<IUserDTO>> {
        try {
            const user = await this.userRepo.findByDomainId(userDTO.name);
 
            if (user === null) {
                return Result.fail<IUserDTO>("User not found");
            }
            else {
                user.name = userDTO.name;
                await this.userRepo.save(user);
 
                const userDTOResult = UserMap.toDTO(user) as IUserDTO;
                return Result.ok<IUserDTO>(userDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }
*/
}
