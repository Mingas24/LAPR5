using System.Collections.Generic;
using MDV.Domain.VehicleService;
using MDV.Domain.Shared;
using MDV.Services;
using Moq;
using Xunit;
using MDV.Domain.Workblocks;
using MDV.Domain.Trips;
using MDV.DTO.Workblocks;
using MDV.Infrastructure.Workblocks;

namespace tests.Workblocks
{

    public class WorkblockServiceTest
    {
        [Fact]
        public async void GetAllAsyncTest()
        {
            var repo = new Mock<IWorkblockRepository>();
            var uow = new Mock<IUnitOfWork>();
            var repoT = new Mock<ITripRepository>();

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

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(driverList);

            var driverService = new WorkblockService(uow.Object, repo.Object, repoT.Object);

            var actual = await driverService.GetAllAsync();

            Assert.Equal(driverDTOList, actual);

        }

        [Fact]
        public async void GetByIdTest()
        {
            var repo = new Mock<IWorkblockRepository>();
            var uow = new Mock<IUnitOfWork>();
            var repoT = new Mock<ITripRepository>();

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

            repo.Setup(_ => _.GetByIdAsync(driver.Id)).ReturnsAsync(driver);

            var driverService = new WorkblockService(uow.Object, repo.Object, repoT.Object);

            var actual = await driverService.GetByIdAsync(driver.Id);

            Assert.Equal(driverDTO, actual);
        }

        [Fact]
        public async void AddDriver()
        {
            var repo = new Mock<IWorkblockRepository>();
            var uow = new Mock<IUnitOfWork>();
            var repoT = new Mock<ITripRepository>();

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
            List<string> stL = new List<string>() { "T1010" };

            var creatingDriverDTO = new CreatingWorkblockDTO(startTime, endTime, code, stL);

            repo.Setup(_ => _.AddAsync(driver)).ReturnsAsync(driver);

            var driverService = new WorkblockService(uow.Object, repo.Object, repoT.Object);

            var actual = await driverService.AddAsync(creatingDriverDTO);

            Assert.Equal(driverDTO, actual);
        }
    }
}