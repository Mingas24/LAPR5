const sinon = require('sinon');
import { Result } from '../../core/logic/Result';
import { NodeName } from '../../domain/Nodes/NodeName';
import IPathDTO from '../../dto/IPathDTO';
import { PathDuration } from '../../domain/Lines/PathDuration';
import { PathDistance } from '../../domain/Lines/PathDistance';
import { PathID } from '../../domain/Lines/PathID';
import { Path } from '../../domain/Lines/Path';
import { PathMap } from '../PathMap';

describe('path map create', () => {

    const node1 = NodeName.create("node1")
    const node2 = NodeName.create("node2")
    const duration = PathDuration.create(100)
    const distance = PathDistance.create(200)
    var pathList = []
    pathList[0] = {
        node1: node1,
        node2: node2,
        duration: duration,
        distance: distance
    }
    const dto: IPathDTO = {
        key: "keyTest",
        isEmpty: false,
        pathNode: pathList

    }

    const keyE = PathID.create("keyTest")
    const isEmptyE = false
    const node3 = NodeName.create("node1")
    const node4 = NodeName.create("node2")
    const durationE = PathDuration.create(100)
    const distanceE = PathDistance.create(200)
    var pathListE = []
    pathListE[0] = {
        node1: node3,
        node2: node4,
        duration: durationE,
        distance: distanceE
    }

    let path: Result<Path> = Path.create({
        key: keyE.getValue().value,
        isEmpty:isEmptyE,
        pathNode:pathListE
    })

    beforeEach(() => {
    });

    afterEach(function () {
        sinon.restore();
    });

    it('to DTO', async () => {
        sinon.assert.match(PathMap.toDTO(path.getValue()), dto)
    });

    // it('to Domain', async () => {
    //     sinon.assert.match(await NodeMap.toDomain(dto), node.getValue())
    // });

    it('to persistence', async () => {
        sinon.assert.match(PathMap.toPersistence(path.getValue()), dto)
    });
})