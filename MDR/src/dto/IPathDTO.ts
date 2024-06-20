import IPathNodeDTO from "./IPathNodeDTO";

export default interface IPathDTO {
    key: string
    isEmpty: Boolean
    pathNode: Array<IPathNodeDTO>
}