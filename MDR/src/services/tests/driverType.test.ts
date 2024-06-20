// const sinon = require('sinon');
// import Container from 'typedi';
// import config from '../../config'
// import IDriverTypeService from '../IServices/IDriverTypeService'
// import IDriverTypeDTO from "../dto/IDriverTypeDTO";
// import { Result } from '../core/logic/Result';
// import IDriverTypeRepo from '../IRepos/IDriverTypeRepo';
// import { driverType } from "../domain/driverType";
// import DriverTypeService from '../DriverTypeService';
// import DriverTypeRepo from '../repos/driverTypeRepo';
// import { Description } from '../../domain/description';

// describe('DriverType service create', () => {

//     const id = 'Driver1';
//     const description = Description.create("testService");

//     let driverType: Result<driverType> = DriverType.create({
//         code: id,
//         description: description

//     })

//     let res = Result.ok<IDriverTypeDTO>({
//         id: 'Driver1',
//         description: 'testService'

//     })

//     const dto: IDriverTypeDTO = {
//         id: 'Driver1',
//         description: 'testService'
//     }



//     let DriverTypeRepoClass = require(config.repos.DriverType.path).default
//     let DriverTypeRepoInstance: IDriverTypeRepo = Container.get(DriverTypeRepoClass)
//     Container.set(config.repos.DriverType.name, DriverTypeRepoInstance)
//     DriverTypeRepoInstance = Container.get(config.repos.DriverType.name);

//     let DriverTypeServiceInstance = new DriverTypeService(DriverTypeRepoInstance);

//     beforeEach(() => {
//     });

//     afterEach(function () {
//         sinon.restore();
//     });

//     it('should create ', async () => {
//         sinon.stub(DriverTypeRepoInstance, "save").returns(DriverType.getValue())
//         sinon.assert.match((await DriverTypeServiceInstance.createDriverType(dto)), res);
//     })
// })