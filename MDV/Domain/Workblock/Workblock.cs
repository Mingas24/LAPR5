using System;
using MDV.Domain.Shared;
using System.Collections.Generic;
using MDV.Domain.Utils;
using MDV.Domain.Trips;
using System.Globalization;

namespace MDV.Domain.Workblocks
{
    public class Workblock : Entity<WorkblockID>, IAggregateRoot
    {
        public Time startTime { get; private set; }
        public Time endTime { get; private set; }
        public WorkblockCode workblockCode { get; private set; }
        public List<Trip> trips { get; private set; }
        public Workblock() { }

        public Workblock(string startTime, string endTime, string code, List<Trip> trips)
        {
            if (verifyDate(startTime, endTime))
            {
                try
                {
                    this.Id = new WorkblockID(Guid.NewGuid());
                    this.startTime = new Time(startTime);
                    this.endTime = new Time(endTime);
                    this.workblockCode = new WorkblockCode(code);
                    if(trips.Count==0){
                        throw new BusinessRuleValidationException("Trip is null or empty");
                    }
                    this.trips = trips;
                }
                catch (Exception)
                {
                    throw new BusinessRuleValidationException("Workblock Invalid");
                }
            }

        }

        public Boolean verifyDate(string startTime, string endTime)
        {
            DateTime startTimeT = new DateTime();
            DateTime endTimeT = new DateTime();
            DateTime now = DateTime.Now;
            try
            {
                var cultureInfo = new CultureInfo("pt-PT");
                startTimeT = DateTime.Parse(startTime, cultureInfo);
                endTimeT = DateTime.Parse(endTime, cultureInfo);
            }
            catch
            {
                throw new BusinessRuleValidationException("Invalid Date or Time");
            }
            var a = startTimeT.Ticks - endTimeT.Ticks;
            if (startTimeT.Ticks - endTimeT.Ticks > 0)
            {
                throw new BusinessRuleValidationException("The End Time is after the Start Time");
            }
            return true;
        }
        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                Workblock workblock = (Workblock)obj;
                return (this.startTime.Equals(workblock.startTime)) &&
                (this.endTime.Equals(workblock.endTime)) &&
                (this.workblockCode.Equals(workblock.workblockCode))
                ;
            }

        }

        public override int GetHashCode()
        {
            return HashCode.Combine(startTime, endTime, workblockCode);
        }
    }
}