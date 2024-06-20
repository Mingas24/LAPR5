
import { Entity } from "../../core/domain/Entity";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";


interface DriverTypeIDProps  {
  value: string;
}

export class DriverTypeID extends ValueObject<DriverTypeIDProps> {
  get value(): string {
      return this.props.value;
  }

  

  private constructor(props: DriverTypeIDProps) {
      super(props);
  }

  public static create(value: string): Result<DriverTypeID> {
      const guardResult = Guard.againstNullOrUndefined(value, 'value');

      if (!guardResult.succeeded) {
          return Result.fail<DriverTypeID>(guardResult.message);
      } else {
          return Result.ok<DriverTypeID>(new DriverTypeID({ value: value }))
      }
  }
}