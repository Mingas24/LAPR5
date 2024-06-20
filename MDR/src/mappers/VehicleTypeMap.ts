import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IVehicleTypePersistence } from '../dataschema/IVehicleTypePersistence';

import IVehicleTypeDTO from "../dto/IVehicleTypeDTO";
import { VehicleType } from "../domain/VehicleTypes/VehicleType";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class VehicleTypeMap extends Mapper<VehicleType> {

    public static toDTO(vehicleType: VehicleType): IVehicleTypeDTO {
        return {
            name: vehicleType.vehicleTypeName.name,
            autonomy: vehicleType.autonomy.autonomy,
            cost: vehicleType.cost.cost,
            averageSpeed: vehicleType.averageSpeed.averageSpeed,
            energySource: vehicleType.energySource.energySource,
            consumption: vehicleType.consumption.consumption,
            emissions: vehicleType.emissions.emissions,
        } as unknown as IVehicleTypeDTO;
    }

    public static toDomain(vehicleType: any | Model<IVehicleTypePersistence & Document>): VehicleType {
        const vehicleTypeOrError = VehicleType.create(
            vehicleType,
            new UniqueEntityID(vehicleType.domainId)
        );

        vehicleTypeOrError.isFailure ? console.log(vehicleTypeOrError.error) : '';

        return vehicleTypeOrError.isSuccess ? vehicleTypeOrError.getValue() : null;
    }

    public static toPersistence(vehicleType: VehicleType): any {
        return {
            name: vehicleType.vehicleTypeName.name,
            autonomy: vehicleType.autonomy.autonomy,
            cost: vehicleType.cost.cost,
            averageSpeed: vehicleType.averageSpeed.averageSpeed,
            energySource: vehicleType.energySource.energySource,
            consumption: vehicleType.consumption.consumption,
            emissions: vehicleType.emissions.emissions,
        }
    }
}