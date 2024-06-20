import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PathIDProps {
    value: string;
}

export class PathID extends ValueObject<PathIDProps> {
    get value(): string {
        return this.props.value;
    }

    private constructor(props: PathIDProps) {
        super(props);
    }

    public static create(value: string): Result<PathID> {
        const guardResult = Guard.againstNullOrUndefined(value, 'value');

        if (!guardResult.succeeded) {
            return Result.fail<PathID>(guardResult.message);
        } else {
            return Result.ok<PathID>(new PathID({ value: value }))
        }
    }
}