import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";


interface LongitudeProps {
    longitude: number
}

export class Longitude extends ValueObject<LongitudeProps>{

    get longitude(): number {
        return this.props.longitude
    }

    set longitude(value: number) {
        this.props.longitude = value
    }

    private constructor(props) {
        super(props)
    }

    public static create(longitude: number): Result<Longitude> {
        const guardResult = Guard.againstNullOrUndefined(longitude, 'longitude')
        if (!guardResult.succeeded) {
            return Result.fail<Longitude>(guardResult.message)
        } else {
            return Result.ok<Longitude>(new Longitude({
                longitude: longitude
            }))
        }
    }
}