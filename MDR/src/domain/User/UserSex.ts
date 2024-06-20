import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface UserSexProps {
  sex: string;
}

export class UserSex extends ValueObject<UserSexProps> {
  get sex(): string {
    return this.props.sex;
  }

  private constructor(props) {
    super(props);
  }

  public static create(sex: string): Result<UserSex> {
    const guardResult = Guard.againstNullOrUndefined(sex, "sex");
    if (!guardResult.succeeded) {
      return Result.fail<UserSex>(guardResult.message);
    } else {
      return Result.ok<UserSex>(new UserSex({ sex: sex }));
    }
  }
}
