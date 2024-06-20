using MDV.Domain.Shared;

namespace MDV.Domain.Trips
{
    public class TripLineID : IValueObject
    {
        public long tripLineID { get; private set; }

        public TripLineID() { }

        public TripLineID(long tripLineID)
        {
            this.tripLineID = tripLineID;
        }
    }
}