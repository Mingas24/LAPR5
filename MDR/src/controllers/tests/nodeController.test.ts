import * as sinon from "sinon";
import { Response, Request, NextFunction } from "express";
import { Container } from "typedi";
import config from "../../../config";

import { Result } from "../../core/logic/Result";
import INodeDTO from "../../dto/INodeDTO";
import NodeController from "../NodeController";
import INodeService from "../../services/IServices/INodeService";

describe("Node Controller", function() {
  beforeEach(function() {});

  it("Returns Created Node", async function() {
    let body = {
      nodeID: 1,
      name: "Capela",
      latitude: 45,
      longitude: 124,
      shortName: "CAP",
      isDepot: false,
      isReliefPoint: true,
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: function(s) {
        this.statusCode = s;
        return this;
      },
    };
    let next: Partial<NextFunction> = () => {};

    let nodeRepoClass = require(config.tests.path + config.services.node.path)
      .default;
    let nodeServiceInstance = Container.get(nodeRepoClass);
    Container.set(config.repos.node.name, nodeServiceInstance);

    nodeServiceInstance = Container.get(config.repos.node.name);
    sinon.stub(nodeServiceInstance, "createNode").returns(
      Result.ok<INodeDTO>({
        nodeID: body.nodeID,
        name: body.name,
        latitude: body.latitude,
        longitude: body.longitude,
        shortName: body.shortName,
        isDepot: body.isDepot,
        isReliefPoint: body.isReliefPoint,
      })
    );

    const ctrl = new NodeController(nodeServiceInstance as INodeService);

    await ctrl.createNode(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(body));
  });
});
