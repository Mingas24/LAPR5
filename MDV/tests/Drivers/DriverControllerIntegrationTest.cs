using System.Collections.Generic;
using MDV.Domain.Driver;
using MDV.Domain.Shared;
using Moq;
using Xunit;
using System;
using MDV.Controllers;
using MDV.Services;

namespace Tests.Drivers
{

    public class DriverIntegrationTest
    {

        [Fact]
        public async void GetAllTest()
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
                driverCC = citizenCardNumber,
                dced = entranceDate,
                dcld = departureDate,
                driverDate = birthDate,
                dled = dateDriverLicense,
                dln = numberDriverLicense,
                driverName = driverName,
                driverNIF = driverNIF,
                driverNumber = mecanographicNumber,
                driverType = driver.driverTypeIDList
            };

            var driverList = new List<Driver>() { driver };
            var driverDTOList = new List<DriverDTO>() { driverDTO };

            var driverService = new DriverService(uow.Object, repo.Object);

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(driverList);

            var controller = new DriverController(driverService);

            var actual = await controller.GetAll();
            Assert.Equal(driverDTOList, actual.Value);

        }

        [Fact]
        public async void AddDriver()
        {
            var repo = new Mock<IDriverRepository>();
            var uow = new Mock<IUnitOfWork>();

            string mecNum = "4RTL90BV1";
            string name = "José";
            string birthDate = "15-03-1990";
            long cc = 14965360;
            long nif = 789254361;
            string eDate = "21-11-2004";
            string dDate = "21-11-2050";
            List<string> dt = new List<string>();
            dt.Add("dt1"); dt.Add("dt2");
            string dled = "14-10-2060";
            string dln = "P-1576984 3";

            var driver = new Driver(mecNum, name, birthDate, cc, nif, eDate, dDate, dt, dled, dln);
            var creatingDriverDTO = new CreatingDriverDTO(mecNum, name, birthDate, cc, nif, eDate, dDate, dt, dln, dled);

            var driverDTO = new DriverDTO
            {
                Id = driver.Id.AsGuid(),
                driverNumber = mecNum,
                driverName = name,
                driverDate = birthDate,
                driverCC = cc,
                driverNIF = nif,
                dced = eDate,
                dcld = dDate,
                driverType = driver.driverTypeIDList,
                dled = dled,
                dln = dln
            };

            var driverList = new List<Driver>() { driver };

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(driverList);

            var driverService = new DriverService(uow.Object, repo.Object);

            var controller = new DriverController(driverService);

            var actual = await controller.Create(creatingDriverDTO);

            Assert.NotNull(actual);
            Assert.NotNull(actual.Result);
        }

    }
}


