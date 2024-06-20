import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import * as bcrypt from 'bcrypt-nodejs';

interface ColorProps {
  color: string;
}

export class lineColor extends ValueObject<ColorProps> {

  get color(): string {
    return this.props.color;
  }

  set color(value: string) {
    this.props.color = value;
  }

  private constructor(props) {
    super(props)
  }

  public static create(color: string): Result<lineColor> {
    const guardResult = Guard.againstNullOrUndefined(color, 'color');
    if (!guardResult.succeeded) {
      return Result.fail<lineColor>(guardResult.message);
    } else {
      return Result.ok<lineColor>(new lineColor({ color: color }))
    }
  }
}