import { Service, Inject } from 'typedi';

import IDriverTypeRepo from "../services/IRepos/IDriverTypeRepo";
import { DriverType } from "../domain/DriverTypes/DriverType";
import { DriverTypeID } from "../domain/DriverTypes/DriverTypeId";
import { DriverTypeMap } from "../mappers/DriverTypeMap";

import { Document, Model } from 'mongoose';
import { IDriverTypePersistence } from '../dataschema/IDriverTypePersistence';

@Service()
export default class DriverRepo implements IDriverTypeRepo {
  private models: any;

  constructor(
    @Inject('driverTypeSchema') private driverSchema : Model<IDriverTypePersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (driver: DriverType | string): Promise<boolean> {

    const idX = driver instanceof DriverType ? (<DriverType>driver).driverTypeId.value : driver;

    const query = { id: idX.toString()}; 
    const driverDocument = await this.driverSchema.findOne( query );

    return !!driverDocument === true;
  }

  public async save (driver: DriverType): Promise<DriverType> {
    const query = { id: driver.driverTypeId.value}; 

    const driverDocument = await this.driverSchema.findOne( query );

    try {
      if (driverDocument === null ) {
        const rawDriver: any = DriverTypeMap.toPersistence(driver);

        const driverCreated = await this.driverSchema.create(rawDriver);

        return DriverTypeMap.toDomain(driverCreated);
      } else {
        driverDocument.description = driver.description.description;
        await driverDocument.save();    

        return driver;
      }
    } catch (err) {
        
      throw err;
    }
  }

  public async findByDomainId (driverId: DriverTypeID | string): Promise<DriverType> {
    const query = { id: driverId};
    const driverRecord = await this.driverSchema.findOne( query );

    if( driverRecord != null) {
      return DriverTypeMap.toDomain(driverRecord);
    }
    else
      return null;
  }

  public async findByID(name:string): Promise<DriverType> {
    const query = { id: name };
    const dtDocument = await this.driverSchema.findOne(query);
    var dt;
    try {
      if (dtDocument === null) {
        return null;
      } else {
        dt = DriverTypeMap.toDomain(dtDocument);
        return dt;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findAll(): Promise<DriverType[]> {
    const dtDocument = await this.driverSchema.find({});
    var dtArray = [];

    try {
      if (dtDocument === null) {
        return null;
      } else {
        for (var i = 0; i < dtDocument.length; i++) {
          dtArray[i] = DriverTypeMap.toDomain(dtDocument[i]);
        }
        return dtArray;
      }
    } catch (err) {
      throw err;
    }
  }
}