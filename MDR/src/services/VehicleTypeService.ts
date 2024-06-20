import { Service, Inject } from 'typedi';
import config from "../../config";
import IVehicleTypeDTO from '../dto/IVehicleTypeDTO';
import { VehicleType } from "../domain/VehicleTypes/VehicleType";
import IVehicleTypeRepo from './IRepos/IVehicleTypeRepo';
import IVehicleTypeService from './IServices/IVehicleTypeService';
import { Result } from "../core/logic/Result";
import { VehicleTypeMap } from "../mappers/VehicleTypeMap";

@Service()
export default class VehicleTypeService implements IVehicleTypeService {
  constructor(
      @Inject(config.repos.vehicleType.name) private vehicleTypeRepo : IVehicleTypeRepo
  ) {}

  public async createVehicleType(vehicleTypeDTO: IVehicleTypeDTO): Promise<Result<IVehicleTypeDTO>> {
    try {

      const vehicleTypeOrError = await VehicleType.create( vehicleTypeDTO );

      if (vehicleTypeOrError.isFailure) {
        return Result.fail<IVehicleTypeDTO>(vehicleTypeOrError.errorValue());
      }

      const vehicleTypeResult = vehicleTypeOrError.getValue();

      await this.vehicleTypeRepo.save(vehicleTypeResult);

      const vehicleTypeDTOResult = VehicleTypeMap.toDTO( vehicleTypeResult ) as IVehicleTypeDTO;
      return Result.ok<IVehicleTypeDTO>( vehicleTypeDTOResult )
    } catch (e) {
      throw e;
    }
  }

  // public async updateVehicleType(vehicleTypeDTO: IVehicleTypeDTO): Promise<Result<IVehicleTypeDTO>> {
  //   try {
  //     const vehicleType = await this.vehicleTypeRepo.findByDomainName(vehicleTypeDTO.name);

  //     if (vehicleType === null) {
  //       return Result.fail<IVehicleTypeDTO>("VehicleType not found");
  //     }
  //     else {
  //       vehicleType.vehicleTypeName.name = vehicleTypeDTO.name;
  //       await this.vehicleTypeRepo.save(vehicleType);

  //       const vehicleTypeDTOResult = VehicleTypeMap.toDTO( vehicleType ) as IVehicleTypeDTO;
  //       return Result.ok<IVehicleTypeDTO>( vehicleTypeDTOResult )
  //       }
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  public async getVehicleTypes(): Promise<IVehicleTypeDTO[]> {

    var dt = [];
    try {
        const node = await this.vehicleTypeRepo.findAll()
        for (var i = 0; i < node.length; i++) {
          dt[i] = VehicleTypeMap.toDTO(node[i])
        }
        return dt;
    }
    catch (e) {
        throw e;
    }
}

}
