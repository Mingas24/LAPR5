using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Utils;
using MDV.DTO.Trips;
using MDV.Domain.Trips;
using System;

namespace MDV.Map
{
    public class TripScheduleMap
    {
        public TripDTO DomainToDTO(Trip trip)
        {
            return new TripDTO
            {
                Id = trip.Id.AsGuid(),
                tripCode = trip.tripCode.code,
                lineID = trip.lineID.tripLineID,
                pathID = trip.pathID.tripPathID,
                startDate = trip.startDate.date,
                startTime = trip.startTime.datetime,
                nodes = trip.nodesList
            };
        }

        public Trip CreatingDTOToDomain(TripScheduleDTO tripDTO, List<TripDTO> list, long frequency)
        {
            var tcode = "T0000";
            var split = tcode.Split("T", 4);
            var tripcode = 0;
            var date = DateTime.Today.ToString();
            foreach (TripDTO i in list)
            {
                var split1 = i.tripCode.Split("T", 4);
                if (tripcode < Int32.Parse(split1[1]))
                {
                    tripcode = Int32.Parse(split1[1]);
                }
            }
            var startTime = "";
            var test = "";
            if (frequency < 60)
            {
                var splitTime = tripDTO.startTime.Split(":", 2);
                var minutes = Int32.Parse(splitTime[1]) + frequency;
                startTime = splitTime[0] + ":" + minutes;
                var dateSplit = date.Split("/", 3);
                var last = dateSplit[2].Split(" ", 2);
                test = dateSplit[1] + "-" + dateSplit[0] + "-" + last[0];
            }
            else
            {
                var splitTime = tripDTO.startTime.Split(":", 2);
                var minutes = Int32.Parse(splitTime[1]) + (frequency - 60);
                if (minutes == 0)
                {
                    startTime = Int32.Parse(splitTime[0]) + 1 + ":" + "00";
                }
                else
                {
                    startTime = Int32.Parse(splitTime[0]) + 1 + ":" + minutes;
                }
                var dateSplit = date.Split("/", 3);
                var last = dateSplit[2].Split(" ", 2);
                test = dateSplit[1] + "-" + dateSplit[0] + "-" + last[0];
            }
            if (tripcode == 0)
            {
                return new Trip(
                "T1",
                tripDTO.lineID,
                tripDTO.pathIDGO,
                tripDTO.pathIDReturn,
                test,
                startTime
                );
            }
            return new Trip(
            "T" + (tripcode + 1),
            tripDTO.lineID,
            tripDTO.pathIDGO,
            tripDTO.pathIDReturn,
            test,
            startTime
            );
        }
    }
}
