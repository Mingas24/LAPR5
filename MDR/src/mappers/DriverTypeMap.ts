import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from "mongoose";
import { IDriverTypePersistence } from "../dataschema/IDriverTypePersistence";

import IDriverTypeDTO from "../dto/IDriverTypeDTO";
import { DriverType } from "../domain/DriverTypes/DriverType";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class DriverTypeMap extends Mapper<DriverType> {
  public static toDTO(driver: DriverType): IDriverTypeDTO {
    return {
      id: driver.driverTypeId.value,
      description: driver.description.description,
    } as IDriverTypeDTO;
  }

  public static toDomain(
    driver: any | Model<IDriverTypePersistence & Document>
  ): DriverType {
    const driverOrError = DriverType.create(
      driver
    );

    driverOrError.isFailure ? console.log(driverOrError.error) : "";

    return driverOrError.isSuccess ? driverOrError.getValue() : null;
  }

  public static toPersistence(driver: DriverType): any {
    return {
      id: driver.driverTypeId.value,
      description: driver.description.description,
    };
  }
}
