// const sinon = require('sinon');
// import { Result } from '../../core/logic/Result';
// import INodeDTO from '../../dto/INodeDTO';
// import { NodeName } from '../../models/Nodes/NodeName';
// import { Latitude } from '../../models/Nodes/Latitude';
// import { Longitude } from '../../models/Nodes/Longitude';
// import { NodeShortName } from '../../models/Nodes/NodeShortName';
// import { Node } from '../../models/Nodes/Node';
// import { NodeMap } from '../NodeMap';
// import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
// import IDriverTypeDTO from '../../dto/IDriverTypeDTO';
// import { Description } from '../../domain/description';
// import { DriverType } from '../../domain/driverType';
// import { DriverTypeId } from '../../domain/driverTypeId';
// import { DriverTypeMap } from '../DriverTypeMap';

// describe('Driver Type map create', () => {

//     const dto: IDriverTypeDTO = {
//         id:"1",
//         description:"English"
//     }

//     const descriptionE = Description.create("English")
//     const idE = DriverTypeId.create(new UniqueEntityID("1"))

//     let driverType: Result<DriverType> = DriverType.create({
//         id:idE.props.getValue(),
//         description: descriptionE.getValue().description,
//     },new UniqueEntityID("1"))

//     beforeEach(() => {
//     });
    
//     afterEach(function () {
//         sinon.restore();
//     });

//     it('to DTO', async () => {
//         sinon.assert.match(DriverTypeMap.toDTO(driverType.getValue()), dto)
//     });

//     // it('to Domain', async () => {
//     //     sinon.assert.match(await NodeMap.toDomain(dto), node.getValue())
//     // });

//     it('to persistence', async () => {
//         sinon.assert.match(DriverTypeMap.toPersistence(driverType.getValue()), dto)
//     });
// })