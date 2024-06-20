import { ILinePathPersistence } from "./ILinePathPersistence";

export interface ILinePersistence {
  lineID: number;
  name: string;
  color: string;
  linePath?: Array<ILinePathPersistence>;
}
