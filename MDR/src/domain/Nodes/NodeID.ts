import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface NodeIDProps {
  id: number;
}

export class NodeID extends ValueObject<NodeIDProps> {
  get id(): number {
    return this.props.id;
  }

  set id(id: number) {
    this.props.id = id;
  }
  private constructor(props) {
    super(props);
  }

  public static create(id: number): Result<NodeID> {
    const guardResult = Guard.againstNullOrUndefined(id, "NodeID");
    if (!guardResult.succeeded) {
      return Result.fail<NodeID>(guardResult.message);
    } else {
      return Result.ok<NodeID>(
        new NodeID({
          id: id,
        })
      );
    }
  }
}
