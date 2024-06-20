using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Shared;
using MDV.DTO.Trips;
using MDV.Domain.Trips;

namespace MDV.Map
{
    public class TripMap
    {
        public TripDTO DomainToDTO(Trip trip)
        {
            return new TripDTO
            {
                Id = trip.Id.AsGuid(),
                tripCode = trip.tripCode.code,
                lineID = trip.lineID.tripLineID,
                pathID = trip.pathID.tripPathID,
                pathIDReturn = trip.pathIDReturn.tripPathID,
                startDate = trip.startDate.date,
                startTime = trip.startTime.datetime,
                nodes = trip.nodesList
            };
        }

        public Trip CreatingDTOToDomain(CreatingTripDTO tripDTO)
        {
            List<string> auxList = new List<string>();
            List<long> auxList1 = new List<long>();
            List<Node> a = new List<Node>();
            Node auxNode = new Node();
            foreach (Node node in tripDTO.nodes)
            {
                var aux = node.node;
                auxList.Add(aux);
            }
            foreach(Node node in tripDTO.nodes){
                var aux = node.passingTime;
                auxList1.Add(aux);
            }
            for(int i = 0; i<auxList1.Count; i++){
                auxNode = new Node(auxList[i], auxList1[i]);
                a.Add(auxNode);
            }
            return new Trip(
            tripDTO.tripCode,
            tripDTO.lineID,
            tripDTO.pathID,
            tripDTO.pathIDReturn,
            tripDTO.startDate,
            tripDTO.startTime,
            a
            );
        }
    }
}