using System.Collections.Generic;
using MDV.Controllers;
using MDV.Domain.Workblocks;
using MDV.DTO.Workblocks;
using MDV.Domain.Trips;
using MDV.Services;
using Moq;
using Xunit;

namespace tests.Workblocks
{
    public class WorkblocksControllerTest
    {

        [Fact]
        public async void GetAll()
        {
            var driverServiceMock = new Mock<IWorkblockService>();

            string startTime = "20-10-2021 11:00";
            string endTime = "20-10-2021 12:00";
            string code = "WB1010";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };

            var driver = new Workblock(startTime, endTime, code, tripList);

            var driverDTO = new WorkblockDTO
            {
                Id = driver.Id.AsGuid(),
                StartTime = startTime,
                EndTime = endTime,
                WorkblockCode = code,
                trips = tripList
            };
            var driverList = new List<Workblock>() { driver };
            var driverDTOList = new List<WorkblockDTO>() { driverDTO };

            driverServiceMock.Setup(_ => _.GetAllAsync()).ReturnsAsync(driverDTOList);

            var controller = new WorkblockController(driverServiceMock.Object);

            var actual = await controller.GetAll();

            Assert.Equal(driverDTOList, actual.Value);
        }

        [Fact]
        public void GetGetById()
        {

            var driverServiceMock = new Mock<IWorkblockService>();

            string startTime = "20-10-2021 11:00";
            string endTime = "20-10-2021 12:00";
            string code = "WB1010";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };

            var driver = new Workblock(startTime, endTime, code, tripList);

            var driverDTO = new WorkblockDTO
            {
                Id = driver.Id.AsGuid(),
                StartTime = startTime,
                EndTime = endTime,
                WorkblockCode = code,
                trips = tripList
            };

            var driverID = new WorkblockID(driver.Id.AsGuid());
            driverServiceMock.Setup(_ => _.GetByIdAsync(driverID)).ReturnsAsync(driverDTO);

            var controller = new WorkblockController(driverServiceMock.Object);

            var actual = controller.GetGetById(driver.Id.AsGuid());

            Assert.Equal(driverDTO, actual.Result.Value);
        }

        [Fact]
        public async void Create () {

           var driverServiceMock = new Mock<IWorkblockService>();

            string startTime = "20-10-2021 11:00";
            string endTime = "20-10-2021 12:00";
            string code = "WB1010";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<string> stL = new List<string>(){"T1010"};

            var driver = new Workblock(startTime, endTime, code, tripList);

            var driverDTO = new WorkblockDTO
            {
                Id = driver.Id.AsGuid(),
                StartTime = startTime,
                EndTime = endTime,
                WorkblockCode = code,
                trips = tripList
            };

            var driverID = new WorkblockID(driver.Id.AsGuid());

            var creatingDriverDTO = new CreatingWorkblockDTO(startTime,endTime,code,stL);

            driverServiceMock.Setup (_ => _.GetByIdAsync (driverID)).ReturnsAsync (driverDTO);
            driverServiceMock.Setup (_ => _.AddAsync (creatingDriverDTO)).ReturnsAsync (driverDTO);


            var controller = new WorkblockController (driverServiceMock.Object);

            var actual = await controller.Create(creatingDriverDTO);

            Assert.NotNull(actual);
            Assert.NotNull(actual.Result);
        }

    }
}