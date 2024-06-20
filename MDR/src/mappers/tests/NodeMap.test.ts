const sinon = require("sinon");
import { Result } from "../../core/logic/Result";
import INodeDTO from "../../dto/INodeDTO";
import { NodeName } from "../../domain/Nodes/NodeName";
import { Latitude } from "../../domain/Nodes/Latitude";
import { Longitude } from "../../domain/Nodes/Longitude";
import { NodeShortName } from "../../domain/Nodes/NodeShortName";
import { Node } from "../../domain/Nodes/Node";
import { NodeMap } from "../NodeMap";
import { NodeID } from "../../domain/Nodes/NodeID";

describe("node map create", () => {
  const dto: INodeDTO = {
    nodeID: 1,
    name: "nodeTest",
    latitude: 45,
    longitude: 45,
    shortName: "nT",
    isDepot: false,
    isReliefPoint: true,
  };
  const nodeIDE = NodeID.create(1);
  const nameE = NodeName.create("nodeTest");
  const latitudeE = Latitude.create(45);
  const longitudeE = Longitude.create(45);
  const shortNameE = NodeShortName.create("nT");
  const isDepotE = false;
  const isReliefPointE = true;

  let node: Result<Node> = Node.create({
    nodeID: nodeIDE.getValue().id,
    name: nameE.getValue().name,
    latitude: latitudeE.getValue().latitude,
    longitude: longitudeE.getValue().longitude,
    shortName: shortNameE.getValue().shortName,
    isDepot: isDepotE,
    isReliefPoint: isReliefPointE,
  });

  beforeEach(() => {});

  afterEach(function() {
    sinon.restore();
  });

  it("to DTO", async () => {
    sinon.assert.match(NodeMap.toDTO(node.getValue()), dto);
  });

  // it('to Domain', async () => {
  //     sinon.assert.match(await NodeMap.toDomain(dto), node.getValue())
  // });

  it("to persistence", async () => {
    sinon.assert.match(NodeMap.toPersistence(node.getValue()), dto);
  });
});
