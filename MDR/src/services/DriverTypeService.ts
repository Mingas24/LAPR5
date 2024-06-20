import { Service, Inject } from 'typedi';
import config from "../../config";
import IDriverTypeDTO from '../dto/IDriverTypeDTO';
import { DriverType } from "../domain/DriverTypes/DriverType";
import IDriverTypeRepo from './IRepos/IDriverTypeRepo';
import IDriverTypeService from './IServices/IDriverTypeService';
import { Result } from "../core/logic/Result";
import { DriverTypeMap } from "../mappers/DriverTypeMap";

@Service()
export default class DriverService implements IDriverTypeService {
  constructor(
    @Inject(config.repos.driverType.name) private DriverTypeRepo: IDriverTypeRepo
  ) { }

  public async createDriverType(DriverTypeDTO: IDriverTypeDTO): Promise<Result<IDriverTypeDTO>> {
    try {

      const DriverOrError = await DriverType.create(DriverTypeDTO);

      if (DriverOrError.isFailure) {
        return Result.fail<IDriverTypeDTO>(DriverOrError.errorValue());
      }

      const DriverResult = DriverOrError.getValue();

      await this.DriverTypeRepo.save(DriverResult);

      const DriverDTOResult = DriverTypeMap.toDTO(DriverResult) as IDriverTypeDTO;
      return Result.ok<IDriverTypeDTO>(DriverDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async getDriverTypeByID(name: string): Promise<IDriverTypeDTO> {
    var dt;
    try {
      const findDT = await this.DriverTypeRepo.findByID(name)
      dt = DriverTypeMap.toDTO(findDT)
      return dt;
    }
    catch (e) {
      throw e;
    }
  }
  public async getDriverTypes(): Promise<IDriverTypeDTO[]> {

    var dt = [];
    try {
        const node = await this.DriverTypeRepo.findAll()
        for (var i = 0; i < node.length; i++) {
          dt[i] = DriverTypeMap.toDTO(node[i])
        }
        return dt;
    }
    catch (e) {
        throw e;
    }
}
}
