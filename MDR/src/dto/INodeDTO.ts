import ICrewTravelTimeDTO from "./ICrewTravelTimeDTO";

export default interface INodeDTO {
  nodeID: number;
  name: string;
  latitude: number;
  longitude: number;
  shortName: string;
  isDepot: boolean;
  isReliefPoint: boolean;
  crewTravelTime?: Array<ICrewTravelTimeDTO>;
}
