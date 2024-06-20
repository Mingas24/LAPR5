const sinon = require('sinon');
import { Result } from '../../core/logic/Result';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import IVehicleTypeDTO from '../../dto/IVehicleTypeDTO';
import { VehicleTypeName } from '../../domain/VehicleTypes/VehicleTypeName';
import { Autonomy } from '../../domain/VehicleTypes/Autonomy';
import { CostPerKilometer } from '../../domain/VehicleTypes/CostPerKilometer';
import { AverageSpeed } from '../../domain/VehicleTypes/AverageSpeed';
import { EnergySource } from '../../domain/VehicleTypes/EnergySource';
import { Consumption } from '../../domain/VehicleTypes/Consumption';
import { Emissions } from '../../domain/VehicleTypes/Emissions';
import { VehicleType } from '../../domain/VehicleTypes/VehicleType';
import { VehicleTypeMap } from '../VehicleTypeMap';

describe('VehicleType Map Create', () => {

    const dto: IVehicleTypeDTO = {
        name: "VehicleTypeTest",
        autonomy: 45,
        cost: 45,
        averageSpeed:60,
        energySource: 23,
        consumption:10,
        emissions:15
    }

    const nameE = VehicleTypeName.create("VehicleTypeTest")
    const  autonomyE= Autonomy.create(45)
    const  costE= CostPerKilometer.create(45)
    const averageSpeedE = AverageSpeed.create(60)
    const energySourceE = EnergySource.create(23)
    const consumptionE = Consumption.create(10)
    const emissionsE = Emissions.create(15)

    let vehicleType: Result<VehicleType> = VehicleType.create({
        name: nameE.getValue().name,
        autonomy: autonomyE.getValue().autonomy,
        cost: costE.getValue().cost,
        averageSpeed:averageSpeedE.getValue().averageSpeed,
        energySource: energySourceE.getValue().energySource,
        consumption:consumptionE.getValue().consumption,
        emissions:emissionsE.getValue().emissions
    },new UniqueEntityID("vehicleType"))

    beforeEach(() => {
    });
    
    afterEach(function () {
        sinon.restore();
    });

    it('to DTO', async () => {
        sinon.assert.match(VehicleTypeMap.toDTO(vehicleType.getValue()), dto)
    });

    // it('to Domain', async () => {
    //     sinon.assert.match(await NodeMap.toDomain(dto), node.getValue())
    // });

    it('to persistence', async () => {
        sinon.assert.match(VehicleTypeMap.toPersistence(vehicleType.getValue()), dto)
    });
})