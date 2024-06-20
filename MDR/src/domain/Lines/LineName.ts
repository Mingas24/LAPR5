import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import * as bcrypt from 'bcrypt-nodejs';

interface NameProps {
  name: string;
}

export class lineName extends ValueObject<NameProps> {

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value
  }

  private constructor(props) {
    super(props)
  }

  public static create(name: string): Result<lineName> {
    const guardResult = Guard.againstNullOrUndefined(name, 'name');
    if (!guardResult.succeeded) {
      return Result.fail<lineName>(guardResult.message);
    } else {
      return Result.ok<lineName>(new lineName({ name: name }))
    }
  }
}