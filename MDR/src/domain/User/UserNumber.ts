import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PNumberProps {
  pNumber: number;
}

export class UserNumber extends ValueObject<PNumberProps> {
  get pNumber(): number {
    return this.props.pNumber;
  }

  private constructor(props) {
    super(props);
  }

  public static create(pNumber: number): Result<UserNumber> {
    const guardResult = Guard.againstNullOrUndefined(pNumber, "pNumber");
    if (!guardResult.succeeded) {
      return Result.fail<UserNumber>(guardResult.message);
    } else {
      return Result.ok<UserNumber>(
        new UserNumber({
          pNumber: pNumber,
        })
      );
    }
  }
}
