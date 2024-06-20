using System;
using System.Collections.Generic;
using MDV.Domain.Shared;
using MDV.Domain.Trips;

namespace MDV.DTO.Trips
{
    public class TripScheduleDTO
    {
        public long lineID { get; set; }
        public long pathIDGO { get; set; }
        public long pathIDReturn { get; set; }
        public string startTime { get; set; }
        public long frequency { get; set; }
        public long counter { get; set; }

        public TripScheduleDTO(long lineID, long pathIDGO, long pathIDReturn, string startTime, long frequency, long counter)
        {
            this.lineID = lineID;
            this.pathIDGO = pathIDGO;
            this.pathIDReturn = pathIDReturn;
            this.startTime = startTime;
            this.frequency = frequency;
            this.counter = counter;
        }

        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                TripScheduleDTO trip = (TripScheduleDTO)obj;
                return
                (this.lineID.Equals(trip.lineID)) &&
                (this.pathIDGO.Equals(trip.pathIDGO)) &&
                (this.pathIDReturn.Equals(trip.pathIDReturn)) &&
                (this.frequency.Equals(trip.frequency)) &&
                (this.counter.Equals(trip.counter)) &&
                (this.startTime.Equals(trip.startTime));
            }

        }

        public override int GetHashCode()
        {
            return HashCode.Combine(lineID, pathIDGO, pathIDReturn, frequency, counter, startTime);
        }
    }
}