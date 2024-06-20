import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import * as bcrypt from 'bcrypt-nodejs';

interface OrientationProps {
  orientation: string;
}

export class orientation extends ValueObject<OrientationProps> {

  get orientation(): string {
    return this.props.orientation;
  }

  private constructor(props) {
    super(props)
  }

  public static create(orient: string): Result<orientation> {
    const guardResult = Guard.againstNullOrUndefined(orient, 'orientation');
    if (!guardResult.succeeded) {
      return Result.fail<orientation>(guardResult.message);
    } else {
      return Result.ok<orientation>(new orientation({ orientation: orient }))
    }
  }
}