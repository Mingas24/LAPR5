import ILinePathDTO from "./ILinePathDTO";

export default interface ILineDTO {
  lineID: number,
  name: string,
  color: string,
  linePath?: Array<ILinePathDTO>
}