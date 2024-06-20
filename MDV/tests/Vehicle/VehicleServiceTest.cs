using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MDV.Controllers;
using MDV.Domain.Vehicle;
using MDV.Domain.Shared;
using MDV.Services;
using MDV.Infrastructure.Vehicles;
using Moq;
using Xunit;
using System;



namespace Tests.Vehicles
{

    public class VehicleServiceTest
    {

        [Fact]
        public async void GetAllAsyncTest()
        {
            var repo = new Mock<IVehicleRepository>();
            var uow = new Mock<IUnitOfWork>();

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

            var vehiclesDTO = new List<VehicleDTO>() { vehicleDTO };

            var vehicles = new List<Vehicle>() { vehicle };

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(vehicles);

            var vehicleService = new VehicleService(uow.Object, repo.Object);

            var actual = await vehicleService.GetAllAsync();

            Assert.Equal(vehiclesDTO, actual);

        }

        [Fact]
        public async void GetByIdTest()
        {
            var repo = new Mock<IVehicleRepository>();
            var uow = new Mock<IUnitOfWork>();

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
            
            var vehiclesDTO = new List<VehicleDTO>() { vehicleDTO };

            var vehicles = new List<Vehicle>() { vehicle };

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(vehicles);

            var vehicleService = new VehicleService(uow.Object, repo.Object);

            var actual = await vehicleService.GetAllAsync();

            Assert.Equal(vehiclesDTO, actual);
        }

        [Fact]
        public async void AddDriver()
        {
            var repo = new Mock<IVehicleRepository>();
            var uow = new Mock<IUnitOfWork>();

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
            
            var vehiclesDTO = new List<VehicleDTO>() { vehicleDTO };

            var vehicles = new List<Vehicle>() { vehicle };

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(vehicles);

            var vehicleService = new VehicleService(uow.Object, repo.Object);

            var actual = await vehicleService.GetAllAsync();

            Assert.Equal(vehiclesDTO, actual);
        }

    }

}