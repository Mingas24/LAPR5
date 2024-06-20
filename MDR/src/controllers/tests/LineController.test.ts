// import { expect } from 'chai';
// import * as sinon from 'sinon';

// import { Response, Request, NextFunction } from 'express';

// import { Container } from 'typedi';
// import config from "../../config";

// import ILineService from "../services/IServices/ILineService";

// import ILineDTO from '../dto/ILineDTO';
// import { Result } from '../core/logic/Result';
// import ILineController from './IControllers/ILineController';


// describe('Line Controller Create Test', () => {

//     let req: Partial<Request> = {};
//     let next: Partial<NextFunction> = () => { };

//     const body: ILineDTO = {
//         "name": "teste1",
//         "color": "color1",
//         "linePath": [{ "orientation": "GO" }]
//     }

//     req.body = body

//     let lineServiceClass = require(config.services.line.path).default;
//     let lineServiceInstance: ILineService = Container.get(lineServiceClass)
//     Container.set(config.services.line.name, lineServiceInstance);
//     lineServiceInstance = Container.get(config.services.line.name);
//     let lineControllerClass = require(config.controller.line.path).default;
//     let lineControllerInstance: ILineController = Container.get(lineControllerClass);
//     Container.set(config.controller.line.name, lineControllerInstance);
//     lineControllerInstance = Container.get(config.controller.line.name);

//     beforeEach(() => {

//         sinon.stub(lineServiceInstance, "createLine").returns(Result.ok<ILineDTO>({
//             "name": req.body.name,
//             "color": req.body.code,
//             "linePath": req.body.linePath
//         }));
//     });
//     afterEach(function () {
//         sinon.restore();
//     });
//     it('should create ', async () => {

//         const jsonStub = sinon.stub()
//         const res = { status: status => ({ json: jsonStub, send: err => err }) }
//         const statusSpy = sinon.spy(res, 'status')

//         await lineControllerInstance.createLine(<Request>req, <Response>res, <NextFunction>next);
//         sinon.assert.calledWith(res.status, 201);
//         sinon.assert.calledWith(jsonStub, {
//             "name": req.body.name,
//             "color": req.body.code,
//             "linePath": req.body.linePath
//         });
//     });

// })