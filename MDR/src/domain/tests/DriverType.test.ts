// import { expect } from 'chai';
// import { DriverType } from '../../../src/domain/driverType';
// import { Result } from "../../../src/core/logic/Result";

// describe('Driver Type Test', () => {

//   it('Can create DriverType with id and description.', () => {
//     let expected = Result.ok<DriverType>();
//     let result = DriverType.create({ id: "driver1", description: "description1" });

//     expect(expected.isFailure).to.equal(result.isFailure);
//     expect(expected.isSuccess).to.equal(result.isSuccess);
//     expect(expected.error).to.equal(result.error);
//   });

//   it('Cant create DriverType with undefined description.', () => {
//     let expected = Result.fail<DriverType>('value is null or undefined');
//     let result = DriverType.create({ id: "driver1", description: "" });

//     expect(expected.isFailure).to.equal(result.isFailure);
//     expect(expected.isSuccess).to.equal(result.isSuccess);
//     expect(expected.error).to.equal(result.error);
//   });

//   it('Cant create DriverType with undefined id.', () => {
//     let expected = Result.fail<DriverType>('value is null or undefined');
//     let result = DriverType.create({ id: "", description: "driver with english speaking skill" });

//     expect(expected.isFailure).to.equal(result.isFailure);
//     expect(expected.isSuccess).to.equal(result.isSuccess);
//     expect(expected.error).to.equal(result.error);
//   });

//   it('Cant create DriverType with undefined id and undefined description.', () => {
//     let expected = Result.fail<DriverType>('value is null or undefined');
//     let result = DriverType.create({ id: "", description: "" });

//     expect(expected.isFailure).to.equal(result.isFailure);
//     expect(expected.isSuccess).to.equal(result.isSuccess);
//     expect(expected.error).to.equal(result.error);
//   });

//   it('Cant create DriverType with null id and null description.', () => {
//     let expected = Result.fail<DriverType>('value is null or undefined');
//     let result = DriverType.create({ id: null, description: null });

//     expect(expected.isFailure).to.equal(result.isFailure);
//     expect(expected.isSuccess).to.equal(result.isSuccess);
//     expect(expected.error).to.equal(result.error);
//   });

//   it('Cant create DriverType with null DTO', () => {
//     let expected = Result.fail<DriverType>("driverTypeDTO cant be null.");
//     let result = DriverType.create(null);

//     expect(expected.isFailure).to.equal(result.isFailure);
//     expect(expected.isSuccess).to.equal(result.isSuccess);
//     expect(expected.error).to.equal(result.error);
//   });

//   it('Cant create DriverType with id with more than 20 characters', () => {
//     let expected = Result.fail<DriverType>('value is bigger than the size limit.');
//     let result = DriverType.create({ id: "1234567891234567dfhgftgdrggr", description: "fiewjhgfriu" });

//     expect(expected.isFailure).to.equal(result.isFailure);
//     expect(expected.isSuccess).to.equal(result.isSuccess);
//     expect(expected.error).to.equal(result.error);
//   });

//   it('Cant create DriverType with description with more than 250 characters', () => {
//     let expected = Result.fail<DriverType>('value is bigger than the size limit.');
//     let randomDesc: string = "KDQBJjulkt5pkn8jNzKw1y1hcW4OpdFIZ6iVmfzzH1HruQYfp6ZS4GccOVjje6NIPvJDhhYGPg4kjNnveVfkHp6ygkUbzpaR3Ke9ul1oZ4rAnxOoyYIut7kCcHd2WHT5tN3Y8dCLpOTcWV5naQc2xe8hv9jhDH8rrJmAIbHmRhrGMflqOnO3UGqY6zxJRG8VcW0bS3NtmsM72WFZTlB61bRWlrKMy59ovV65QUlu1oXs5nUwLFq88B4qWiQbquXkCKgo";
//     let result = DriverType.create({ id: "1234567891234567", description: randomDesc });

//     expect(expected.isFailure).to.equal(result.isFailure);
//     expect(expected.isSuccess).to.equal(result.isSuccess);
//     expect(expected.error).to.equal(result.error);
//   });

// });