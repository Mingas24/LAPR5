using System.Collections.Generic;
using MDV.Domain.Shared;
using MDV.Domain.Workblocks;
using MDV.Domain.Trips;
using MDV.Domain.CrewService;
using Xunit;

namespace Tests.CrewServices
{
    public class CrewServiceTest
    {

        [Fact]
        public void CreateValidCS()
        {
            string code = "C2020";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };

            var cs = new CrewService(code, workblockList);
            Assert.True(cs.GetType().Equals(new CrewService().GetType()));
        }

        [Fact]
        public void CreateDriverWithNullCode()
        {
            string code = null;
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };

            Assert.Throws<BusinessRuleValidationException>(() => new CrewService(code, workblockList));

        }

        [Fact]
        public void CreateDriverWithNullWB()
        {
            string code = "C2020";
            List<Workblock> workblockList = null;

            Assert.Throws<BusinessRuleValidationException>(() => new CrewService(code, workblockList));

        }


    }
}
