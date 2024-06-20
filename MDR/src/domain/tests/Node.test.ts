import { expect } from 'chai';
import { Node } from '../Nodes/Node';
import { Result } from "../../../src/core/logic/Result";

describe('Node Test', () => {

    it('Can create Node.', () => {
        let expected = Result.ok<Node>();
        let result = Node.create({
            nodeID: 1,
            name: "test1",
            latitude: 45,
            longitude: 110,
            shortName: "t1",
            isDepot: false,
            isReliefPoint: true
        });
        
        expect(expected.isFailure).to.equal(result.isFailure);
        expect(expected.isSuccess).to.equal(result.isSuccess);
        expect(expected.error).to.equal(result.error);
    });

});