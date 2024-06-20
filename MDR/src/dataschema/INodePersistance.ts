export interface INodePersistance {
  nodeID: number;
  name: string;
  latitude: number;
  longitude: number;
  shortName: string;
  isDepot: boolean;
  isReliefPoint: boolean;
  crewTravelTime?: [{ id: number; nodeID: number; duration: number }];
}
