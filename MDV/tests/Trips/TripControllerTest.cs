using System.Collections.Generic;
using MDV.Controllers;
using MDV.Domain.Trips;
using MDV.DTO.Trips;

using MDV.Services;
using Moq;
using Xunit;


namespace tests.Trips
{
    public class TripControllerTest
    {

        [Fact]
        public async void GetAll()
        {
            var tripServiceMock = new Mock<ITripService>();

            string tripCode = "T0001";
            long lineID = 123;
            long pathID = 321;
            long pathIDReturn = 123;
            string startDate = "10-10-2021";
            string startTime = "10:10";
            List<Node> nodes = new List<Node>();

            Node aux = new Node("1", 2);
            nodes.Add(aux);


            var trip = new Trip(tripCode, lineID, pathID, pathIDReturn, startDate, startTime, nodes);

            var tripDTO = new TripDTO
            {
                Id = trip.Id.AsGuid(),
                tripCode = tripCode,
                lineID = lineID,
                pathID = pathID,
                pathIDReturn = pathIDReturn,
                startDate = startDate,
                startTime = startTime

            };
            var tripList = new List<Trip>() { trip };
            var tripDTOList = new List<TripDTO>() { tripDTO };


            tripServiceMock.Setup(_ => _.GetAllAsync()).ReturnsAsync(tripDTOList);

            var controller = new TripController(tripServiceMock.Object);

            var actual = await controller.GetAll();

            Assert.Equal(tripDTOList, actual.Value);
        }

        [Fact]
        public void GetGetById()
        {

            var tripServiceMock = new Mock<ITripService>();

            string tripCode = "T0001";
            long lineID = 123;
            long pathID = 321;
            long pathIDReturn = 123;
            string startDate = "10-10-2021";
            string startTime = "10:10";
            List<Node> nodes = new List<Node>();

            Node aux = new Node("1", 2);
            nodes.Add(aux);

            var trip = new Trip(tripCode, lineID, pathID, pathIDReturn, startDate, startTime, nodes);
            var tripID = new TripID(trip.Id.AsGuid());
            var tripDTO = new TripDTO
            {
                Id = trip.Id.AsGuid(),
                tripCode = tripCode,
                lineID = lineID,
                pathID = pathID,
                pathIDReturn = pathIDReturn,
                startDate = startDate,
                startTime = startTime
            };

            tripServiceMock.Setup(_ => _.GetByIdAsync(tripID)).ReturnsAsync(tripDTO);

            var controller = new TripController(tripServiceMock.Object);

            var actual = controller.GetGetById(trip.Id.AsGuid());

            Assert.Equal(tripDTO, actual.Result.Value);
        }

        [Fact]
        public async void Create()
        {

            var serviceServiceMock = new Mock<ITripService>();

            string tripCode = "T0001";
            long lineID = 123;
            long pathID = 321;
            long pathIDReturn = 123;
            string startDate = "10-10-2021";
            string startTime = "10:10";
            List<Node> nodes = new List<Node>();

            Node aux = new Node("1", 2);
            nodes.Add(aux);

            List<string> stList = new List<string>() { "1" };
            List<long> lgList = new List<long>() { 2 };



            var trip = new Trip(tripCode, lineID, pathID, pathIDReturn, startDate, startTime, nodes);
            var creatingTripDTO = new CreatingTripDTO(tripCode, lineID, pathID, pathIDReturn, startDate, startTime, stList, lgList);
            var tripID = new TripID(trip.Id.AsGuid());
            var tripDTO = new TripDTO
            {
                Id = trip.Id.AsGuid(),
                tripCode = tripCode,
                lineID = lineID,
                pathID = pathID,
                startDate = startDate,
                startTime = startTime
            };


            serviceServiceMock.Setup(_ => _.GetByIdAsync(tripID)).ReturnsAsync(tripDTO);
            serviceServiceMock.Setup(_ => _.AddAsync(creatingTripDTO)).ReturnsAsync(tripDTO);


            var controller = new TripController(serviceServiceMock.Object);

            var actual = await controller.Create(creatingTripDTO);

            Assert.NotNull(actual);
            Assert.NotNull(actual.Result);
        }

    }
}