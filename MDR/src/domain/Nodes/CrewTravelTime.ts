import { Result } from "../../core/logic/Result";
import { Entity } from "../../core/domain/Entity";
import ICrewTravelTimeDTO from "../../dto/ICrewTravelTimeDTO";
import { NodeID } from "./NodeID";

interface CrewTravelTimeProps {
  id: number;
  nodeID: NodeID;
  duration: number;
}

export class CrewTravelTime extends Entity<CrewTravelTimeProps> {
  get id(): number {
    return this.props.id;
  }

  get duration(): number {
    return this.props.duration;
  }

  get nodeID(): NodeID {
    return this.props.nodeID;
  }

  private constructor(props) {
    super(props);
  }

  public static create(crewTime: ICrewTravelTimeDTO): Result<CrewTravelTime> {
    const id = crewTime.id;
    const node = NodeID.create(crewTime.nodeID);
    const duration = crewTime.duration;

    const crew = new CrewTravelTime({
      id: id,
      nodeID: node.getValue(),
      duration: duration,
    });
    return Result.ok<CrewTravelTime>(crew);
  }
}
