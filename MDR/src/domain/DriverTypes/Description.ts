import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface DescriptionProps {
  description: string;
}

export class Description extends ValueObject<DescriptionProps> {

  get description(): string {
    return this.props.description;
  }

  private constructor(props) {
    super(props)
  }

  public static create(description: string): Result<Description> {
    const guardResult = Guard.againstNullOrUndefined(description, 'description');
    if (!guardResult.succeeded) {
      return Result.fail<Description>(guardResult.message);
    } else {
      return Result.ok<Description>(new Description({ description: description }))
    }
  }
}