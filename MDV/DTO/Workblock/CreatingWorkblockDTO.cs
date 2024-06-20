using System;
using System.Collections.Generic;
using MDV.Domain.Trips;
using MDV.Domain.Workblocks;

namespace MDV.DTO.Workblocks
{
    public class CreatingWorkblockDTO
    {
        public Guid Id { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string WorkblockCode { get; set; }
        public List<string> trips { get; set; }
        public CreatingWorkblockDTO(string startTime, string endTime, string code, List<string> trips)
        {
            this.StartTime = startTime;
            this.EndTime = endTime;
            this.WorkblockCode = code;
            this.trips = trips;
        }

        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                CreatingWorkblockDTO workblock = (CreatingWorkblockDTO)obj;
                return (this.StartTime.Equals(workblock.StartTime)) &&
                (this.EndTime.Equals(workblock.EndTime)) &&
                (this.WorkblockCode.Equals(workblock.WorkblockCode))
                ;
            }

        }

        public override int GetHashCode()
        {
            return HashCode.Combine(StartTime, EndTime, WorkblockCode);
        }
    }
}