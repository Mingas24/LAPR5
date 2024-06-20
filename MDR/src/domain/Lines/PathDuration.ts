import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";


interface PathDurationProps {
    duration: number
}

export class PathDuration extends ValueObject<PathDurationProps>{

    get duration(): number {
        return this.props.duration
    }

    set duration(value: number) {
        this.props.duration = value
    }

    private constructor(props) {
        super(props)
    }

    public static create(duration: number): Result<PathDuration> {
        const guardResult = Guard.againstNullOrUndefined(duration, 'duration')
        if (!guardResult.succeeded) {
            return Result.fail<PathDuration>(guardResult.message)
        } else {
            return Result.ok<PathDuration>(new PathDuration({
                duration: duration
            }))
        }
    }
}