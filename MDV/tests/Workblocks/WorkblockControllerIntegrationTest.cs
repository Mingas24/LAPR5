using System.Collections.Generic;
using MDV.Controllers;
using MDV.Domain.Workblocks;
using MDV.DTO.Workblocks;
using MDV.Domain.Trips;
using MDV.Domain.Shared;
using MDV.Infrastructure.Workblocks;
using MDV.Services;
using Moq;
using Xunit;

namespace tests.Workblocks
{
    public class WorkblocksControllerIntegrationTest
    {

        [Fact]
        public async void GetAll()
        {
            var repo = new Mock<IWorkblockRepository>();
            var uow = new Mock<IUnitOfWork>();
            var tripRepo = new Mock<ITripRepository>();

            string startTime = "20-10-2021 11:00";
            string endTime = "20-10-2021 12:00";
            string code = "WB1010";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };

            var workblock = new Workblock(startTime, endTime, code, tripList);

            var workblockDTO = new WorkblockDTO
            {
                Id = workblock.Id.AsGuid(),
                StartTime = startTime,
                EndTime = endTime,
                WorkblockCode = code,
                trips = tripList
            };
            var workblockList = new List<Workblock>() { workblock };
            var workblockDTOList = new List<WorkblockDTO>() { workblockDTO };

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(workblockList);

            var service = new WorkblockService(uow.Object, repo.Object, tripRepo.Object);
            var controller = new WorkblockController(service);

            var actual = await controller.GetAll();

            Assert.Equal(workblockDTOList, actual.Value);
        }

        [Fact]
        public void GetGetById()
        {

            var repo = new Mock<IWorkblockRepository>();
            var uow = new Mock<IUnitOfWork>();
            var tripRepo = new Mock<ITripRepository>();

            string startTime = "20-10-2021 11:00";
            string endTime = "20-10-2021 12:00";
            string code = "WB1010";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };

            var workblock = new Workblock(startTime, endTime, code, tripList);

            var workblockDTO = new WorkblockDTO
            {
                Id = workblock.Id.AsGuid(),
                StartTime = startTime,
                EndTime = endTime,
                WorkblockCode = code,
                trips = tripList
            };

            var workblockID = new WorkblockID(workblock.Id.AsGuid());

            repo.Setup(_ => _.GetByIdAsync(workblockID)).ReturnsAsync(workblock);

            var service = new WorkblockService(uow.Object, repo.Object, tripRepo.Object);
            var controller = new WorkblockController(service);

            var actual = controller.GetGetById(workblock.Id.AsGuid());

            Assert.Equal(workblockDTO, actual.Result.Value);
        }

        [Fact]
        public async void Create()
        {

            var repo = new Mock<IWorkblockRepository>();
            var uow = new Mock<IUnitOfWork>();
            var tripRepo = new Mock<ITripRepository>();

            string startTime = "20-10-2021 11:00";
            string endTime = "20-10-2021 12:00";
            string code = "WB1010";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<string> stL = new List<string>() { "T1010" };

            var workblock = new Workblock(startTime, endTime, code, tripList);

            var workblockDTO = new WorkblockDTO
            {
                Id = workblock.Id.AsGuid(),
                StartTime = startTime,
                EndTime = endTime,
                WorkblockCode = code,
                trips = tripList
            };

            var workblockList = new List<Workblock>() { workblock };
            var workblockDTOList = new List<WorkblockDTO>() { workblockDTO };

            var creatingDriverDTO = new CreatingWorkblockDTO(startTime, endTime, code, stL);

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(workblockList);

            var service = new WorkblockService(uow.Object, repo.Object, tripRepo.Object);
            var controller = new WorkblockController(service);
            
            var actual = await controller.Create(creatingDriverDTO);

            Assert.NotNull(actual);
            Assert.NotNull(actual.Result);
        }

    }
}