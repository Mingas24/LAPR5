import { Repo } from "../../core/infra/Repo";
import { DriverType } from "../../domain/DriverTypes/DriverType";
import { DriverTypeID } from "../../domain/DriverTypes/DriverTypeId";

export default interface IDriverTypeRepo extends Repo<DriverType> {
  save(driver: DriverType): Promise<DriverType>;
  findByDomainId (driverId: DriverTypeID | string): Promise<DriverType>;
  findByID(any):Promise<DriverType>
  findAll(): Promise<DriverType[]>
}
