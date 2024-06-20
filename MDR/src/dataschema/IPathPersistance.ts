import { IPathNodePersistence } from "./IPathNodePersistance";

export interface IPathPersistence {
  key: string
	isEmpty: boolean
	pathNode: Array<IPathNodePersistence>
  }