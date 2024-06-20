using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MDV.Controllers;
using MDV.Domain.Trips;
using MDV.DTO.Trips;

using MDV.Domain.Shared;
using MDV.Services;
using MDV.Infrastructure.Trips;
using Moq;
using Xunit;
using System;



namespace Tests.Trips
{

    public class TripServiceTest
    {

        [Fact]
        public async void GetAllAsyncTest()
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

            var tripsDTO = new List<TripDTO>() { tripDTO };

            var trips = new List<Trip>() { trip };

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(trips);

            var tripService = new TripService(uow.Object, repo.Object);

            var actual = await tripService.GetAllAsync();

            Assert.Equal(tripsDTO, actual);

        }

        [Fact]
        public async void GetByIdTest()
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

            var trip = new Trip(tripCode, lineID, pathID,pathIDReturn, startDate, startTime, nodes);
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

            var tripsDTO = new List<TripDTO>() { tripDTO };

            var trips = new List<Trip>() { trip };

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(trips);

            var tripService = new TripService(uow.Object, repo.Object);

            var actual = await tripService.GetAllAsync();

            Assert.Equal(tripsDTO, actual);
        }

        [Fact]
        public async void AddDriver()
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

            var trip = new Trip(tripCode, lineID, pathID,pathIDReturn, startDate, startTime, nodes);
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

            var tripsDTO = new List<TripDTO>() { tripDTO };

            var trips = new List<Trip>() { trip };

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(trips);

            var tripService = new TripService(uow.Object, repo.Object);

            var actual = await tripService.GetAllAsync();

            Assert.Equal(tripsDTO, actual);
        }

    }

}