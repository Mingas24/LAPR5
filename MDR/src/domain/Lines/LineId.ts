import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface lineIdProps {
  id: number;
}

export class lineId extends ValueObject<lineIdProps> {
  get id(): number {
    return this.props.id;
  }

  set id(id: number) {
    this.props.id = id;
  }

  private constructor(props) {
    super(props);
  }

  public static create(id: number): Result<lineId> {
    const guardResult = Guard.againstNullOrUndefined(id, "lineId");
    if (!guardResult.succeeded) {
      return Result.fail<lineId>(guardResult.message);
    } else {
      return Result.ok<lineId>(
        new lineId({
          id: id,
        })
      );
    }
  }
}
