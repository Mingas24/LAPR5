using System.Collections.Generic;
using MDV.Controllers;
using MDV.Domain.Vehicle;
using MDV.Services;
using Moq;
using Xunit;
using MDV.Domain.Shared;


namespace tests.Vehicles
{
    public class VehicleControllerIntegrationTest
    {

        [Fact]
        public async void GetAll()
        {
            var vehicleServiceMock = new Mock<IVehicleService>();
            var repo = new Mock<IVehicleRepository>();
            var uow = new Mock<IUnitOfWork>();

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


            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(vehicleList);

            var vService = new VehicleService(uow.Object, repo.Object);
            var controller = new VehicleController(vService);


            var actual = await controller.GetAll();

            Assert.Equal(vehicleDTOList, actual.Value);
        }

        [Fact]
        public void GetGetById()
        {

            var vehicleServiceMock = new Mock<IVehicleService>();
            var repo = new Mock<IVehicleRepository>();
            var uow = new Mock<IUnitOfWork>();

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
            var vehicleID = new VehicleID(vehicle.Id.AsGuid());

            repo.Setup(_ => _.GetByIdAsync(vehicleID)).ReturnsAsync(vehicle);

            var vService = new VehicleService(uow.Object, repo.Object);
            var controller = new VehicleController(vService);

            var actual = controller.GetGetById(vehicle.Id.AsGuid());

            Assert.Equal(vehicleDTO, actual.Result.Value);
        }

        [Fact]
        public async void Create()
        {

            var vehicleServiceMock = new Mock<IVehicleService>();
            var repo = new Mock<IVehicleRepository>();
            var uow = new Mock<IUnitOfWork>();

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
            var creatingVehicleDTO = new CreatingVehicleDTO(licPlate, vin, vecType, startDate);

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(vehicleList);

            var vService = new VehicleService(uow.Object, repo.Object);
            var controller = new VehicleController(vService);


            var actual = await controller.Create(creatingVehicleDTO);

            Assert.NotNull(actual);
            Assert.NotNull(actual.Result);
        }

    }
}
