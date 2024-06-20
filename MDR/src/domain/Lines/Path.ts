import { Entity } from '../../core/domain/Entity'
import { Result } from '../../core/logic/Result'
import IPathDTO from '../../dto/IPathDTO'
import IPathNodeDTO from '../../dto/IPathNodeDTO'
import { PathNode } from './PathNode'
import { PathID } from './PathID'
import { isUndefined } from 'lodash'

interface PathProps {
    key: PathID
    isEmpty: Boolean
    pathNode?: Array<PathNode>
}

export class Path extends Entity<PathProps>{
    get isEmpty(): Boolean {
        return this.props.isEmpty
    }

    get ID(): PathID{
        return this.props.key
    }
    get pathNodes(): Array<PathNode> {
        return this.props.pathNode
    }

    private constructor(props: PathProps) {
        super(props)
    }

    public static create(pathDTO: IPathDTO): Result<Path> {
        const key = PathID.create(pathDTO.key)
        const isEmpty = pathDTO.isEmpty
        var pathList: Array<PathNode> = []
        if (!isUndefined(pathDTO.pathNode)) {
            for (var i = 0; i < pathDTO.pathNode.length; i++) {
              var pathOrFailure = PathNode.create(pathDTO.pathNode[i] as IPathNodeDTO)
              pathList.push(pathOrFailure.getValue());
            }
          }

        const path = new Path({
            key: key.getValue(),
            isEmpty: isEmpty,
            pathNode: pathList
        })
        return Result.ok<Path>(path);
    }
}