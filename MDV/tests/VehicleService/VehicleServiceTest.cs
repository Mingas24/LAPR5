using System.Collections.Generic;
using MDV.Domain.Shared;
using Xunit;
using MDV.Domain.Workblocks;
using MDV.Domain.Trips;
using MDV.Domain.VehicleService;

namespace Tests.VehiclesServices
{
    public class VehicleServiceTest
    {

        [Fact]
        public void CreateValidVehicleService()
        {
            string name = "VehicleService1";
            string code = "12345abcde";
            string color = "red";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };

            var vs = new VehicleServiceD(name, code, color, workblockList);

            Assert.True(vs.GetType().Equals(new VehicleServiceD().GetType()));
        }

        [Fact]
        public void CreateVehicleServiveWithoutCodeRegex()
        {
            string name = "VehicleService1";
            string code = "12345";
            string color = "red";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };

            Assert.Throws<BusinessRuleValidationException>(() => new VehicleServiceD(name, code, color, workblockList));
        }
        [Fact]
        public void CreateVehicleServiveWithNullName()
        {
            string name = null;
            string code = "12345abcde";
            string color = "red";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };

            Assert.Throws<BusinessRuleValidationException>(() => new VehicleServiceD(name, code, color, workblockList));
        }

        [Fact]
        public void CreateVehicleServiveWithEmptyName()
        {
            string name = "";
            string code = "12345abcde";
            string color = "red";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };

            Assert.Throws<BusinessRuleValidationException>(() => new VehicleServiceD(name, code, color, workblockList));
        }

        [Fact]
        public void CreateVehicleServiveWithNullColor()
        {
            string name = "VehicleService1";
            string code = "12345abcde";
            string color = null;
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };

            Assert.Throws<BusinessRuleValidationException>(() => new VehicleServiceD(name, code, color, workblockList));
        }

        [Fact]
        public void CreateVehicleServiveWithEmptyColor()
        {
            string name = "VehicleService1";
            string code = "12345abcde";
            string color = "";
            Node node = new Node("1", 12);
            List<Node> nodeList = new List<Node>() { node };
            List<Trip> tripList = new List<Trip>() { new Trip("T1010", 1, 1, 1, "20-10-2021", "11:00", nodeList) };
            List<Workblock> workblockList = new List<Workblock>() { new Workblock("20-10-2021 11:00", "20-10-2021 12:00", "WB1010", tripList) };

            Assert.Throws<BusinessRuleValidationException>(() => new VehicleServiceD(name, code, color, workblockList));
        }

        [Fact]
        public void CreateVehicleServiveWithNullList()
        {
            string name = "VehicleService1";
            string code = "12345abcde";
            string color = "red";
            List<Workblock> wbList = null;

            Assert.Throws<BusinessRuleValidationException>(() => new VehicleServiceD(name, code, color, wbList));
        }

        [Fact]
        public void CreateVehicleServiveWithEmptyList()
        {
            string name = "VehicleService1";
            string code = "12345abcde";
            string color = "";
            List<Workblock> workblockList = new List<Workblock>();

            Assert.Throws<BusinessRuleValidationException>(() => new VehicleServiceD(name, code, color, workblockList));
        }
    }
}

