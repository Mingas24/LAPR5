import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface RoleProps {
  role: string;
}

export class Role extends ValueObject<RoleProps> {
  get role(): string {
    return this.props.role;
  }

  private constructor(props: RoleProps) {
    super(props);
  }

  public static create(role: string): Result<Role> {
    const guardResult = Guard.againstNullOrUndefined(role, "role");
    if (!guardResult.succeeded) {
      return Result.fail<Role>(guardResult.message);
    } else {
      return Result.ok<Role>(new Role({ role: role }));
    }
  }
}
