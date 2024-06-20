import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";


interface NodeShortNameProps {
    shortName: string
}

export class NodeShortName extends ValueObject<NodeShortNameProps>{
    get shortName(): string {
        return this.props.shortName
    }

    private constructor(props) {
        super(props)
    }

    public static create(shortName: string): Result<NodeShortName> {
        const guardResult = Guard.againstNullOrUndefined(shortName, 'name');
        if (!guardResult.succeeded) {
            return Result.fail<NodeShortName>(guardResult.message)
        } else {
            return Result.ok<NodeShortName>(new NodeShortName({ shortName: shortName }))
        }
    }
}