import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface AutonomyProps {
  autonomy: number;
}

export class Autonomy extends ValueObject<AutonomyProps> {

  get autonomy(): number {
    return this.props.autonomy;
  }

  private constructor(props) {
    super(props)
  }

  public static create(autonomy: number): Result<Autonomy> {
    const guardResult = Guard.againstNullOrUndefined(autonomy, 'autonomy');
    if (!guardResult.succeeded) {
      return Result.fail<Autonomy>(guardResult.message);
    } else {
      return Result.ok<Autonomy>(new Autonomy({ autonomy: autonomy }))
    }
  }
}