using System;
using System.Collections.Generic;
using MDV.Domain.Trips;


namespace MDV.DTO.Trips
{
    public class TripDTO
    {
        public Guid Id { get; set; }
        public string tripCode { get; set; }
        public long lineID { get; set; }
        public long pathID { get; set; }
        public long pathIDReturn { get; set; }
        public string startDate { get; set; }
        public string startTime { get; set; }
        public List<Node> nodes { get; set; }

        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                TripDTO trip = (TripDTO)obj;
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