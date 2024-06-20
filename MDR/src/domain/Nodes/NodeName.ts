import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface NodeNameProps {
    name: string
}

export class NodeName extends ValueObject<NodeNameProps>{
    get name(): string {
        return this.props.name;
    }

    private constructor(props) {
        super(props)
    }

    public static create(name: string): Result<NodeName> {
        const guardResult = Guard.againstNullOrUndefined(name, 'name');
        if (!guardResult.succeeded) {
            return Result.fail<NodeName>(guardResult.message)
        } else {
            return Result.ok<NodeName>(new NodeName({ name: name }))
        }
    }
}