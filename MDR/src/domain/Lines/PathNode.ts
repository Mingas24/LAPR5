import { Entity } from '../../core/domain/Entity'
import { Result } from '../../core/logic/Result'
import IPathNodeDTO from '../../dto/IPathNodeDTO'
import { NodeName } from '../Nodes/NodeName'
import { PathDistance } from './PathDistance'
import { PathDuration } from './PathDuration'

interface PathNodeProps {
    node1: NodeName
    node2: NodeName
    duration?: PathDuration
    distance?: PathDistance
}

export class PathNode extends Entity<PathNodeProps>{

    get node1(): NodeName {
        return this.props.node1
    }
    
    get node2(): NodeName {
        return this.props.node2
    }

    get duration(): PathDuration{
        return this.props.duration
    }

    get distance(): PathDistance{
        return this.props.distance
    }

    private constructor(props: PathNodeProps) {
        super(props)
    }

    public static create(pathNodeDTO: IPathNodeDTO): Result<PathNode> {
        const node1 = NodeName.create(pathNodeDTO.node1)
        const node2 = NodeName.create(pathNodeDTO.node2)
        const duration = PathDuration.create(pathNodeDTO.duration)
        const distance = PathDistance.create(pathNodeDTO.distance)
        
        const pathNode = new PathNode({
            node1: node1.getValue(),
            node2: node2.getValue(),
            duration: duration.getValue(),
            distance: distance.getValue(),
        })

        return Result.ok<PathNode>(pathNode)

    }
}