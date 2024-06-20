import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from "mongoose";
import { INodePersistance } from "../dataschema/INodePersistance";
import INodeDTO from "../dto/INodeDTO";
import { Node } from "../domain/Nodes/Node";
import ICrewTravelTimeDTO from "../dto/ICrewTravelTimeDTO";
import { isUndefined } from "lodash";

export class NodeMap extends Mapper<Node> {
  public static toDTO(node: Node): INodeDTO {
    var newCrewTime: Array<ICrewTravelTimeDTO> = [];
    if (!isUndefined(node.crewTravelTime)) {
      for (var i = 0; i < node.crewTravelTime.length; i++) {
        var id = node.crewTravelTime[i].id;
        var nodeID = node.crewTravelTime[i].nodeID.id;
        var duration = node.crewTravelTime[i].duration;
        var tmp = {
          id: id,
          nodeID: nodeID,
          duration: duration,
        };
        newCrewTime.push(tmp);
      }
      return {
        nodeID: node.nodeID.id,
        name: node.nodeName.name,
        latitude: node.latitude.latitude,
        longitude: node.longitude.longitude,
        shortName: node.shortName.shortName,
        isDepot: node.isDepot,
        isReliefPoint: node.isReliefPoint,
        crewTravelTime: newCrewTime,
      } as INodeDTO;
    } else {
      return {
        nodeID: node.nodeID.id,
        name: node.nodeName.name,
        latitude: node.latitude.latitude,
        longitude: node.longitude.longitude,
        shortName: node.shortName.shortName,
        isDepot: node.isDepot,
        isReliefPoint: node.isReliefPoint,
      } as INodeDTO;
    }
  }

  public static toDomain(node: any | Model<INodePersistance & Document>): Node {
    const nodeOrError = Node.create(node);

    nodeOrError.isFailure ? console.log(nodeOrError.error) : "Error!";

    return nodeOrError.isSuccess ? nodeOrError.getValue() : null;
  }

  public static toPersistence(node: Node): any {
    var newCrewTime: Array<ICrewTravelTimeDTO> = [];
    if (!isUndefined(node.crewTravelTime)) {
      for (var i = 0; i < node.crewTravelTime.length; i++) {
        var id = node.crewTravelTime[i].id;
        var nodeID = node.crewTravelTime[i].nodeID.id;
        var duration = node.crewTravelTime[i].duration;
        var tmp = {
          id: id,
          nodeID: nodeID,
          duration: duration,
        } as ICrewTravelTimeDTO;
        newCrewTime.push(tmp);
      }
      return {
        nodeID: node.nodeID.id,
        name: node.nodeName.name,
        latitude: node.latitude.latitude,
        longitude: node.longitude.longitude,
        shortName: node.shortName.shortName,
        isDepot: node.isDepot,
        isReliefPoint: node.isReliefPoint,
        crewTravelTime: newCrewTime,
      };
    } else {
      return {
        nodeID: node.nodeID.id,
        name: node.nodeName.name,
        latitude: node.latitude.latitude,
        longitude: node.longitude.longitude,
        shortName: node.shortName.shortName,
        isDepot: node.isDepot,
        isReliefPoint: node.isReliefPoint,
      };
    }
  }
}
