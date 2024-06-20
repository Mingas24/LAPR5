using System.Collections.Generic;
using MDV.Domain.CrewService;
using MDV.Domain.Workblocks;
using MDV.Domain.Shared;
using MDV.Domain.Trips;
using MDV.DTO.CrewServices;
using MDV.Infrastructure.CrewServices;
using MDV.Infrastructure.Workblocks;
using MDV.Services;
using Moq;
using Xunit;
using System;
using MDV.Controllers;

namespace Tests.CrewServices
{

    public class CrewServiceIntegrationTest
    {

        [Fact]
        public async void GetAllTest()
        {
            var repo = new Mock<ICrewServiceRepository>();
            var uow = new Mock<IUnitOfWork>();
            var wrepo = new Mock<IWorkblockRepository>();

            string code = "C2020";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };

            var cs = new CrewService(code, workblockList);


            var csDTO = new CrewServiceDTO { Code = code, Workblocks = workblockList };

            var cSDTO = new List<CrewServiceDTO>() { csDTO };

            var crews = new List<CrewService>() { cs };

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(crews);

            var csService = new CrewServiceS(uow.Object, repo.Object, wrepo.Object);

            var controller = new CrewServiceController(csService);

            var actual = await controller.GetAll();
            Assert.Equal(cSDTO, actual.Value);

        }

        [Fact]
        public async void AddDriver()
        {
            var repo = new Mock<ICrewServiceRepository>();
            var uow = new Mock<IUnitOfWork>();
            var wrepo = new Mock<IWorkblockRepository>();


            string code = "C2020";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };
            List<string> wbList = new List<string>() { "WB1010" };

            var cs = new CrewService(code, workblockList);

            var creatingcsDTO = new CreatingCrewServiceDTO(code, wbList);

            var crews = new List<CrewService>() { cs };

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(crews);

            var csService = new CrewServiceS(uow.Object, repo.Object, wrepo.Object);

            var controller = new CrewServiceController(csService);

            var actual = await controller.Create(creatingcsDTO);

            Assert.NotNull(actual);
            Assert.NotNull(actual.Result);
        }

        [Fact]
        public async void GetByDate()
        {
            var repo = new Mock<ICrewServiceRepository>();
            var uow = new Mock<IUnitOfWork>();
            var wrepo = new Mock<IWorkblockRepository>();


            string code = "C2020";
            string date = "20-10-2021";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };
            List<string> wbList = new List<string>() { "WB1010" };

            var cs = new CrewService(code, workblockList);

            var csDTO = new CrewServiceDTO { Code = code, Workblocks = workblockList };

            var cSDTO = new List<CrewServiceDTO>() { csDTO };

            var crews = new List<CrewService>() { cs };

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(crews);

            var csService = new CrewServiceS(uow.Object, repo.Object, wrepo.Object);

            var controller = new CrewServiceController(csService);

            var actual = await controller.GetGetByDate(date);

            Assert.Equal(cSDTO, actual.Value);
        }
    }
}


