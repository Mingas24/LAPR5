import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface ConsumptionProps {
  consumption: number;
}

export class Consumption extends ValueObject<ConsumptionProps> {

  get consumption(): number {
    return this.props.consumption;
  }

  private constructor(props) {
    super(props);
  }

  public static create(consumption: number): Result<Consumption> {
    const guardResult = Guard.againstNullOrUndefined(consumption, 'consumption');
    if (!guardResult.succeeded) {
      return Result.fail<Consumption>(guardResult.message);
    } else {
      return Result.ok<Consumption>(new Consumption({ consumption: consumption }));
    }
  }
}