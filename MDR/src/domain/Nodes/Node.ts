import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { Result } from "../../core/logic/Result";
import { NodeName } from "./NodeName";
import { Latitude } from "./Latitude";
import { Longitude } from "./Longitude";
import { NodeShortName } from "./NodeShortName";
import INodeDTO from "../../dto/INodeDTO";
import { CrewTravelTime } from "./CrewTravelTime";
import { NodeID } from "./NodeID";
import { isUndefined } from "lodash";
import ICrewTravelTimeDTO from "../../dto/ICrewTravelTimeDTO";

interface NodeProps {
  nodeID: NodeID;
  name: NodeName;
  latitude: Latitude;
  longitude: Longitude;
  shortName: NodeShortName;
  isDepot: boolean;
  isReliefPoint: boolean;
  crewTravelTime: Array<CrewTravelTime>;
}

export class Node extends AggregateRoot<NodeProps> {
  private constructor(props: NodeProps) {
    super(props);
  }

  get nodeID(): NodeID {
    return this.props.nodeID;
  }

  get nodeName(): NodeName {
    return this.props.name;
  }

  get latitude(): Latitude {
    return this.props.latitude;
  }

  get longitude(): Longitude {
    return this.props.longitude;
  }

  get shortName(): NodeShortName {
    return this.props.shortName;
  }

  get isDepot(): boolean {
    return this.props.isDepot;
  }

  get isReliefPoint(): boolean {
    return this.props.isReliefPoint;
  }

  get crewTravelTime(): Array<CrewTravelTime> {
    return this.props.crewTravelTime;
  }

  public static create(nodeDTO: INodeDTO): Result<Node> {
    const id = NodeID.create(nodeDTO.nodeID);
    const name = NodeName.create(nodeDTO.name);
    const latitude = Latitude.create(nodeDTO.latitude);
    const longitude = Longitude.create(nodeDTO.longitude);
    const shortName = NodeShortName.create(nodeDTO.shortName);
    const isDepot = nodeDTO.isDepot;
    const isReliefPoint = nodeDTO.isReliefPoint;
    var crewTimeList: Array<CrewTravelTime> = [];
    if (!isUndefined(nodeDTO.crewTravelTime)) {
      for (var i = 0; i < nodeDTO.crewTravelTime.length; i++) {
        var crewTimeOrFailure = CrewTravelTime.create(
          nodeDTO.crewTravelTime[i] as ICrewTravelTimeDTO
        );
        crewTimeList.push(crewTimeOrFailure.getValue());
      }
    }

    const node = new Node({
      nodeID: id.getValue(),
      name: name.getValue(),
      latitude: latitude.getValue(),
      longitude: longitude.getValue(),
      shortName: shortName.getValue(),
      isDepot: isDepot,
      isReliefPoint: isReliefPoint,
      crewTravelTime: crewTimeList,
    });

    return Result.ok<Node>(node);
  }
}
