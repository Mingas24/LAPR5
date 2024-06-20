using System.Collections.Generic;
using MDV.Domain.CrewService;
using MDV.Services;
using MDV.Domain.Workblocks;
using MDV.Domain.Trips;
using MDV.DTO.CrewServices;
using MDV.Controllers;
using Moq;
using Xunit;

namespace tests.CrewServices
{
    public class CrewServiceControllerTest
    {

        [Fact]
        public async void GetAll()
        {
            var csServiceMock = new Mock<ICrewService>();

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
            var csList = new List<CrewService>() { cs };
            var csDTOList = new List<CrewServiceDTO>() { csDTO };


            csServiceMock.Setup(_ => _.GetAllAsync()).ReturnsAsync(csDTOList);

            var controller = new CrewServiceController(csServiceMock.Object);

            var actual = await controller.GetAll();

            Assert.Equal(csDTOList, actual.Value);
        }

        [Fact]
        public void GetGetById()
        {

            var csServiceMock = new Mock<ICrewService>();

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
            var csList = new List<CrewService>() { cs };
            var csID = new CrewServiceID(cs.Id.AsGuid());

            csServiceMock.Setup(_ => _.GetByIdAsync(csID)).ReturnsAsync(csDTO);

            var controller = new CrewServiceController(csServiceMock.Object);

            var actual = controller.GetGetById(cs.Id.AsGuid());

            Assert.Equal(csDTO, actual.Result.Value);
        }

        [Fact]
        public async void Create()
        {

            var csServiceMock = new Mock<ICrewService>();

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

            var csID = new CrewServiceID(cs.Id.AsGuid());
            var csCreatingDTO = new CreatingCrewServiceDTO(code,wbCreatingDTOList);
            csServiceMock.Setup(_ => _.GetByIdAsync(csID)).ReturnsAsync(csDTO);
            csServiceMock.Setup(_ => _.AddAsync(csCreatingDTO)).ReturnsAsync(csDTO);

            var controller = new CrewServiceController(csServiceMock.Object);

            var actual = await controller.Create(csCreatingDTO);

            Assert.NotNull(actual);
            Assert.NotNull(actual.Result);
        }

    }
}