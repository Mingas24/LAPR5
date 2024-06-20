using System.Collections.Generic;
using MDV.Domain.CrewService;
using MDV.Domain.Shared;
using MDV.Services;
using MDV.Domain.Workblocks;
using MDV.Domain.Trips;
using MDV.DTO.CrewServices;
using MDV.Infrastructure.CrewServices;
using MDV.Infrastructure.Workblocks;
using Moq;
using Xunit;

namespace tests.CrewServices
{

    public class CrewServiceServiceTest
    {

        [Fact]
        public async void GetAllAsyncTest()
        {
            var repo = new Mock<ICrewServiceRepository>();
            var repoWB = new Mock<IWorkblockRepository>();
            var uow = new Mock<IUnitOfWork>();

            string code = "C2020";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };

            var cs = new CrewService(code, workblockList);

            var csDTO = new CrewServiceDTO
            {
                Id = cs.Id.AsGuid(),
                Code = code,
                Workblocks = workblockList
            };

            var csDTOList = new List<CrewServiceDTO>() { csDTO };

            var csser = new List<CrewService>() { cs };

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(csser);

            var csService = new CrewServiceS(uow.Object, repo.Object, repoWB.Object);

            var actual = await csService.GetAllAsync();

            Assert.Equal(csDTOList, actual);

        }

        [Fact]
        public async void GetByIdTest()
        {
            var repo = new Mock<ICrewServiceRepository>();
            var repoWB = new Mock<IWorkblockRepository>();
            var uow = new Mock<IUnitOfWork>();

            string code = "C2020";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };

            var cs = new CrewService(code, workblockList);

            var csDTO = new CrewServiceDTO
            {
                Id = cs.Id.AsGuid(),
                Code = code,
                Workblocks = workblockList
            };

            repo.Setup(_ => _.GetByIdAsync(cs.Id)).ReturnsAsync(cs);

            var csService = new CrewServiceS(uow.Object, repo.Object, repoWB.Object);

            var actual = await csService.GetByIdAsync(cs.Id);

            Assert.Equal(csDTO, actual);
        }

        [Fact]
        public async void AddCrewService()
        {
            var repo = new Mock<ICrewServiceRepository>();
            var repoWB = new Mock<IWorkblockRepository>();
            var uow = new Mock<IUnitOfWork>();

            string code = "C2020";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };
            List<string>wbCreatingDTOList = new List<string>(){"WB1010"} ;
            var cs = new CrewService(code, workblockList);

            var csDTO = new CrewServiceDTO
            {
                Id = cs.Id.AsGuid(),
                Code = code,
                Workblocks = workblockList
            };

            var creatingCSDTO = new CreatingCrewServiceDTO(code, wbCreatingDTOList);

            repo.Setup(_ => _.AddAsync(cs)).ReturnsAsync(cs);

            var csService = new CrewServiceS(uow.Object, repo.Object,repoWB.Object);

            var actual = await csService.AddAsync(creatingCSDTO);

            Assert.Equal(csDTO, actual);
        }

    }

}