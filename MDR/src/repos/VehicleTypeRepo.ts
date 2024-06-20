import { Service, Inject } from 'typedi';

import IVehicleTypeRepo from "../services/IRepos/IVehicleTypeRepo";
import { VehicleType } from "../domain/VehicleTypes/VehicleType";
import { VehicleTypeName } from "../domain/VehicleTypes/VehicleTypeName";
import { VehicleTypeMap } from "../mappers/VehicleTypeMap";

import { Document, Model } from 'mongoose';
import { IVehicleTypePersistence } from '../dataschema/IVehicleTypePersistence';

@Service()
export default class VehicleTypeRepo implements IVehicleTypeRepo {
  private models: any;

  constructor(
    @Inject('vehicleTypeSchema') private vehicleTypeSchema: Model<IVehicleTypePersistence & Document>,
  ) { }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(VehicleType: VehicleType): Promise<boolean> {

    const codeX = VehicleType.vehicleTypeName.name;

    const query = { code: codeX };
    const vehicleTypeFound = await this.vehicleTypeSchema.findOne(query);

    return !!vehicleTypeFound === true;
  }

  public async save(vehicleType: VehicleType): Promise<VehicleType> {
    const query = { domainName: vehicleType.vehicleTypeName.name };

    const vehicleTypeDocument = await this.vehicleTypeSchema.findOne(query);

    try {
      if (vehicleTypeDocument === null) {
        const rawVehicleType: any = VehicleTypeMap.toPersistence(vehicleType);

        const vehicleTypeCreated = await this.vehicleTypeSchema.create(rawVehicleType);

        return VehicleTypeMap.toDomain(vehicleTypeCreated);
      } else {
        vehicleTypeDocument.name = vehicleType.vehicleTypeName.name;
        await vehicleTypeDocument.save();

        return vehicleType;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainName(vehicleTypeId: VehicleTypeName | string): Promise<VehicleType> {
    const query = { domainId: vehicleTypeId };
    const vehicleTypeRecord = await this.vehicleTypeSchema.findOne(query);

    if (vehicleTypeRecord != null) {
      return VehicleTypeMap.toDomain(vehicleTypeRecord);
    }
    else
      return null;
  }

  public async findAll(): Promise<VehicleType[]> {
    const dtDocument = await this.vehicleTypeSchema.find({});
    var dtArray = [];

    try {
      if (dtDocument === null) {
        return null;
      } else {
        for (var i = 0; i < dtDocument.length; i++) {
          dtArray[i] = VehicleTypeMap.toDomain(dtDocument[i]);
        }
        return dtArray;
      }
    } catch (err) {
      throw err;
    }
  }
}