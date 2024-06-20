using System.Collections.Generic;
using MDV.Domain.Shared;
using MDV.Domain.Trips;
using Xunit;
using System;
using MDV.Domain.Utils;
using System.Globalization;

namespace Tests.Trips
{
    public class TripTest
    {

        [Fact]
        public void CreateValidTrip()
        {
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
            Assert.True(trip.GetType().Equals(new Trip().GetType()));
        }

        [Fact]
        public void CreateTripWithNullTripCode()
        {
            string tripCode = null;
            long lineID = 123;
            long pathID = 321;
            long pathIDReturn = 123;
            string startDate = "10-10-2021";
            string startTime = "10:10";
            List<Node> nodes = new List<Node>();

            Node aux = new Node("1", 2);
            nodes.Add(aux);


            Assert.Throws<BusinessRuleValidationException>(() => new Trip(tripCode, lineID, pathID, pathIDReturn, startDate, startTime, nodes));

        }


        [Fact]
        public void CreateTripWithEmptyStartingDate()
        {
            string tripCode = "T0001";
            long lineID = 123;
            long pathID = 321;
            long pathIDReturn = 123;
            string startDate = null;
            string startTime = "10:10";
            List<Node> nodes = new List<Node>();

            Node aux = new Node("1", 2);
            nodes.Add(aux);


            Assert.Throws<BusinessRuleValidationException>(() => new Trip(tripCode, lineID, pathID, pathIDReturn, startDate, startTime, nodes));

        }

        [Fact]
        public void CreateTripWithEmptyStartTime()
        {
            string tripCode = "T0001";
            long lineID = 123;
            long pathID = 321;
            long pathIDReturn = 123;
            string startDate = "10-10-2021";
            string startTime = null;
            List<Node> nodes = new List<Node>();

            Node aux = new Node("1", 2);
            nodes.Add(aux);


            Assert.Throws<BusinessRuleValidationException>(() => new Trip(tripCode, lineID, pathID, pathIDReturn, startDate, startTime, nodes));

        }




    }

}
