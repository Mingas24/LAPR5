import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from "../../../config";

import { Result } from '../../core/logic/Result';
import IDriverTypeService from "../../services/IServices/IDriverTypeService";
import DriverTypeController from "../DriverTypeController";
import IDriverTypeDTO from '../../dto/IDriverTypeDTO';

describe('DriverType Controller', function () {
    beforeEach(function () {
    });

    it('returns created DriverType', async function () {
        let body = {
            "id": 'D1',
            "description": 'test'
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy(),
            status: function (s) { this.statusCode = s; return this; }
        };
        let next: Partial<NextFunction> = () => { };

        let driverTypeRepoClass = require(config.tests.path + config.services.driverType.path).default;
        let driverTypeServiceInstance = Container.get(driverTypeRepoClass);
        Container.set(config.repos.driverType.name, driverTypeServiceInstance);

        driverTypeServiceInstance = Container.get(config.repos.driverType.name);
        sinon.stub(driverTypeServiceInstance, "createDriverType").returns(Result.ok<IDriverTypeDTO>({
            "id": 'D1',
            "description": 'test'
        }));

        const ctrl = new DriverTypeController(driverTypeServiceInstance as IDriverTypeService);

        await ctrl.createDriverType(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(body));
    });
});