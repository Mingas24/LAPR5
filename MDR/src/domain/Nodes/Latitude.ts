import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";


interface LatitudeProps {
    latitude: number
}

export class Latitude extends ValueObject<LatitudeProps>{

    get latitude(): number {
        return this.props.latitude
    }

    set latitude(value: number) {
        this.props.latitude = value
    }

    private constructor(props) {
        super(props)
    }

    public static create(latitude: number): Result<Latitude> {
        const guardResult = Guard.againstNullOrUndefined(latitude, 'latitude');
        if (!guardResult.succeeded) {
            return Result.fail<Latitude>(guardResult.message)
        } else {

            return Result.ok<Latitude>(new Latitude({
                latitude: latitude
            }))
        }
    }
}