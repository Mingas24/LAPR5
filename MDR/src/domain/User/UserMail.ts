import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface UserMailProps {
  mail: string;
}

export class UserMail extends ValueObject<UserMailProps> {
  get mail(): string {
    return this.props.mail;
  }

  private constructor(props) {
    super(props);
  }

  public static create(mail: string): Result<UserMail> {
    const guardResult = Guard.againstNullOrUndefined(mail, "mail");
    if (!guardResult.succeeded) {
      return Result.fail<UserMail>(guardResult.message);
    } else {
      return Result.ok<UserMail>(new UserMail({ mail: mail }));
    }
  }
}
