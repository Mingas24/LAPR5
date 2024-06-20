import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface UserBirthProps {
  birth: number;
}

export class UserBirth extends ValueObject<UserBirthProps> {
  get birth(): number {
    return this.props.birth;
  }
  private constructor(props) {
    super(props);
  }

  public static create(birth: number): Result<UserBirth> {
    const guardResult = Guard.againstNullOrUndefined(birth, "birth");
    if (!guardResult.succeeded) {
      return Result.fail<UserBirth>(guardResult.message);
    } else {
      return Result.ok<UserBirth>(
        new UserBirth({
          birth: birth,
        })
      );
    }
  }
}
