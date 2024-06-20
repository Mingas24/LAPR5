import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface EmissionsProps {
  emissions: number;
}

export class Emissions extends ValueObject<EmissionsProps> {

  get emissions(): number {
    return this.props.emissions;
  }

  private constructor(props) {
    super(props);
  }

  public static create(emissions: number): Result<Emissions> {
    const guardResult = Guard.againstNullOrUndefined(emissions, 'emissions');
    if (!guardResult.succeeded) {
      return Result.fail<Emissions>(guardResult.message);
    } else {
      return Result.ok<Emissions>(new Emissions({ emissions: emissions }));
    }
  }
}