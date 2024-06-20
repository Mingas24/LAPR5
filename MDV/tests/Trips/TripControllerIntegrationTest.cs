using System.Collections.Generic;
using MDV.Controllers;
using MDV.Domain.Trips;
using MDV.DTO.Trips;
using MDV.Services;
using MDV.Domain.Shared;
using Moq;
using Xunit;


namespace tests.Trips
{
    public class TripControllerIntegrationTest
    {

        [Fact]
        public async void GetAll()
        {
            var repo = new Mock<ITripRepository>();
            var uow = new Mock<IUnitOfWork>();

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


            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(tripList);

            var tripService = new TripService(uow.Object, repo.Object);

            var controller = new TripController(tripService);

            var actual = await controller.GetAll();

            Assert.Equal(tripDTOList, actual.Value);
        }

        [Fact]
        public void GetGetById()
        {

            var repo = new Mock<ITripRepository>();
            var uow = new Mock<IUnitOfWork>();

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

            var tripService = new TripService(uow.Object, repo.Object);


            repo.Setup(_ => _.GetByIdAsync(tripID)).ReturnsAsync(trip);

            var controller = new TripController(tripService);

            var actual = controller.GetGetById(trip.Id.AsGuid());

            Assert.Equal(tripDTO, actual.Result.Value);
        }

        [Fact]
        public async void Create()
        {
            var repo = new Mock<ITripRepository>();
            var uow = new Mock<IUnitOfWork>();

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

            var tripList = new List<Trip>() { trip };

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(tripList);

            var tripService = new TripService(uow.Object, repo.Object);

            var controller = new TripController(tripService);

            var actual = await controller.Create(creatingTripDTO);

            Assert.NotNull(actual);
            Assert.NotNull(actual.Result);
        }

    }
}