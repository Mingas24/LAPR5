using MDV.Domain.Shared;

namespace MDV.Domain.Trips
{
    public class TripPathID : IValueObject
    {
        public long tripPathID { get; private set; }

        public TripPathID() { }

        public TripPathID(long tripPathID)
        {
            this.tripPathID = tripPathID;
        }
    }
}