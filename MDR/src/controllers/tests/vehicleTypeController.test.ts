import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from "../../../config";

import { Result } from '../../core/logic/Result';
import IVehicleTypeService from "../../services/IServices/IVehicleTypeService";
import VehicleTypeController from "../VehicleTypeController";
import IVehicleTypeDTO from '../../dto/IVehicleTypeDTO';

describe('VehicleType Controller', function () {
    beforeEach(function () {
    });

    it('returns created VehicleType', async function () {
        let body = {
            "name": 'Autocarro',
            "autonomy": 50000,
            "cost": 10,
            "averageSpeed": 50,
            "energySource": 23,
            "consumption": 15,
            "emissions": 250
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy(),
            status: function (s) { this.statusCode = s; return this; }
        };
        let next: Partial<NextFunction> = () => { };

        let vehicleTypeRepoClass = require(config.tests.path + config.services.vehicleType.path).default;
        let vehicleTypeServiceInstance = Container.get(vehicleTypeRepoClass);
        Container.set(config.repos.vehicleType.name, vehicleTypeServiceInstance);

        vehicleTypeServiceInstance = Container.get(config.repos.vehicleType.name);
        sinon.stub(vehicleTypeServiceInstance, "createVehicleType").returns(Result.ok<IVehicleTypeDTO>({
            "name": body.name,
            "autonomy": body.autonomy,
            "cost": body.cost,
            "averageSpeed": body.averageSpeed,
            "energySource": body.energySource,
            "consumption": body.consumption,
            "emissions": body.emissions
        }));

        const ctrl = new VehicleTypeController(vehicleTypeServiceInstance as IVehicleTypeService);

        await ctrl.createVehicleType(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(body));
    });
});