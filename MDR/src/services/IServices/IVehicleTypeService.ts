import { Result } from "../../core/logic/Result";
import IVehicleTypeDTO from "../../dto/IVehicleTypeDTO";

export default interface IVehicleTypeService  {
  createVehicleType(vehicleTypeDTO: IVehicleTypeDTO): Promise<Result<IVehicleTypeDTO>>;
  // updateVehicleType(vehicleTypeDTO: IVehicleTypeDTO): Promise<Result<IVehicleTypeDTO>>;
  getVehicleTypes(): Promise<IVehicleTypeDTO[]>
}
