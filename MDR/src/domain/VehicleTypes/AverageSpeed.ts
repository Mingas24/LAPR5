import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface AverageSpeedProps {
  averageSpeed: number;
}

export class AverageSpeed extends ValueObject<AverageSpeedProps> {

  get averageSpeed(): number {
    return this.props.averageSpeed;
  }

  private constructor(props) {
    super(props);
  }

  public static create(averageSpeed: number): Result<AverageSpeed> {
    const guardResult = Guard.againstNullOrUndefined(averageSpeed, 'averageSpeed');
    if (!guardResult.succeeded) {
      return Result.fail<AverageSpeed>(guardResult.message);
    } else {
      return Result.ok<AverageSpeed>(new AverageSpeed({ averageSpeed: averageSpeed }));
    }
  }
}