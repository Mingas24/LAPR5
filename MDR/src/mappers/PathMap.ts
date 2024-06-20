import { Mapper } from "../core/infra/Mapper"
import { Document, Model } from 'mongoose'
import { IPathPersistence } from '../dataschema/IPathPersistance'
import { Path } from "../domain/Lines/Path"
import IPathDTO from "../dto/IPathDTO"
import IPathNodeDTO from "../dto/IPathNodeDTO"
import { isUndefined } from "lodash"

export class PathMap extends Mapper<Path> {

    public static toDTO(path: Path): IPathDTO {
        var newPathNode: Array<IPathNodeDTO> = []
        if (!isUndefined(path.pathNodes)) {
            path.pathNodes.forEach(e => {
                var temp = {
                    node1: e.node1.name,
                    node2: e.node2.name,
                    duration: e.duration.duration,
                    distance: e.distance.distance
                }
                newPathNode.push(temp)
            })
        }
        return {
            key: path.ID.value,
            isEmpty: path.isEmpty,
            pathNode: newPathNode
        } as IPathDTO
    }

    public static toDomain(path: any | Model<IPathPersistence & Document>): Path {
        const pathOrError = Path.create(
            path
        )

        pathOrError.isFailure ? console.log(pathOrError.error) : 'Error!'

        return pathOrError.isSuccess ? pathOrError.getValue() : null
    }

    public static toPersistence(path: Path): any {
        var newPathNode: Array<IPathNodeDTO> = []
        if (!isUndefined(path.pathNodes)) {
            path.pathNodes.forEach(e => {
                var temp = {
                    node1: e.node1.name,
                    node2: e.node2.name,
                    duration: e.duration.duration,
                    distance: e.distance.distance
                }
                newPathNode.push(temp)
            })
        }
        return {
            key: path.ID.value,
            isEmpty: path.isEmpty,
            pathNode: newPathNode
        }
    }
}