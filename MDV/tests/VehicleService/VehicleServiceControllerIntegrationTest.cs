using System.Collections.Generic;
using MDV.Controllers;
using MDV.Domain.VehicleService;
using MDV.Domain.Shared;
using MDV.Services;
using MDV.Infrastructure.Workblocks;
using Moq;
using Xunit;
using MDV.Domain.Workblocks;
using MDV.Domain.Trips;

namespace tests.VehicleServices
{
    public class VehicleServiceControllerIntegrationTest
    {

        [Fact]
        public async void GetAll()
        {
            var repo = new Mock<IVehicleServiceRepository>();
            var uow = new Mock<IUnitOfWork>();
            var wRepo = new Mock<IWorkblockRepository>();
            var tRepo = new Mock<ITripRepository>();

            string name = "VehicleService1";
            string code = "12345abcde";
            string color = "red";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };

            var vs = new VehicleServiceD(name, code, color, workblockList);

            var vsDTO = new VehicleServiceDTO
            {
                Id = vs.Id.AsGuid(),
                vehicleServiceName = name,
                vehicleServiceCode = code,
                vehicleServiceColor = color,
                workblockList = workblockList
            };
            var driverList = new List<VehicleServiceD>() { vs };
            var driverDTOList = new List<VehicleServiceDTO>() { vsDTO };


            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(driverList);

            var wservice = new WorkblockService(uow.Object, wRepo.Object, tRepo.Object);
            var service = new VehicleServiceService(uow.Object, repo.Object, wservice);
            var controller = new VehicleServiceController(service);

            var actual = await controller.GetAll();

            Assert.Equal(driverDTOList, actual.Value);
        }

        [Fact]
        public void GetGetById()
        {

            var repo = new Mock<IVehicleServiceRepository>();
            var uow = new Mock<IUnitOfWork>();
            var wRepo = new Mock<IWorkblockRepository>();
            var tRepo = new Mock<ITripRepository>();

            string name = "VehicleService1";
            string code = "12345abcde";
            string color = "red";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };

            var vs = new VehicleServiceD(name, code, color, workblockList);

            var vsDTO = new VehicleServiceDTO
            {
                Id = vs.Id.AsGuid(),
                vehicleServiceName = name,
                vehicleServiceCode = code,
                vehicleServiceColor = color,
                workblockList = workblockList
            };

            var vsID = new VehicleServiceID(vs.Id.AsGuid());

            repo.Setup(_ => _.GetByIdAsync(vsID)).ReturnsAsync(vs);

            var wservice = new WorkblockService(uow.Object, wRepo.Object, tRepo.Object);
            var service = new VehicleServiceService(uow.Object, repo.Object, wservice);
            var controller = new VehicleServiceController(service);

            var actual = controller.GetGetById(vs.Id.AsGuid());

            Assert.Equal(vsDTO, actual.Result.Value);
        }

        [Fact]
        public async void Create()
        {

            var repo = new Mock<IVehicleServiceRepository>();
            var uow = new Mock<IUnitOfWork>();
            var wRepo = new Mock<IWorkblockRepository>();
            var tRepo = new Mock<ITripRepository>();

            string name = "VehicleService1";
            string code = "12345abcde";
            string color = "red";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };
            List<string> stL = new List<string>() { "WB1010" };

            var vs = new VehicleServiceD(name, code, color, workblockList);

            var vsDTO = new VehicleServiceDTO
            {
                Id = vs.Id.AsGuid(),
                vehicleServiceName = name,
                vehicleServiceCode = code,
                vehicleServiceColor = color,
                workblockList = workblockList
            };
            var vsList = new List<VehicleServiceD>() { vs };
            var vsDTOList = new List<VehicleServiceDTO>() { vsDTO };

            var vsID = new VehicleServiceID(vs.Id.AsGuid());
            var creatingVsDTO = new CreatingVehicleServiceDTO(name, code, color, stL);

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(vsList);

            var wservice = new WorkblockService(uow.Object, wRepo.Object, tRepo.Object);
            var service = new VehicleServiceService(uow.Object, repo.Object, wservice);
            var controller = new VehicleServiceController(service);


            var actual = await controller.Create(creatingVsDTO);

            Assert.NotNull(actual);
            Assert.NotNull(actual.Result);
        }
    }
}