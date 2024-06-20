using System.Collections.Generic;
using MDV.Controllers;
using MDV.Domain.VehicleService;
using MDV.Services;
using Moq;
using Xunit;
using MDV.Domain.Workblocks;
using MDV.Domain.Trips;

namespace tests.VehicleServices
{
    public class VehicleServiceControllerTest
    {

        [Fact]
        public async void GetAll()
        {
            var vsServiceMock = new Mock<IVehicleServiceService>();

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


            vsServiceMock.Setup(_ => _.GetAllAsync()).ReturnsAsync(driverDTOList);

            var controller = new VehicleServiceController(vsServiceMock.Object);

            var actual = await controller.GetAll();

            Assert.Equal(driverDTOList, actual.Value);
        }

        [Fact]
        public void GetGetById()
        {

            var vsServiceMock = new Mock<IVehicleServiceService>();

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

            vsServiceMock.Setup(_ => _.GetByIdAsync(vsID)).ReturnsAsync(vsDTO);

            var controller = new VehicleServiceController(vsServiceMock.Object);

            var actual = controller.GetGetById(vs.Id.AsGuid());

            Assert.Equal(vsDTO, actual.Result.Value);
        }

        [Fact]
        public async void Create()
        {

            var vsServiceMock = new Mock<IVehicleServiceService>();

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

            var vsID = new VehicleServiceID(vs.Id.AsGuid());
            var creatingVsDTO = new CreatingVehicleServiceDTO(name, code, color, stL);

            vsServiceMock.Setup(_ => _.GetByIdAsync(vsID)).ReturnsAsync(vsDTO);
            vsServiceMock.Setup(_ => _.AddAsync(creatingVsDTO)).ReturnsAsync(vsDTO);


            var controller = new VehicleServiceController(vsServiceMock.Object);

            var actual = await controller.Create(creatingVsDTO);

            Assert.NotNull(actual);
            Assert.NotNull(actual.Result);
        }
    }
}