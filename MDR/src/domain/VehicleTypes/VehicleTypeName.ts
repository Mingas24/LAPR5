import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface NameProps {
  name: string;
}

export class VehicleTypeName extends ValueObject<NameProps> {

  get name(): string {
    return this.props.name;
  }

  private constructor(props) {
    super(props)
  }

  public static create(name: string): Result<VehicleTypeName> {
    const guardResult = Guard.againstNullOrUndefined(name, 'name');
    if (!guardResult.succeeded) {
      return Result.fail<VehicleTypeName>(guardResult.message);
    } else {
      return Result.ok<VehicleTypeName>(new VehicleTypeName({ name: name }))
    }
  }
}