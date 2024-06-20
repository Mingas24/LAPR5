using System.Collections.Generic;
using MDV.Domain.Shared;
using MDV.Domain.Vehicle;
using Xunit;

namespace Tests.Vehicles
{
    public class VehicleTest
    {

        [Fact]
        public void CreateValidVehicle()
        {
            string licPlate = "JJ-00-FF";
            string vin = "12345678956986959";
            string vecType = "Autocarro";
            string startDate = "10-10-2020";

            //var vehicleType = new VehicleTypeId("vehicleType1");
            

            var vehicle = new Vehicle(licPlate, vin, vecType, startDate);
            Assert.True(vehicle.GetType().Equals(new Vehicle().GetType()));
        }

        [Fact]
        public void CreateVehicleWithNullLicensePlate()
        {
            string licPlate = null;
            string vin = "12345678956986959";
            string vecType = "Autocarro";
            string startDate = "10-10-2020";


            Assert.Throws<BusinessRuleValidationException>(() => new Vehicle(licPlate, vin, vecType, startDate));

        }

        [Fact]
        public void CreateVehicleWithEmptyVIN()
        {
            string licPlate = "JJ-00-FF";
            string vin = null;
            string vecType = "Autocarro";
            string startDate = "10-10-2020";

            Assert.Throws<BusinessRuleValidationException>(() => new Vehicle(licPlate, vin, vecType, startDate));

        }

        [Fact]
        public void CreateVehicleWithEmptyVehicleType()
        {
            string licPlate = "JJ-00-FF";
            string vin = "12345678956986959";
            string vecType = null;
            string startDate = "10-10-2020";

            Assert.Throws<BusinessRuleValidationException>(() => new Vehicle(licPlate, vin, vecType, startDate));

        }

        [Fact]
        public void CreateVehicleWithEmptyStartingDate()
        {
            string licPlate = "JJ-00-FF";
            string vin = "12345678956986959";
            string vecType = "Autocarro";
            string startDate = null;

            Assert.Throws<BusinessRuleValidationException>(() => new Vehicle(licPlate, vin, vecType, startDate));

        }
       


    }

}
