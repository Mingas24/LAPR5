using System.Collections.Generic;
using MDV.Controllers;
using MDV.Domain.Vehicle;
using MDV.Services;
using Moq;
using Xunit;


namespace tests.Vehicles
{
    public class VehicleControllerTest
    {

        [Fact]
        public async void GetAll()
        {
            var vehicleServiceMock = new Mock<IVehicleService>();

            string licPlate = "JJ-00-FF";
            string vin = "12345678956986959";
            string vecType = "Autocarro";
            string startDate = "10-10-2020";
            

            var vehicle = new Vehicle(licPlate, vin, vecType, startDate);

            var vehicleDTO = new VehicleDTO
            {
                Id = vehicle.Id.AsGuid(),
                licensePlate = licPlate,
                vehicleVIN = vin,
                vehicleTypeID = vecType,
                vehicleEntranceDate = startDate
                
            };
            var vehicleList = new List<Vehicle>() { vehicle };
            var vehicleDTOList = new List<VehicleDTO>() { vehicleDTO };


            vehicleServiceMock.Setup(_ => _.GetAllAsync()).ReturnsAsync(vehicleDTOList);

            var controller = new VehicleController(vehicleServiceMock.Object);

            var actual = await controller.GetAll();

            Assert.Equal(vehicleDTOList, actual.Value);
        }

        [Fact]
        public void GetGetById () {

           var vehicleServiceMock = new Mock<IVehicleService>();

            string licPlate = "JJ-00-FF";
            string vin = "12345678956986959";
            string vecType = "Autocarro";
            string startDate = "10-10-2020";

            var vehicle = new Vehicle(licPlate, vin, vecType, startDate);
            var vehicleID = new VehicleID(vehicle.Id.AsGuid());
            var vehicleDTO = new VehicleDTO
            {
                Id = vehicle.Id.AsGuid(),
                licensePlate = licPlate,
                vehicleVIN = vin,
                vehicleTypeID = vecType,
                vehicleEntranceDate = startDate
            };

            vehicleServiceMock.Setup(_ => _.GetByIdAsync (vehicleID)).ReturnsAsync (vehicleDTO);

            var controller = new VehicleController (vehicleServiceMock.Object);

            var actual = controller.GetGetById (vehicle.Id.AsGuid ());

            Assert.Equal (vehicleDTO, actual.Result.Value);
        }

        [Fact]
        public async void Create () {

            var serviceServiceMock = new Mock<IVehicleService> ();

            string licPlate = "JJ-00-FF";
            string vin = "12345678956986959";
            string vecType = "Autocarro";
            string startDate = "10-10-2020";

            var vehicle = new Vehicle(licPlate, vin, vecType, startDate);
            var creatingVehicleDTO = new CreatingVehicleDTO(licPlate, vin, vecType, startDate);

            var vehicleDTO = new VehicleDTO
            {
                Id = vehicle.Id.AsGuid(),
                licensePlate = licPlate,
                vehicleVIN = vin,
                vehicleTypeID = vecType,
                vehicleEntranceDate = startDate
            };
            var vehicleID = new VehicleID (vehicle.Id.AsGuid());

            serviceServiceMock.Setup (_ => _.GetByIdAsync (vehicleID)).ReturnsAsync (vehicleDTO);
            serviceServiceMock.Setup (_ => _.AddAsync (creatingVehicleDTO)).ReturnsAsync (vehicleDTO);

           
            var controller = new VehicleController (serviceServiceMock.Object);

            var actual = await controller.Create(creatingVehicleDTO);

            Assert.NotNull(actual);
            Assert.NotNull(actual.Result);
        }

    }
}