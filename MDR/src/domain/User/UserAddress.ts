import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface UserAddressProps {
  address: string;
}

export class UserAddress extends ValueObject<UserAddressProps> {
  get address(): string {
    return this.props.address;
  }

  private constructor(props) {
    super(props);
  }

  public static create(address: string): Result<UserAddress> {
    const guardResult = Guard.againstNullOrUndefined(address, "address");
    if (!guardResult.succeeded) {
      return Result.fail<UserAddress>(guardResult.message);
    } else {
      return Result.ok<UserAddress>(new UserAddress({ address: address }));
    }
  }
}
