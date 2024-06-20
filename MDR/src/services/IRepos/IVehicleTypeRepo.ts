import { Repo } from "../../core/infra/Repo";
import { VehicleType } from "../../domain/VehicleTypes/VehicleType";

export default interface IVehicleTypeRepo extends Repo<VehicleType> {
  findByDomainName(name: string): Promise<VehicleType>;
  save(vehicleType: VehicleType): Promise<VehicleType>;
  findAll(): Promise<VehicleType[]>
}
