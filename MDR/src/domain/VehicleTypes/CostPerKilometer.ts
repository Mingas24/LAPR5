import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CostPerKilometerProps {
  cost: number;
}

export class CostPerKilometer extends ValueObject<CostPerKilometerProps> {

  get cost(): number {
    return this.props.cost;
  }

  private constructor(props) {
    super(props);
  }

  public static create(cost: number): Result<CostPerKilometer> {
    const guardResult = Guard.againstNullOrUndefined(cost, 'cost');
    if (!guardResult.succeeded) {
      return Result.fail<CostPerKilometer>(guardResult.message);
    } else {
      return Result.ok<CostPerKilometer>(new CostPerKilometer({ cost: cost }));
    }
  }
}