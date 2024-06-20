using System;
using MDV.Domain.Shared;
using System.Collections.Generic;
using MDV.Domain.Utils;
using System.Globalization;

namespace MDV.Domain.Trips
{
    public class Trip : Entity<TripID>, IAggregateRoot
    {
        public TripCode tripCode { get; private set; }
        public TripLineID lineID { get; private set; }
        public TripPathID pathID { get; private set; }
        public TripPathID pathIDReturn { get; private set; }
        public Date startDate { get; private set; }
        public Hours startTime { get; private set; }
        public List<Node> nodesList { get; private set; }
        public Trip() { }

        public Trip(string tripCode, long lineID, long pathID, long pathIDReturn, string date, string time, List<Node> nodes)
        {
            if (verifyDate(date))
            {
                try
                {
                    this.Id = new TripID(Guid.NewGuid());
                    this.tripCode = new TripCode(tripCode);
                    this.lineID = new TripLineID(lineID);
                    this.pathID = new TripPathID(pathID);
                    this.pathIDReturn = new TripPathID(pathIDReturn);
                    this.startDate = new Date(date);
                    this.startTime = new Hours(time);
                    this.nodesList = nodes;
                }
                catch (Exception)
                {
                    throw new BusinessRuleValidationException("Trip Invalid");
                }
            }
        }
        public Trip(string tripCode, long lineID, long pathID, long pathIDReturn, string date, string time)
        {
            // if (verifyDate(date))
            // {
                try
                {
                    this.Id = new TripID(Guid.NewGuid());
                    this.tripCode = new TripCode(tripCode);
                    this.lineID = new TripLineID(lineID);
                    this.pathID = new TripPathID(pathID);
                    this.pathIDReturn = new TripPathID(pathIDReturn);
                    this.startDate = new Date(date);
                    this.startTime = new Hours(time);
                    this.nodesList = null;
                }
                catch (Exception)
                {
                    throw new BusinessRuleValidationException("Trip Invalid");
                }
            // }
        }
        public Boolean verifyDate(string date)
        {
            DateTime startDateDT = new DateTime();
            DateTime now = DateTime.Now;
            try
            {
                var cultureInfo = new CultureInfo("pt-PT");
                startDateDT = DateTime.Parse(date, cultureInfo);
            }
            catch (Exception) { throw new BusinessRuleValidationException("Invalid Date."); }
            if (now.Ticks - startDateDT.Ticks > 0)
            {
                throw new BusinessRuleValidationException("The date needs to be set today or in the future.");
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
                Trip trip = (Trip)obj;
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