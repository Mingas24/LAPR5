using System.Collections.Generic;
using MDV.Domain.Shared;
using MDV.Domain.Driver;
using Xunit;

namespace Tests.Drivers
{
    public class DriverTest
    {

        [Fact]
        public void CreateValidDriver()
        {
            string mecanographicNumber = "abcde1234";
            string driverName = "DriverTeste";
            string birthDate = "12-12-1990";
            long citizenCardNumber = 11144477;
            long driverNIF = 159951159;
            string entranceDate = "27-01-2015";
            string departureDate = "31-05-2020";
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-2050";
            string driverType = "driverType1";

            List<string> listDriverTypes = new List<string>();

            listDriverTypes.Add(driverType);

            var driver = new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense);
            Assert.True(driver.GetType().Equals(new Driver().GetType()));
        }

        [Fact]
        public void CreateDriverWithNullMecanographicNumber()
        {
            string mecanographicNumber = null;
            string driverName = "DriverTeste";
            string birthDate = "12-12-1990";
            long citizenCardNumber = 11144477;
            long driverNIF = 159951159;
            string entranceDate = "27-01-2015";
            string departureDate = "31-05-2020";
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-2050";
            string driverType = "driverType1";

            List<string> listDriverTypes = new List<string>();

            listDriverTypes.Add(driverType);

            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense));

        }

        [Fact]
        public void CreateDriverWithoutRegexMecanographicNumber()
        {
            string mecanographicNumber = "abc.e1234";
            string driverName = "DriverTeste";
            string birthDate = "12-12-1990";
            long citizenCardNumber = 11144477;
            long driverNIF = 159951159;
            string entranceDate = "27-01-2015";
            string departureDate = "31-05-2020";
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-2050";
            string driverType = "driverType1";

            List<string> listDriverTypes = new List<string>();

            listDriverTypes.Add(driverType);

            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense));

        }

        [Fact]
        public void CreateDriverWithNullEntranceDate()
        {
            string mecanographicNumber = "abcde1234";
            string driverName = "DriverTeste";
            string birthDate = "12-12-1990";
            long citizenCardNumber = 11144477;
            long driverNIF = 159951159;
            string entranceDate = null;
            string departureDate = "31-05-2020";
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-2050";
            string driverType = "driverType1";

            List<string> listDriverTypes = new List<string>();

            listDriverTypes.Add(driverType);

            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense));


        }

        [Fact]
        public void CreateDriverInvalidEntranceDate()
        {
            string mecanographicNumber = "abcde1234";
            string driverName = "DriverTeste";
            string birthDate = "12-12-1990";
            long citizenCardNumber = 11144477;
            long driverNIF = 159951159;
            string entranceDate = "27-13-2015";
            string departureDate = "31-05-2020";
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-2050";
            string driverType = "driverType1";
            List<string> listDriverTypes = new List<string>();
            listDriverTypes.Add(driverType);

            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense));
        }

        [Fact]
        public void CreateDriverWithNullDepartureDate()
        {
            string mecanographicNumber = "abcde1234";
            string driverName = "DriverTeste";
            string birthDate = "12-12-1990";
            long citizenCardNumber = 11144477;
            long driverNIF = 159951159;
            string entranceDate = "12-12-2015";
            string departureDate = null;
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-2050";
            string driverType = "driverType1";

            List<string> listDriverTypes = new List<string>();

            listDriverTypes.Add(driverType);

            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense));

        }


        [Fact]
        public void CreateDriverWithInvalidDepartureDate()
        {
            string mecanographicNumber = "abcde1234";
            string driverName = "DriverTeste";
            string birthDate = "12-12-1990";
            long citizenCardNumber = 11144477;
            long driverNIF = 159951159;
            string entranceDate = "12-12-2015";
            string departureDate = "12-22-2030";
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-2050";
            string driverType = "driverType1";

            List<string> listDriverTypes = new List<string>();

            listDriverTypes.Add(driverType);

            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense));

        }

        [Fact]
        public void CreateDriverWithNullDriverTypesList()
        {
            string mecanographicNumber = "abcde1234";
            string driverName = "DriverTeste";
            string birthDate = "12-12-1990";
            long citizenCardNumber = 11144477;
            long driverNIF = 159951159;
            string entranceDate = "12-12-2015";
            string departureDate = "12-12-2030";
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-2050";
 
            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, null, dateDriverLicense, numberDriverLicense));
        }

        [Fact]
        public void CreateDriverWithEmptyDriverTypesList()
        {
            string mecanographicNumber = "abcde1234";
            string driverName = "DriverTeste";
            string birthDate = "12-12-1990";
            long citizenCardNumber = 11144477;
            long driverNIF = 159951159;
            string entranceDate = "12-12-2015";
            string departureDate = "12-12-2030";
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-2050";
            string driverType = "";

            List<string> listDriverTypes = new List<string>();
            listDriverTypes.Add(driverType);

            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense));
        }
     
        [Fact]
        public void CreateDriverWithoutRegexName()
        {
            string mecanographicNumber = "abcde1234";
            string driverName = null;
            string birthDate = "12-12-1990";
            long citizenCardNumber = 11144477;
            long driverNIF = 159951159;
            string entranceDate = "12-12-2015";
            string departureDate = "12-12-2030";
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-2050";
            string driverType = "driverType1";

            List<string> listDriverTypes = new List<string>();

            listDriverTypes.Add(driverType);

            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense));
        }

        [Fact]
        public void CreateDriverWithoutRegexCC()
        {
            string mecanographicNumber = "abcde1234";
            string driverName = "Driver1";
            string birthDate = "12-12-1990";
            long citizenCardNumber = 111444779;
            long driverNIF = 159951159;
            string entranceDate = "12-12-2015";
            string departureDate = "12-12-2030";
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-2050";
            string driverType = "driverType1";

            List<string> listDriverTypes = new List<string>();

            listDriverTypes.Add(driverType);

            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense));
        }

        [Fact]
        public void CreateDriverWithoutRegexNIF()
        {
            string mecanographicNumber = "abcde1234";
            string driverName = "Driver1";
            string birthDate = "12-12-1990";
            long citizenCardNumber = 11144477;
            long driverNIF = 1599511590;
            string entranceDate = "12-12-2015";
            string departureDate = "12-12-2030";
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-2050";
            string driverType = "driverType1";

            List<string> listDriverTypes = new List<string>();

            listDriverTypes.Add(driverType);

            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense));
        }

        [Fact]
        public void CreateDriverWithoutRegexLicenseNumber()
        {
            string mecanographicNumber = "abcde1234";
            string driverName = "Driver1";
            string birthDate = "12-12-1990";
            long citizenCardNumber = 11144477;
            long driverNIF = 159951159;
            string entranceDate = "12-12-2015";
            string departureDate = "12-12-2030";
            string numberDriverLicense = "P-11111111";
            string dateDriverLicense = "12-10-2050";
            string driverType = "driverType1";

            List<string> listDriverTypes = new List<string>();

            listDriverTypes.Add(driverType);

            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense));
        }

        [Fact]
        public void CreateDriverUnder21Test()
        {
            string mecanographicNumber = "abcde1234";
            string driverName = "Driver1";
            string birthDate = "12-12-2010";
            long citizenCardNumber = 11144477;
            long driverNIF = 159951159;
            string entranceDate = "12-12-2015";
            string departureDate = "12-12-2030";
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-2050";
            string driverType = "driverType1";

            List<string> listDriverTypes = new List<string>();

            listDriverTypes.Add(driverType);

            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense));
        }

        [Fact]
        public void CreateDriverEntryAfterLeaving()
        {
            string mecanographicNumber = "abcde1234";
            string driverName = "Driver1";
            string birthDate = "12-12-1990";
            long citizenCardNumber = 11144477;
            long driverNIF = 159951159;
            string entranceDate = "12-12-2015";
            string departureDate = "12-12-2014";
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-2050";
            string driverType = "driverType1";

            List<string> listDriverTypes = new List<string>();

            listDriverTypes.Add(driverType);

            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense));
        }

        [Fact]
        public void CreateDriverBirthAfterEntry()
        {
            string mecanographicNumber = "abcde1234";
            string driverName = "Driver1";
            string birthDate = "12-12-1990";
            long citizenCardNumber = 11144477;
            long driverNIF = 159951159;
            string entranceDate = "12-12-1989";
            string departureDate = "12-12-2020";
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-2050";
            string driverType = "driverType1";

            List<string> listDriverTypes = new List<string>();

            listDriverTypes.Add(driverType);

            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense));
        }

        [Fact]
        public void CreateDriverLeavingAfterBirth()
        {
            string mecanographicNumber = "abcde1234";
            string driverName = "Driver1";
            string birthDate = "12-12-1990";
            long citizenCardNumber = 11144477;
            long driverNIF = 159951159;
            string entranceDate = "12-12-1988";
            string departureDate = "12-12-1989";
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-2050";
            string driverType = "driverType1";

            List<string> listDriverTypes = new List<string>();

            listDriverTypes.Add(driverType);

            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense));
        }

        [Fact]
        public void CreateDriverLicenceDateAfterBirth()
        {
            string mecanographicNumber = "abcde1234";
            string driverName = "Driver1";
            string birthDate = "12-12-1990";
            long citizenCardNumber = 11144477;
            long driverNIF = 159951159;
            string entranceDate = "12-12-2015";
            string departureDate = "12-12-2020";
            string numberDriverLicense = "P-1111111 1";
            string dateDriverLicense = "12-10-1989";
            string driverType = "driverType1";

            List<string> listDriverTypes = new List<string>();

            listDriverTypes.Add(driverType);

            Assert.Throws<BusinessRuleValidationException>(() => new Driver(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, dateDriverLicense, numberDriverLicense));
        }
    }
}
