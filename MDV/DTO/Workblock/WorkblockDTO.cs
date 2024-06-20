using System;
using System.Collections.Generic;
using MDV.Domain.Trips;
using MDV.Domain.Workblocks;

namespace MDV.DTO.Workblocks
{

    public class WorkblockDTO
    {
        public Guid Id { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string WorkblockCode { get; set; }
        public List<Trip> trips { get; set; }

        
        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                WorkblockDTO workblock = (WorkblockDTO)obj;
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
