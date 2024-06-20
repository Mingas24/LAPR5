using System.Collections.Generic;
using MDV.Domain.VehicleService;
using MDV.Domain.Shared;
using MDV.Services;
using Moq;
using Xunit;
using MDV.Domain.Workblocks;
using MDV.Domain.Trips;

namespace tests.VehicleServices
{

    public class VehicleServiceServiceTest
    {
        [Fact]
        public async void GetAllAsyncTest()
        {
            var repo = new Mock<IVehicleServiceRepository>();
            var uow = new Mock<IUnitOfWork>();
            var repoWb = new Mock<IWorkblockService>();

            string name = "VehicleService1";
            string code = "12345abcde";
            string color = "red";
            Node node = new Node("1",12);
            List<Node> nodeList = new List<Node>(){node};
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>(){new Workblock("20-10-2021 11:00","20-10-2021 12:00","WB1010",tripList)};

            var vs = new VehicleServiceD(name,code,color,workblockList);

             var vsDTO = new VehicleServiceDTO
            {
                Id = vs.Id.AsGuid(),
                vehicleServiceName = name,
                vehicleServiceCode = code,
                vehicleServiceColor = color,
                workblockList=workblockList
            };
            var driversDTO = new List<VehicleServiceDTO>() { vsDTO };

            var drivers = new List<VehicleServiceD>() { vs };

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(drivers);

            var driverService = new VehicleServiceService(uow.Object, repo.Object, repoWb.Object);

            var actual = await driverService.GetAllAsync();

            Assert.Equal(driversDTO, actual);

       }

        [Fact]
        public async void GetByIdTest()
        {
            var repo = new Mock<IVehicleServiceRepository>();
            var uow = new Mock<IUnitOfWork>();
            var repoWb = new Mock<IWorkblockService>();

            string name = "VehicleService1";
            string code = "12345abcde";
            string color = "red";
            Node node = new Node("1",12);
            List<Node> nodeList = new List<Node>(){node};
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>(){new Workblock("20-10-2021 11:00","20-10-2021 12:00","WB1010",tripList)};

            var vs = new VehicleServiceD(name,code,color,workblockList);

             var vsDTO = new VehicleServiceDTO
            {
                Id = vs.Id.AsGuid(),
                vehicleServiceName = name,
                vehicleServiceCode = code,
                vehicleServiceColor = color,
                workblockList=workblockList
            };

            repo.Setup(_ => _.GetByIdAsync(vs.Id)).ReturnsAsync(vs);

           var driverService = new VehicleServiceService(uow.Object, repo.Object, repoWb.Object);

            var actual = await driverService.GetByIdAsync(vs.Id);

            Assert.Equal(vsDTO, actual);
        }

        [Fact]
        public async void AddDriver()
        {
         var repo = new Mock<IVehicleServiceRepository>();
            var uow = new Mock<IUnitOfWork>();
            var repoWb = new Mock<IWorkblockService>();

            string name = "VehicleService1";
            string code = "12345abcde";
            string color = "red";
            Node node = new Node("1",12);
            List<Node> nodeList = new List<Node>(){node};
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>(){new Workblock("20-10-2021 11:00","20-10-2021 12:00","WB1010",tripList)};

            var vs = new VehicleServiceD(name,code,color,workblockList);

             var vsDTO = new VehicleServiceDTO
            {
                Id = vs.Id.AsGuid(),
                vehicleServiceName = name,
                vehicleServiceCode = code,
                vehicleServiceColor = color,
                workblockList=workblockList
            };

            List<string> stL = new List<string>(){"WB1010"};
            var creatingDriverDTO = new CreatingVehicleServiceDTO(name,code,color,stL);

            repo.Setup(_ => _.AddAsync(vs)).ReturnsAsync(vs);

            var driverService = new VehicleServiceService(uow.Object, repo.Object, repoWb.Object);

            var actual = await driverService.AddAsync(creatingDriverDTO);

            Assert.Equal(vsDTO, actual);
        }

    }

 }