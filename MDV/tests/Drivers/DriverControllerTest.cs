using System.Collections.Generic;
using MDV.Controllers;
using MDV.Domain.Driver;
using MDV.Services;
using Moq;
using Xunit;

namespace tests.Drivers
{
    public class DriverControllerTest
    {

        [Fact]
        public async void GetAll()
        {
            var driverServiceMock = new Mock<IDriverService>();

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
            var driverDTOList = new List<DriverDTO>() { driverDTO };


            driverServiceMock.Setup(_ => _.GetAllAsync()).ReturnsAsync(driverDTOList);

            var controller = new DriverController(driverServiceMock.Object);

            var actual = await controller.GetAll();

            Assert.Equal(driverDTOList, actual.Value);
        }

        [Fact]
        public void GetGetById () {

           var driverServiceMock = new Mock<IDriverService>();

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
            var driverID = new DriverID(driver.Id.AsGuid());
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

            driverServiceMock.Setup(_ => _.GetByIdAsync (driverID)).ReturnsAsync (driverDTO);

            var controller = new DriverController (driverServiceMock.Object);

            var actual = controller.GetGetById (driver.Id.AsGuid ());

            Assert.Equal (driverDTO, actual.Result.Value);
        }

        [Fact]
        public async void Create () {

            var serviceServiceMock = new Mock<IDriverService> ();

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
            var creatingDriverDTO = new CreatingDriverDTO(mecNum, name, birthDate, cc, nif, eDate, dDate, dt, dled, dln);

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
            var driverID = new DriverID (driver.Id.AsGuid());

            serviceServiceMock.Setup (_ => _.GetByIdAsync (driverID)).ReturnsAsync (driverDTO);
            serviceServiceMock.Setup (_ => _.AddAsync (creatingDriverDTO)).ReturnsAsync (driverDTO);

           
            var controller = new DriverController (serviceServiceMock.Object);

            var actual = await controller.Create(creatingDriverDTO);

            Assert.NotNull(actual);
            Assert.NotNull(actual.Result);
        }

    }
}