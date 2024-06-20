import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { VehicleTypeName } from './VehicleTypeName';
import { EnergySource } from './EnergySource';
import { Autonomy } from './Autonomy';
import { CostPerKilometer } from "./CostPerKilometer";
import { Consumption } from "./Consumption";
import { AverageSpeed } from "./AverageSpeed";
import { Emissions } from "./Emissions";
import IVehicleTypeDTO from '../../dto/IVehicleTypeDTO';

interface VehicleTypeProps {
    name: VehicleTypeName;
    autonomy: Autonomy;
    cost: CostPerKilometer;
    averageSpeed: AverageSpeed;
    energySource: EnergySource;
    consumption: Consumption;
    emissions: Emissions;
}

export class VehicleType extends AggregateRoot<VehicleTypeProps> {

  get id(): UniqueEntityID {
    return this._id;
  }

  get vehicleTypeName(): VehicleTypeName {
    return this.props.name;
  }

  set vehicleTypeName(value: VehicleTypeName) {
    this.props.name = value;
  }

  get autonomy(): Autonomy {
    return this.props.autonomy;
  }

  set autonomy(value: Autonomy) {
    this.props.autonomy = value;
  }

  get cost(): CostPerKilometer {
    return this.props.cost;
  }

  set cost(value: CostPerKilometer) {
    this.props.cost = value;
  }

  get averageSpeed(): AverageSpeed {
    return this.props.averageSpeed;
  }

  set averageSpeed(value: AverageSpeed) {
    this.props.averageSpeed = value;
  }

  get energySource(): EnergySource {
    return this.props.energySource;
  }

  set energySource(value: EnergySource) {
    this.props.energySource = value;
  }

  get consumption(): Consumption {
    return this.props.consumption;
  }

  set consumption(value: Consumption) {
    this.props.consumption = value;
  }

  get emissions(): Emissions {
    return this.props.emissions;
  }

  set emissions(value: Emissions) {
    this.props.emissions = value;
  }
  
  private constructor(props: VehicleTypeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(vehicleTypeDTO: IVehicleTypeDTO, id?: UniqueEntityID): Result<VehicleType> {

    const name = VehicleTypeName.create(vehicleTypeDTO.name);
    const autonomy = Autonomy.create(vehicleTypeDTO.autonomy);
    const cost = CostPerKilometer.create(vehicleTypeDTO.cost);
    const averageSpeed = AverageSpeed.create(vehicleTypeDTO.averageSpeed);
    const energySource = EnergySource.create(vehicleTypeDTO.energySource);
    const consumption = Consumption.create(vehicleTypeDTO.consumption);
    const emissions = Emissions.create(vehicleTypeDTO.emissions);

    const vehicleType = new VehicleType({
      name: name.getValue(),
      autonomy: autonomy.getValue(),
      cost: cost.getValue(),
      averageSpeed: averageSpeed.getValue(),
      energySource: energySource.getValue(),
      consumption: consumption.getValue(),
      emissions: emissions.getValue()
    }, id);

    return Result.ok<VehicleType>(vehicleType);
  }
}
