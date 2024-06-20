using System.Collections.Generic;
using MDV.Domain.Driver;
using MDV.Domain.Shared;
using MDV.Services;
using Moq;
using Xunit;

namespace tests.Drivers
{

    public class DriverServiceTest
    {

        [Fact]
        public async void GetAllAsyncTest()
        {
            var repo = new Mock<IDriverRepository>();
            var uow = new Mock<IUnitOfWork>();

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

            var driverDTO = new DriverDTO
            {
                Id = driver.Id.AsGuid(),
                driverNumber = mecanographicNumber,
                driverName = driverName,
                driverDate = birthDate,
                driverCC = citizenCardNumber,
                driverNIF = driverNIF,
                dced = entranceDate,
                dcld = departureDate,
                driverType = driver.driverTypeIDList,
                dled = dateDriverLicense,
                dln = numberDriverLicense
            };

            var driversDTO = new List<DriverDTO>() { driverDTO };

            var drivers = new List<Driver>() { driver };

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(drivers);

            var driverService = new DriverService(uow.Object, repo.Object);

            var actual = await driverService.GetAllAsync();

            Assert.Equal(driversDTO, actual);

        }

        [Fact]
        public async void GetByIdTest()
        {
            var repo = new Mock<IDriverRepository>();
            var uow = new Mock<IUnitOfWork>();

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

            var driverDTO = new DriverDTO
            {
                Id = driver.Id.AsGuid(),
                driverNumber = mecanographicNumber,
                driverName = driverName,
                driverDate = birthDate,
                driverCC = citizenCardNumber,
                driverNIF = driverNIF,
                dced = entranceDate,
                dcld = departureDate,
                driverType = driver.driverTypeIDList,
                dled = dateDriverLicense,
                dln = numberDriverLicense
            };
            repo.Setup(_ => _.GetByIdAsync(driver.Id)).ReturnsAsync(driver);

            var driverService = new DriverService(uow.Object, repo.Object);

            var actual = await driverService.GetByIdAsync(driver.Id);

            Assert.Equal(driverDTO, actual);
        }

        [Fact]
        public async void AddDriver()
        {
            var repo = new Mock<IDriverRepository>();
            var uow = new Mock<IUnitOfWork>();

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

            var driverDTO = new DriverDTO
            {
                Id = driver.Id.AsGuid(),
                driverNumber = mecanographicNumber,
                driverName = driverName,
                driverDate = birthDate,
                driverCC = citizenCardNumber,
                driverNIF = driverNIF,
                dced = entranceDate,
                dcld = departureDate,
                driverType = driver.driverTypeIDList,
                dled = dateDriverLicense,
                dln = numberDriverLicense
            };

            var creatingDriverDTO = new CreatingDriverDTO(mecanographicNumber, driverName, birthDate, citizenCardNumber, 
            driverNIF, entranceDate, departureDate, listDriverTypes, numberDriverLicense,dateDriverLicense);

            repo.Setup(_ => _.AddAsync(driver)).ReturnsAsync(driver);

            var driverService = new DriverService(uow.Object, repo.Object);

            var actual = await driverService.AddAsync(creatingDriverDTO);

            Assert.Equal(driverDTO, actual);
        }

    }

}