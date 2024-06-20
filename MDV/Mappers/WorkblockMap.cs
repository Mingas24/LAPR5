using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Trips;
using System;
using MDV.Domain.Workblocks;
using MDV.DTO.Workblocks;

namespace MDV.Map
{
    public class WorkblockMap
    {
        public WorkblockDTO DomainToDTO(Workblock workblock)
        {
            return new WorkblockDTO
            {
                Id = workblock.Id.AsGuid(),
                StartTime = workblock.startTime.datetime,
                EndTime = workblock.endTime.datetime,
                WorkblockCode = workblock.workblockCode.code,
                trips = workblock.trips
            };
        }

        public Workblock CreatingDTOToDomain(CreatingWorkblockDTO workblockDTO, List<Trip> trips)
        {
            return new Workblock(
            workblockDTO.StartTime,
            workblockDTO.EndTime,
            workblockDTO.WorkblockCode,
            trips
            );
        }
    }
}