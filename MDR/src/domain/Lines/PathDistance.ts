import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";


interface PathDistanceProps {
    distance: number
}

export class PathDistance extends ValueObject<PathDistanceProps>{

    get distance(): number {
        return this.props.distance
    }

    set distance(value: number) {
        this.props.distance = value
    }

    private constructor(props) {
        super(props)
    }

    public static create(distance: number): Result<PathDistance> {
        const guardResult = Guard.againstNullOrUndefined(distance, 'distance')
        if (!guardResult.succeeded) {
            return Result.fail<PathDistance>(guardResult.message)
        } else {
            return Result.ok<PathDistance>(new PathDistance({
                distance: distance
            }))
        }
    }
}