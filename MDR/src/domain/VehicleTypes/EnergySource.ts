import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface EnergySourceProps {
  energySource: number;
}

export class EnergySource extends ValueObject<EnergySourceProps> {

  get energySource(): number {
    return this.props.energySource;
  }

  private constructor(props) {
    super(props);
  }

  public static create(energySource: number): Result<EnergySource> {
    const guardResult = Guard.againstNullOrUndefined(energySource, 'energySource');
    if (!guardResult.succeeded) {
      return Result.fail<EnergySource>(guardResult.message);
    } else {
      return Result.ok<EnergySource>(new EnergySource({ energySource: energySource }));
    }
  }
}