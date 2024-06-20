using System;
using System.Collections.Generic;
using MDV.Domain.Shared;
using MDV.Domain.Trips;

namespace MDV.DTO.Trips
{
    public class CreatingTripDTO
    {
        public Guid Id { get; set; }
        public string tripCode { get; set; }
        public long lineID { get; set; }
        public long pathID { get; set; }
        public long pathIDReturn { get; set; }
        public string startDate { get; set; }
        public string startTime { get; set; }
        public List<Node> nodes { get; set; }


        public CreatingTripDTO(string tripCode, long lineID, long pathID, long pathIDReturn, string startDate, string startTime, List<string> nodes, List<long> times)
        {
            List<Node> auxList = new List<Node>();
            this.tripCode = tripCode;
            this.lineID = lineID;
            this.pathID = pathID;
            this.pathIDReturn = pathIDReturn;
            this.startDate = startDate;
            this.startTime = startTime;
            for (int i = 0; i < nodes.Count; i++)
            {
                if (string.IsNullOrEmpty(nodes[i]) && times.Count == 0)
                {
                    throw new BusinessRuleValidationException("List is empty!");
                }
                Node node = new Node(nodes[i], times[i]);
                auxList.Add(node);
            }
            this.nodes = new List<Node>(auxList);
        }

        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                CreatingTripDTO trip = (CreatingTripDTO)obj;
                return (this.tripCode.Equals(trip.tripCode)) &&
                (this.lineID.Equals(trip.lineID)) &&
                (this.pathID.Equals(trip.pathID)) &&
                (this.pathIDReturn.Equals(trip.pathIDReturn)) &&
                (this.startDate.Equals(trip.startDate)) &&
                (this.startTime.Equals(trip.startTime));
            }

        }

        public override int GetHashCode()
        {
            return HashCode.Combine(tripCode, lineID, pathID, pathIDReturn, startDate, startTime);
        }
    }
}