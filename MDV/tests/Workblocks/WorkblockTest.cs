using System.Collections.Generic;
using MDV.Domain.Shared;
using Xunit;
using MDV.Domain.Workblocks;
using MDV.Domain.Trips;


namespace Tests.Workblocks
{
    public class VehicleServiceTest
    {

        [Fact]
        public void CreateValidWorkblock()
        {
            string startTime = "20-10-2021 11:00";
            string endTime = "20-10-2021 12:00";
            string code = "WB1010";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            
            var vs = new Workblock(startTime, endTime, code, tripList);

            Assert.True(vs.GetType().Equals(new Workblock().GetType()));
        }

        [Fact]
        public void CreateWorkblockWithoutTimeRegex()
        {
            string startTime = "20/10-2021 11:00";
            string endTime = "20-10-2021 12:00";
            string code = "WB1010";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };

            Assert.Throws<BusinessRuleValidationException>(() => new Workblock(startTime, endTime, code, tripList));
        }
        
        [Fact]
        public void CreateWorkblockWithInvalidTime()
        {
            string startTime = "20-13-2021 11:00";
            string endTime = "20-10-2021 12:00";
            string code = "WB1010";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };

            Assert.Throws<BusinessRuleValidationException>(() => new Workblock(startTime, endTime, code, tripList));
        }

        [Fact]
        public void CreateWorkblockWithNullTime()
        {
            string startTime = null;
            string endTime = "20-10-2021 12:00";
            string code = "WB1010";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };

            Assert.Throws<BusinessRuleValidationException>(() => new Workblock(startTime, endTime, code, tripList));
        }


        [Fact]
        public void CreateWorkblockWithoutCodeRegex()
        {
            string startTime = "20-10-2021 11:00";
            string endTime = "20-10-2021 12:00";
            string code = "WB111";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };

            Assert.Throws<BusinessRuleValidationException>(() => new Workblock(startTime, endTime, code, tripList));
        }

        [Fact]
         public void CreateWorkblockWithNullTrip()
        {
            string startTime = "20-10-2021 11:00";
            string endTime = "20-10-2021 12:00";
            string code = "WB1111";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = null;

            Assert.Throws<BusinessRuleValidationException>(() => new Workblock(startTime, endTime, code, tripList));
        }

        [Fact]
        public void CreateWorkblockWithEmptyTrip()
        {
            string startTime = "20-10-2021 11:00";
            string endTime = "20-10-2021 12:00";
            string code = "WB1111";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>();

            Assert.Throws<BusinessRuleValidationException>(() => new Workblock(startTime, endTime, code, tripList));
        }

    }
}

